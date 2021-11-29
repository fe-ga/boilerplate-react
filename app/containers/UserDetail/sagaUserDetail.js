import { put, call, takeEvery, select } from 'redux-saga/effects';
import { getUserDetailsID } from './selectorsUserDetail';
let apiURL = 'https://61a054aea647020017613333.mockapi.io/User/';
let UserID = ' ';
async function getAPI() {
  const api = UserID === null ? apiURL : apiURL + UserID;
  try {
    const res = await fetch(api, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
}
function* fetchUser(action) {
  UserID = action.payload;
  try {
    const user = yield call(getAPI);
    yield put({ type: 'GET_USER_SUCCESS', user: user });
  } catch (e) {
    yield put({ type: 'GET_USER_FAILED', message: e.message });
  }
}
function* userSaga() {
  console.log('vào saga details');
  yield takeEvery('GET_USER_REQUEST', fetchUser);
}
export default userSaga;
