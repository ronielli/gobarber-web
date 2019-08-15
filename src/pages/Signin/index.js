import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';
// import { Container } from './styles';
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail Valido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('password obrigatório'),
});
export default function Signin() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="Gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua Senha Secreta"
        />
        <button type="submit">Acessat</button>
        <Link to="/register">Criar sua conta Gratuitamente</Link>
      </Form>
    </>
  );
}
