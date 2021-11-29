import { put, call, takeEvery, select } from 'redux-saga/effects';
const apiURL = 'https://61a054aea647020017613333.mockapi.io/User';
let User = {};
let Method = '';
let id = '';
async function addAPI() {
  let api = apiURL;
  if (id !== '') api = apiURL + '/' + id;
  console.log(User);
  try {
    const response = await fetch(api, {
      method: Method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(User),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

function* fetchUsers(action) {
  const { user, status } = action.payload;
  User = user;
  if (status == 'Add') Method = 'POST';
  else {
    Method = 'PUT';
    id = user.id;
  }
  console.log(Method);
  try {
    const add = yield call(addAPI);
    yield put({ type: 'GET_ADD_SUCCESS' });
  } catch (e) {
    yield put({ type: 'GET_ADD_FAILED', message: e.message });
  }
}

function* userSaga() {
  yield takeEvery('GET_ADD_REQUEST', fetchUsers);
}
export default userSaga;
