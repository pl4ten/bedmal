import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TextInput} from 'react-native';

import HomeImage from '../../asset/footer/home.png';
import BagImage from '../../asset/footer/Bag-2.png';
import SearchImage from '../../asset/footer/search.png';
import {Button} from 'native-base';

let _defz = require('../com/def');

class StoreFooter extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <Button
          style={styles.homeButton}
          transparent
          onPress={() => alert('got to home')}>
          <Image source={HomeImage} />
        </Button>
        <View style={styles.searchBox}>
          <TextInput style={styles.searchInput} placeholder="Search" />
          <Image style={styles.searchImage} source={SearchImage} />
        </View>
        <Image source={BagImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: _defz.height / 10,
    borderTopColor: '#C3BCBC',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  searchBox: {
    width: '70%',
    position: 'relative',
  },
  searchInput: {
    borderColor: '#707070',
    borderWidth: 1,
    width: '100%',
    borderRadius: 30,
    textAlign: 'center',
  },
  searchImage: {
    position: 'absolute',
    left: 20,
    bottom: 15,
  },
  homeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: _defz.height / 40,
  },
});

export default StoreFooter;
