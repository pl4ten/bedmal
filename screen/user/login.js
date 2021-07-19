'use strict';
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {setUserToken} from '../../redux/user/user.actions';
import {Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
let _defz = require('../com/def');
import Loader from '../com/loader';
let _names = '';
let _pass = '',
code="",
  _token = '';

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import PhoneInput from 'react-native-phone-input'
import RNExitApp from 'react-native-exit-app';

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
      pickerData:null,
      valid: "",
      type: "",
      value: ""
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
        offlineAccess :false,
        androidClientId:
          '656104263668-6hb4db4ab35g18d8i0ljnvi5564k0u0r.apps.googleusercontent.com',
      });
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null });
      const { idToken } = await GoogleSignin.signIn();
      console.log('reached google sign in');
      const userInfo = await GoogleSignin.signIn();

alert(userInfo.idToken)
      console.log(userInfo);

      this.setState({userInfo});
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log(currentUser );
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
    if (code!==''){
      _names=code+ "-"+_names
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
      .send('user/login/google?idToken='+x, 'POST', "0", formData)
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
                  style={{marginRight: "10%"}}
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


            </View>
          )}
                        <Button
                transparent
                rounded
                iconLeft
                style={styles.b3}
                onPress={() => navigate('signup')}>
                <Text style={styles.textsignup}>Do not have an account?</Text>
              </Button>
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
    marginTop: 20,
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
    textTransform: 'capitalize',
  },
  textsignup: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    bottom: 20,
    textTransform: 'capitalize',
  },
  textb3: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    textTransform: 'capitalize',
  },
  b3: {
    alignSelf: 'center',
    marginTop: _defz.height / 15,
    height: 50,
    bottom: 1,

    width: '90%',
    justifyContent: 'center',
  },
  b1: {
    alignSelf: 'center',
    marginTop: _defz.height / 8,
    height: 50,
    bottom: '10%',
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
    width: "100%",
    textAlign: "center",
    textTransform: 'capitalize',
  },
  text1: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: '3%',
    textTransform: 'capitalize',
  },
  text_forget: {
    color: 'black',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '7%',
    marginTop: '3%',
    textTransform: 'capitalize',
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
    padding: 13,
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
  logoImage: {
    alignSelf: 'center',
    height: '10%',
    width: '50%',
    marginTop: '20%',
  },
  splitter: {
    flexDirection: 'row',
    marginTop: 30,
  },
  splitterLeftLine: {
    alignSelf: 'center',
    width: '45%',
    height: 1,
    backgroundColor: 'silver',
  },
  splitterRightLine: {
    alignSelf: 'center',
    width: '45%',
    height: 1,
    backgroundColor: 'silver',
  },
  splitterText: {
    margin: 10,
    color: 'gray',
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
)(login);
