import React from 'react';
import {Text, View, ImageBackground, ScrollView, Alert} from 'react-native';
import {Button} from 'native-base';
import Footer from '../com/footer';
import OptionBG from '../../asset/img/productOptions.png';
import {SwitchOn, SwitchOff, LocationWhite, EmptyGlass} from '../com/svg-files';
import {styles} from './styles/bag.styles';
import {connect} from 'react-redux';
import {addToBag, clearBag} from '../../redux/store/store.actions';
import {selectUserToken} from '../../redux/user/user.selectors';
import {jsonBeautify} from 'beautify-json';

const _defz = require('../com/def');

class Bag extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      packInBorrowBags: false,
      returnBorrows: false,
      bag: [],
      activeVendorBag: 0,
      activeBag: 1,
      totalPrice: 0,
      fulfillment: '',
      addressID: 0,
      vendorID: 0,
      fulfillmentInfo: '',
      activeCart: '',
    };
  }

  componentDidMount() {
    this.setState({
      bag: this.props.bag,
      activeCart: this.props.bag[0],
    });
  }

  async getFulfillmentInfo() {
    try {
      await _defz
        .send(
          `user/bag/vendor/info/${
            this.state.activeCart.vendorID
          }?fulfillment=${this.state.activeCart.fulfillment.toLowerCase()}&address_id=${
            this.state.activeCart.addressID
          }`,
          'GET',
          this.props.token,
        )
        .then(response => {
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
    console.log(this.state.bag);
    return (
      <View style={styles.container}>
        <View style={styles.bag}>
          <View style={styles.bagHeading}>
            <View style={styles.top}>
              <Text style={styles.bagHeadingTitle}>
                {this.state.fulfillmentInfo
                  ? this.state.fulfillmentInfo.vendor_info.name
                  : null}
              </Text>
              <View style={styles.paginationActive}>
                <View style={styles.paginationSmallBoxActive} />
                <Text style={styles.paginationTextActive}>
                  {this.state.activeBag}
                </Text>
              </View>
            </View>
            <View style={styles.headingBottom}>
              <ImageBackground
                style={styles.optionBackground}
                source={OptionBG}>
                <View style={styles.optionRow}>
                  <Text style={styles.headingText}>
                    Pack order in BorrowBags?
                  </Text>
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
              </ImageBackground>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.contentHeading}>
              <View style={styles.contentHeadingLeft}>
                <LocationWhite />
                <Text style={styles.contentHeadingLeftText}>Delivery to</Text>
              </View>
              <Text style={styles.contentHeadingRigthText}>£6.06</Text>
            </View>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{alignItems: 'center'}}>
              {this.state.bag.length
                ? this.state.bag[this.state.activeBag - 1].cart.map(
                    (card, idx = 1) => {
                      return (
                        <View
                          style={
                            idx % 2 === 0 ? styles.bagCard : styles.bagCardBg
                          }>
                          <View style={styles.bagCardLeft}>
                            <Text style={styles.title}>
                              {card.product.name}
                            </Text>
                            <Text style={styles.subTtitle}>
                              {card.selectedOption.label}
                            </Text>
                            {card.orderType ? (
                              <Text style={styles.subTtitle}>
                                {card.orderType}
                              </Text>
                            ) : null}
                          </View>
                          <View style={styles.bagCardRigth}>
                            <View style={styles.cardImage}>
                              <EmptyGlass
                                width={_defz.width / 9}
                                height={_defz.height / 10}
                              />
                            </View>
                            <View style={styles.counter}>
                              <Button transparent style={styles.counterButton}>
                                <Text style={styles.counterButtonText}>-</Text>
                              </Button>
                              <Text style={styles.quantity}>
                                {card.quantity}
                              </Text>
                              <Button transparent style={styles.counterButton}>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bag);
