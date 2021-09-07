import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';

import {ArrowBack, Massage} from './svg-files';

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

        {this.props.message ? (
          <Button
            transparent
            style={styles.msg}
            onPress={() => this.props.navigation.navigate(this.props.message)}>
            <Massage />
          </Button>
        ) : (
          <Button transparent style={styles.msg} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    minHeight: _defz.height / 15,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: '2%',
  },
  arrowBack: {
    flex: 1,
  },
  headerText: {
    color: 'gray',
    fontSize: 35,
    alignSelf: 'center',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: 'FuturaPT-Medium',
    flex: 3,
  },
  msg: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Headers;
