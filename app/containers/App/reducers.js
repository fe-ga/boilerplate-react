import produce from 'immer';

// The initial state of the App
export const initialState = {
  users: [],
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        break;
    }
  });

export default appReducer;
