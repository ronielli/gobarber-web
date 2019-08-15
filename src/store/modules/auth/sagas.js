import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { signInSuccess } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const respose = yield call(api.post, 'session', {
    email,
    password,
  });
  const { token, nome, provider } = respose.data;
  console.log(respose);

  if (!provider) {
    console.tron.error('Usuario não é um Privider');
    return null;
  }
  yield put(signInSuccess(token, nome));
  history.push('./dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
