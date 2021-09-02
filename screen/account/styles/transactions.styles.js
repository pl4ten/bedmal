import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  main: {
    backgroundColor: '#000',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  content: {
    backgroundColor: '#FAFAFA',
flex:1,
  },
  card: {
    marginTop: 20,
    minHeight: _defz.height / 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  heading: {
    width: '100%',
    backgroundColor: '#000',
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
  cardTitle: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 18,
    color: '#707070',
  },
  cardFooter: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 18,
    color: '#C3BCBC',
  },
});
