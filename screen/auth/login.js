'use strict';
import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {styles} from './styles/login.styles';
import {connect} from 'react-redux';
import {setUserToken} from '../../redux/user/user.actions';
import {Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
let _defz = require('../com/def');
import Loader from '../com/loader';
let _names = '';
let _pass = '',
  code = '',
  _token = '';

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import PhoneInput from 'react-native-phone-input';
import RNExitApp from 'react-native-exit-app';
import RNPickerDialog from 'rn-modal-picker';
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: true,
      data: [
        {
          id: 1,
          name: 'Afghanistan',
        },
        {
          id: 2,
          name: 'Bahrain',
        },
        {
          id: 3,
          name: 'Canada',
        },
        {
          id: 4,
          name: 'Denmark',
        },
        {
          id: 5,
          name: 'Egypt',
        },
        {
          id: 6,
          name: 'France',
        },
        {
          id: 7,
          name: 'Greece',
        },
        {
          id: 8,
          name: 'Hong Kong',
        },
        {
          id: 9,
          name: 'India',
        },
        {
          id: 10,
          name: 'Japan',
        },
        {
          id: 11,
          name: 'Kenya',
        },
        {
          id: 12,
          name: 'Liberia',
        },
        {
          id: 13,
          name: 'Malaysia',
        },
        {
          id: 14,
          name: 'Nepal',
        },
        {
          id: 15,
          name: 'Oman',
        },
        {
          id: 16,
          name: 'Poland',
        },
      ],
      placeHolderText: '+1',
      selectedText: '',
      defaultValue: true,
      select: '',
      value: '',
    };
  }
  storeData = async () => {
    try {
      await AsyncStorage.setItem('token', _token);
      _defz._token = _token;
    } catch (e) {
      console.log('error save token ', e);
    }
  };
  signIn = async () => {
    try {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        scopes: ['profile', 'email'],
        offlineAccess: false,
        webClientId:
          '726577649573-ln72gpmn99fignugjnjts3tedrn9r0im.apps.googleusercontent.com',
      });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.login_via_google(userInfo.idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('error occured SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('error occured IN_PROGRESS');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('error occured PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log(error);
        alert('error occured unknow error');
      }
    }
  };
  login = async x => {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    let formData = new FormData();
    if (code !== '') {
      _names = code + '-' + _names;
    }
    formData.append('username', _names);
    formData.append('password', _pass);

    await _defz
      .send('user/login', 'POST', _defz._token, formData)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        if (response.status === 200) {
          this.props.navigation.pop();
          this.props.setUserToken(response.token);
          _token = response.token;
          _defz._token = response.token;
          this.storeData();
          navigate('home');
        } else {
          Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
            cancelable: true,
          });
        }
      });
  };
  login_via_google = async x => {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    let formData = new FormData();

    await _defz
      .send('user/login/google?idToken=' + x, 'GET', '0', formData)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        if (response.status === 200) {
          this.props.navigation.pop();
          this.props.setUserToken(response.token);
          _token = response.token;
          _defz._token = response.token;
          this.storeData();
          navigate('home');
        } else {
          Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
            cancelable: true,
          });
        }
      });
  };

  render() {
    const {navigate} = this.props.navigation;
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
                style={styles.logoImage}
              />
              <Text style={styles.text1}>Login</Text>
              <View style={{flexDirection: 'row'}}>
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

              <TextInput
                placeholder=" Password"
                placeholderTextColor="silver"
                secureTextEntry={true}
                onChangeText={text => {
                  _pass = text;
                }}
                maxLength={50}
                style={styles.textInput}
              />
              <Button transparent onPress={() => navigate('forget')}>
                <Text style={styles.text_forget}>Forgot your password?</Text>
              </Button>
              <View style={styles.splitter}>
                <View style={styles.splitterLeftLine} />
                <Text style={styles.splitterText}>Or</Text>
                <View style={styles.splitterRightLine} />
              </View>

              <Button rounded style={styles.b2} onPress={() => this.signIn()}>
                <Image
                  source={require('../../asset/google.png')}
                  resizeMode="stretch"
                  style={{marginRight: '10%'}}
                />
                <Text style={styles.textb3}>Continue with google</Text>
              </Button>

              <Button
                rounded
                iconLeft
                style={styles.b1}
                onPress={() => this.login()}>
                <Text style={styles.textb1}>Login</Text>
              </Button>

              <Button
                transparent
                rounded
                iconLeft
                style={styles.b3}
                onPress={() => navigate('signup')}>
                <Text style={styles.textsignup}>Do not have an account?</Text>
              </Button>
            </View>
          )}
        </View>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
});
const mapDispatchToProps = dispatch => ({
  setUserToken: token => dispatch(setUserToken(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(login);
