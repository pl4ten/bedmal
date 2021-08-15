import onDemandActionTypes from './onDemand.types';

export const addToBascket = itemToAdd => ({
  type: onDemandActionTypes.ADD_TO_BASCKET,
  payload: itemToAdd,
});

export const removeFromBascket = itemToRemove => ({
  type: onDemandActionTypes.REMOVE_FROM_BASCKET,
  payload: itemToRemove,
});

export const addReturnItems = itemsToAdd => ({
  type: onDemandActionTypes.ADD_RETURN_ITEMS,
  payload: itemsToAdd,
});
