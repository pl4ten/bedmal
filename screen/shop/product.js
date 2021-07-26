import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import {
  BorrowCupSmall,
  BorrowCupLarge,
  SwitchOff,
  SwitchOn,
  EmptyGlass,
  Location,
  BuyButton,
  CheckButton,
  BuyButtonBlue,
} from '../com/svg-files';
import {Button, Icon} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import RadioForm from 'react-native-simple-radio-button';
import Loader from '../com/loader';

import {connect} from 'react-redux';
import {addToBag, clearBag} from '../../redux/store/store.actions';
import {selectUserToken} from '../../redux/user/user.selectors';
import {selectBagItems} from '../../redux/store/store.selectors';

import OptionsBG from '../../asset/img/productOptions.png';
import BorrowTrue from '../../asset/img/borrowTrue.png';
import AddedToBag from '../../asset/img/addedToBag.png';

var radio_props = [];
let price;

const {jsonBeautify} = require('beautify-json');
let _defz = require('../com/def');
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      borrowCop: false,
      modalPickUp: false,
      modalVisible: false,
      modalDelivery: false,
      packingOptions: false,
      modalNewAddress: false,
      addedToBagModalVisible: false,
      orderType: null,
      finallPrice: null,
      borrowPartnerCup: null,
      quantity: 1,
      vendorID: 0,
      selectedDeliveryAddres: 0,
      images: [],
      buyType: '',
      product: '',
      newAddress: '',
      fulfillment: '',
      selectedOption: '',
      serverDeliveryInfo: '',
      activePackingOption: '',
      newAddressPostalCode: '',
    };
  }

  async getProduct(id) {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          `user/store-front/product/info/${id}`,
          'GET',
          this.props.token,
        )
        .then(response => {
          // console.log(jsonBeautify(response));
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
            this.props.navigation.goBack();
            return false;
          }
          this.setState({
            product: response.product,
            finallPrice: response.product.price,
            fulfillment: response.fulfillment,
            borrowPartnerCup: response.vendor_info.borrow_partner_cup,
            vendorID: response.vendor_info.id,
            isLoading: false,
          });
          price = response.product.price;
          response.product.images.forEach(item => {
            this.state.images.push(`http://bedmal-core.aralstudio.top${item}`);
          });
          if (!this.state.images) {
            this.state.images.push(
              require('../../asset/img/bedmal-place-holder.jpg'),
            );
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async saveAdderss(address, postalCode) {
    let formData = new FormData();
    formData.append('address', address);
    formData.append('postal_code', postalCode);
    try {
      await _defz
        .send(
          'user/account/addresses/create',
          'POST',
          this.props.token,
          formData,
        )
        .then(response => {
          console.log(jsonBeautify(response));
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
            this.setState({
              modalVisible: true,
              modalPickUp: false,
              modalDelivery: false,
              modalNewAddress: true,
            });
          }
          if (response.status === 200) {
            this.getProduct(this.props.navigation.state.params.itemId);
            this.setState({
              modalVisible: true,
              modalPickUp: false,
              modalDelivery: false,
              modalNewAddress: false,
              newAddress: '',
              newAddressPostalCode: '',
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async getDeliveryInfo(productID, addressID) {
    try {
      await _defz
        .send(
          `user/store-front/product/info/${productID}/delivery-info/${addressID}`,
          'GET',
          this.props.token,
        )
        .then(response => {
          console.log(jsonBeautify(response));
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
          if (response.status === 200) {
            this.setState({
              serverDeliveryInfo: response.delivery,
              selectedDeliveryAddres: addressID,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    let itemID = this.props.navigation.state.params.itemId;
    this.getProduct(itemID);
    // console.log('---------------bag Start---------------');
    // console.log(jsonBeautify(this.props.bag));
    // console.log('---------------bag End---------------');
  }
  renderOptions(options) {
    options.map(item => {
      radio_props = [];
      return (
        <View>
          <Text style={styles.optionsTitle}>{item.title}</Text>
          <View style={styles.optionSize}>
            <View style={styles.radioButtons}>
              {item.values.forEach(val => {
                radio_props.push({
                  label: val.name,
                  value: val.price,
                });
              })}
              <RadioForm
                radio_props={radio_props}
                initial={null}
                onPress={value => {
                  this.setState({
                    finallPrice: parseFloat(price) + parseFloat(value),
                  });
                  radio_props.forEach(item => {
                    if (parseFloat(item.value) === parseFloat(value)) {
                      this.setState({selectedOption: item.label});
                    }
                  });
                }}
              />
            </View>
          </View>
        </View>
      );
    });
  }
  renderFooter() {
    const {pickup, delivery} = this.state.fulfillment;
    return (
      <View style={styles.productBuyFooter}>
        <View style={styles.footerItem}>
          <TextInput
            keyboardType={'number-pad'}
            value={String(this.state.quantity)}
            style={styles.footerItemInput}
            onChangeText={quantity => this.setState({quantity: quantity})}
          />
          <Text style={styles.footerItemText}>Quantity</Text>
        </View>
        <View style={styles.footerItem}>
          <Button
            transparent
            onPress={() =>
              pickup && delivery
                ? this.setState({modalVisible: true})
                : Alert.alert('No fulfillment')
            }
            style={styles.footerItemLocation}>
            {this.state.buyType ? (
              <Text style={styles.footerItemText}>{this.state.buyType}</Text>
            ) : (
              <Location />
            )}
          </Button>
          <Text style={styles.footerItemText}>Add to bag</Text>
        </View>
        <View style={styles.footerItem}>
          <Button
            transparent
            style={styles.footerItemBuy}
            onPress={() => {
              this.setState({addedToBagModalVisible: true}, () => {
                setTimeout(() => {
                  this.props.navigation.goBack();
                }, 1000);
              });
            }}>
            {this.state.buyType ? <BuyButtonBlue /> : <BuyButton />}
          </Button>
          <Text style={styles.footerItemText}>Add to bag</Text>
        </View>
      </View>
    );
  }
  handleAddToBag() {
    let itemToAdd = {
      vendorID: this.state.vendorID,
      productInCart: [
        {
          product: this.state.product,
          quantity: this.state.quantity,
          addressID: this.state.selectedDeliveryAddres,
          buyType: this.state.buyType,
          price: this.state.finallPrice,
          orderType: this.state.orderType,
        },
      ],
    };
    this.props.addToBag(itemToAdd);
  }
  renderPickUpModal() {
    const {pickup} = this.state.fulfillment;
    return (
      <View style={{width: '100%'}}>
        <View style={styles.pickupHeading}>
          <Text>{pickup.vendor_name}</Text>
          <Text>{pickup.vendor_address}</Text>
          <Text>{pickup.vendor_postal_code}</Text>
        </View>
        <View style={styles.pickupInfo}>
          <Text style={styles.pickupInfoTitle}>
            {pickup.pickup_info.data.estimated_time}
          </Text>
          <View style={styles.workTimes}>
            <View style={styles.workTime}>
              <Text style={styles.workTimeText}>Monday</Text>
              <Text style={styles.workTimeText}>
                {pickup.vendor_opening_hours.mon.join('-')}
              </Text>
            </View>
            <View style={styles.workTime}>
              <Text style={styles.workTimeText}>Tuesday</Text>
              <Text style={styles.workTimeText}>
                {pickup.vendor_opening_hours.tue.join('-')}
              </Text>
            </View>
            <View style={styles.workTime}>
              <Text style={styles.workTimeText}>Wednesday</Text>
              <Text style={styles.workTimeText}>
                {pickup.vendor_opening_hours.wed.join('-')}
              </Text>
            </View>
            <View style={styles.workTime}>
              <Text style={styles.workTimeText}>Thursday</Text>
              <Text style={styles.workTimeText}>
                {pickup.vendor_opening_hours.thu.join('-')}
              </Text>
            </View>
            <View style={styles.workTime}>
              <Text style={styles.workTimeText}>Friday</Text>
              <Text style={styles.workTimeText}>
                {pickup.vendor_opening_hours.fri.join('-')}
              </Text>
            </View>
            <View style={styles.workTime}>
              <Text style={styles.workTimeText}>Saturday</Text>
              <Text style={styles.workTimeText}>
                {pickup.vendor_opening_hours.sat.join('-')}
              </Text>
            </View>
            <View style={styles.workTime}>
              <Text style={styles.workTimeText}>Sunday</Text>
              <Text style={styles.workTimeText}>
                {pickup.vendor_opening_hours.sun.join('-')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.pickupOptionsContainer}>
          <Text style={{marginLeft: '7%'}}>Available options</Text>
          <ImageBackground
            source={OptionsBG}
            style={styles.modalOptionBackground}>
            <View style={styles.pickupOptions}>
              {this.state.fulfillment.pickup.pickup_info
                .return_borrow_products === 1 ? (
                <View style={styles.pickupOption}>
                  <Icon
                    name="check"
                    type="AntDesign"
                    style={styles.checkButton}
                  />
                  <Text>Return BorrowBags</Text>
                </View>
              ) : (
                <View style={styles.pickupOption}>
                  <Icon
                    name="close"
                    type="AntDesign"
                    style={styles.checkButton}
                  />
                  <Text>Return BorrowBags</Text>
                </View>
              )}
              {this.state.fulfillment.pickup.pickup_info.pack_in_borrow_bags ===
              1 ? (
                <View style={styles.pickupOption}>
                  <Icon
                    name="check"
                    type="AntDesign"
                    style={styles.checkButton}
                  />
                  <Text>Packed in BorrowBags</Text>
                </View>
              ) : (
                <View style={styles.pickupOption}>
                  <Icon
                    name="close"
                    type="AntDesign"
                    style={styles.checkButton}
                  />
                  <Text>Packed in BorrowBags</Text>
                </View>
              )}
            </View>
          </ImageBackground>
        </View>

        <Button
          transparent
          onPress={() =>
            this.setState({
              buyType: 'Pick Up',
              modalVisible: false,
              modalPickUp: false,
              modalDelivery: false,
              modalNewAddress: false,
              packingOptions: true,
            })
          }
          style={styles.acceptModalButton}>
          <CheckButton />
        </Button>
      </View>
    );
  }
  renderDeliveryModal() {
    const {delivery} = this.state.fulfillment;
    return (
      <View style={{marginTop: 15, width: '100%'}}>
        <Text>Pick a delivery address</Text>
        <View style={{marginTop: 15, width: '100%'}}>
          {delivery ? (
            <ScrollView
              style={styles.scrollViewH}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {delivery.addresses.map(item => (
                <Button
                  style={[
                    styles.addressCart2,
                    this.state.selectedDeliveryAddres === item.id
                      ? styles.activeAddress
                      : null,
                  ]}
                  transparent
                  onPress={() =>
                    this.getDeliveryInfo(this.state.product.id, item.id)
                  }>
                  <View>
                    <Text
                      style={[
                        styles.addressCartText,
                        this.state.selectedDeliveryAddres === item.id
                          ? styles.activeAddressText
                          : null,
                      ]}>
                      {item.address}
                    </Text>
                    <Text
                      style={[
                        styles.addressCartText,
                        this.state.selectedDeliveryAddres === item.id
                          ? styles.activeAddressText
                          : null,
                      ]}>
                      {item.postal_code}
                    </Text>
                  </View>
                </Button>
              ))}
            </ScrollView>
          ) : null}
          <Button
            transparent
            onPress={() =>
              this.setState({
                modalNewAddress: true,
                modalPickUp: false,
                modalDelivery: false,
              })
            }>
            <Text style={styles.modalNewAddresButton}>Enter a new address</Text>
          </Button>
          {this.state.serverDeliveryInfo ? (
            this.state.serverDeliveryInfo.type === 'nationwide_delivery' ? (
              <View style={styles.deliveryInfo}>
                <Text style={styles.serverDeliveryInfoTitle}>
                  {this.state.serverDeliveryInfo.title}
                </Text>
                <View style={styles.serverDeliveryInfoRow}>
                  <Text style={styles.serverDeliveryInfoRowTitle}>Est.</Text>
                  <Text style={styles.serverDeliveryInfoRowText}>
                    {
                      this.state.serverDeliveryInfo.data
                        .nationwide_delivery_time
                    }
                  </Text>
                </View>
                <View style={styles.serverDeliveryInfoRow}>
                  <Text style={styles.serverDeliveryInfoRowTitle}>Cost:</Text>
                  <Text style={styles.serverDeliveryInfoRowText}>
                    {'£' +
                      this.state.serverDeliveryInfo.data.nationwide_cost +
                      '- free for orders over £' +
                      this.state.serverDeliveryInfo.data.nationwide_free_over}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.deliveryInfo}>
                <Text style={styles.serverDeliveryInfoTitle}>
                  {this.state.serverDeliveryInfo.title}
                </Text>
                <View style={styles.serverDeliveryInfoRow}>
                  <Text style={styles.serverDeliveryInfoRowTitle}>Est.</Text>
                  <Text style={styles.serverDeliveryInfoRowText}>
                    {this.state.serverDeliveryInfo.data.local_delivery_time}
                  </Text>
                </View>
                <View style={styles.serverDeliveryInfoRow}>
                  <Text style={styles.serverDeliveryInfoRowTitle}>Cost:</Text>
                  <Text style={styles.serverDeliveryInfoRowText}>
                    {'£' +
                      this.state.serverDeliveryInfo.data.local_cost +
                      '- free for orders over £' +
                      this.state.serverDeliveryInfo.data.local_free_over}
                  </Text>
                </View>
              </View>
            )
          ) : null}

          <ImageBackground
            source={OptionsBG}
            style={styles.modalOptionBackground}>
            <View style={styles.deliveryPickupOptions}>
              <View style={styles.pickupOption}>
                <Icon
                  name={
                    this.state.serverDeliveryInfo.return_borrow_products === 1
                      ? 'check'
                      : 'close'
                  }
                  type="AntDesign"
                  style={[styles.checkButton, styles.optionText]}
                />
                <Text style={styles.optionText}>
                  Return BorrowCups & BorrowBags
                </Text>
              </View>
              <View style={styles.pickupOption}>
                <Icon
                  name={
                    this.state.serverDeliveryInfo.pack_in_borrow_bags === 1
                      ? 'check'
                      : 'close'
                  }
                  type="AntDesign"
                  style={[styles.checkButton, styles.optionText]}
                />
                <Text style={styles.optionText}>Packed in BorrowBags</Text>
              </View>
            </View>
          </ImageBackground>
          <Button
            transparent
            onPress={() =>
              this.setState({
                buyType: 'Delivery',
                modalVisible: false,
                modalPickUp: false,
                modalDelivery: false,
                modalNewAddress: false,
                packingOptions: true,
              })
            }
            style={styles.acceptModalButtonDelivery}>
            <CheckButton />
          </Button>
        </View>
      </View>
    );
  }
  renderPackingOptions() {
    return (
      <View style={styles.packingOptionsContainer}>
        <Text style={styles.packingOptionsTitle}>Options</Text>
        <View style={styles.packingOptionsContent}>
          <Text style={styles.packingOptionsHead}>Choose your packaging *</Text>
          <View style={styles.packingOptions}>
            <Button
              transparent
              style={
                this.state.activePackingOption === 'Own cup'
                  ? styles.packingOptionActive
                  : styles.packingOption
              }
              onPress={() => this.setState({activePackingOption: 'Own cup'})}>
              <Text
                style={
                  this.state.activePackingOption === 'Own cup'
                    ? styles.packingOptionTextActive
                    : styles.packingOptionText
                }>
                Own cup
              </Text>
              <Text
                style={
                  this.state.activePackingOption === 'Own cup'
                    ? styles.packingOptionGreenActive
                    : styles.packingOptionGreen
                }>
                Green
              </Text>
            </Button>
            <Button
              transparent
              style={
                this.state.activePackingOption === 'BorrowCup'
                  ? styles.packingOptionActive
                  : styles.packingOption
              }
              onPress={() => this.setState({activePackingOption: 'BorrowCup'})}>
              <Text
                style={
                  this.state.activePackingOption === 'BorrowCup'
                    ? styles.packingOptionTextActive
                    : styles.packingOptionText
                }>
                BorrowCup
              </Text>
              <Text
                style={
                  this.state.activePackingOption === 'BorrowCup'
                    ? styles.packingOptionGreenActive
                    : styles.packingOptionGreen
                }>
                Green
              </Text>
            </Button>
            <Button
              transparent
              style={
                this.state.activePackingOption === 'Single-use'
                  ? styles.packingOptionActive
                  : styles.packingOption
              }
              onPress={() =>
                this.setState({activePackingOption: 'Single-use'})
              }>
              <Text
                style={
                  this.state.activePackingOption === 'Single-use'
                    ? styles.packingOptionTextActive
                    : styles.packingOptionText
                }>
                Single-use
              </Text>
              <Text
                style={
                  this.state.activePackingOption === 'Single-use'
                    ? styles.packingOptionWasteActive
                    : styles.packingOptionWaste
                }>
                Waste
              </Text>
            </Button>
          </View>
          <Text style={styles.packingOptionsFooterText}>
            BorrowCups are free.
          </Text>
          <View style={styles.packingOptionsFooter}>
            <Text style={styles.packingOptionsFooterText}>
              Return to any participating store within 5 days.
            </Text>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Terms')}>
              <Text style={styles.packingOptionsFooterLink}>Read Terms</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
  renderNewAddressModal() {
    return (
      <View style={styles.newAddressContainer}>
        <Text style={{marginTop: '3%'}}>Enter address</Text>
        <TextInput
          style={styles.modalTextInput}
          onChangeText={text => this.setState({newAddress: text})}
          value={this.state.newAddress}
          placeholder={'enter address'}
        />
        <TextInput
          style={styles.modalTextInput}
          onChangeText={text => this.setState({newAddressPostalCode: text})}
          value={this.state.newAddressPostalCode}
          placeholder={'enter postal code'}
        />
        <Button
          transparent
          onPress={() =>
            this.saveAdderss(
              this.state.newAddress,
              this.state.newAddressPostalCode,
            )
          }>
          <Text style={styles.modalNewAddresButton}>Save address</Text>
        </Button>
      </View>
    );
  }
  render() {
    const {name, description, sections, options} = this.state.product;
    const {pickup} = this.state.fulfillment;
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <View style={styles.productContainer}>
        <ScrollView>
          <View style={styles.header}>
            <Button
              transparent
              style={styles.headerButton}
              onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="closecircleo"
                type="AntDesign"
                style={styles.headerCloseIcon}
              />
            </Button>
            <SliderBox
              ImageComponent={Image}
              images={this.state.images}
              sliderBoxHeight={_defz.height / 3}
              dotColor={'#fff'}
              resizeMethod={'resize'}
              resizeMode={'cover'}
              style={styles.sliderImages}
            />
          </View>

          <View style={styles.productInfo}>
            <View style={styles.infoRowOne}>
              <View>
                <Text style={styles.productTitle}>{name}</Text>
                <Text style={styles.productSubTitle}>{description}</Text>
              </View>
              <View>
                <Text style={styles.productPrice}>
                  £{this.state.finallPrice}
                </Text>
              </View>
            </View>
            {sections
              ? sections.map(item => (
                  <View style={styles.rowInfo}>
                    <Text style={styles.infoTitle}>{item.title}</Text>
                    <Text style={styles.infoSubTitle}>{item.description}</Text>
                  </View>
                ))
              : null}
          </View>

          {this.state.borrowPartnerCup ? (
            <View>
              <Text style={styles.optionsTitle}>Options</Text>
              <View style={styles.options}>
                {this.state.borrowCop ? (
                  <ImageBackground
                    source={BorrowTrue}
                    style={styles.optionBackgroundTrue}>
                    <View style={styles.BorrowTrueHeading}>
                      <Text style={styles.optionsTitleText}>
                        In a free BorrowCup?
                      </Text>
                      <Button
                        transparent
                        style={styles.borrowCopButtonTrue}
                        onPress={() =>
                          this.setState({
                            borrowCop: !this.state.borrowCop,
                          })
                        }>
                        {this.state.borrowCop ? <SwitchOn /> : <SwitchOff />}
                      </Button>
                    </View>
                    <View style={styles.BorrowTrueContent}>
                      <Button
                        onPress={() =>
                          this.setState({orderType: 'lid_sleeve_up'})
                        }
                        transparent
                        style={[
                          styles.BorrowTrueSelectButtons,
                          this.state.orderType === 'lid_sleeve_up'
                            ? styles.typeSelected
                            : null,
                        ]}>
                        <BorrowCupLarge />
                        <Text style={styles.BorrowTrueContentText}>
                          lid + sleeve + cup
                        </Text>
                      </Button>
                      <Button
                        onPress={() => this.setState({orderType: 'sleeve_up'})}
                        transparent
                        style={[
                          styles.BorrowTrueSelectButtons,
                          this.state.orderType === 'sleeve_up'
                            ? styles.typeSelected
                            : null,
                        ]}>
                        <BorrowCupLarge />
                        <Text style={styles.BorrowTrueContentText}>
                          sleeve + cup
                        </Text>
                      </Button>
                      <Button
                        transparent
                        style={[
                          styles.BorrowTrueSelectButtons,
                          this.state.orderType === 'cup_only'
                            ? styles.typeSelected
                            : null,
                        ]}
                        onPress={() => this.setState({orderType: 'cup_only'})}>
                        <EmptyGlass
                          width={_defz.width / 7}
                          height={_defz.height / 8}
                        />
                        <Text style={styles.BorrowTrueContentText}>
                          cup only
                        </Text>
                      </Button>
                    </View>
                  </ImageBackground>
                ) : (
                  <ImageBackground
                    source={OptionsBG}
                    style={styles.optionBackgroundFalse}>
                    <Text style={styles.optionsTitleText}>
                      In a free BorrowCup?
                    </Text>
                    <BorrowCupSmall />
                    <Button
                      transparent
                      style={styles.borrowCopButtonFalse}
                      onPress={() =>
                        this.setState({
                          borrowCop: !this.state.borrowCop,
                        })
                      }>
                      {this.state.borrowCop ? <SwitchOn /> : <SwitchOff />}
                    </Button>
                  </ImageBackground>
                )}
              </View>
            </View>
          ) : null}

          {/* render packing options */}
          {this.state.packingOptions ? this.renderPackingOptions() : null}

          {/* render options */}
          {options ? this.renderOptions(options) : null}

          <View style={{marginTop: 120}} />
        </ScrollView>
        {this.renderFooter()}
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false});
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalButtons}>
                  {pickup ? (
                    <Button
                      transparent
                      onPress={() =>
                        this.setState({
                          modalPickUp: true,
                          modalDelivery: false,
                          modalNewAddress: false,
                        })
                      }
                      style={[
                        styles.modalButton,
                        this.state.modalPickUp ? styles.activeButton : null,
                      ]}>
                      <Text
                        style={
                          this.state.modalPickUp ? styles.activeText : null
                        }>
                        Pick Up
                      </Text>
                    </Button>
                  ) : null}
                  <Button
                    transparent
                    onPress={() =>
                      this.setState({
                        modalDelivery: true,
                        modalPickUp: false,
                        modalNewAddress: false,
                      })
                    }
                    style={[
                      styles.modalButton,
                      this.state.modalDelivery ? styles.activeButton : null,
                    ]}>
                    <Text
                      style={
                        this.state.modalDelivery ? styles.activeText : null
                      }>
                      Delivery
                    </Text>
                  </Button>
                </View>
                {/* Render PickUp modal info */}
                {this.state.modalPickUp ? (
                  this.state.fulfillment ? (
                    <View style={{width: '100%'}}>
                      {pickup ? this.renderPickUpModal() : null}
                    </View>
                  ) : null
                ) : null}
                {/* Render Delivery modal info */}
                {this.state.modalDelivery
                  ? this.state.fulfillment
                    ? this.renderDeliveryModal()
                    : null
                  : null}
                {this.state.modalNewAddress
                  ? this.renderNewAddressModal()
                  : null}
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.addedToBagModalVisible}
            onRequestClose={() => {
              this.setState({addedToBagModalVisible: false});
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalViewBag}>
                <Image source={AddedToBag} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    elevation: 5,
  },
  optionBackgroundTrue: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 300,
    elevation: 5,
    paddingTop: 30,
  },
  BorrowTrueContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  BorrowTrueSelectButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '75%',
    borderRadius: 10,
    width: '26%',
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
    marginTop: _defz.height / 70,
    marginLeft: 30,
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productBuyFooter: {
    width: '90%',
    height: _defz.height / 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 30,
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
    width: '20%',
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
  modalViewBag: {
    width: '90%',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    position: 'relative',
  },
  modalButtons: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalButton: {
    borderColor: '#707070',
    borderWidth: 1,
    padding: '4%',
    borderRadius: 40,
    height: 32,
  },
  activeButton: {
    borderColor: '#3D80F2',
  },
  activeText: {
    color: '#3D80F2',
  },
  pickupHeading: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupInfo: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupInfoTitle: {
    fontSize: 17,
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
  },
  pickupOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '4%',
  },
  pickupOptions: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  checkButton: {
    fontSize: 20,
  },
  pickupOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    minWidth: _defz.width / 10,
  },
  addressCartText: {
    maxWidth: '80%',
    color: '#707070',
  },
  activeAddress: {
    borderColor: '#3D80F2',
    borderWidth: 1,
  },
  activeAddressText: {
    color: '#000',
  },
  modalOptionBackground: {
    width: '100%',
    height: _defz.height / 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#707070',
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
  },
  serverDeliveryInfoRowTitle: {
    color: '#C3BCBC',
    fontSize: 16,
  },
  serverDeliveryInfoRowText: {
    fontSize: 15,
    fontWeight: '100',
    marginLeft: '1%',
  },
  deliveryPickupOptions: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
    minHeight: _defz.height / 11,
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
    minHeight: _defz.height / 11,
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
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
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
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
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
const mapStateToProps = state => ({
  token: selectUserToken(state),
  bag: selectBagItems(state),
});

const mapDispatchToProps = dispatch => ({
  addToBag: item => dispatch(addToBag(item)),
  clearBag: () => dispatch(clearBag()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);
