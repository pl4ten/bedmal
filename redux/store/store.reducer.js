import storeActionTypes from './store.types';
import {Alert} from 'react-native';

const INITIAL_STATE = {
  bag: [],
};

const storeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case storeActionTypes.ADD_TO_BAG:
      console.log(state, action.payload);
      if (state.bag.length >= 5) {
        Alert.alert('maximum bag');
        return state;
      }
      if (state.bag.length) {
        state.bag.forEach(item => {
          if (item.vendorID === action.payload.vendorID) {
            console.log(item);
            item.productInCart.push(action.payload.productInCart[0]);
          } else {
            state.bag.push(action.payload);
          }
        });
        return {
          ...state,
          bag: [...state.bag],
        };
      } else {
        return {
          ...state,
          bag: [...state.bag, action.payload],
        };
      }
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
