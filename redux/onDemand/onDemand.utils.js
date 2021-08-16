import {jsonBeautify} from 'beautify-json';

export const addTobascket = (state, itemToAdd) => {
  let newState = {
    lid_sleeve_cup: state.lid_sleeve_cup,
    bag: state.bag,
    cup: state.cup,
    lid_cup: state.lid_cup,
    returns: [...state.returns],
  };
  if (itemToAdd === 'lid_sleeve_cup') {
    newState.lid_sleeve_cup += 1;
  }
  if (itemToAdd === 'bag') {
    newState.bag += 1;
  }
  if (itemToAdd === 'cup') {
    newState.cup += 1;
  }
  if (itemToAdd === 'lid_cup') {
    newState.lid_cup += 1;
  }

  return newState;
};

export const removeFromBascket = (state, itemToAdd) => {
  let newState = {
    lid_sleeve_cup: state.lid_sleeve_cup,
    bag: state.bag,
    cup: state.cup,
    lid_cup: state.lid_cup,
    returns: [...state.returns],
  };
  if (itemToAdd === 'lid_sleeve_cup') {
    newState.lid_sleeve_cup >= 1 ? (newState.lid_sleeve_cup -= 1) : 0;
  }
  if (itemToAdd === 'bag') {
    newState.bag >= 1 ? (newState.bag -= 1) : 0;
  }
  if (itemToAdd === 'cup') {
    newState.cup >= 1 ? (newState.cup -= 1) : 0;
  }
  if (itemToAdd === 'lid_cup') {
    newState.lid_cup >= 1 ? (newState.lid_cup -= 1) : 0;
  }

  return newState;
};

export const addReturnItems = (state, itemsToAdd) => {
  let newState = {
    lid_sleeve_cup: state.lid_sleeve_cup,
    bag: state.bag,
    cup: state.cup,
    lid_cup: state.lid_cup,
    returns: [],
  };

  newState.returns.push(itemsToAdd);
  return newState;
};
