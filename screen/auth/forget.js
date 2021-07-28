'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';

import {Image, TextInput, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import {styles} from './styles/forget.styles';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
let _phone = '';
let code = '';
let _defz = require('../com/def');
import Loader from '../com/loader';
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  forget = async x => {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    let formData = new FormData();
    if (code !== '') {
      _phone = code + '-' + _phone;
    }
    formData.append('username', _phone);

    await _defz
      .send('user/forgot-password', 'POST', '0', formData)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        if (response.status === 200) {
          navigate('verify', {data: _phone});
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
              <View
                style={{flexDirection: 'row', marginTop: _defz.height / 10}}>
                <TextInput
                  placeholder="+1"
                  placeholderTextColor="silver"
                  onChangeText={text => {
                    code = text;
                  }}
                  maxLength={50}
                  style={styles.textInput2}
                />
                <TextInput
                  placeholder=" Phone number"
                  placeholderTextColor="silver"
                  onChangeText={text => {
                    _names = text;
                  }}
                  maxLength={50}
                  style={styles.textInput3}
                />
              </View>

              <Button
                rounded
                iconLeft
                style={styles.b1}
                onPress={() => this.forget()}>
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

export default forget;
