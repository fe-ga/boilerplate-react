import { createSelector } from 'reselect';
import initialState from './reducers';

const selectHome = state => state.home || initialState;
const makeSelectUser = () =>
  createSelector(
    selectHome,
    homeState => homeState.users,
  );
const makeSelectLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.loading,
  );

export { selectHome, makeSelectLoading, makeSelectUser };
