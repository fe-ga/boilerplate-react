import * as type from './types';
export function addUser(status, user) {
  return {
    type: type.GET_ADD_REQUEST,
    payload: { status, user },
  };
}

export function addError(error) {
  return {
    type: type.GET_ADD_REQUEST,
    payload: error,
  };
}