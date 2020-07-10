import React, { useCallback, useContext, createContext, useState } from "react";
import ToastContainer from "../components/TotasContainer";
import { uuid } from "uuidv4";

export interface ToastMessageModel {
  id: string;
  type?: "success" | "error" | "info";
  title: string;
  description: string;
}

interface ToastContextModel {
  addToast(message: Omit<ToastMessageModel, "id">): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextModel>({} as ToastContextModel);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessageModel[]>([]);
  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessageModel, "id">) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      setMessages((stateMessagesActual) => [...stateMessagesActual, toast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages((stateMessagesActual) =>
      stateMessagesActual.filter((message) => message.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextModel {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used whitin a ToastProvider");
  }
  return context;
}
export { ToastProvider, useToast };
