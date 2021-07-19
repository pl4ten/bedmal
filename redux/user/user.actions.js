import userActionTypes from './user.types';

export const setUserToken = token => ({
  type: userActionTypes.SET_TOKEN,
  payload: token,
});
