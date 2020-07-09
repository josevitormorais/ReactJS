import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/apiClient";

interface AuthDataUser {
  token: string;
  user: object;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextModel {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);
const storageToken = "@Gobarber:token";
const storageUser = "@Gobarber:user";

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthDataUser>(handleStateToDataUser);

  function handleStateToDataUser() {
    const token = localStorage.getItem(storageToken);
    const user = localStorage.getItem(storageUser);

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthDataUser;
  }

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem(storageToken, token);
    localStorage.setItem(storageUser, JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(storageToken);
    localStorage.removeItem(storageUser);
    setData({} as AuthDataUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextModel {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
