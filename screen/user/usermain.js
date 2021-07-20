'use strict';
import React, {Component, useEffect} from 'react';
import {View} from 'react-native';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';

import {StyleSheet, Image, ImageBackground, BackHandler} from 'react-native';
import {Button, Text} from 'native-base';
import Loader from '../com/loader';
import AsyncStorage from '@react-native-community/async-storage';

let _defz = require('../com/def');
class usermain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      canGoBack: false,
    };
  }
  componentDidMount() {
    this.gettoken();
    console.log('+++++++++++' + this.props.token + '+++++++++++++++++');
  }

  gettoken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        if (value === '0') {
          this.getprofile(0);
        } else {
          _defz._token = value;
          this.getprofile(value);
        }
      }
      this.getprofile(value);
    } catch (e) {
      alert(e);
    }
  };
  async getprofile(x) {
    const {navigate} = this.props.navigation;
    try {
      await _defz
        .get_via_token('user/account/profile', 'GET', x)
        .then(response => {
          if (response.status == 200) {
            this.setState({loading: false});
            navigate('home');
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
    navigate(x);
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  b1: {
    alignSelf: 'center',
    marginTop: 'auto',
    height: 60,
    borderRadius: 15,
    bottom: 30,
    color: '#3D80F2',
    backgroundColor: '#3D80F2',
    width: '85%',
    justifyContent: 'center',
  },
  textb1: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    textTransform: 'capitalize',
  },
  b2: {
    alignSelf: 'center',
    marginTop: 20,
    height: 60,
    borderRadius: 15,
    bottom: 30,
    backgroundColor: 'white',
    width: '85%',
    justifyContent: 'center',
  },
  textb2: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '35%',
    alignSelf: 'center',
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '3%',
    alignSelf: 'center',
  },
  splashImage: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  logoImage: {
    alignSelf: 'center',
    height: '10%',
    width: '50%',
    marginTop: '20%',
  },
});

const mapStateToProps = state => ({
  token: selectUserToken(state),
});
// selectUserToken
export default connect(mapStateToProps)(usermain);
