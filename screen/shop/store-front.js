import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Modal,
  ImageBackground,
} from 'react-native';
import {Button, Icon} from 'native-base';

import {
  ArrowBack,
  Massage,
  Info,
  HomeInActive,
  BagInActive,
  SearchBox,
} from '../com/svg-files';

import ProductCard from './product-card';
import OptionsBG from '../../asset/img/productOptions.png';
import smallLogo from '../../asset/img/small-logo.png';
import Loader from '../com/loader';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';

let _defz = require('../com/def');
const {jsonBeautify} = require('beautify-json');

class StoreFront extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: [],
      products: [],
      searchText: '',
      vendorInfo: '',
      modalVisible: false,
      selectedCollection: 0,
      isLoading: false,
    };
  }

  async getStoreFront(vendorId) {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          `user/store-front/info/${vendorId}`,
          'GET',
          this.props.token,
        )
        .then(response => {
          // console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({
              collections: response.collections,
              selectedCollection: response.default_collection.id,
              products: response.products,
              vendorInfo: response.vendor_info,
              isLoading: false,
            });
          }
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async getStoreFrontByCollection(vendorId, collectionId) {
    try {
      await _defz
        .get_via_token(
          `user/store-front/info/${vendorId}/products/${collectionId}`,
          'GET',
          this.props.token,
        )
        .then(response => {
          console.log(response);
          this.setState({isLoading: false});
          if (response.status === 200) {
            this.setState({products: response.products});
          }
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    let vendorID = this.props.navigation.state.params.id;
    this.getStoreFront(vendorID);
  }

  render() {
    let vendorID = this.props.navigation.state.params.id;
    return !this.state.isLoading ? (
      <View style={styles.sotreFront}>
        <View style={styles.header}>
          <Button
            transparent
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}>
            <ArrowBack />
          </Button>
          <View>
            <Text>{this.state.vendorInfo.name}</Text>
          </View>
          <View style={styles.headerRigth}>
            <Button
              transparent
              onPress={() => this.setState({modalVisible: true})}>
              <Info />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('chat_one', {
                  id:vendorID,
                  type: 'vendor_id',
                })
              }>
              <Massage />
            </Button>
          </View>
        </View>

        <View style={styles.types}>
          <ScrollView
            style={styles.scrollViewH}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}>
            {this.state.collections.map(item => (
              <Button
                transparent
                onPress={() => {
                  this.setState(
                    {
                      selectedCollection: item.id,
                      products: [],
                    },
                    () => {
                      this.getStoreFrontByCollection(
                        vendorID,
                        this.state.selectedCollection,
                      );
                    },
                  );
                }}>
                <View
                  style={
                    this.state.selectedCollection === item.id
                      ? styles.active
                      : styles.cart
                  }>
                  <Text
                    style={
                      this.state.selectedCollection === item.id
                        ? styles.activeText
                        : null
                    }>
                    {item.name}
                  </Text>
                </View>
              </Button>
            ))}
          </ScrollView>
        </View>

        <View style={styles.productCards}>
          <ScrollView
            style={styles.scrollViewV}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            <View style={styles.products}>
              {this.state.products.map(item => (
                <ProductCard
                  new={item.new}
                  name={item.name}
                  price={item.price}
                  img={item.images[0]}
                  id={item.id}
                  navigation={this.props.navigation}
                />
              ))}
            </View>
            <View style={{height: _defz.height / 4}} />
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <Button
            style={styles.homeButton}
            transparent
            onPress={() => this.props.navigation.navigate('home')}>
            <HomeInActive />
          </Button>
          <Button
            transparent
            style={styles.searchBoxButton}
            onPress={() =>
              this.props.navigation.navigate('searchProduct', {
                vendorID: vendorID,
              })
            }>
            <SearchBox />
          </Button>
          <Button
            style={styles.homeButton}
            transparent
            onPress={() => this.props.navigation.navigate('bag')}>
            <BagInActive />
          </Button>
        </View>
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
                <Button
                  transparent
                  style={styles.modalCloseButton}
                  onPress={() => this.setState({modalVisible: false})}>
                  <Icon
                    name="closecircleo"
                    type="AntDesign"
                    style={styles.modalCloseIcon}
                  />
                </Button>
                {this.state.vendorInfo ? (
                  <View>
                    <View style={styles.pickupHeading}>
                      <Text>{this.state.vendorInfo.name}</Text>
                      <Text>{this.state.vendorInfo.address}</Text>
                      <Text>{this.state.vendorInfo.postal_code}</Text>
                    </View>
                    <View style={styles.pickupInfo}>
                      <View style={styles.workTimes}>
                        <View style={styles.workTime}>
                          <Text style={styles.workTimeText}>Monday</Text>
                          <Text style={styles.workTimeText}>
                            {this.state.vendorInfo.opening_hours.mon.join('-')}
                          </Text>
                        </View>
                        <View style={styles.workTime}>
                          <Text style={styles.workTimeText}>Tuesday</Text>
                          <Text style={styles.workTimeText}>
                            {this.state.vendorInfo.opening_hours.tue.join('-')}
                          </Text>
                        </View>
                        <View style={styles.workTime}>
                          <Text style={styles.workTimeText}>Wednesday</Text>
                          <Text style={styles.workTimeText}>
                            {this.state.vendorInfo.opening_hours.wed.join('-')}
                          </Text>
                        </View>
                        <View style={styles.workTime}>
                          <Text style={styles.workTimeText}>Thursday</Text>
                          <Text style={styles.workTimeText}>
                            {this.state.vendorInfo.opening_hours.thu.join('-')}
                          </Text>
                        </View>
                        <View style={styles.workTime}>
                          <Text style={styles.workTimeText}>Friday</Text>
                          <Text style={styles.workTimeText}>
                            {this.state.vendorInfo.opening_hours.fri.join('-')}
                          </Text>
                        </View>
                        <View style={styles.workTime}>
                          <Text style={styles.workTimeText}>Saturday</Text>
                          <Text style={styles.workTimeText}>
                            {this.state.vendorInfo.opening_hours.sat.join('-')}
                          </Text>
                        </View>
                        <View style={styles.workTime}>
                          <Text style={styles.workTimeText}>Sunday</Text>
                          <Text style={styles.workTimeText}>
                            {this.state.vendorInfo.opening_hours.sun.join('-')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.optionsContainer}>
                      <View style={styles.modalOptionsHeading}>
                        <Image source={smallLogo} />
                        <Text>BorrowPartners for</Text>
                      </View>
                      <ImageBackground
                        source={OptionsBG}
                        style={styles.modalOptions}>
                        <View style={styles.pickupOption}>
                          {this.state.vendorInfo.borrow_partner_cup === 1 ? (
                            <Icon
                              name="check"
                              type="AntDesign"
                              style={[styles.checkButton, styles.optionText]}
                            />
                          ) : (
                            <Icon
                              name="close"
                              type="AntDesign"
                              style={[styles.checkButton, styles.optionText]}
                            />
                          )}

                          <Text style={styles.optionText}>BorrowCups</Text>
                        </View>
                        <View style={styles.pickupOption}>
                          {this.state.vendorInfo.borrow_partner_bag === 1 ? (
                            <Icon
                              name="check"
                              type="AntDesign"
                              style={[styles.checkButton, styles.optionText]}
                            />
                          ) : (
                            <Icon
                              name="close"
                              type="AntDesign"
                              style={[styles.checkButton, styles.optionText]}
                            />
                          )}
                          <Text style={styles.optionText}>BorrowBags</Text>
                        </View>
                      </ImageBackground>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    ) : (
      <Loader />
    );
  }
}

const styles = StyleSheet.create({
  sotreFront: {
    padding: '2%',
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '3%',
  },
  headerRigth: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoIcon: {
    marginRight: '2%',
  },
  backButton: {
    marginBottom: _defz.height / 80,
  },
  types: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  scrollViewH: {
    width: '100%',
  },
  productCards: {
    width: '100%',
    marginTop: '3%',
  },
  scrollViewV: {
    width: '100%',
    height: _defz.height / 1.1,
  },
  products: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '95%',
    alignSelf: 'center',
  },
  footer: {
    width: _defz.width,
    paddingLeft: 20,
    paddingRight: 20,
    height: _defz.height / 12,
    borderTopColor: '#C3BCBC',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  searchBoxButton: {
    marginTop: _defz.height / 60,
  },
  searchInput: {
    borderColor: '#707070',
    borderWidth: 1,
    width: '100%',
    borderRadius: 30,
    textAlign: 'center',
  },
  searchImage: {
    position: 'absolute',
    left: 20,
    bottom: 15,
  },
  homeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: _defz.height / 40,
  },
  cart: {
    borderRadius: 40,
    borderColor: '#C3BCBC',
    borderWidth: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: 5,
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: _defz.width / 3,
    elevation: 5,
    backgroundColor: '#fff',
  },
  active: {
    borderColor: '#3D80F2',
    borderRadius: 40,
    borderWidth: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: 5,
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: _defz.width / 3,
    elevation: 5,
    backgroundColor: '#fff',
  },
  activeText: {
    color: '#3D80F2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: 'relative',
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
  },
  pickupHeading: {
    marginTop: 10,
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
  modalCloseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  modalCloseIcon: {
    color: '#707070',
    fontSize: 30,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: _defz.height / 35,
  },
  modalOptionsHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOptions: {
    width: _defz.width,
    height: _defz.height / 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%',
  },
  pickupOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkButton: {
    fontSize: 20,
  },
  optionText: {
    color: '#000',
  },
});
const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(StoreFront);
