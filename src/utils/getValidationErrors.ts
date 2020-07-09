import { ValidationError } from "yup";

interface ErrorsYup {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): ErrorsYup {
  const validationErros: ErrorsYup = {};

  err.inner.forEach((err) => {
    validationErros[err.path] = err.message;
  });
  return validationErros;
}
