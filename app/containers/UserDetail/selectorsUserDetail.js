import { createSelector } from 'reselect';
import initialState from './reducersUserDetail';

const selectDetails = state => state.detail || initialState;
const makeSelectUserDeails = () =>
  createSelector(
    selectDetails,
    homeState => homeState.user,
  );
const makeSelectLoading = () =>
  createSelector(
    selectDetails,
    homeState => homeState.loading,
  );

export { selectDetails, makeSelectUserDeails, makeSelectLoading };
