import React, {Component} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Text, Item, Button, Input, Icon, Header} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from './styles/home.styles';
let logedin = '0';
var Footers = require('../com/footer').default;
import MapboxGL, {MarkerView} from '@react-native-mapbox-gl/maps';
import {PermissionsAndroid} from 'react-native';
let position = [53.4808, 2.2426];
let position2 = [53.4808, 2.2426];
import Loader from '../com/loader';
import ProductTypes from '../shop/product-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Keyboard} from 'react-native';
let _defz = require('../com/def');
import Mapbox, { Logger } from '@react-native-mapbox-gl/maps';

// edit logging messages
Logger.setLogCallback(log => {
  const { message } = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});
const marker_Local_Image = [
  require('../../asset/marker/1.png'),
  require('../../asset/marker/2.png'),
  require('../../asset/marker/3.png'),
  require('../../asset/marker/4.png'),
  require('../../asset/marker/5.png'),
  require('../../asset/marker/6.png'),
  require('../../asset/marker/7.png'),
  require('../../asset/marker/8.png'),
  require('../../asset/marker/9.png'),
  require('../../asset/marker/10.png'),
  require('../../asset/marker/11.png'),
  require('../../asset/marker/12.png'),
  require('../../asset/marker/13.png'),
  require('../../asset/marker/14.png'),
  require('../../asset/marker/15.png'),
  require('../../asset/marker/16.png'),
  require('../../asset/marker/17.png'),
  require('../../asset/marker/18.png'),
  require('../../asset/marker/19.png'),
  require('../../asset/marker/20.png'),
  require('../../asset/marker/21.png'),
  require('../../asset/marker/22.png'),
  require('../../asset/marker/23.png'),
  require('../../asset/marker/24.png'),
  require('../../asset/marker/25.png'),
  require('../../asset/marker/26.png'),
  require('../../asset/marker/27.png'),
  require('../../asset/marker/28.png'),
  require('../../asset/marker/29.png'),
  require('../../asset/marker/30.png'),
  require('../../asset/marker/31.png'),
  require('../../asset/marker/32.png'),
  require('../../asset/marker/33.png'),
  require('../../asset/marker/34.png'),
  require('../../asset/marker/35.png'),
  require('../../asset/marker/36.png'),
  require('../../asset/marker/37.png'),
  require('../../asset/marker/38.png'),
  require('../../asset/marker/39.png'),
  require('../../asset/marker/40.png'),
  require('../../asset/marker/41.png'),
  require('../../asset/marker/42.png'),
  require('../../asset/marker/43.png'),
  require('../../asset/marker/44.png'),
  require('../../asset/marker/45.png'),
  require('../../asset/marker/46.png'),
  require('../../asset/marker/47.png'),
  require('../../asset/marker/48.png'),
  require('../../asset/marker/49.png'),
  require('../../asset/marker/50.png'),
];
let marker_count = 1;
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
);
MapboxGL.setTelemetryEnabled(false);



const Marker = ({coordinate, id, color, label}) => {
  return coordinate[0] && coordinate[1] ? (
    <MarkerView coordinate={coordinate} id={id}>
      <View style={[styles.markerView, {}]} />
      <View>
        <Image
          resizeMode={'contain'}
          width={25}
          height={25}
          source={marker_Local_Image[id]}
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
      user_lat: '',
      user_log: '',
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
  shop_selecter = async (x,lng, lat) => {
    if (this.state.acctive_shop == x) {
      this.setState({acctive_shop: ''});
    } else {
      this.setState({acctive_shop: x});
      this.camera_map.flyTo([lng, lat], 1000)

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
        .get_via_token('user/home?range=40' + params, 'GET', _defz._token)
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

  async get_store_via_location(x, y) {
    this.setState({loading: true});
    const {navigate} = this.props.navigation;
    try {
      let params = '';

      params += '&latitude=' + x + ' &longitude=' + y;

      await _defz
        .get_via_token('user/home?range=40' + params, 'GET', _defz._token)
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

  location_seter(x, y) {
    if (x !== this.state.user_lat && y !== this.state.user_log) {
      this.setState({user_lat: x});
      this.setState({user_log: y});
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
  checkImageURL(url) {
    fetch(url)
      .then(res => {
        console.log(res.status);
        if (res.status == 404) {
          return require('../../asset/img/bedmal-place-holder.jpg');
        } else {
          return url;
        }
      })
      .catch(err => {
        return require('../../asset/img/bedmal-place-holder.jpg');
      });
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
                <Button
                  transparent
                  onPress={() =>
                    this.get_store('?search=' + this.state.serach_txt)
                  }>
                  <Icon name="ios-search" style={{color: 'black'}} />
                </Button>

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
              styleURL={'mapbox://styles/mapbox/light-v10'}
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
                            color={'red'}
                          />
                        </View>
                      );
                    }
                  })
                : null}
              <MapboxGL.Camera
                ref={c => (this.camera_map = c)}
                zoomLevel={10}
                animationMode={'flyTo'}
              />
<MapboxGL.Light />
              <MapboxGL.UserLocation
                ref={location => {
                  console.log("----*****************************************")
                   console.warn(location); 
                }}
              />
            </MapboxGL.MapView>

            {this.state.vendors !== null ? (
              <View style={styles.types}>
                <ScrollView style={styles.scrollViewH2} horizontal>
                  {this.state.vendors.map((item, index) => {
                    let img_arr = [];
                    item.image_gallery.forEach(item => {
                      img_arr.push(`https://bedmal-core.aralstudio.top${item}`);
                    });
                    if (!img_arr) {
                      img_arr.push(
                        require('../../asset/img/bedmal-place-holder.jpg'),
                      );
                    }
                    console.log(item)
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={index}
                        onPress={() => {
                          this.state.acctive_shop !== item.id
                            ? this.shop_selecter(item.id,item.longitude,item.latitude)
                            : this.setState({acctive_shop: ''});
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

export default home;
