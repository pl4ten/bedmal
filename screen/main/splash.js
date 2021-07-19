'use strict';
import React, {Component} from 'react';

import {View} from 'react-native';

import {StyleSheet, Image} from 'react-native';

class Web_view extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <View>
        <Image
          source={require('../../asset/splash.png')}
          resizeMode="stretch"
          style={styles.image}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
  },
});
export default Web_view;
