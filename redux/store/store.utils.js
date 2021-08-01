import {Alert} from 'react-native';
import {jsonBeautify} from 'beautify-json';

export const addItemToBag = (state, itemToAdd) => {
  let newBag = [];
  if (state.bag.length) {
    newBag = [...state.bag];
    newBag.forEach(item => {
      if (itemToAdd.vendorID === item.vendorID) {
        item.cart.forEach(cart => {
          if (cart.product.id === itemToAdd.cart[0].product.id) {
            if (cart.addressID === itemToAdd.cart[0].addressID) {
              if (cart.buyType === itemToAdd.cart[0].buyType) {
                if (cart.price === itemToAdd.cart[0].price) {
                  if (cart.orderType === itemToAdd.cart[0].orderType) {
                    if (cart.packing === itemToAdd.cart[0].packing) {
                      if (cart.selectedOption === itemToAdd.cart[0].selectedOption) {
                        cart.quantity += parseFloat(cart.quantity + itemToAdd.cart[0].quantity);
                      } else {
                        newBag.push(itemToAdd);
                      }
                    } else {
                      newBag.push(itemToAdd);
                    }
                  } else {
                    newBag.push(itemToAdd);
                  }
                } else {
                  newBag.push(itemToAdd);
                }
              } else {
                newBag.push(itemToAdd);
              }
            } else {
              newBag.push(itemToAdd);
            }
          } else {
            item.cart.push(itemToAdd.cart[0]);
          }
        });
      } else {
        newBag.push(itemToAdd);
      }
    });
    return newBag;
  } else {
    newBag = [...state.bag];
    newBag.push(itemToAdd);
    return newBag;
  }
};
