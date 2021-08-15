import onDemandActionTypes from './onDemand.types';
import {addTobascket, removeFromBascket, addReturnItems} from './onDemand.utils';

const INITIAL_STATE = {
  lid_sleeve_cup: 0,
  bag: 0,
  cup: 0,
  lid_cup: 0,
  returns: [],
};

const onDemandReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case onDemandActionTypes.ADD_TO_BASCKET:
      return addTobascket(state, action.payload);

    case onDemandActionTypes.REMOVE_FROM_BASCKET:
      return removeFromBascket(state, action.payload);

    case onDemandActionTypes.ADD_RETURN_ITEMS:
      return addReturnItems(state, action.payload);

    default:
      return state;
  }
};

export default onDemandReducer;
