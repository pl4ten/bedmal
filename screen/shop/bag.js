import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Button} from 'native-base';
import Footer from '../com/footer';
import {
  SwitchOn,
  SwitchOff,
  LocationWhite,
  EmptyGlass,
  LidSleeveCup,
  BagImg,
  SleeveCup,
} from '../com/svg-files';
import {styles} from './styles/bag.styles';
import {connect} from 'react-redux';
import {
  addToBag,
  clearBag,
  quantityUpper,
  quantityDowner,
  deleteBag,
} from '../../redux/store/store.actions';
import {selectUserToken} from '../../redux/user/user.selectors';
import {jsonBeautify} from 'beautify-json';
import axios from 'axios';
import Loader from '../com/loader';

const _defz = require('../com/def');
class Bag extends React.Component {
  constructor() {
    super();
    this.state = {
      packInBorrowBags: false,
      returnBorrows: false,
      bag: [],
      activeVendorBag: 0,
      activeBag: 1,
      totalPrice: 0,
      addressID: 0,
      fulfillmentInfo: '',
      activeCart: '',
      isLoading: false,
      borrowed_items: '',
      returnBorrowIdz: [],
      deliveryCost: 0,
      freeDeliveryCostOver: 0,
      goToPay: false,
    };
  }
  getBag = () => {
    this.setState(
      {
        bag: [],
        activeCart: '',
        isLoading: true,
        totalPrice: 0,
      },
      () => {
        this.setState(
          {
            bag: this.props.bag,
            activeCart: this.props.bag[this.state.activeBag - 1],
            isLoading: false,
            activeBag: this.state.activeBag,
            fulfillmentInfo: '',
          },
          () => {
            this.getFulfillmentInfo();
            this.sumPrice();
          },
        );
      },
    );
  };
  componentDidMount() {
    this.getBag;
    this.listener = this.props.navigation.addListener('didFocus', this.getBag);
  }
  UNSAFE_componentWillReceiveProps() {
    this.getBag();
  }
  quantityUpper(bagIndex, productIndex) {
    this.props.quantityUpper({bagIndex: bagIndex, productIndex: productIndex});
  }
  quantityDowner(bagIndex, productIndex) {
    this.props.quantityDowner({bagIndex: bagIndex, productIndex: productIndex});
    this.getBag;
  }
  bagDeleteHandler() {
    this.props.deleteBag(this.state.activeBag - 1);
    this.getBag;
  }
  sumPrice() {
    let totalPrice = 0;
    this.state.activeCart
      ? this.state.activeCart.products.forEach(item => {
          totalPrice += parseFloat(item.price) * item.quantity;
        })
      : null;
    this.setState({totalPrice: totalPrice});
  }
  async getFulfillmentInfo() {
    try {
      let activeCart = this.state.activeCart;
      let url;
      if (activeCart.buyType === 'delivery') {
        url = `user/bag/vendor/info/${
          activeCart.vendorID
        }?fulfillment=delivery&address_id=${activeCart.addressID}`;
      } else {
        url = `user/bag/vendor/info/${activeCart.vendorID}?fulfillment=pickup `;
      }
      await _defz.send(url, 'GET', this.props.token).then(response => {
        // console.log(jsonBeautify(response));
        if (response.status === 400) {
          Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
            cancelable: true,
          });
        }
        if (response.fulfilment.type === 'nationwide_delivery') {
          this.setState({
            fulfillmentInfo: response,
            deliveryCost: response.fulfilment.data.nationwide_cost,
            freeDeliveryCostOver: response.fulfilment.data.nationwide_free_over,
          });
        } else if (response.fulfilment.type === 'local_delivery') {
          this.setState({
            fulfillmentInfo: response,
            deliveryCost: response.fulfilment.data.local_cost,
            freeDeliveryCostOver: response.fulfilment.data.local_cost,
          });
        } else {
          this.setState({
            fulfillmentInfo: response,
            deliveryCost: -1,
            freeDeliveryCostOver: -1,
          });
        }
        this.getReturnBorrows();
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getReturnBorrows() {
    try {
      await _defz
        .send('user/bag/borrowed-items', 'GET', this.props.token)
        .then(response => {
          // console.log(jsonBeautify(response));
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
          if (response.status === 200) {
            this.setState({borrowed_items: response.borrowed_items});
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async checkOut() {
    if (!this.props.bag.length && !this.state.activeCart) {
      Alert.alert('Error', 'bag is empty!', [{text: 'ok'}], {
        cancelable: true,
      });
      return 0;
    }
    this.setState({goToPay: true});
    let products = [];

    this.state.activeCart.products.map(item => {
      if (item.selectedOption.label) {
        products.push({
          borrow_cup: item.orderType,
          options: [
            {title: item.optionTitle, value: item.selectedOption.label},
          ],
          product_count: item.quantity,
          product_id: item.product.id,
        });
      } else {
        products.push({
          borrow_cup: item.orderType,
          options: [],
          product_count: item.quantity,
          product_id: item.product.id,
        });
      }
    });
    const formData = new FormData();

    if (this.state.fulfillmentInfo.fulfilment.type === 'pickup') {
      formData.append('fulfillment', 'pickup');
    } else {
      formData.append('fulfillment', 'delivery');
      formData.append('address_id', this.state.activeCart.addressID);
    }
    formData.append('vendor_info_id', this.state.activeCart.vendorID);
    formData.append('borrow_bag', this.state.packInBorrowBags ? 1 : 0);
    formData.append('products', JSON.stringify(products));
    formData.append(
      'return_borrows',
      JSON.stringify(this.state.returnBorrowIdz),
    );
    console.log(formData);
    await axios({
      url: 'https://www.bedmal-core.aralstudio.top/api/user/bag/checkout',
      method: 'POST',
      headers: {Authorization: 'Bearer ' + this.props.token},
      data: formData,
    })
      .then(responseJson => {
        this.setState({goToPay: false});
        if (responseJson.data.status === 200) {
          Linking.openURL(responseJson.data.url);
          // this.props.deleteBag(this.state.activeBag - 1);
        } else {
          Alert.alert(
            'Error',
            responseJson.response.data.errors[0].error,
            [{text: 'ok'}],
            {
              cancelable: true,
            },
          );
        }
      })
      .catch(r => {
        this.setState({goToPay: false});
        Alert.alert('Error', r.response.data.errors[0].error, [{text: 'ok'}], {
          cancelable: true,
        });
      });
  }
  handleBorrowItemsAdd(id) {
    let newIdz = [...this.state.returnBorrowIdz];

    if (newIdz.includes(id)) {
      newIdz.splice(newIdz.indexOf(id), 1);

      this.setState({
        returnBorrowIdz: newIdz,
      });
    } else {
      newIdz.push(id);
      newIdz = [...new Set(newIdz)];

      this.setState({
        returnBorrowIdz: newIdz,
      });
    }
  }
  timeDetector(date) {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        {this.state.isLoading ? null : this.state.goToPay ? (
          <Loader />
        ) : (
          <ScrollView>
            <View style={styles.container}>
              <Button
                style={styles.bagDeleteButton}
                transparent
                onPress={() => this.bagDeleteHandler()}>
                <Text style={styles.bagDeleteButtonText}>delete</Text>
              </Button>
              <View style={styles.bag}>
                <View style={styles.bagHeading}>
                  <View style={styles.top}>
                    <Text style={styles.bagHeadingTitle}>
                      {this.state.fulfillmentInfo
                        ? this.state.fulfillmentInfo.vendor_info.name
                        : null}
                    </Text>
                    {this.state.bag.length ? (
                      <View style={styles.paginationActive}>
                        <View style={styles.paginationSmallBoxActive} />
                        <Text style={styles.paginationTextActive}>
                          {this.state.activeBag}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.headingBottom}>
                    <View style={styles.optionBackground}>
                      {this.state.fulfillmentInfo.borrow_partner_bag === 1 ? (
                        <>
                          <View style={styles.optionRow}>
                            <View>
                              <Text style={styles.headingText}>
                                Pack order in BorrowBags?
                              </Text>
                              {this.state.packInBorrowBags ? (
                                <Text style={styles.headingText2}>
                                  5-days to return to any partner store, free.
                                  As few bags as possible will be used. 20p per
                                  bag cleaning fee.
                                  <Text
                                    style={{color: '#3D80F2'}}
                                    onPress={() =>
                                      this.props.navigation.navigate('Terms')
                                    }>
                                    See full terms
                                  </Text>
                                </Text>
                              ) : null}
                            </View>

                            <Button
                              transparent
                              onPress={() =>
                                this.setState({
                                  packInBorrowBags: !this.state
                                    .packInBorrowBags,
                                })
                              }>
                              {this.state.packInBorrowBags ? (
                                <SwitchOn />
                              ) : (
                                <SwitchOff />
                              )}
                            </Button>
                          </View>
                        </>
                      ) : null}
                      <View style={styles.optionRow2}>
                        <Text style={styles.headingText}>
                          Returning any Borrows?
                        </Text>
                        <Button
                          transparent
                          onPress={() =>
                            this.setState({
                              returnBorrows: !this.state.returnBorrows,
                            })
                          }>
                          {this.state.returnBorrows ? (
                            <SwitchOn />
                          ) : (
                            <SwitchOff />
                          )}
                        </Button>
                      </View>
                      {this.state.returnBorrows ? (
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          {this.state.borrowed_items
                            ? this.state.borrowed_items.map(item => {
                                if (item.combo === 'cup_sleeve_lid') {
                                  return (
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.handleBorrowItemsAdd(item.id)
                                      }
                                      activeOpacity={1}
                                      style={
                                        this.state.returnBorrowIdz.includes(
                                          item.id,
                                        )
                                          ? styles.borrowItemActive
                                          : styles.borrowItem
                                      }>
                                      <LidSleeveCup
                                        width={_defz.width / 5}
                                        height={_defz.height / 10}
                                      />
                                      <Text style={styles.borrowItemText}>
                                        lid + sleeve + cup
                                      </Text>
                                      <View style={styles.borrowItemFooter}>
                                        <Text
                                          style={styles.borrowItemFooterText}>
                                          {this.timeDetector(
                                            item.due.slice(0, 10),
                                          )}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  );
                                } else if (item.combo === 'cup_sleeve') {
                                  return (
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.handleBorrowItemsAdd(item.id)
                                      }
                                      activeOpacity={1}
                                      style={
                                        this.state.returnBorrowIdz.includes(
                                          item.id,
                                        )
                                          ? styles.borrowItemActive
                                          : styles.borrowItem
                                      }>
                                      <SleeveCup
                                        width={_defz.width / 5}
                                        height={_defz.height / 10}
                                      />
                                      <Text style={styles.borrowItemText}>
                                        sleeve + cup
                                      </Text>
                                      <View style={styles.borrowItemFooter}>
                                        <Text
                                          style={styles.borrowItemFooterText}>
                                          {this.timeDetector(
                                            item.due.slice(0, 10),
                                          )}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  );
                                } else if (item.combo === 'cup') {
                                  return (
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.handleBorrowItemsAdd(item.id)
                                      }
                                      activeOpacity={1}
                                      style={
                                        this.state.returnBorrowIdz.includes(
                                          item.id,
                                        )
                                          ? styles.borrowItemActive
                                          : styles.borrowItem
                                      }>
                                      <EmptyGlass
                                        width={_defz.width / 5}
                                        height={_defz.height / 10}
                                      />
                                      <Text style={styles.borrowItemText}>
                                        cup
                                      </Text>
                                      <View style={styles.borrowItemFooter}>
                                        <Text
                                          style={styles.borrowItemFooterText}>
                                          {this.timeDetector(
                                            item.due.slice(0, 10),
                                          )}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  );
                                } else if (item.combo === 'bag') {
                                  return (
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.handleBorrowItemsAdd(item.id)
                                      }
                                      activeOpacity={1}
                                      style={
                                        this.state.returnBorrowIdz.includes(
                                          item.id,
                                        )
                                          ? styles.borrowItemActive
                                          : styles.borrowItem
                                      }>
                                      <BagImg
                                        width={_defz.width / 5}
                                        height={_defz.height / 10}
                                      />
                                      <Text style={styles.borrowItemText}>
                                        bag
                                      </Text>
                                      <View style={styles.borrowItemFooter}>
                                        <Text
                                          style={styles.borrowItemFooterText}>
                                          {this.timeDetector(
                                            item.due.slice(0, 10),
                                          )}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  );
                                }
                              })
                            : null}
                        </ScrollView>
                      ) : null}
                    </View>
                  </View>
                </View>

                <View style={styles.content}>
                  <View style={styles.contentHeading}>
                    <View style={styles.contentHeadingLeft}>
                      <LocationWhite />
                      {this.state.bag.length ? (
                        this.state.bag[this.state.activeBag - 1].buyType ===
                        'delivery' ? (
                          <Text style={styles.contentHeadingLeftText}>
                            Delivery to{' '}
                            {this.state.fulfillmentInfo.address
                              ? this.state.fulfillmentInfo.address.address
                              : null}
                          </Text>
                        ) : (
                          <Text style={styles.contentHeadingLeftText}>
                            Collection
                          </Text>
                        )
                      ) : null}
                    </View>
                    {this.state.deliveryCost !== -1 ? (
                      <Text style={styles.contentHeadingRigthText}>
                        {this.state.totalPrice > this.state.freeDeliveryCostOver
                          ? 'free'
                          : `£ ${this.state.deliveryCost}`}
                      </Text>
                    ) : null}
                  </View>
                  <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{alignItems: 'center'}}>
                    {this.state.bag.length
                      ? this.state.bag[this.state.activeBag - 1].products.map(
                          (product, index) => {
                            return (
                              <View
                                key={index}
                                style={
                                  index % 2 === 0
                                    ? styles.bagCard
                                    : styles.bagCardBg
                                }>
                                <View style={styles.bagCardLeft}>
                                  <Text style={styles.title}>
                                    {product.product.name}
                                  </Text>
                                  <Text style={styles.subTtitle}>
                                    {product.selectedOption.label}
                                  </Text>
                                  {product.orderType ? (
                                    <Text style={styles.subTtitle}>
                                      {product.orderType}
                                    </Text>
                                  ) : null}
                                </View>
                                <View style={styles.bagCardRigth}>
                                  {product.packing ? (
                                    <Text style={styles.productPacking}>
                                      {product.packing}
                                    </Text>
                                  ) : null}

                                  <View style={styles.counter}>
                                    <Button
                                      transparent
                                      style={styles.counterButton}
                                      onPress={() => {
                                        this.quantityDowner(
                                          this.state.activeBag - 1,
                                          index,
                                        );
                                        this.forceUpdate();
                                      }}>
                                      <Text style={styles.counterButtonText}>
                                        -
                                      </Text>
                                    </Button>
                                    <Text style={styles.quantity}>
                                      {product.quantity}
                                    </Text>
                                    <Button
                                      transparent
                                      style={styles.counterButton}
                                      onPress={() => {
                                        this.quantityUpper(
                                          this.state.activeBag - 1,
                                          index,
                                        );
                                        this.forceUpdate();
                                      }}>
                                      <Text style={styles.counterButtonText}>
                                        +
                                      </Text>
                                    </Button>
                                  </View>
                                </View>
                              </View>
                            );
                          },
                        )
                      : null}
                  </ScrollView>
                </View>
              </View>
              <View style={styles.paginationContainer}>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'FuturaPT-Medium',
                    color: '#707070',
                  }}>
                  Bags
                </Text>
                <View style={styles.paginationContainerCenter}>
                  {this.state.bag
                    ? this.state.bag.map((item, idx) => {
                        return (
                          <Button
                            key={idx}
                            transparent
                            style={[
                              this.state.activeBag === idx + 1
                                ? styles.paginationActive
                                : styles.pagination,
                              styles.paginationButton,
                            ]}
                            onPress={() => {
                              this.setState(
                                {
                                  activeVendorBag: item.vendorID,
                                  activeBag: idx + 1,
                                  activeCart: item,
                                },
                                () => {
                                  this.getFulfillmentInfo();
                                  this.sumPrice();
                                },
                              );
                            }}>
                            <View
                              style={
                                this.state.activeBag === idx + 1
                                  ? styles.paginationSmallBoxActive
                                  : styles.paginationSmallBox
                              }
                            />
                            <Text
                              style={
                                this.state.activeBag === idx + 1
                                  ? styles.paginationTextActive
                                  : styles.paginationText
                              }>
                              {idx + 1}
                            </Text>
                          </Button>
                        );
                      })
                    : null}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'FuturaPT-Medium',
                    color: '#707070',
                  }}>
                  £{this.state.totalPrice}
                </Text>
              </View>
              <Button
                transparent
                onPress={() => this.checkOut()}
                style={styles.checkOutButton}>
                <Text style={styles.checkOutButtonText}>Checkout</Text>
              </Button>
            </View>
          </ScrollView>
        )}
        <Footer navigation={this.props.navigation} route={'bag'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
  bag: state.store.bag,
});

const mapDispatchToProps = dispatch => ({
  addToBag: item => dispatch(addToBag(item)),
  clearBag: () => dispatch(clearBag()),
  quantityUpper: indexes => dispatch(quantityUpper(indexes)),
  quantityDowner: indexes => dispatch(quantityDowner(indexes)),
  deleteBag: index => dispatch(deleteBag(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bag);
