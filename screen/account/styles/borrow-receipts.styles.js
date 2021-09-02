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
    minHeight: _defz.height / 10,
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

  arrowBack: {
    flex: 1,
  },
  headerText: {
    color: 'gray',
    fontSize: 35,
    alignSelf: 'center',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: 'FuturaPT-Medium',
    flex: 3,
    marginLeft: "-18%",
  },
  headerContainer: {
    minHeight: _defz.height / 15,
    marginTop: _defz.height / 50,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: '2%',
  },
});
