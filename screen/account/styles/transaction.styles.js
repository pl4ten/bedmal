import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  main: {
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
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
  },
  card: {
    marginTop: 20,
    minHeight: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

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
  info: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  infoText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
    marginVertical: 5,
  },
  infoTextBlue: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#3D80F2',
  },
  infoTextAddress: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
    maxWidth: _defz.width / 1.5,
  },
  infoRight: {
    marginLeft: _defz.width / 30,
  },
});
