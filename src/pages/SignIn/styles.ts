import styled, { keyframes } from "styled-components";
import signInBackgroundImg from "../../assets/login.png";
import { shade } from "polished";
export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  place-content: content;
  width: 100%;
  max-width: 700px;
`;

const apperFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);

  }
`;

export const AnimationContainer = styled.div`
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${apperFromLeft} 1.3s;

  form {
    margin: 60px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.3s;
      &:hover {
        color: ${shade(0.3, "#f4ede8")};
      }
    }
  }
  > a {
    color: #ff9000;
    display: block;
    margin-top: 8px;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      color: ${shade(0.3, "#ff9000")};
    }
    svg {
      margin-right: 10px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
