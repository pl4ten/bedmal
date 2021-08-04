import React from 'react';
import {Text, View, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import Footer from '../com/footer';
import OptionBG from '../../asset/img/productOptions.png';
import {
  SwitchOn,
  SwitchOff,
  LocationWhite,
  EmptyGlass,
  LidSleeveCup,
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

const _defz = require('../com/def');

class Bag extends React.Component {
  constructor() {
    super();
    this.state = {
      packInBorrowBags: false,
      returnBorrows: true,
      bag: [],
      activeVendorBag: 0,
      activeBag: 1,
      totalPrice: 0,
      addressID: 0,
      fulfillmentInfo: '',
      activeCart: '',
      isLoading: false,
    };
  }
  getBag = () => {
    this.setState(
      {
        bag: [],
        activeCart: '',
        isLoading: true,
      },
      () => {
        this.setState({
          bag: this.props.bag,
          activeCart: this.props.bag[0],
          isLoading: false,
          activeBag: 1,
          fulfillmentInfo: '',
        });
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
        this.setState({fulfillmentInfo: response});
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return this.state.isLoading ? null : (
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
                <View style={styles.optionRow}>
                  <View>
                    <Text style={styles.headingText}>
                      Pack order in BorrowBags?
                    </Text>
                    {this.state.packInBorrowBags ? (
                      <Text style={styles.headingText2}>
                        5-days to return to any partner store, free. As few bags
                        as possible will be used. 20p per bag cleaning fee.
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
                        packInBorrowBags: !this.state.packInBorrowBags,
                      })
                    }>
                    {this.state.packInBorrowBags ? <SwitchOn /> : <SwitchOff />}
                  </Button>
                </View>
                <View style={styles.optionRow2}>
                  <Text style={styles.headingText}>Returning any Borrows?</Text>
                  <Button
                    transparent
                    onPress={() =>
                      this.setState({
                        returnBorrows: !this.state.returnBorrows,
                      })
                    }>
                    {this.state.returnBorrows ? <SwitchOn /> : <SwitchOff />}
                  </Button>
                </View>
                {this.state.returnBorrows ? (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooter}>
                        <Text style={styles.borrowItemFooterText}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooterWarn}>
                        <Text style={styles.borrowItemFooterTextWarn}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooter}>
                        <Text style={styles.borrowItemFooterText}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooterWarn}>
                        <Text style={styles.borrowItemFooterTextWarn}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooter}>
                        <Text style={styles.borrowItemFooterText}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooterWarn}>
                        <Text style={styles.borrowItemFooterTextWarn}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooter}>
                        <Text style={styles.borrowItemFooterText}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooterWarn}>
                        <Text style={styles.borrowItemFooterTextWarn}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooter}>
                        <Text style={styles.borrowItemFooterText}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooterWarn}>
                        <Text style={styles.borrowItemFooterTextWarn}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooter}>
                        <Text style={styles.borrowItemFooterText}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.borrowItem}>
                      <LidSleeveCup
                        width={_defz.width / 5}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.borrowItemText}>
                        lid + sleeve + cup
                      </Text>
                      <View style={styles.borrowItemFooterWarn}>
                        <Text style={styles.borrowItemFooterTextWarn}>
                          2 days left
                        </Text>
                      </View>
                    </TouchableOpacity>
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
              <Text style={styles.contentHeadingRigthText}>£6.06</Text>
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
                            index % 2 === 0 ? styles.bagCard : styles.bagCardBg
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
                            ) : (
                              <View style={styles.cardImage}>
                                <EmptyGlass
                                  width={_defz.width / 9}
                                  height={_defz.height / 10}
                                />
                              </View>
                            )}

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
                                <Text style={styles.counterButtonText}>-</Text>
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
                                <Text style={styles.counterButtonText}>+</Text>
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
                          () => this.getFulfillmentInfo(),
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
        <Button transparent style={styles.checkOutButton}>
          <Text style={styles.checkOutButtonText}>Checkout</Text>
        </Button>
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
