'use strict';
import React, {Component} from 'react';
import {View} from 'react-native';

import {StyleSheet, Image, TextInput,Alert} from 'react-native';
import {Button, Text} from 'native-base';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';
let _phone = '';
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
    formData.append('username', _phone);

    await _defz
      .send('user/forgot-password', 'POST', "0", formData)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        if (response.status === 200) {
          navigate("verify" , {data: _phone})
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
          <TextInput
            placeholder="  Enter Phone number"
            placeholderTextColor="silver"
            onChangeText={text => {
              _phone = text;
            }}
            maxLength={50}
            style={styles.textInput}
          />

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
    marginTop: _defz.height/3,
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
    padding: 15
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

export default forget;
