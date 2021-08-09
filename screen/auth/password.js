'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';

import {Image, TextInput, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import {styles} from './styles/password.styles';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import Loader from '../com/loader';
import {Confirm} from '../com/svg-files';
import { jsonBeautify } from 'beautify-json';

let _defz = require('../com/def');

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      newPass: '',
      newPassRepeat: '',
      passwordReseted: false,
    };
  }

  getToken() {
    // alert('x')
    // this.setState({token: token});
  }
  componentDidMount() {
    this.props.navigation.addListener('didFocus', e => {
      this.setState({token: e.state.params.token});
    });
  }

  reset = async x => {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    let formData = new FormData();
    formData.append('password', this.state.newPass);
    formData.append('password_confirmation', this.state.newPassRepeat);
    formData.append('reset_token', this.state.token);

    await _defz
      .send('user/forgot-password/reset', 'POST', '0', formData)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        if (response.status === 200) {
          this.setState({
            passwordReseted: true,
          });
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
          ) : this.state.passwordReseted ? (
            <View style={styles.resetedContainer}>
              <Image
                source={require('../../asset/logo_black.png')}
                resizeMode="stretch"
                style={styles.logoImg}
              />
              <Confirm width={_defz.width / 6} height={_defz.height / 4} />
              <Text style={styles.passwordResetedText}>Password changed</Text>
              <Text style={styles.passwordResetedText}>successfully</Text>

              <Button
                transparent
                style={styles.goToLoginButton2}
                onPress={() => navigate('login')}>
                <Text style={styles.textsignup}>Go To Login</Text>
              </Button>
            </View>
          ) : (
            <View>
              <Image
                source={require('../../asset/logo_black.png')}
                resizeMode="stretch"
                style={styles.logoImg}
              />
              <Text style={styles.text1}>Enter the new password</Text>
              <View style={{marginTop: 60}} />
              <TextInput
                placeholder="New Password"
                placeholderTextColor="silver"
                value={this.state.newPass}
                onChangeText={text =>
                  this.setState({
                    newPass: text,
                  })
                }
                maxLength={50}
                style={styles.textInput}
              />
              <TextInput
                placeholder="New Password again"
                placeholderTextColor="silver"
                value={this.state.newPassRepeat}
                onChangeText={text =>
                  this.setState({
                    newPassRepeat: text,
                  })
                }
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

export default Password;
