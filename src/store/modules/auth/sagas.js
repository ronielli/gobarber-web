import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signInSuccess, signFailude } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const respose = yield call(api.post, 'session', {
      email,
      password,
    });
    const { avatar, id, nome, provider, token } = respose.data;

    if (!provider) {
      console.tron.error('Usuario não é um Privider');
      toast.error('Usuario não é um prestador de serviço');
      return null;
    }
    yield put(
      signInSuccess(token, { avatar, email, id, nome, provider, token })
    );
    history.push('./dashboard');
  } catch (error) {
    toast.error('Usuario ou senha Invalida');
    yield put(signFailude());
  }
}

export function* signUp({ payload }) {
  try {
    const { email, password, name } = payload;

    yield call(api.post, 'users', {
      email,
      password,
      nome: name,
      provider: true,
    });

    history.push('./');
  } catch (error) {
    toast.error('Falha no cadastro Verifique seus Dados');
    yield put(signFailude());
  }
}
export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
