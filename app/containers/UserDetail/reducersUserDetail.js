import * as type from './types';
const initialState = {
  user: {},
  loading: false,
  error: null,
};
export default function users(state = initialState, action) {
  switch (action.type) {
    case type.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.GET_USER_SUCCESS:
      let newstateUser = {
        ...state,
        loading: false,
        user: action.user,
      };
      return newstateUser;
    case type.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
