import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #232129;
  width: 100%;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  transition: background-color 0.2s;

  button {
    &:hover {
      background: ${shade(0.2, "#ff9000")};
    }
  }
`;
