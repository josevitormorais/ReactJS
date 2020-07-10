import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Container, Content, Background, AnimationContainer } from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import logo from "../../assets/logo.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import api from "../../services/apiClient";
import { useToast } from "../../hooks/Toast";
interface SignUpFormModel {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormModel) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatorio"),
          email: Yup.string()
            .required("E-mail Obrigatorio")
            .email("Digite um email válido"),
          password: Yup.string().required().min(6, "No minimo 6 digitos"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);

        history.push("/");

        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "voce ja pode fazer seu login",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro ao fazer o login",
          description: "ocorreu um erro ao fazer login, cheque as credenciais",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit"> Cadastrar </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para pagina de login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
