import React, {Component} from 'react';
import {View, Image, ScrollView, Alert, TextInput} from 'react-native';
import {
  CardItem,
  Right,
  Left,
  Body,
  Button,
  Text,
  Footer,
  FooterTab,
  Root,
  List,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import {selectUserToken} from '../../redux/user/user.selectors';
import {styles} from './styles/chat_one';
import {Camera, Send, LogoChat, ArrowBack} from '../com/svg-files';
import ImagePicker from 'react-native-image-crop-picker';
import {Keyboard} from 'react-native';
import Loader from '../com/loader';
import {jsonBeautify} from 'beautify-json';
let img_temp = '';

let msg = '';
let chat_time = [];

let _defz = require('../com/def');
let type_chat = 'admin';
let id_chat = 'admin';
let t = [];

class Chat_one extends Component {
  constructor() {
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

    this.state = {
      vendorName: '',
      vendorID: 0,
      name: '',
      number_image: 0,
      chatdata: null,
      isLoading: false,
      chat_time: [],
    };
  }
  forceUpdateHandler() {
    this.forceUpdate();
  }

  test2(_id) {
    this.props.navigation.navigate('UserEnterNumber');
  }

  componentWillMount() {
    const {navigation} = this.props;

    type_chat = navigation.getParam('type', 'bedmal');
    id_chat = navigation.getParam('id', 'bedmal');
    this.setState({
      vendorName: navigation.getParam('name', 'admin'),
      vendorID: id_chat,
    });
    this.forceUpdateHandler();
    this.get_chat();
  }
  finder(x) {
    for (let i = 0; i < Object.keys(this.state.chat_time).length + 1; i++) {
      if (x == this.state.chat_time[i]) {
        return true;
      }
    }
    return false;
  }

  upload_image = async x => {
    Keyboard.dismiss();
    const {navigate} = this.props.navigation;
    let formData = new FormData();
    var photo = {
      uri: img_temp,
      type: 'multipart/form-data',
      name: '2.jpg',
    };
    formData.append('image', photo);

    await _defz
      .send('user/chats/upload-image', 'POST', this.props.token, formData)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.get_chat();
        }
        if (response.status === 400) {
          Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
            cancelable: true,
          });
        }
      });
  };

  send_chat = async x => {
    Keyboard.dismiss();
    this.setState({isLoading: true});
    const {navigate} = this.props.navigation;
    let formData = new FormData();

    let url = 'user/chats/send-message';

    if (type_chat === 'vendor_chat') {
      formData.append('receiver_type', 'vendor');
      formData.append('receiver_id', id_chat);
      formData.append('message', msg);
      formData.append('type', 'text');
    } else if (type_chat === 'vendor_id') {
      formData.append('receiver_type', 'vendor');

      formData.append('receiver_id', id_chat);
      formData.append('message', msg);
      formData.append('type', 'text');
      url = 'user/chats/send-message';
    } else {
      formData.append('receiver_type', 'admin');
      formData.append('message', msg);

      formData.append('type', 'text');
      url = 'user/chats/send-message';
    }

    await _defz.send(url, 'POST', this.props.token, formData).then(response => {
      console.log(response);
      this.setState({isLoading: false});
      if (response.chat) {
        this.get_chat();
      }
      if (response.status === 400) {
        /*           Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
            cancelable: true,
          }); */
      }
    });
  };

  async get_chat() {
    this.setState({isLoading: true});
    const {navigate} = this.props.navigation;
    let url = 'user/chats/messages?receiver_type=admin';

    if (type_chat === 'admin') {
      url = 'user/chats/messages?receiver_type=admin';
    }
    if (type_chat === 'vendor_chat') {
      url = 'user/chats/messages?receiver_type=vendor&receiver_id=' + id_chat;
    }
    if (type_chat === 'vendor_id') {
      url = 'user/chats/messages?receiver_type=vendor&receiver_id=' + id_chat;
    }

    try {
      await _defz.get_via_token(url, 'GET', this.props.token).then(response => {
        console.log(jsonBeautify(response));
        this.setState({isLoading: false});
        if (response.status === 200) {
          this.setState({chatdata: response.messages});
          this.state.chatdata.reverse().map((dataItem, i) => {});
          console.log(chat_time);
          this.textInput.clear();
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

  image_select() {
    ImagePicker.openPicker({
      cropperToolbarColor: 'green',
      cropperActiveWidgetColor: 'red',
      freeStyleCropEnabled: true,
      cropperToolbarWidgetColor: 'green',
      cropperToolbarTitle: 'image select',
      compressImageMaxWidth: 100,
      compressImageMaxHeight: 100,
      width: 500,
      height: 500,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      img_temp = image.path;
      this.setState({number_image: this.state.number_image + 1});
      this.forceUpdateHandler();
      this.upload_image();
      console.log(img_temp);
    });
  }
  renderItems() {
    const {navigate} = this.props.navigation;
    if (this.state.chatdata != null) {
      let items = [];

      this.state.chatdata.reverse().map((dataItem, i) => {
        let all = 1;
        if (!this.finder(dataItem.created_at.slice(0, 10))) {
          this.state.chat_time.push(dataItem.created_at.slice(0, 10));
        } else {
          all = 2;
        }

        items.push(
          <View>
            {all !== 2 ? (
              <Text style={styles.createdAt}>
                {dataItem.created_at.slice(0, 10)}
              </Text>
            ) : null}
          </View>,

          <List style={styles.chatContainer}>
            {dataItem.sender === 'user' ? (
              <View style={styles.userChatBox}>
                {dataItem.type === 'text' ? (
                  <View>
                    <Text style={styles.chatText}>{dataItem.message} </Text>
                    <Text style={styles.cahtBoxDateTime} note>
                      {dataItem.updated_at.slice(11, 16)}
                    </Text>
                  </View>
                ) : (
                  <Image
                    style={{width: _defz.width / 2, height: _defz.height / 4}}
                    source={{
                      uri:
                        'https://bedmal-core.aralstudio.top' + dataItem.message,
                    }}
                  />
                )}
              </View>
            ) : null}
            {dataItem.sender === 'not_user' ? (
              <View style={styles.notUserChatBox}>
                {dataItem.type === 'text' ? (
                  <View>
                    <Text style={styles.chatText}>{dataItem.message} </Text>
                    <Text style={styles.cahtBoxDateTime} note>
                      {dataItem.updated_at.slice(11, 16)}
                    </Text>
                  </View>
                ) : (
                  <Image
                    style={{
                      width: _defz.width / 2,
                      height: _defz.height / 4,
                      alignSelf: 'center',
                    }}
                    source={{
                      uri:
                        'https://bedmal-core.aralstudio.top' + dataItem.message,
                    }}
                  />
                )}
              </View>
            ) : null}
          </List>,
        );
      });

      return items;
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Root>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <Button
                transparent
                style={{marginLeft: '3%', marginTop: _defz.height / 100}}
                onPress={() => this.props.navigation.goBack()}>
                <ArrowBack />
              </Button>
              <Button
                transparent
                style={styles.headerXButton}
                onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="closecircleo"
                  type="AntDesign"
                  style={styles.headerBackButton}
                />
              </Button>
            </View>
            <View style={styles.heading}>
              {this.state.vendorName !== 'admin' ? (
                <View>
                  <Text style={styles.headingVendorName}>
                    {this.state.vendorName}
                  </Text>
                  <View style={styles.headingVendorInfo}>
                    <Text style={styles.vendorResponse}>
                      Typically replies in 20 minutes
                    </Text>
                    <Button
                      transparent
                      style={styles.headingButton}
                      onPress={() =>
                        this.props.navigation.navigate('storeFront', {
                          id: this.state.vendorID,
                        })
                      }>
                      <Text style={styles.headingButtonText}>Shop</Text>
                    </Button>
                  </View>
                </View>
              ) : (
                <>
                  <View style={{marginLeft: 20}}>
                    <LogoChat width={_defz.width / 5} height={30} />
                  </View>

                  <Text style={styles.text1}>
                    App or borrow product issues? We’re here to help.
                  </Text>
                </>
              )}
            </View>

            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({animated: true})
              }>
              <View>{this.renderItems()}</View>
              <View style={{marginTop: 200}} />
            </ScrollView>

            <View style={styles.footerContainer}>
              <Footer style={styles.footer}>
                <FooterTab active style={styles.footerTab}>
                  <Button vertical>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <CardItem style={styles.card}>
                        <Left style={{flex: 1}}>
                          <Button
                            rounded
                            light
                            transparent
                            style={styles.b1}
                            onPress={() => this.image_select()}>
                            <Camera
                              width={_defz.width / 15}
                              height={_defz.height / 15}
                            />
                          </Button>
                        </Left>

                        <Body style={styles.footerBody}>
                          <TextInput
                            ref={input => {
                              this.textInput = input;
                            }}
                            placeholder="Type Message"
                            placeholderTextColor="silver"
                            multiline={true}
                            onChangeText={text => {
                              msg = text;
                            }}
                            maxLength={1000}
                            style={styles.textInput}
                          />
                        </Body>
                        <Right style={{flex: 1}}>
                          <Button
                            rounded
                            light
                            transparent
                            style={styles.b1}
                            onPress={() => this.send_chat()}>
                            <Send
                              width={_defz.width / 7}
                              height={_defz.height / 7}
                            />
                          </Button>
                        </Right>
                      </CardItem>
                    </View>
                  </Button>
                </FooterTab>
              </Footer>
            </View>
          </View>
        )}
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
});

export default connect(mapStateToProps)(Chat_one);
