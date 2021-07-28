import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
  },
  headerXbutton: {
    alignSelf: 'flex-end',
    marginTop: _defz.height / 50,
  },
  headerXIcon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    margin: 5,
  },
  container: {
    backgroundColor: '#FAFAFA',
    marginTop: '3%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addressCard: {
    borderColor: '#707070',
    borderWidth: 1,
    elevation: 6,
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 10,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    position: 'relative',
    marginTop: 10,
  },
  activeCard: {
    borderColor: '#3D80F2',
    borderWidth: 3,
    elevation: 6,
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 10,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    position: 'relative',
    marginTop: 10,
  },
  closeEditButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeEditButtonIcon: {
    color: '#707070',
  },
  scrollView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: _defz.height / 3.33,
  },
  addressCardFooter: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2%',
    borderRadius: 10,
    elevation: 6,
    height: 50,
    paddingTop: 10,
    marginTop: _defz.height / 30,
  },
  addressCardFooterButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#707070',
    height: _defz.height / 30,
    backgroundColor: '#fff',
  },
  addressCardFooterButtonEdit: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#707070',
    height: _defz.height / 30,
    backgroundColor: '#C3BCBC',
  },
  addressCardFooterTextEdit: {
    color: '#fff',
    position: 'relative',
  },
  primaryButton: {
    borderColor: '#3D80F2',
    backgroundColor: '#fff',
  },
  primaryText: {
    color: '#3D80F2',
  },
  addressCardFooterText: {
    color: '#C3BCBC',
  },
  activeEditButton: {
    borderColor: '#fff',
    backgroundColor: '#3D80F2',
    borderRadius: 50,
    borderWidth: 1,
    height: _defz.height / 30,
  },
  activePrimaryButton: {
    borderColor: '#3D80F2',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    height: _defz.height / 30,
  },
  activeEditText: {
    color: '#fff',
  },
  textInput: {
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
  },
  addresText: {
    fontSize: 15,
  },
  notPrimaryConainer: {
    position: 'relative',
  },
  footerButtonXIcon: {
    fontSize: 25,
    color: 'silver',
    position: 'relative',
    left: _defz.width / 30,
  },
});
