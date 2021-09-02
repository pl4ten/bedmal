import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  heading: {
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
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  headText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 16,
    color: '#707070',
  },
  headBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: -20,
    flexWrap: 'wrap',
  },
  main: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
  },
  mainTitle: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 30,
    color: '#000000',
  },
  bottom: {
    padding: 20,
  },
  scrollView: {
    width: '100%',
  },
  returned: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  returnedText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
    color: '#FFF',
    flex: 1,
  },
  returnedItems: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  returnedItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnedBag: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 25,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 500,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleNumber: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
  },
  returnedItemText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
    color: '#FFF',
  },
  borrowedNumber: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 35,
    color: '#000000',
    fontWeight: '100',
  },
});
