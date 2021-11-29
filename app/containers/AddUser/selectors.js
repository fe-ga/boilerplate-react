import { createSelector } from 'reselect';
import initialState from './reducers';

const selectHome = state => state.home || initialState;
const makeSelecError = () =>
  createSelector(
    selectHome,
    homeState => homeState.error,
  );

export { selectHome, makeSelecError };
