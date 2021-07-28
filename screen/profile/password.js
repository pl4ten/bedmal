'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';

import {Image, TextInput, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import {styles} from './styles/password.styles';
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

export default password;
