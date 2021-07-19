import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectUserToken = createSelector(
  [selectUser],
  user => user.token,
);
