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
  cardLeft: {
    flex: 2,
  },
  cardRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  status: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: _defz.width / 4,
  },
  circleBlack: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
  },
  circleGreen: {
    width: 40,
    height: 40,
    backgroundColor: '#08D18C',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
  },
  circlePink: {
    width: 40,
    height: 40,
    backgroundColor: '#E03174',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
  },
  statusText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
    color: '#707070',
  },
});
