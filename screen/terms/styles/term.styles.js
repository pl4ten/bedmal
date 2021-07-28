import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  header: {
    width: '102%',
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 100,
  },
  heading: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  content: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  headerCloseIcon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    zIndex: 100,
  },
  headerButton: {
    alignSelf: 'flex-end',
    zIndex: 100,
  },
  scrollView: {
    paddingTop: 20,
    height: _defz.height / 1,
  },
  footer: {
    width: '100%',
    height: 90,
    zIndex: 99999,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  termContent: {
    textAlign: 'justify',
    width: '95%',
    paddingLeft: 5,
    flex: 1,
    backgroundColor: 'white',
  },
  termsText: {
    color: '#707070',
    fontSize: 16,
    width: '92%',
    alignSelf: 'center',
  },
});
