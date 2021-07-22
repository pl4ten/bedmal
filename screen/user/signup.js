'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';

import {StyleSheet, Image, TextInput, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';
import {setUserToken} from '../../redux/user/user.actions';
let _defz = require('../com/def');

import Loader from '../com/loader'
let _names = '';
let _pass = '';
let _phone = '';
let _email = '';
let _token = '';
let code="";
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class signup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      visible: true,
      canGoBack: false,
    };
  }
  signIn = async () => {
    try {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        scopes: ['profile', 'email'],
        offlineAccess :false,
        webClientId:
          '726577649573-ln72gpmn99fignugjnjts3tedrn9r0im.apps.googleusercontent.com',
      });

      const userInfo = await GoogleSignin.signIn();
      this.login_via_google(userInfo.idToken)
        console.log(userInfo)

    } catch (error) {
      console.log(error)
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
  storeData = async () => {
    try {
      await AsyncStorage.setItem('token', _token);
      _defz._token=_token
    } catch (e) {
      console.log('error save token ', e);
    }
  };
  login = async x => {
    const {navigate} = this.props.navigation;
    let formData = new FormData();
    if (code!==''){
      _phone=code+ "-"+_phone
    }
    formData.append('username', _phone);
    formData.append('password', _pass);

    await _defz
      .send('user/login', 'POST', _defz._token, formData)
      .then(response => {
        console.log(response);
        this.setState({loading:false})
        if (response.status === 200) {
          this.props.navigation.pop();
          _token = response.token;
          this.storeData();
          navigate('home' ,{"mod": "new"});

        }
        if (response.status === 400) {
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
      .send('user/login/google?idToken='+x, 'GET', "0", )
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

  sigup = async x => {
   this.setState({loading:true})
    let formData = new FormData();
    if (code!==''){
      formData.append('country_code', code);
    }
    formData.append('name', _names);
    formData.append('email', _email);
    formData.append('mobile', String(_phone));
    formData.append('password', _pass);
    await _defz
      .send('user/register', 'POST', _defz._token, formData)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.login();
        }
        if (response.status === 400) {
          Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
            cancelable: true,
          });
          this.setState({loading:false})
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
          <Text style={styles.textsub}>Sign up</Text>
          <TextInput
            placeholder="  Name"
            placeholderTextColor="silver"
            onChangeText={text => {
              _names = text;
            }}
            maxLength={50}
            style={styles.textInput}
          />
              <View style={{flexDirection: "row"}}>
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
            placeholder="  Email"
            placeholderTextColor="silver"
            keyboardType={'email-address'}
            onChangeText={text => {
              _email = text;
            }}
            maxLength={50}
            style={styles.textInput}
          />
          <TextInput
            placeholder="  Password"
            secureTextEntry={true} 
            placeholderTextColor="silver"
            onChangeText={text => {
              _pass = text;
            }}
            maxLength={50}
            style={styles.textInput}
          />

          <View style={styles.splitter}>
            <View style={styles.splitterLine} />
            <Text style={styles.splitterText}>Or</Text>
            <View style={styles.splitterLine} />
          </View>
          <Button rounded style={styles.b2} onPress={() =>    this.signIn()}>
            <Image
              source={require('../../asset/google.png')}
              resizeMode="stretch"
            />
            <Text style={styles.textb3}>Continue with google</Text>
          </Button>
          <Text style={styles.textfooter}>
            By continuing with Google, Apple, or Email, you agree to bedmal
            Terms of Service and Privacy Policy.
          </Text>
          <Button
            rounded
            iconLeft
            style={styles.b1}
            onPress={() => this.sigup()}>
            <Text style={styles.textb1}>greate an account</Text>
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
  b2: {
    alignSelf: 'center',
    marginTop: '3%',
    height: 40,
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'center',
  },
  textb2: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
  textsub: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    color: 'gray',
  },
  textsignup: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    bottom: 20,
  },
  textb3: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    textTransform: 'capitalize',
  },
  textfooter: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'gray',
    width: '90%',
    marginTop: '2%',
  },
  b1: {
    alignSelf: 'center',
    marginTop: _defz.height / 15,
    height: 50,
    bottom: '4%',
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
  },
  text1: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
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
    marginTop: '5%',
    padding:13
  },
  logoImage: {
    alignSelf: 'center',
    height: '10%',
    width: '50%',
    marginTop: '10%',
  },
  splitter: {
    flexDirection: 'row',
    marginTop: 30,
  },
  textInput3: {
    width: '75%',
    alignSelf: 'center',

    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 41,
    elevation: 3,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#000000',
    textAlign: 'left',
    marginTop: '5%',
    padding: 13,
    marginLeft: 1,
  },
  textInput2: {
    width: '10%',
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius:25,
    height: 30,
    elevation: 3,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#000000',
    textAlign: 'left',
    marginTop: '5%',
    padding: 13,
    marginLeft: "5%"
  },
  splitterText: {
    margin: 10,
    color: 'gray',
  },
  splitterLine: {
    alignSelf: 'center',
    width: '45%',
    height: 1,
    backgroundColor: 'silver',
  },
});
const mapStateToProps = state => ({
  state: state,
});
const mapDispatchToProps = dispatch => ({
  setUserToken: token => dispatch(setUserToken(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(signup);

