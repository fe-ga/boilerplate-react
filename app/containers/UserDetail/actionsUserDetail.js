import * as type from './types';
export function getUserDetail(userID) {
  return {
    type: type.GET_USER_REQUEST,
    payload: userID,
  };
}
// export function setUserIDDetails(userID) {
//   return {
//     type: type.GET_USER_ID,
//     payload: userID,
//   };
// }
