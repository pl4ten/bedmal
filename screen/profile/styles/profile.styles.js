import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  b1: {
    backgroundColor: '#C3BCBC',
    borderRadius: 30,
    elevation: 3,
    height: 30,
    textTransform: 'capitalize',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: 'flex-start',
    marginLeft: _defz.width / 40,
    width: '100%',
  },
  b2: {
    backgroundColor: '#3D80F2',
    borderRadius: 30,
    elevation: 3,
    height: 30,
    textTransform: 'capitalize',
  },
  text_card: {color: 'gray'},
  card: {
    borderRadius: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: _defz.height / 30,
    elevation: 5,
    height: _defz.height / 12,
    borderWidth: 1,
    borderColor: 'silver',
  },
  icon: {
    color: 'black',
    width: 30,
    height: 30,
    marginRight: '2%',
    marginTop: '2%',
    backgroundColor: 'white',
  },
  title: {
    color: 'gray',
    fontSize: 17,
    alignSelf: 'flex-start',

    textTransform: 'capitalize',
    fontFamily: 'FuturaPT-Medium',
  },
  text1: {
    color: '#000',
    fontSize: 15,
    fontWeight: '100',
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
    width: '120%',
    fontFamily: 'FuturaPT-Medium',
  },
  headerXbutton: {
    alignSelf: 'flex-end',
  },
  headerXicon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    margin: 5,
  },
  cardLeft: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'FuturaPT-Medium',
  },
  cardLeftLarge: {
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'FuturaPT-Medium',
  },
  editButton: {
    color: 'white',
    textTransform: 'capitalize',
  },
});
