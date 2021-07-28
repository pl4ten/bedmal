import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  b1: {
    alignSelf: 'center',
    marginTop: 'auto',
    height: 60,
    borderRadius: 15,
    bottom: 30,
    color: '#3D80F2',
    backgroundColor: '#3D80F2',
    width: '85%',
    justifyContent: 'center',
  },
  textb1: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    textTransform: 'capitalize',
  },
  b2: {
    alignSelf: 'center',
    marginTop: 20,
    height: 60,
    borderRadius: 15,
    bottom: 30,
    backgroundColor: 'white',
    width: '85%',
    justifyContent: 'center',
  },
  textb2: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '35%',
    alignSelf: 'center',
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '3%',
    alignSelf: 'center',
  },
  splashImage: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  logoImage: {
    alignSelf: 'center',
    height: '10%',
    width: '50%',
    marginTop: '20%',
  },
});
