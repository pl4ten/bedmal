import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Item,
  Button,
  Input,
  Icon,
  Header,
  Spinner,
  Card,
  CardItem,
} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import AsyncStorage from '@react-native-community/async-storage';
let logedin = '0';
var Footers = require('../com/footer').default;
import MapboxGL, {MarkerView} from '@react-native-mapbox-gl/maps';
const heights = Dimensions.get('screen').height;
const widths = Dimensions.get('screen').width;
import {PermissionsAndroid} from 'react-native';
let position = [53.4808, 2.2426];
let position2 = [53.4808, 2.2426];
import Loader from '../com/loader';
import ProductTypes from '../shop/product-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Keyboard} from 'react-native';
let _defz = require('../com/def');
let marker_count=1
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
);
MapboxGL.setTelemetryEnabled(false);
const Marker = ({coordinate, id, color, label}) => {
marker_count=marker_count+1
const xx=marker_count
  return coordinate[0] && coordinate[1] ? (

    <MarkerView coordinate={coordinate} id={id}>
      <View style={[styles.markerView, {}]} />
      <View>
        <Image
          width={25}
          height={25}
          source={require("../../asset/marker/"+ 1 +".png")}
        />
      </View>
    </MarkerView>
  ) : null;

};
class home extends Component {
  constructor() {
    super();

    this._renderModeOptions = [
      {
        label: 'Normal',
        data: 'normal',
      },
      {
        label: 'Native',
        data: 'native',
      },
      {
        label: 'Hidden',
        data: 'hidden',
      },
    ];

    this.state = {
      mapRef: null,
      loading_like: false,
      loading: false,
      acctive_shop: '',
      serach_txt: '',
      selected_btn: '',
      show_box: false,
      departments: null,
      selected_btn: '',
      vendors: null,
      position: {
        latitude: 53.4808,
        longitude: 2.2426,
      },
      centerCoordinate: [53.4808, 2.2426],
      renderMode: this._renderModeOptions[0].data,
      followUserLocation: true,
      showsUserHeadingIndicator: false,
    };

    this.onRenderModeChange = this.onRenderModeChange.bind(this);
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  onRenderModeChange(index, renderMode) {
    this.setState({renderMode});
  }
  gettoken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        if (value === '0') {
        } else {
          _defz._token = value;
          this.get_store('new');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  shop_selecter = async x => {
    if (this.state.acctive_shop == x) {
      this.setState({acctive_shop: ''});
    } else {
      this.setState({acctive_shop: x});
    }
  };
  componentDidMount() {
    this.gettoken();
    StatusBar.setHidden(true);
    MapboxGL.setTelemetryEnabled(false);
    PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ],
      {
        title: 'Location',
        message: 'access location',
      },
    )
      .then(granted => {
        console.log(granted);
        //
      })
      .catch(err => {
        console.log(err);
      });
  }

  async like_dislike_vendor(vendor_id, index) {
    this.setState({loading_like: true});
    try {
      await _defz
        .get_via_token(
          'user/like-dislike-vendor/' + vendor_id,
          'GET',
          _defz._token,
        )
        .then(response => {
          if (response.status === 200) {
            this.state.vendors[index].liked = !this.state.vendors[index].liked;
          }

          this.setState({loading_like: false});
        });
    } catch (error) {
      console.log(error);
    }
  }

  async get_store(parm_data) {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    try {
      let params = '';
      if (parm_data !== 'new') {
        params = parm_data;
      }
      await _defz
        .get_via_token('user/home' + params, 'GET', _defz._token)
        .then(response => {
          console.log(response.departments);
          if (response.status === 200) {
            if (response.departments) {
              this.setState({departments: response.departments});
            }
            if (response.vendors) {
              this.setState({vendors: response.vendors});
            }
          }
          if (response.status === 400) {
            navigate('usermain');
          }
          this.setState({loading: false});
        });
    } catch (error) {
      console.log(error);
    }
  }

  select_btn(b) {
    if (this.state.selected_btn == b) {
      this.get_store('new');
      this.setState({selected_btn: ''});
    } else {
      if (b == 'heart') {
        this.get_store('?liked=1');
      } else {
        this.get_store(b);
      }

      this.setState({selected_btn: b});
    }
  }
  render_box() {
    const {navigate} = this.props.navigation;
    if (this.state.departments !== null) {
      let items = [];
      items.push(
        <Button
          transparent
          rounded
          onPress={() => this.select_btn('heart')}
          style={[
            this.state.selected_btn !== 'heart'
              ? styles.unselectb
              : styles.selectb,
          ]}>
          <Icon
            name="heart"
            type="AntDesign"
            style={[
              this.state.selected_btn !== 'heart'
                ? styles.unselectb_data
                : styles.selectb_data,
            ]}
          />
        </Button>,
      );

      this.state.departments.map((dataItem, i) => {
        items.push(
          <Button
            transparent
            rounded
            onPress={() => this.select_btn('?department_id=' + dataItem.id)}
            style={[
              this.state.selected_btn !== '?department_id=' + dataItem.id
                ? styles.unselectb
                : styles.selectb,
            ]}>
            <Text
              style={[
                this.state.selected_btn !== '?department_id=' + dataItem.id
                  ? styles.unselectb_data
                  : styles.selectb_data,
              ]}>
              {dataItem.name}
            </Text>
          </Button>,
        );
      });
      items.push(<View style={{marginRight: 25}} />);
      return items;
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const {
      followUserLocation,
      showsUserHeadingIndicator,
      followUserMode,
      androidRenderMode,
    } = this.state;

    let {settings, onUpdateSettings} = this.props;

    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiYmFyYmFyeWFiIiwiYSI6ImNraTMyaWt3dTFta2oycnFxcDRrOW4xd2oifQ.190FCXQ4cF95_ZhzMisEyw',
    );

    return (
      <View style={styles.container}>
        {this.state.loading === true ? (
          <Loader navigation={this.props.navigation} loading={true} />
        ) : (
          <View style={styles.main}>
            <Header style={styles.header} searchBar rounded>
              <Item style={{backgroundColor: '#FDFDFD'}}>
                {!this.state.serach_txt ? (
                  <Button
                    transparent
                    onPress={() =>
                      this.get_store('?search=' + this.state.serach_txt)
                    }>
                    <Icon name="ios-search" style={{color: 'black'}} />
                  </Button>
                ) : null}

                {this.state.serach_txt ? (
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      backgroundColor: '#FDFDFD',
                    }}>
                    <Button
                      transparent
                      onPress={() =>
                        this.get_store('?search=' + this.state.serach_txt)
                      }>
                      <Icon name="ios-search" style={{color: 'black'}} />
                    </Button>
                    <Button
                      transparent
                      onPress={() => this.setState({serach_txt: ''})}>
                      <Icon name="close" style={{color: 'black'}} />
                    </Button>
                  </View>
                ) : null}

                <Input
                  placeholder="ُSearch for a store or Product"
                  value={this.state.serach_txt}
                  style={styles.search_input}
                  onChangeText={text => {
                    this.setState({serach_txt: text});
                  }}
                />
              </Item>

              <Button />
            </Header>
            {this.state.departments ? (
              <View style={{marginTop: 10, width: '95%', alignSelf: 'center'}}>
                <ScrollView
                  horizontal
                  style={{
                    marginTop: 5,
                    width: '95%',
                    alignSelf: 'center',
                    height: 45,
                  }}
                  showsHorizontalScrollIndicator={false}>
                  {this.render_box()}
                </ScrollView>
              </View>
            ) : null}

            <MapboxGL.MapView
              ref={c => (this._map = c)}
              zoomLevel={2}
              style={styles.map}>
              {this.state.vendors
                ? this.state.vendors.map((item, index) => {
                    if (item.latitude !== NaN && item.longitude !== NaN) {
                      let coordinate_item = [
                        parseFloat(item.longitude),
                        parseFloat(item.latitude),
                      ];

                      return (
                        <View>
                          <Marker
                            id={index}
                            coordinate={coordinate_item}
                            label={index}
                            color={"red"}
                          />
                        </View>
                      );
                    }
                  })
                : null}
              <MapboxGL.Camera
                ref={c => (this.camera_map = c)}
                zoomLevel={10}
                followUserLocation
                animationMode={'flyTo'}
              />

              <MapboxGL.UserLocation
                ref={location => {
                  // console.warn({location});
                }}
              />
            </MapboxGL.MapView>

            {this.state.vendors !== null ? (
              <View style={styles.types}>
                <ScrollView style={styles.scrollViewH2} horizontal>
                  {this.state.vendors.map((item, index) => {
                    let img_arr = [];
                    item.image_gallery.forEach(item => {
                      img_arr.push(`http://bedmal-core.aralstudio.top${item}`);
                    });

                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={index}
                        onPress={() => {
                          this.state.acctive_shop !== item.id
                            ? this.shop_selecter(item.id)
                            : (this.setState({acctive_shop: ''}));
                        }}
                        style={[
                          this.state.acctive_shop !== item.id
                            ? styles.touch_style_close
                            : styles.touch_style_open,
                        ]}>
                        {this.state.acctive_shop == item.id ? (
                          <Button
                            style={styles.view_line_b}
                            onPress={() => {
                              this.setState({acctive_shop: ''});
                            }}
                          />
                        ) : null}
                        <SliderBox
                          images={img_arr}
                          sliderBoxHeight={_defz.height / 6}
                          parentWidth={_defz.width / 2}
                          dotColor={'#fff'}
                          style={styles.sliderImages}
                        />
                        <View style={{flexDirection: 'row', marginTop: ' 2%'}}>
                          <Text style={styles.text_title_shop_number}>
                            {index + 1} |{' '}
                          </Text>
                          <Text style={styles.text_title_shop}>
                            {item.name}
                          </Text>
                        </View>
                        {this.state.acctive_shop == item.id ? (
                          <Text numberOfLines={1} style={styles.text_address}>
                            {item.address}
                          </Text>
                        ) : null}

                        {this.state.acctive_shop == item.id ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '80%',
                              alignSelf: 'center',
                              marginTop: 10,
                            }}>
                            <Text style={styles.text_borrow} numberOfLines={1}>
                              Collection
                            </Text>
                            {item.collections ? (
                              <Icon
                                name="check"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  size: 15,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  size: 15,
                                }}
                              />
                            )}
                          </View>
                        ) : null}
                        {this.state.acctive_shop == item.id ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '80%',
                              alignSelf: 'center',
                            }}>
                            <Text style={styles.text_borrow} numberOfLines={1}>
                              Delivery{' '}
                            </Text>
                            {item.fulfillments ? (
                              <Icon
                                name="check"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  size: 15,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  size: 15,
                                }}
                              />
                            )}
                          </View>
                        ) : null}

                        {this.state.acctive_shop == item.id ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '80%',
                              alignSelf: 'center',
                              marginTop: 20,
                            }}>
                            <Text style={styles.text_borrow} numberOfLines={1}>
                              BorrowCup
                            </Text>
                            {item.borrow_partner_cup == 1 ? (
                              <Icon
                                name="check"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  size: 15,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  size: 15,
                                }}
                              />
                            )}
                          </View>
                        ) : null}
                        {this.state.acctive_shop == item.id ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '80%',

                              alignSelf: 'center',
                            }}>
                            <Text style={styles.text_borrow} numberOfLines={1}>
                              BorrowBag
                            </Text>
                            {item.borrow_partner_bag == 1 ? (
                              <Icon
                                name="check"
                                type="AntDesign"
                                size={25}
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  fontSize: 10,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  size: 10,
                                }}
                              />
                            )}
                          </View>
                        ) : null}

                        {this.state.acctive_shop == item.id ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              backgroundColor: '#F0F0F0',
                              elevation: 5,
                              width: '80%',
                              alignSelf: 'center',
                              borderRadius: 10,
                              marginTop: '5%',
                            }}>
                            {this.state.loading_like == false ? (
                              <Button
                                transparent
                                rounded
                                style={{marginLeft: '5%'}}
                                onPress={() =>
                                  this.like_dislike_vendor(item.id, index)
                                }>
                                {item.liked == true ? (
                                  <Icon
                                    name="heart"
                                    type="AntDesign"
                                    style={{color: '#3D80F2'}}
                                  />
                                ) : (
                                  <Icon
                                    name="hearto"
                                    type="AntDesign"
                                    style={{color: 'gray'}}
                                  />
                                )}
                              </Button>
                            ) : (
                              <ActivityIndicator
                                size="small"
                                style={{marginLeft: '15%'}}
                                color="gray"
                              />
                            )}
                            <Button
                              rounded
                              style={{
                                marginTop: _defz.height / 70,
                                height: 26,
                                bottom: _defz.height / 300,
                                textTransform: 'capitalize',
                                marginRight: '4%',
                                marginLeft: 'auto',
                                backgroundColor: '#3D80F2',
                              }}
                              onPress={() =>
                                navigate('storeFront', {id: item.id})
                              }>
                              <Text
                                style={{
                                  color: 'white',
                                  textTransform: 'capitalize',
                                }}>
                                Shop
                              </Text>
                            </Button>
                          </View>
                        ) : null}
                        {this.state.acctive_shop !== item.id ? (
                          <View style={styles.view_line} />
                        ) : null}

                        <View
                          style={{marginTop: '10%', bottom: _defz.height / 300}}
                        />
                      </TouchableOpacity>
                    );
                  })}
                  <View style={{marginRight: 25}} />
                </ScrollView>
              </View>
            ) : null}
          </View>
        )}

        <Footers navigation={this.props.navigation} route={'home'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFDFD',
    flex: 1,
  },
  touch_style_close: {
    backgroundColor: '#F0F0F0',
    marginLeft: _defz.width / 15,
    borderRadius: 10,
    width: _defz.width / 2,
    marginTop: 'auto',
  },
  touch_style_open: {
    backgroundColor: 'white',
    marginLeft: _defz.width / 15,
    borderRadius: 10,
    width: _defz.width / 2,
    marginTop: 'auto',
  },
  text_borrow: {
    fontSize: 13,
    color: 'gray',
    marginLeft: '9%',
  },
  sliderImages: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxWidth: '100%',
    height: _defz.height / 6,
  },
  text_address: {
    marginLeft: '5%',
    marginTop: 2,
    fontSize: 10,
  },
  text_title_shop: {
    marginLeft: 5,
    marginTop: 5,
    fontSize: 18,
  },
  text_title_shop_number: {
    marginLeft: 5,
    marginTop: 8,
    fontSize: 14,
  },
  view_line: {
    width: '70%',
    alignSelf: 'center',
    height: 5,
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: 'black',
  },
  view_line_b: {
    width: '70%',
    alignSelf: 'center',
    height: 4,
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: 'black',
    position: 'absolute',
    flex:1,
    zIndex:999,
  },

  scrollViewH2: {
    position: 'absolute',
    bottom: _defz.height / 8.5,
    left: 0,
    zIndex: 10,
  },

  main: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FDFDFD',
  },
  search_input: {
    color: 'silver',
    fontFamily: 'FuturaPTDemi',
    fontSize: 13,
  },

  box_scroll: {
    width: '100%',
  },
  map: {
    flex: 1,
    position: 'relative',
    marginTop: 10,
  },
  text_select: {
    alignSelf: 'center',
    fontFamily: 'FuturaPTDemi',
    color: 'black',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  text_unselect: {
    alignSelf: 'center',
    fontFamily: 'FuturaPTDemi',
    color: 'black',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  text_select22: {
    alignSelf: 'center',
    fontFamily: 'FuturaPTDemi',
    color: 'white',
    fontSize: 10.5,
    textTransform: 'capitalize',
  },
  text_unselect22: {
    alignSelf: 'center',
    fontFamily: 'FuturaPTDemi',
    color: '#07BD5E',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  unselect: {
    alignContent: 'center',
    alignSelf: 'center',
    width: '16%',
    minWidth: 70,
    elevation: 15,
    borderColor: 'black',
    marginLeft: '2%',
    justifyContent: 'center',
    backgroundColor: '#FDFDFD',
    textTransform: 'capitalize',
  },
  select: {
    alignContent: 'center',
    alignSelf: 'center',
    width: '16%',
    elevation: 15,
    borderColor: 'green',
    marginLeft: '2%',
    justifyContent: 'center',
    backgroundColor: '#07BD5E',
    textTransform: 'capitalize',
  },

  unselectb: {
    borderColor: 'black',
    marginLeft: 10,
    elevation: 7,
    height: 32,
    borderRadius: 20,
    bottom: 5,
    top: 5,
    backgroundColor: 'white',
    textTransform: 'capitalize',
    fontFamily: 'FuturaPTDemi',
  },
  selectb: {
    borderColor: 'black',
    marginLeft: 10,
    elevation: 5,
    height: 32,
    borderRadius: 20,
    bottom: 5,
    top: 5,
    backgroundColor: '#3D80F2',
    textTransform: 'capitalize',
    fontFamily: 'FuturaPTDemi',
  },

  unselectb_data: {
    color: 'gray',
    textTransform: 'capitalize',
    fontFamily: 'FuturaPTDemi',
  },
  selectb_data: {
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: 'FuturaPTDemi',
  },
  markerView: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  headerSearchTypes: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: '1%',
    alignSelf: 'center',
  },
  heartIcon: {
    alignSelf: 'center',
    fontSize: 20,
    margin: 5,
    color: '#3D80F2',
  },
  header: {
    backgroundColor: '#FDFDFD',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: heights / 30,
    elevation: 8,
  },
});

export default home;
