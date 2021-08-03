import storeActionTypes from './store.types';
import {addItemToBag, quantityUp, quantityDown} from './store.utils';

const INITIAL_STATE = {
  bag: [],
};

const storeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case storeActionTypes.ADD_TO_BAG:
      return {
        ...state,
        bag: addItemToBag(state, action.payload),
      };
    case storeActionTypes.QUANTITY_UPPER:
      return {
        ...state,
        bag: quantityUp(state, action.payload),
      };
      case storeActionTypes.QUANTITY_DOWNER:
      return {
        ...state,
        bag: quantityDown(state, action.payload),
      };
    case storeActionTypes.CLEAR_BAG:
      return {
        ...state,
        bag: [],
      };
    default:
      return state;
  }
};

export default storeReducer;
