import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  termsContainer: {
    width: '100%',
    height: '100%',
  },
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
  scrollViewContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    paddingTop: 20,
  },
  cardItem: {
    marginTop: 20,
    height: 60,
  },
  footer: {
    width: '100%',
    height: 90,
    zIndex: 99999,
    marginTop: 'auto',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
