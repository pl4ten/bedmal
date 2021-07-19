'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';

import {StyleSheet, Image, TextInput, Alert} from 'react-native';
import {Button, Text} from 'native-base';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';
let pass = '';
let pass_confirmation = '';
let _defz = require('../com/def');
import Loader from '../com/loader';
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      token: '',
    };
  }
  componentWillMount() {
    const {navigation} = this.props;

    let data = navigation.getParam('token', '0');
    this.setState({token: data});
  }

  reset = async x => {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    let formData = new FormData();
    formData.append('password', pass);
    formData.append('password_confirmation', pass_confirmation);
    formData.append('reset_token', this.state.token);

    await _defz
      .send('user/forgot-password/verify', 'POST', '0', formData)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        if (response.status === 200) {
          navigate('reet_pass', {token: response.reset_token});
        } else {
          Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
            cancelable: true,
          });
        }
      });
  };
  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          {this.state.loading === true ? (
            <Loader navigation={this.props.navigation} loading={true} />
          ) : (
            <View>
              <Image
                source={require('../../asset/logo_black.png')}
                resizeMode="stretch"
                style={styles.logoImg}
              />

              <TextInput
                placeholder="New Password"
                placeholderTextColor="silver"
                onChangeText={text => {
                  pass = text;
                }}
                maxLength={50}
                style={styles.textInput}
              />
              <Button
                rounded
                iconLeft
                style={styles.b1}
                onPress={() => this.reset()}>
                <Text style={styles.textb1}>Change Password</Text>
              </Button>

              <Button
                transparent
                style={styles.goToLoginButton}
                onPress={() => navigate('login')}>
                <Text style={styles.textsignup}>Go To Login</Text>
              </Button>
            </View>
          )}
        </View>
      </DismissKeyboard>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _defz.main_color,
  },

  textsignup: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'gray',
    textTransform: 'capitalize',
  },
  textb3: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
  },
  b1: {
    alignSelf: 'center',
    marginTop: _defz.height / 4,
    height: 50,
    bottom: '17%',
    color: '#3D80F2',
    backgroundColor: '#3D80F2',
    width: '90%',
    justifyContent: 'center',
  },
  textb1: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    textTransform: 'capitalize',
    width: '100%',
    textAlign: 'center',
  },
  text1: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: '3%',
  },
  text2: {
    color: 'grey',
    fontSize: 13,
    width: '90%',
    alignSelf: 'center',
    marginTop: '3%',
  },
  text3: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    width: '90%',
    alignSelf: 'center',

    justifyContent: 'center',
    marginTop: '13%',
    textAlign: 'center',
  },
  textb2: {
    color: 'black',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '7%',
    marginTop: '3%',
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 25,
    height: 41,
    elevation: 3,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#000000',
    textAlign: 'left',
    marginTop: '25%',
    padding: 15,
  },
  textInput22: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 25,
    height: 41,
    elevation: 3,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#000000',
    textAlign: 'left',
    marginTop: '8%',
    padding: 15,
  },
  logoImg: {
    alignSelf: 'center',
    height: '10%',
    width: '50%',
    marginTop: '20%',
  },
  goToLoginButton: {
    bottom: '10%',
    alignSelf: 'center',
    backgroundColor: _defz.main_color,
  },
});

export default password;
