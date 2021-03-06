import {StyleSheet} from 'react-native';
let _defz = require('../../com/def');

export const styles = StyleSheet.create({
  productContainer: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
  },
  header: {
    width: '102%',
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
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
  sliderImages: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '101%',
    height: _defz.height / 3,
  },
  productInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: _defz.height / 2.5,
    paddingLeft: 30,
    paddingRight: 30,
  },
  infoRowOne: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 30,
    textTransform: 'capitalize',
  },
  productSubTitle: {
    color: '#707070',
    fontSize: 15,
    marginLeft: 5,
    fontFamily: 'FuturaPT-Book',
  },
  productPrice: {
    color: '#707070',
    fontSize: 20,
    fontFamily: 'FuturaPT-Book',
  },
  rowInfo: {
    marginTop: 15,
  },
  infoTitle: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 18,
  },
  infoSubTitle: {
    color: '#707070',
    fontSize: 16,
    fontFamily: 'FuturaPT-Book',
  },
  optionsTitle: {
    color: '#F79F28',
    paddingLeft: 30,
    marginTop: 50,
    fontFamily: 'FuturaPT-Medium',
    fontSize: 18,
  },
  optionsTitleText: {
    fontSize: 18,
    fontFamily: 'FuturaPT-Book',
    color: '#707070',
  },
  options: {
    width: '100%',
    position: 'relative',
  },
  optionBackgroundFalse: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    height: 100,
    elevation: 5,
  },
  optionBackgroundTrue: {
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    elevation: 5,
    marginLeft: 20,
    alignSelf: 'center',
  },
  BorrowTrueContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 3,
    marginLeft: '-6%',
  },
  BorrowTrueSelectButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 150,
    width: '24%',
    marginHorizontal: '1%',
  },
  optionsTip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionsTipText1: {
    fontFamily: 'FuturaPT-Medium',
    color: '#08D18C',
    fontSize: 14,
  },
  optionsTipText2: {
    fontFamily: 'FuturaPT-Book',
    color: '#3D80F2',
    fontSize: 14,
    marginLeft: 10,
  },
  typeSelected: {
    borderColor: '#3D80F2',
    borderWidth: 2,
  },
  completeBorrowCupImg: {
    width: '80%',
  },
  BorrowTrueContentText: {
    paddingLeft: 1,
    paddingRight: 1,
    fontSize: 14,
    fontFamily: 'FuturaPT-Book',
  },
  borrowCopButtonTrue: {
    marginTop: 5,
  },
  borrowCopButtonFalse: {
    marginTop: _defz.height / 30,
    marginLeft: 30,
  },
  optionSize: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 30,
    marginTop: 5,
  },
  BorrowTrueHeading: {
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  borrowSubtitle: {
    color: '#F79F28',
    fontFamily: 'FuturaPT-Medium',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  productBuyFooter: {
    width: '90%',
    height: _defz.height / 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 10,
    borderRadius: 10,
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerItemInput: {
    paddingBottom: 1,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 27,
    width: 100,
    fontFamily: 'FuturaPT-Medium',
    color: '#020202',
  },
  footerItemLocation: {
    paddingBottom: 10,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  footerItemBuy: {
    paddingBottom: 10,
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  footerItemText: {
    color: '#707070',
    fontFamily: 'FuturaPTLight',
    fontSize: 17,
  },
  radioButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    minHeight: 300,
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
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  modalViewBag: {
    width: '90%',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 25,
    marginVertical: 10,
  },
  modalButtons: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalButton: {
    borderColor: '#707070',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 40,
    height: 40,
  },
  activeButton: {
    borderColor: '#3D80F2',
  },
  activeText: {
    color: '#3D80F2',
    fontFamily: 'FuturaPT-Medium',
  },
  modalButtonText: {
    color: '#707070',
    fontFamily: 'FuturaPT-Medium',
  },
  pickupHeading: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styles_names: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 22,
    color: '#707070',
  },
  styles_names2: {
    fontFamily: 'FuturaPT',
    fontSize: 18,
    color: '#707070',
  },
  pickupInfo: {
    marginTop: '15%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupInfoTitle: {
    fontSize: 17,
    color: '#707070',
    fontFamily: 'FuturaPT-Medium',
  },
  workTimes: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workTime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: _defz.width / 2.5,
  },
  workTimeText: {
    color: '#707070',
    fontFamily: 'FuturaPT',
    marginLeft: -15,
  },
  workTimeText2: {
    color: '#707070',
    fontFamily: 'FuturaPT',
    marginRight: -20,
  },
  pickupOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '4%',
  },
  pickupOptions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  checkButton: {
    fontSize: 20,
    marginLeft: '15%',
  },
  pickupOption: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  pickupOption2: {
    flexDirection: 'row',
    marginTop: '1%',
  },
  scrollViewH: {
    width: '100%',
    padding: 5,
  },
  addressCart: {
    borderRadius: 40,
    borderColor: '#C3BCBC',
    borderWidth: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: 5,
    marginRight: 5,
  },
  checkIcon: {
    width: _defz.width / 5,
    height: _defz.height / 5,
  },
  modalNewAddresButton: {
    color: '#F79F28',
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#3D80F2',
    color: '#C3BCBC',
    width: _defz.width / 2,
    height: _defz.height / 15,
    padding: '5%',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginTop: '3%',
  },
  newAddressContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  addressCart2: {
    borderRadius: 10,
    borderColor: '#C3BCBC',
    borderWidth: 1,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 'auto',
    minHeight: _defz.height / 10,
    minWidth: 100,
  },
  addressCartText: {
    flex: 1,
    color: '#707070',
    fontFamily: 'FuturaPT-Book',
  },
  activeAddress: {
    borderColor: '#3D80F2',
    borderWidth: 1,
  },
  activeAddressText: {
    color: '#000',
  },
  deliveryOptionsTitle: {
    color: '#707070',
    fontFamily: 'FuturaPT-Book',
    fontSize: 14,
    marginTop: 20,
  },
  modalOptionBackground: {
    width: '110%',
    marginLeft: '-10%',
    height: _defz.height / 7,
  },
  optionText: {
    color: '#707070',
    fontFamily: 'FuturaPT-Medium',
    marginLeft: 10,
  },
  acceptModalButton: {
    position: 'relative',
    left: _defz.width / 25,
    top: _defz.height / 35,
    marginLeft: 'auto',
  },
  acceptModalButtonDelivery: {
    position: 'relative',
    left: _defz.width / 25,
    top: _defz.height / 35,
    marginLeft: 'auto',
  },
  serverDeliveryInfoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  serverDeliveryInfoTitle: {
    fontSize: 18,
    fontFamily: 'FuturaPT-Book',
  },
  serverDeliveryInfoRowTitle: {
    color: '#C3BCBC',
    fontSize: 18,
    fontFamily: 'FuturaPT-Book',
  },
  serverDeliveryInfoRowText: {
    fontSize: 18,
    fontWeight: '100',
    marginLeft: '1%',
    fontFamily: 'FuturaPT-Book',
    color: '#707070',
  },
  deliveryPickupOptions: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  packingOptionsContainer: {
    fontFamily: 'FuturaPT-Medium',
  },
  packingOptionsTitle: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 18,
    width: '90%',
    marginTop: _defz.height / 20,
    alignSelf: 'center',
  },
  packingOptionsContent: {
    width: '90%',
    padding: '2%',
    backgroundColor: '#FAFAFA',
    alignSelf: 'center',
    borderColor: '#707070',
    borderWidth: 0.1,
    borderRadius: 10,
  },
  packingOptionsHead: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 16,
    color: '#707070',
  },
  packingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1%',
    paddingRight: '1%',
    marginTop: _defz.height / 50,
    marginBottom: 10,
  },
  packingOption: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C3BCBC',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    position: 'relative',
    minHeight: 75,
  },
  packingOptionActive: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3D80F2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    position: 'relative',
    minHeight: 75,
  },
  packingOptionText: {
    color: '#707070',
    fontFamily: 'FuturaPT-Medium',
    fontSize: 14,
  },
  packingOptionTextActive: {
    color: '#3D80F2',
    fontFamily: 'FuturaPT-Medium',
    fontSize: 14,
  },
  packingOptionGreen: {
    position: 'absolute',
    bottom: 5,
    color: '#fff',
    backgroundColor: '#66B556',
    borderRadius: 40,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    fontSize: 14,
    fontFamily: 'FuturaPT-Medium',
  },
  packingOptionGreenActive: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: '#fff',
    backgroundColor: '#66B556',
    borderRadius: 40,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    fontSize: 14,
    fontFamily: 'FuturaPT-Medium',
  },
  packingOptionWaste: {
    position: 'absolute',
    bottom: 5,
    color: '#fff',
    backgroundColor: '#F2105E',
    borderRadius: 40,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    fontSize: 14,
    fontFamily: 'FuturaPT-Medium',
  },
  packingOptionWasteActive: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: '#fff',
    backgroundColor: '#F2105E',
    borderRadius: 40,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    fontSize: 14,
    fontFamily: 'FuturaPT-Medium',
  },
  packingOptionsFooterText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 14,
    color: '#707070',
  },
  packingOptionsFooterLink: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 14,
    color: '#3D80F2',
  },
  packingOptionsFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addedToBagModalContainer: {
    width: _defz.width,
    height: _defz.height,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    top: 0,
    left: 0,
    flex: 1,
    marginTop: 22,
  },
  addedToBagModal: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
