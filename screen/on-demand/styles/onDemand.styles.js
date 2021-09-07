import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#000',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#000',
  },
  content: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  mainScroll: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerXbutton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  headerXIcon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    margin: 5,
  },
  heading: {
    marginTop: 30,
  },
  title: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 40,
  },
  subTitle: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
    color: '#707070',
  },
  scrollViewH: {
    width: '100%',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#fff',
    width: 140,
    height: 265,
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  cardBorrowItemsText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 14,
    color: '#707070',
  },
  cardInfo: {
    marginTop: 10,
  },
  cardInfoTextTop: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 14,
    color: '#08D18C',
  },
  cardInfoTextBottom: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 13,
    color: '#E03174',
  },
  counter: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  counterButtonPlus: {
    fontSize: 45,
    color: '#707070',
  },
  counterButtonMines: {
    fontSize: 75,
    marginBottom: 10,
    color: '#707070',
  },
  count: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
    color: '#707070',
  },
  tip: {
    backgroundColor: '#F0F0F0',
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tipHead: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 16,
    color: '#707070',
  },
  tipTerms: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 16,
    color: '#3D80F2',
  },
  borrowBG: {
    width: '98%',
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  BorrowBGItems: {
    flexDirection: 'row',
  },
  BorrowBGItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BorrowBGItemText: {
    position: 'relative',
    bottom: 20,
    borderTopColor: '#C3BCBC',
    borderTopWidth: 1,
    fontSize: 25,
    width: _defz.width / 20,
    textAlign: 'center',
    color: '#707070',
    fontFamily: 'FuturaPT-Book',
  },
  noReturnsText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 40,
    color: '#707070',
  },
  forwardButton: {
    alignSelf: 'center',
  },
});
