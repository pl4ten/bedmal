import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    marginTop: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  b1: {
    width: '47%',
    backgroundColor: '#F0F0F0',
    borderRadius: 9,
    elevation: 10,
    textTransform: 'capitalize',
    marginLeft: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_card: {
    color: 'gray',
    fontFamily: 'FuturaPT-Medium',
  },
  card: {
    marginTop: _defz.height / 50,
  },
  icon: {
    color: 'black',
    width: 30,
    height: 30,
    marginRight: '2%',
    marginTop: '2%',
    backgroundColor: 'white',
  },
  text1: {
    color: 'gray',
    fontSize: 40,
    alignSelf: 'center',
    marginTop: '5%',
    textTransform: 'capitalize',
    fontFamily: 'FuturaPT-Medium',
  },
  header: {
    backgroundColor: 'black',
  },
  headerXbutton: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  headerXIcon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    margin: 5,
  },
  headingRow: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: '3%',
    fontFamily: 'FuturaPT-Medium',
  },
  headingRowText: {
    color: '#4380F2',
    textTransform: 'capitalize',
    fontFamily: 'FuturaPT-Medium',
  },
});
