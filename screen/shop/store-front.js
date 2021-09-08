import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Modal,
  ImageBackground,
} from 'react-native';
import {Button, Icon} from 'native-base';
import {styles} from './styles/store-front.styles';
import {
  ArrowBack,
  Massage,
  Info,
  HomeInActive,
  BagInActive,
  SearchBox,
  Bag2,
} from '../com/svg-files';

import ProductCard from './product-card';
import OptionsBG from '../../asset/img/productOptions.png';
import smallLogo from '../../asset/img/small-logo.png';
import Loader from '../com/loader';

import {selectUserToken} from '../../redux/user/user.selectors';
import {selectBagItems} from '../../redux/store/store.selectors';
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
      vendorID: 0,
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
            console.log(response.vendor_info);
          }
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
        });
    } catch (error) {
      Alert.alert(
        'Error',
        'error in store data.',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.goBack(),
            style: 'OK',
          },
        ],
        {
          cancelable: false,
        },
      );
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
      Alert.alert(
        'Error',
        'error in product data.',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.goBack(),
            style: 'OK',
          },
        ],
        {
          cancelable: false,
        },
      );
      console.log(error);
    }
  }
  componentDidMount() {
    this.setState({vendorID: this.props.navigation.state.params.id}, () => {
      this.getStoreFront(this.state.vendorID);
    });
  }
  componentWillUnmount() {
    this.setState({});
  }

  render() {
    let vendorID = this.props.navigation.state.params.id;
    console.log(this.props.bag.length);
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
            <Text style={styles.vendorName}>{this.state.vendorInfo.name}</Text>
          </View>
          <View style={styles.headerRigth}>
            <Button
              transparent
              onPress={() => this.setState({modalVisible: true})}>
              <Info width={_defz.width / 20} height={_defz.height / 20} />
            </Button>
            <Button
              transparent
              style={styles.msgButton}
              onPress={() =>
                this.props.navigation.navigate('chat_one', {
                  id: vendorID,
                  type: 'vendor_id',
                  name: this.state.vendorInfo.name,
                })
              }>
              <Massage width={_defz.width / 12} height={_defz.height / 5} />
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
                        : styles.text
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
            <View style={{height: 200}} />
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
          {this.props.bag.length > 0 ? (
            <View style={styles.homeButtonWithBadge}>
              <View style={styles.badgeCircle} />
              <Button
                style={styles.homeButton}
                transparent
                onPress={() => this.props.navigation.navigate('bag', {x: 1})}>
                <Bag2 />
              </Button>
            </View>
          ) : (
            <Button
              style={styles.homeButton}
              transparent
              onPress={() => this.props.navigation.navigate('bag', {x: 1})}>
              <BagInActive />
            </Button>
          )}
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
                      <Text style={styles.styles_names}>
                        {this.state.vendorInfo.name}
                      </Text>
                      <Text style={styles.styles_names2}>
                        {this.state.vendorInfo.address}{' '}
                        {this.state.vendorInfo.postal_code}
                      </Text>
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
const mapStateToProps = state => ({
  token: selectUserToken(state),
  bag: selectBagItems(state),
});
export default connect(mapStateToProps)(StoreFront);
