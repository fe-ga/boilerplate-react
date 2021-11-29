import * as type from './types';
const initialState = {
  loading: false,
  error: null,
};
export default function users(state = initialState, action) {
  switch (action.type) {
    case type.GET_ADD_REQUEST:
      return {
        error: null,
        loading: true,
      };
    case type.GET_ADD_SUCCESS:
      return {
        error: null,
        loading: false,
      };
    case type.GET_ADD_FAILED:
      return {
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
