import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

let _def = require('../com/def');

class ProductTypes extends React.Component {
  render() {
    return (
      <View style={this.props.active ? styles.active : styles.cart}>
        <Text style={this.props.active ? styles.activeText : null}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cart: {
    borderRadius: 40,
    borderColor: '#C3BCBC',
    borderWidth: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: 5,
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 'auto',
  },
  active: {
    borderColor: '#3D80F2',
    borderRadius: 40,
    borderWidth: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: 5,
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
  },
  activeText: {
    color: '#3D80F2',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ProductTypes;
