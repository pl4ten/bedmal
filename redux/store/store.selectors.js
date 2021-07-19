import {createSelector} from 'reselect';

const selectBag = state => state.store;

export const selectBagItems = createSelector(
  [selectBag],
  bag => bag.bag,
);
