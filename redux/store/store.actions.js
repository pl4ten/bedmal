import storeActionTypes from './store.types';

export const addToBag = item => ({
  type: storeActionTypes.ADD_TO_BAG,
  payload: item,
});
export const clearBag = () => ({
  type: storeActionTypes.CLEAR_BAG,
});
