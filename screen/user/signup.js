'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';

import {StyleSheet, Image, TextInput, Alert} from 'react-native';
import {Button, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

let _defz = require('../com/def');

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '656104263668-6hb4db4ab35g18d8i0ljnvi5564k0u0r.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: 'bedmal', // [Android] specifies an account name on the device that should be used
  iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});
GoogleSignin.configure({
  webClientId: '656104263668-6hb4db4ab35g18d8i0ljnvi5564k0u0r.apps.googleusercontent.com',
});

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
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      this.setState({ userInfo });
      alert(statusCodes)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert(statusCodes)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        alert(statusCodes)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        alert(statusCodes)
      } else {
        // some other error happened
        alert(statusCodes)
      }
    }
  };
onGoogleButtonPress= async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
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
  sigup = async x => {
   this.setState({loading:true})
    let formData = new FormData();
    if (code!==''){
      _phone=code+ "-"+_phone
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
          <Button rounded style={styles.b2} onPress={() =>    this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
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
    borderRadius: 25,
    height: 41,
    elevation: 3,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#000000',
    textAlign: 'left',
    marginTop: '5%',
    padding: 13,
  },
  textInput2: {
    width: '10%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 25,
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
export default signup;
