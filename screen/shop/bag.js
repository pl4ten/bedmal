import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Button} from 'native-base';
import Footer from '../com/footer';
import OptionBG from '../../asset/img/productOptions.png';
import {SwitchOn, SwitchOff, LocationWhite, EmptyGlass} from '../com/svg-files';

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
    };
  }

  componentDidMount() {
    console.log(jsonBeautify(this.props.bag));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bag}>
          <View style={styles.bagHeading}>
            <View style={styles.top}>
              <Text style={styles.bagHeadingTitle}>
                Starbucks of Belsize Park
              </Text>
              <View style={styles.pagination}>
                <View style={styles.paginationSmallBox} />
                <Text style={styles.paginationText}>1</Text>
              </View>
            </View>
            <View style={styles.headingBottom}>
              <ImageBackground
                style={styles.optionBackground}
                source={OptionBG}>
                <View style={styles.optionRow}>
                  <Text>Pack order in BorrowBags?</Text>
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
                  <Text>Returning any Borrows?</Text>
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
              <View style={styles.bagCardBg}>
                <View style={styles.bagCardLeft}>
                  <Text>Espresso coffee </Text>
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
                    <Text>2</Text>
                    <Button transparent style={styles.counterButton}>
                      <Text style={styles.counterButtonText}>+</Text>
                    </Button>
                  </View>
                </View>
              </View>
              <View style={styles.bagCard}>
                <View style={styles.bagCardLeft}>
                  <Text>Espresso coffee </Text>
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
                    <Text>2</Text>
                    <Button transparent style={styles.counterButton}>
                      <Text style={styles.counterButtonText}>+</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.paginationContainer}>
          <Text style={{fontSize: 20}}>Bags</Text>
          <View style={styles.paginationContainerCenter}>
            <View style={styles.pagination}>
              <View style={styles.paginationSmallBox} />
              <Text style={styles.paginationText}>1</Text>
            </View>
            <View style={styles.pagination}>
              <View style={styles.paginationSmallBox} />
              <Text style={styles.paginationText}>2</Text>
            </View>
            <View style={styles.pagination}>
              <View style={styles.paginationSmallBox} />
              <Text style={styles.paginationText}>3</Text>
            </View>
            <View style={styles.pagination}>
              <View style={styles.paginationSmallBox} />
              <Text style={styles.paginationText}>4</Text>
            </View>
            <View style={styles.pagination}>
              <View style={styles.paginationSmallBox} />
              <Text style={styles.paginationText}>5</Text>
            </View>
          </View>
          <Text style={{fontSize: 15}}>£56.12</Text>
        </View>
        <Button transparent style={styles.checkOutButton}>
          <Text style={styles.checkOutButtonText}>Checkout</Text>
        </Button>
        <Footer navigation={this.props.navigation} route={'bag'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: _defz.width,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  bag: {
    height: '70%',
    borderRadius: 10,
    borderColor: '#C3BCBC',
    borderWidth: 1,
    elevation: 4,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '95%',
    marginTop: '5%',
  },
  bagHeading: {
    width: '100%',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  bagHeadingTitle: {
    color: '#3D80F2',
  },
  pagination: {
    width: 20,
    height: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C3BCBC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  paginationActive: {
    width: 20,
    height: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3D80F2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  paginationSmallBox: {
    width: 10,
    height: 4,
    backgroundColor: '#C3BCBC',
    borderWidth: 1,
    borderColor: '#C3BCBC',
    borderRadius: 10,
  },
  paginationSmallBoxActive: {
    width: 10,
    height: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3D80F2',
    borderRadius: 10,
  },
  paginationText: {
    color: '#C3BCBC',
  },
  paginationTextActive: {
    color: '#3D80F2',
  },
  headingBottom: {
    width: '100%',
  },
  optionBackground: {
    width: '100%',
    height: _defz.height / 9,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRow: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionRow2: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-2%',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentHeading: {
    width: '100%',
    backgroundColor: '#707070',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  contentHeadingLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentHeadingLeftText: {
    color: '#fff',
    marginLeft: '3%',
    fontSize: 15,
  },
  contentHeadingRigthText: {
    color: '#fff',
    fontSize: 18,
  },
  bagCard: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  bagCardBg: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '2%',
    paddingTop: '2%',
    paddingBottom: '2%',
    backgroundColor: '#fafafa',
  },
  bagCardRigth: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  counter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F0F0F0',
    elevation: 5,
    width: _defz.width / 4.5,
    height: _defz.height / 25,
    borderRadius: 10,
  },
  counterButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: _defz.width / 15,
    height: _defz.height / 25,
  },
  counterButtonText: {
    fontSize: 20,
  },
  cardImage: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C3BCBC',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: _defz.width / 8,
    height: _defz.height / 14,
    marginRight: '4%',
  },
  scrollView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: _defz.height / 2.5,
  },
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: _defz.height / 40,
  },
  paginationContainerCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
  },
  checkOutButton: {
    width: '90%',
    backgroundColor: '#3D80F2',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: _defz.height / 45,
    marginBottom: _defz.height / 45,
  },
  checkOutButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  subTtitle: {
    color: '#F79F28',
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
)(Bag);
