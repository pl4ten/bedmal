import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';

import {ArrowBack} from './svg-files';

let route = '';
let _defz = require('../com/def');
class Headers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    route = this.props.route;
    return (
      <View transparent style={styles.headerContainer}>
        <Button
          transparent
          style={styles.arrowBack}
          onPress={() => this.props.navigation.goBack()}>
          <ArrowBack />
        </Button>

        <Text style={styles.headerText}>{route}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: _defz.height / 50,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingBottom: _defz.height / 100,
  },
  arrowBack: {
    position: 'absolute',
    top: 10,
    left: _defz.width / 18,
  },
  headerText: {
    color: 'gray',
    fontSize: 35,
    alignSelf: 'center',
    marginTop: '1%',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: 'FuturaPT-Medium',
  },
});

export default Headers;
