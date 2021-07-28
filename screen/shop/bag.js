import React from 'react';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import {Button} from 'native-base';
import Footer from '../com/footer';
import OptionBG from '../../asset/img/productOptions.png';
import {SwitchOn, SwitchOff, LocationWhite, EmptyGlass} from '../com/svg-files';
import {styles} from './styles/bag.styles';
import {connect} from 'react-redux';
import {addToBag, clearBag} from '../../redux/store/store.actions';
import {selectUserToken} from '../../redux/user/user.selectors';
import {selectBagItems} from '../../redux/store/store.selectors';

import {jsonBeautify} from 'beautify-json';
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
    };
  }

  componentDidMount() {
    this.setState({bag: this.props.bag});
  }
  render() {
    console.log(jsonBeautify(this.state.bag));
    return (
      <View style={styles.container}>
        <View style={styles.bag}>
          <View style={styles.bagHeading}>
            <View style={styles.top}>
              <Text style={styles.bagHeadingTitle}>
                Starbucks of Belsize Park
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
                <Text style={styles.contentHeadingLeftText}>
                  Delivery to 19b…NW3 4DU
                </Text>
              </View>
              <Text style={styles.contentHeadingRigthText}>£6.06</Text>
            </View>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{alignItems: 'center'}}>
              {this.state.bag
                ? this.state.bag.map((item, idx = 1) =>
                    item.productInCart.map(card => {
                      return (
                        <View
                          style={
                            idx % 2 === 0 ? styles.bagCard : styles.bagCardBg
                          }>
                          <View style={styles.bagCardLeft}>
                            <Text style={styles.title}>
                              {card.product.name}
                            </Text>
                            <Text style={styles.subTtitle}>Large + 50p</Text>
                            <Text style={styles.subTtitle}>Extra Syrup</Text>
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
                    }),
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
              ? this.state.bag.map((item, idx) => (
                  <Button
                    transparent
                    style={[
                      this.state.activeBag === idx + 1
                        ? styles.paginationActive
                        : styles.pagination,
                      styles.paginationButton,
                    ]}
                    onPress={() =>
                      this.setState({
                        activeVendorBag: item.vendorID,
                        activeBag: idx + 1,
                      })
                    }>
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
                ))
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
  bag: selectBagItems(state),
});

const mapDispatchToProps = dispatch => ({
  addToBag: item => dispatch(addToBag(item)),
  clearBag: () => dispatch(clearBag()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bag);
