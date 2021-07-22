import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  CardItem,
  Right,
  Left,
  Body,
  Button,
  Text,
  Thumbnail,
  ListItem,
  List,
  Root,
  Icon,
  Spinner,
  Badge,
} from 'native-base';

import {connect} from 'react-redux';
import {selectUserToken} from '../../redux/user/user.selectors';

import AsyncStorage from '@react-native-community/async-storage';
let lodings = false;
let paging = false;
let _defz = require('../com/def');
var Footers = require('../com/footer').default;
var Headers = require('../com/header').default;
let timer;
class chat_main extends Component {
  constructor() {
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

    this.state = {
      chatdata: null,
    };
  }
  forceUpdateHandler() {
    this.forceUpdate();
  }

  test2(_id) {
    this.props.navigation.navigate('usermain');
  }

  componentWillMount() {
    this.get_chat();
    timer = setInterval(() => {
      this.get_chat();
    }, 15000);
  }
  componentWillUnmount() {
    clearInterval(timer);
  }
  nav(x) {
    clearInterval(timer);
    const {navigate} = this.props.navigation;
    if (x.receiver.type == 'super_admin') {
      navigate('chat_one', {id: x.id, type: 'admin'});
    } else {
      navigate('chat_one', {id: x.receiver.id, type: 'vendor_chat'});
    }
  }
  renderItems() {
    const {navigate} = this.props.navigation;
    if (this.state.chatdata) {
      let items = [];
      this.state.chatdata.map((dataItem, i) => {
        items.push(
          <List style={{}}>
            <ListItem noBorder avatar style={styles.cartItem}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.chatAvatar}
                onPress={() => this.nav(dataItem)}>
                <Left style={{}}>
                  {dataItem.new_message==true ? (
                    <Icon
                      name="circle"
                      type="FontAwesome"
                      style={styles.avatarBadge}
                    />
                  ) : (
                    <Icon
                    name="circle"
                    type="FontAwesome"
                    style={styles.avatarBadge2}
                  />
                  )}
                  {dataItem.receiver.type == 'super_admin' ? (
                    <Thumbnail
                      style={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'black',
                      }}
                      source={require('../../asset/img/playstore-icon.png')}
                    />
                  ) : (
                    <Thumbnail
                      style={{backgroundColor: 'white'}}
                      source={{
                        uri:
                          'http://bedmal-core.aralstudio.top' +
                          dataItem.receiver.image_gallery[0],
                      }}
                    />
                  )}
                </Left>
              </TouchableOpacity>
              <Body>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.chatInfo}
                  onPress={() => this.nav(dataItem)}>
                  <Text>{dataItem.receiver.name}</Text>
                  <Text note>{dataItem.last_message.message}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Text note>{dataItem.created_at.slice(0, 11)}</Text>
              </Right>
            </ListItem>
          </List>,
        );
      });

      return items;
    }
  }

  async get_chat() {
    const {navigate} = this.props.navigation;
    try {
      await _defz
        .get_via_token('user/chats?limit=15&offset=0', 'GET', _defz._token)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.setState({chatdata: response.chats});
          }
          if (response.status == 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props.token);
    const {navigate} = this.props.navigation;
    return (
      <Root>
        <View style={styles.container}>
          <Button
            transparent
            style={styles.headerBackButto}
            onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="closecircleo"
              type="AntDesign"
              style={styles.alertIcon}
            />
          </Button>
          <View style={styles.header}>
            <Button
              style={styles.b1}
              vertical
              transparent
              onPress={() => console.log('ok')}>
              <Image
                source={require('../../asset/img/alert.png')}
                resizeMode="stretch"
              />
              <Text style={styles.alertButtonText}>Alerts on</Text>
            </Button>

            <Text style={styles.headerText}>messages</Text>
          </View>
          <View style={styles.heading}>
            <CardItem style={styles.card}>
              <Left style={styles.headingText}>
                <Text style={styles.text1}> App or borrow product issues?</Text>
              </Left>

              <Right>
                <Button
                  transparent
                  style={styles.b1}
                  onPress={() =>
                    navigate('chat_one', {id: '0', type: 'admin'})
                  }>
                  <Image
                    source={require('../../asset/img/Message.png')}
                    resizeMode="stretch"
                  />
                </Button>
              </Right>
            </CardItem>
          </View>

          <ScrollView>
            <View style={{height: _defz.height / 80}} />
            {this.renderItems()}

            {paging === true ? (
              <ActivityIndicator
                size="large"
                color="red"
                style={{alignSelf: 'center'}}
              />
            ) : null}
            {lodings === true && paging === false ? (
              <ActivityIndicator size="large" color="grey" />
            ) : null}
            <View style={{marginTop: '2%'}} />
          </ScrollView>
          <Footers navigation={this.props.navigation} route={'account'} />
        </View>
      </Root>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartItem: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 2,
    marginTop: 2

  },
  b1: {
    width: _defz.width / 4,
    textTransform: 'capitalize',
    justifyContent: 'center',
    marginLeft: '5%',
    marginTop: '5%',
  },
  b2: {
    backgroundColor: '#3D80F2',
    borderRadius: 30,
    elevation: 3,
    height: 30,
    textTransform: 'capitalize',
    justifyContent: 'center',
  },
  text_card: {color: 'gray'},
  card: {
    borderRadius: 9,
    width: '90%',
    alignSelf: 'center',
    marginTop: _defz.height / 60,
    elevation: 5,
    height: _defz.height / 20,
    backgroundColor: '#F0F0F0',
  },
  icon: {
    color: 'black',
    width: 30,
    height: 30,
    marginRight: '2%',
    marginTop: '2%',
    backgroundColor: 'white',
  },
  text1: {
    color: 'gray',
    fontSize: 14,
    alignSelf: 'center',

    textTransform: 'capitalize',
  },
  chatAvatar: {
    elevation: 0,
    marginTop: _defz.height / 60,
  },
  avatarBadge: {
    width: _defz.width / 50,
    height: _defz.width / 50,
    marginTop: '20%',
    marginRight: '10%',
    color: '#E03174',
    elevation: 5,
  },
  avatarBadge2: {
    width: _defz.width / 50,
    height: _defz.width / 50,
    marginTop: '20%',
    marginRight: '10%',
    color: 'white',
    elevation: 5,
  },
  avatarBadge_non: {
    width: _defz.width / 50,
    height: _defz.width / 50,
    marginTop: '20%',
    marginRight: '10%',
    color: 'white',
  },
  chatInfo: {
    elevation: 0,
    marginTop: _defz.height / 60,
  },
  headerBackButto: {
    alignSelf: 'flex-end',
    marginTop: _defz.height / 50,
  },
  alertIcon: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 35,
    margin: 5,
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  alertButtonText: {
    color: 'gray',
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  headerText: {
    color: 'gray',
    fontSize: 35,
    alignSelf: 'center',
    marginTop: '1%',
    textTransform: 'capitalize',
    marginRight: '25%',
    marginLeft: 'auto',
  },
  heading: {
    backgroundColor: 'white',
    marginTop: '3%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headingText: {
    width: _defz.width / 1.3,
    flexDirection: 'column',
  },
});

const mapStateToProps = state => ({
  token: selectUserToken(state),
});

export default connect(mapStateToProps)(chat_main);
