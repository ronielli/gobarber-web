import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailude } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { nome, email, avatar_id, ...rest } = payload.data;
    const profile = {
      nome,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, '/update', profile);
    toast.success('Perfil Atualizado com Sucesso');
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao Atulizar os Dados');
    yield put(updateProfileFailude());
  }
}
export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
