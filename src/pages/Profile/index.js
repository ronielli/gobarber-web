import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarIput from './AvatarInput';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  function handleSubimit(data) {
    dispatch(updateProfileRequest(data));
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubimit}>
        <AvatarIput name="avatar_id" />
        <Input name="nome" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Email" />
        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha Atual"
        />
        <Input type="password" name="password" placeholder="Nova Senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de Senha"
        />
        <button type="submit">Atualizar senha</button>
      </Form>
      <button type="submit">Sair do GoBarber</button>
    </Container>
  );
}
