'use strict';
import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';
import {styles} from './styles/usermain.styles';
import {Image, ImageBackground} from 'react-native';
import {Button, Text} from 'native-base';
import Loader from '../com/loader';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';
let _defz = require('../com/def');
class usermain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    this.getprofile();
  }

  async getprofile() {
    const {navigate} = this.props.navigation;
    try {
      await _defz
        .get_via_token('user/account/profile', 'GET', this.props.token)
        .then(response => {
          if (response.status == 200) {
            this.setState({loading: false});
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'home'})],
            });
            this.props.navigation.dispatch(resetAction);
          } else {
            this.setState({loading: true});
          }
        });
    } catch (error) {
      this.setState({loading: true});
      console.log(error);
    }
  }
  nav(x) {
    const {navigate} = this.props.navigation;
    this.setState({loading: false});
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: x})],
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading == false ? (
          <ImageBackground
            source={require('../../asset/splash.png')}
            resizeMode="stretch"
            style={styles.splashImage}>
            <Image
              source={require('../../asset/logo_white.png')}
              resizeMode="stretch"
              style={styles.logoImage}
            />

            <Text style={styles.text1}>Find Coffe You love </Text>
            <Text style={styles.text2}>Discover new Coffe shop</Text>
          </ImageBackground>
        ) : (
          <ImageBackground
            source={require('../../asset/splash.png')}
            resizeMode="stretch"
            style={styles.splashImage}>
            <Image
              source={require('../../asset/logo_white.png')}
              resizeMode="stretch"
              style={styles.logoImage}
            />

            <Text style={styles.text1}>Find Coffe You love </Text>
            <Text style={styles.text2}>Discover new Coffe shop</Text>

            <Button style={styles.b1} onPress={() => this.nav('signup')}>
              <Text style={styles.textb1}>Create an account</Text>
            </Button>
            <Button style={styles.b2} onPress={() => this.nav('login')}>
              <Text style={styles.textb2}>I Already have an account</Text>
            </Button>
          </ImageBackground>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
});

export default connect(mapStateToProps)(usermain);
