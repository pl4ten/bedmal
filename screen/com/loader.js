import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Button, Text, Icon, Left} from 'native-base';

let _defz = require('../com/def');
class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.loader}>
        <View style={styles.loadingz}>

          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
  },

  loadingz: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    zIndex: 200,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
