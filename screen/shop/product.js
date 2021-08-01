import React, {Component} from 'react';
import {
  Text,
  View,
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
import {styles} from './styles/product.styles';
import {connect} from 'react-redux';
import {addToBag, clearBag} from '../../redux/store/store.actions';
import {selectUserToken} from '../../redux/user/user.selectors';
import {selectBagItems} from '../../redux/store/store.selectors';

import OptionsBG from '../../asset/img/productOptions.png';
import BorrowTrue from '../../asset/img/borrowTrue.png';
import AddedToBag from '../../asset/img/addedToBag.png';

let price;
let radio_props = [];

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
          // console.log(jsonBeautify(response));
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
    console.log('---------------bag Start---------------');
    console.log(jsonBeautify(this.props.bag));
    console.log('---------------bag End---------------');
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
              this.state.buyType ? this.handleAddToBag() : null;
            }}>
            {this.state.buyType ? <BuyButtonBlue /> : <BuyButton />}
          </Button>
          <Text style={styles.footerItemText}>Add to bag</Text>
        </View>
      </View>
    );
  }
  handleAddToBag() {
    if (this.props.bag.length >= 5) {
      Alert.alert('maximum bag');
    } else {
      let itemToAdd = {
        vendorID: this.state.vendorID,
        cart: [
          {
            product: this.state.product,
            quantity: this.state.quantity,
            addressID: this.state.selectedDeliveryAddres,
            buyType: this.state.buyType,
            price: this.state.finallPrice,
            orderType: this.state.orderType,
            packing: this.state.activePackingOption,
            selectedOption: this.state.selectedOption,
          },
        ],
      };
      this.props.addToBag(itemToAdd);
      this.setState({addedToBagModalVisible: true}, () => {
        setTimeout(() => {
          this.props.navigation.goBack();
        }, 1000);
      });
    }
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
              this.state.selectedDeliveryAddres
                ? this.setState({
                    buyType: 'Delivery',
                    modalVisible: false,
                    modalPickUp: false,
                    modalDelivery: false,
                    modalNewAddress: false,
                    packingOptions: true,
                  })
                : null
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
          <Button onPress={() => this.props.clearBag()}>
            <Text>clear</Text>
          </Button>
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
          {options
            ? options.map(item => {
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
                              finallPrice:
                                parseFloat(price) + parseFloat(value),
                            });
                            radio_props.forEach(item => {
                              if (
                                parseFloat(item.value) === parseFloat(value)
                              ) {
                                this.setState({selectedOption: item});
                              }
                            });
                          }}
                        />
                      </View>
                    </View>
                  </View>
                );
              })
            : null}

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
