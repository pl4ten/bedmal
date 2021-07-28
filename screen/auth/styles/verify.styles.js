import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
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
