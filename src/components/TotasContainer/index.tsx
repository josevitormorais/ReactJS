import React from "react";
import Toast from "./Toast";
import { Container } from "./styles";
import { ToastMessageModel } from "../../hooks/Toast";
import { useTransition } from "react-spring";

interface ToastContainer {
  messages: ToastMessageModel[];
}

const TotasContainer: React.FC<ToastContainer> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: "-120%" },
      enter: { right: "0%" },
      leave: { right: "-120%" },
    }
  );
  return (
    <Container>
      {messagesWithTransition.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item}></Toast>
      ))}
    </Container>
  );
};

export default TotasContainer;
