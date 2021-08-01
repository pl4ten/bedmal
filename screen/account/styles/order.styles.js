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
    paddingLeft: _defz.width / 20,
    paddingRight: _defz.width / 20,
  },
  cardTitle: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
    marginLeft: _defz.width / 15,
  },
  count: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
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
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  infoText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
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
  cardLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  statusBox: {
    width: '85%',
    backgroundColor: '#fff',
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: _defz.height / 50,
    paddingTop: '4%',
  },
  statusBoxText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
    color: '#707070',
  },
  statusPink: {
    backgroundColor: '#E03174',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  statusOrange: {
    backgroundColor: '#F79F28',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  statusGreen: {
    backgroundColor: '#08D18C',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  statusBlack: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  cardPrice: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
  },
  cancelBtn: {
    alignSelf: 'center',
    marginTop: _defz.height / 70,
  },
  cancelBtnText: {
    fontFamily: 'FuturaPT-Medium',
    color: '#3D80F2',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  modalTitle: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
    color: '#E03174',
  },
  modalButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: _defz.height / 30,
  },
  yesText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
    color: '#C3BCBC',
  },
  noText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
    color: '#707070',
  },
});