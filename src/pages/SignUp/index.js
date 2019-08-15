import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';
// import { Container } from './styles';
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail Valido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No minimo 6 caracteres')
    .required('password obrigatório'),
  nome: Yup.string().required('o Nome é Obrigatorios'),
});
export default function Signin() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="Gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua Senha Secreta"
        />
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho Login</Link>
      </Form>
    </>
  );
}
