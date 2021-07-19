export const addItemToBag = (state, itemToAdd) => {
  console.log(state, itemToAdd);
  if (state.bag.length >= 5) {
    alert('maximum bag');
    return state;
  }
  if (state.bag.length) {
    state.bag.map(item => {
      if (item.vendorID === itemToAdd.vendorID) {
        item.productInCart.push(itemToAdd);
      }
      return {
        ...state.bag,
        bag: [...state.bag],
      };
    });
  } else {
    return {
      ...state,
      bag: [...state.bag, itemToAdd],
    };
  }
};
