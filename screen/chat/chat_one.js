import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
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
  Spinner,
} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {Keyboard} from 'react-native';
import Loader from '../com/loader';
const {jsonBeautify} = require('beautify-json');

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
      profile: null,
      editname: false,
      editemail: false,
      editmobile: false,
      editpass: false,
      name: '',
      email: '',
      pass: '',
      mobile: '',
      number_image: 0,
      chatdata: null,
      isLoading: false,
      chat_time:[],
      
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
    console.log(id_chat);
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
      .send('user/chats/upload-image', 'POST', _defz._token, formData)
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

    await _defz.send(url, 'POST', _defz._token, formData).then(response => {
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
      await _defz.get_via_token(url, 'GET', _defz._token).then(response => {
        //console.log(jsonBeautify(response));
        this.setState({isLoading: false});
        if (response.status === 200) {
          this.setState({chatdata: response.messages});
          this.state.chatdata.reverse().map((dataItem, i) => {

          });
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
    if (this.state.chatdata != null ) {
      let items = [];

      this.state.chatdata.reverse().map((dataItem, i) => {
        let all=1
          if(!this.finder(dataItem.created_at.slice(0, 10))){
            this.state.chat_time.push(dataItem.created_at.slice(0, 10));
          }else{
            all=2
          }
          
          items.push(
            <View>
              {all!==2? (
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
                          'https://bedmal-core.aralstudio.top' +
                          dataItem.message,
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
                          'https://bedmal-core.aralstudio.top' +
                          dataItem.message,
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
                <Image
                  source={require('../../asset/img/back_b.png')}
                  resizeMode="stretch"
                />
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
              <Image
                source={require('../../asset/img/Message.png')}
                resizeMode="stretch"
                style={styles.headingImg}
              />

              <Text style={styles.text1}>
                {' '}
                App or borrow product issues? We’re here to help.
              </Text>
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
                            <Image
                              source={require('../../asset/img/img.png')}
                              resizeMode="stretch"
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
                            <Image
                              source={require('../../asset/img/send_b.png')}
                              resizeMode="stretch"
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },

  b1: {
    borderRadius: 30,
    marginRight: '-50%',
    height: 30,
    textTransform: 'capitalize',
    justifyContent: 'center',
  },
  b2: {
    backgroundColor: '#3D80F2',
    borderRadius: 30,
    elevation: 3,
    height: 30,
    textTransform: 'capitalize',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 13,
    height: 50,
    marginLeft: 'auto',
    width: '100%',
    marginTop: '-5%',
  },
  text_card: {color: 'gray'},
  card: {
    borderRadius: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: _defz.height / 100,
    elevation: 2,
    height: _defz.height / 20,
    borderWidth: 1,
    borderColor: 'silver',
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
    fontSize: 15,
    alignSelf: 'center',

    textTransform: 'capitalize',
    bottom: 5,
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  notUserChatBox: {
    backgroundColor: '#FAFAFA',
    width: '80%',
    marginTop: '3%',
    marginLeft: '5%',
    padding: _defz.height / 60,
    elevation: 5,
    borderRadius: 10,
    position: 'relative',
  },
  userChatBox: {
    backgroundColor: '#D8FFAA',
    width: '80%',
    marginTop: '3%',
    marginRight: '3%',
    marginLeft: 'auto',
    padding: _defz.height / 60,
    elevation: 5,
    position: 'relative',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
  cahtBoxDateTime: {
    position: 'absolute',
    right: '2%',
    bottom: '2%',
    fontSize: 11,
  },
  chatText: {
    color: '#707070',
  },
  createdAt: {
    textAlign: 'center',
    marginTop: '3%',
    color: '#C3BCBC',
  },
  headerXButton: {
    alignSelf: 'flex-end',
    marginTop: _defz.height / 100,
    marginLeft: 'auto',
    marginRight: '3%',
  },
  headerBackButton: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 35,
    margin: 5,
  },
  heading: {
    backgroundColor: '#FAFAFA',
    marginTop: '3%',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },
  headingImg: {
    marginLeft: '10%',
    marginTop: '1%',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAFAFA',
  },
  footer: {
    backgroundColor: '#FAFAFA',
    borderColor: 'silver',
    height: _defz.height / 10,
    borderWidth: 1,
  },
  footerTab: {
    backgroundColor: '#FAFAFA',
    alignSelf: 'flex-start',
  },
  footerBody: {
    width: '80%',
    flex: 6,
  },
});

export default Chat_one;
