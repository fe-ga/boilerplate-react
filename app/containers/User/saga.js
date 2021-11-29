import { put, call, takeEvery, select } from 'redux-saga/effects';
import * as type from './types';
const apiURL = 'https://61a054aea647020017613333.mockapi.io/User/';
let id = '';

async function getAPI() {
  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}
async function deleteuser() {
  const api = apiURL + id;
  console.log(api);
  try {
    const res = await fetch(api, {
      method: 'DELETE',
      header: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
}
function* fetchUsers() {
  try {
    const users = yield call(getAPI);
    console.log(users);
    yield put({ type: 'GET_USERS_SUCCESS', users: users });
  } catch (e) {
    yield put({ type: 'GET_USERS_FAILED', message: e.message });
  }
}
function* deleteUser(action) {
  id = action.payload;
  try {
    const userDeleted = yield call(deleteuser);
    yield put({ type: 'GET_USERS_REQUEST' });

  } catch (e) {

    yield put({ type: 'GET_USERS_FAILED', message: e.message });
  }
}
function* userSaga() {
  
  yield takeEvery('GET_USERS_REQUEST', fetchUsers);
  yield takeEvery('DELETE_USER_REQUEST', deleteUser);
}
export default userSaga;
