import * as type from './types';
export function getUser(username) {
  return {
    type: type.GET_USERS_REQUEST,
    payload: username,
  };
}

export function deleteUser(userID) {
  return {
    type: type.DELETE_USER_REQUEST,
    payload: userID,
  };
}
