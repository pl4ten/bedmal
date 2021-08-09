'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from './styles/verify.styles';
import {Image, TextInput, Alert} from 'react-native';
import {Button, Text} from 'native-base';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import Password from './password';

let code = '';
let _defz = require('../com/def');
import Loader from '../com/loader';
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      phone: '',
    };
  }
  componentWillMount() {
    const {navigation} = this.props;

    let data = navigation.getParam('data', '0');
    this.setState({phone: data});
  }

  verify = async x => {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    let formData = new FormData();
    formData.append('username', this.state.phone);
    formData.append('verification_code', code);

    await _defz
      .send('user/forgot-password/verify', 'POST', '0', formData)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        if (response.status === 200) {
          navigate('password', {token: response.reset_token});
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
              <Text style={styles.text1}>Forgot your password?</Text>
              <Text style={styles.text2}>
                To reset your password , please enter the Phone number
              </Text>
              <Text style={styles.text3}>{this.state.phone}</Text>

              <TextInput
                placeholder="Verification Code"
                placeholderTextColor="silver"
                onChangeText={text => {
                  code = text;
                }}
                maxLength={50}
                style={styles.textInput}
              />
              <Button
                rounded
                iconLeft
                style={styles.b1}
                onPress={() => this.verify()}>
                <Text style={styles.textb1}>Login</Text>
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

export default verify;
