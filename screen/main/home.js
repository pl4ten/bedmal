import React, {Component} from 'react';
import {View, ScrollView, Image, ActivityIndicator, Alert, StatusBar} from 'react-native';
import {Text, Item, Button, Input, Icon, Header} from 'native-base';
import Loader from '../com/loader';

import {SliderBox} from 'react-native-image-slider-box';
import {styles} from './styles/home.styles';
import {Logger} from '@react-native-mapbox-gl/maps';
import MapboxGL, {MarkerView} from '@react-native-mapbox-gl/maps';
import {PermissionsAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
var Footers = require('../com/footer').default;
let _defz = require('../com/def');
let location_checker;
// edit logging messages
Logger.setLogCallback(log => {
  const {message} = log;

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

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
);
MapboxGL.setTelemetryEnabled(false);

const Marker = ({coordinate, id, color, label}) => {
  return coordinate[0] && coordinate[1] ? (
    <View style={styles.markerView}>
      <MarkerView coordinate={coordinate} id={id}>
        <Image
          resizeMode={'contain'}
          width={25}
          height={25}
          source={marker_Local_Image[id]}
        />
      </MarkerView>
    </View>
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
      searchload: false,
      loading_like: false,
      loading: true,
      acctive_shop: '',
      serach_txt: '',
      selected_btn: '',
      show_box: false,
      departments: null,
      vendors: null,
      renderMode: this._renderModeOptions[0].data,
      followUserLocation: true,
      showsUserHeadingIndicator: false,
      latitude: null,
      longitude: null,
      userLocationOn: null,
      loader_Text: '',
      fetchData: false,

      LOCATION_OPNED: false,
      location_loop: false,
      no_location_loop: false,
    };

    this.onRenderModeChange = this.onRenderModeChange.bind(this);
  }

  onRenderModeChange(index, renderMode) {
    this.setState({renderMode});
  }
  shop_selecter = async (x, lng, lat) => {
    this.setState({followUserLocation: false});
    if (this.state.acctive_shop == x) {
      this.setState({acctive_shop: ''});
    } else {
      this.setState({acctive_shop: x});
      this.camera_map.zoomTo(12);
      this.camera_map.flyTo([lng, lat], 1000);
    }
  };
  componentWillUnmount() {
    clearInterval(location_checker);
  }
  componentDidMount() {
    try {
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
          //console.log(granted);
          //
        })
        .catch(err => {
          Alert.alert(err);
        });
      this.tryToGetSrotes();
    } catch (error) {
      Alert.alert(error);
    }
  }
  async like_dislike_vendor(vendor_id, index) {
    this.setState({loading_like: true});
    try {
      await _defz
        .get_via_token(
          'user/like-dislike-vendor/' + vendor_id,
          'GET',
          this.props.token,
        )
        .then(response => {
          if (response.status === 200) {
            this.state.vendors[index].liked = !this.state.vendors[index].liked;
            if (
              !this.state.vendors[index].liked &&
              this.state.selected_btn == 'heart'
            ) {
              this.get_store('?liked=1');
            }
          }

          this.setState({loading_like: false});
        });
    } catch (error) {
      console.log(error);
    }
  }
  tryToGetSrotes() {
    try {
      location_checker = setInterval(() => {
        StatusBar.setBackgroundColor('black');
        Geolocation.getCurrentPosition(
          position => {
            this.setState({LOCATION_OPNED: true});
            if (
              this.state.LOCATION_OPNED &&
              this.state.location_loop == false
            ) {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                LOCATION_OPNED: true,
                location_loop: true,
                no_location_loop: false,
              });

              this.get_store_via_location(
                this.state.latitude,
                this.state.longitude,
              );
            }
          },

          error => {
            if (error.message === 'Location request timed out') {
              this.setState({
                loading: true,
                loader_Text: 'Getting your coordinate ...',
              });
            }
            this.setState({LOCATION_OPNED: false});
            if (
              !this.state.LOCATION_OPNED &&
              this.state.no_location_loop == false
            ) {
              this.setState({
                LOCATION_OPNED: false,
                no_location_loop: true,
                location_loop: false,
                loading: false,
              });

              this.get_store('new');
            }
          },
          {enableHighAccuracy: false, timeout: 500000000, maximumAge: 500000},
        );
      }, 1000);
    } catch (error) {
      Alert.alert(error);
    }
  }

  async search_store(parm_data) {
    this.setState({followUserLocation: false});
    try {
      await _defz
        .get_via_token('user/home' + parm_data, 'GET', this.props.token)
        .then(response => {
          if (response.status === 200) {
            if (response.departments) {
              this.setState({departments: response.departments});
            }
            if (response.vendors) {
              this.setState({vendors: response.vendors});
            }
          }
          this.setState({searchload: false});
        });
    } catch (error) {
      console.log(error);
    }
  }

  async get_store(parm_data) {
    this.setState({loader_Text: '', followUserLocation: false});
    const {navigate} = this.props.navigation;
    try {
      let params = '';
      if (parm_data !== 'new') {
        params = parm_data;
      }
      if (parm_data == '?liked=1') {
        this.setState({loader_Text: ''});
      }
      this.setState({loading: true});
      /*       if (!String(parm_data).substr(0,6) == '?search=') {
        this.setState({loading: true});
      } */

      await _defz
        .get_via_token('user/home' + params, 'GET', this.props.token)
        .then(response => {
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
      Alert.alert(
        'Error',
        'error in shop data read.',
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
  async get_store_via_location() {
    console.log('location');
    this.setState({loading: true, fetchData: true});
    this.setState({loader_Text: 'Get Store data via Your Location'});
    const {navigate} = this.props.navigation;
    try {
      let params = '';
      params +=
        '&latitude=' +
        this.state.latitude +
        '&longitude=' +
        this.state.longitude;

      await _defz
        .get_via_token('user/home?range=40' + params, 'GET', this.props.token)
        .then(response => {
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
    try {
      this.setState({followUserLocation: false});
      if (this.state.userLocationOn) {
        this.get_store_via_location();
      } else {
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
    } catch (error) {
      Alert.alert(error);
    }
  }
  render_box() {
    try {
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
    } catch (error) {
      Alert.alert(error);
    }
  }
  /*   checkImageURL(url) {
    fetch(url)
      .then(res => {
        // console.log(res.status);
        if (res.status == 404) {
          return require('../../asset/img/bedmal-place-holder.jpg');
        } else {
          return url;
        }
      })
      .catch(err => {
        return require('../../asset/img/bedmal-place-holder.jpg');
      });
  } */
  render() {
    const {navigate} = this.props.navigation;
    MapboxGL.setAccessToken(
      'pk.eyJ1IjoiYmFyYmFyeWFiIiwiYSI6ImNraTMyaWt3dTFta2oycnFxcDRrOW4xd2oifQ.190FCXQ4cF95_ZhzMisEyw',
    );
    return (
      <View style={styles.container}>
        {this.state.loading === true ? (
          <Loader
            navigation={this.props.navigation}
            loading={true}
            text={this.state.loader_Text}
          />
        ) : (
          <View style={styles.main}>
            <Header style={styles.header} searchBar rounded>
              <Item style={{backgroundColor: '#FDFDFD'}}>
                <Button
                  transparent
                  onPress={() =>
                    this.get_store('?search=' + this.state.serach_txt)
                  }>
                  {!this.state.searchload == true ? (
                    <Icon name="ios-search" style={{color: '#707070'}} />
                  ) : (
                    <ActivityIndicator
                      size="small"
                      color="black"
                      style={{marginLeft: '15%'}}
                    />
                  )}
                </Button>

                <Input
                  placeholder={'Search for a Store Or Product'}
                  value={this.state.serach_txt}
                  style={styles.search_input}
                  onEndEditing={() =>
                    this.get_store('?search=' + this.state.serach_txt)
                  }
                  onChangeText={text => {
                    this.setState({serach_txt: text}, () => {
                      console.log(this.state.serach_txt);
                      if (String(this.state.serach_txt).length > 3) {
                        this.setState({searchload: true});
                        this.search_store('?search=' + this.state.serach_txt);
                      }
                      if (String(this.state.serach_txt).length == 0) {
                        this.setState({
                          LOCATION_OPNED: false,
                          location_loop: false,
                          no_location_loop: false,
                        });
                      }
                    });
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
              styleURL={'mapbox://styles/mapbox/outdoors-v11'}
              ref={c => (this._map = c)}
              zoomLevel={5}
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
                zoomLevel={5}
                animationMode={'flyTo'}
                followUserLocation={this.state.followUserLocation}
                followZoomLevel={5}
              />
              {this.state.LOCATION_OPNED ? (
                <MapboxGL.UserLocation androidRenderMode="compass" />
              ) : null}
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
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={index}
                        onPress={() => {
                          this.state.acctive_shop !== item.id
                            ? this.shop_selecter(
                                item.id,
                                item.longitude,
                                item.latitude,
                              )
                            : this.setState({acctive_shop: ''});
                        }}
                        style={[
                          this.state.acctive_shop !== item.id
                            ? styles.touch_style_close
                            : styles.touch_style_open,
                        ]}>
                        {this.state.acctive_shop == item.id ? (
                          /*                           <Button
                                                    transparent
                                                      style={styles.view_line_b}
                                                      onPress={() => {
                                                        this.setState({acctive_shop: ''});
                                                      }}
                                                    /> */
                          <View style={styles.view_line_b} />
                        ) : null}
                        <SliderBox
                          images={img_arr}
                          sliderBoxHeight={_defz.height / 8}
                          parentWidth={_defz.width / 2.3}
                          dotColor={'#fff'}
                          style={styles.sliderImages}
                        />
                        <View style={{flexDirection: 'row', marginTop: ' 2%'}}>
                          <Text style={styles.text_title_shop_number}>
                            {index + 1} |{' '}
                          </Text>
                          {this.state.acctive_shop == item.id ? (
                            <Text style={styles.text_title_shop}>
                              {item.name}
                            </Text>
                          ) : (
                            <Text
                              numberOfLines={1}
                              style={styles.text_title_shop}>
                              {item.name}
                            </Text>
                          )}
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
                              marginTop: 5,
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
                                  fontSize: 16,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  fontSize: 16,
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
                                  fontSize: 16,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  fontSize: 16,
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
                              marginTop: 5,
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
                                  fontSize: 16,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  fontSize: 16,
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
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  fontSize: 16,
                                }}
                              />
                            ) : (
                              <Icon
                                name="close"
                                type="AntDesign"
                                style={{
                                  color: 'black',
                                  marginLeft: 'auto',
                                  fontSize: 16,
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
                              marginVertical: 10,
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

const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(home);
