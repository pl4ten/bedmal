import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
  },
  card: {
    marginTop: _defz.height / 50,
    minHeight: _defz.height / 10,
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
