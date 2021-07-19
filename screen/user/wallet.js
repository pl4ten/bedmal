import React, {Component} from 'react';
import {StyleSheet, View, Alert, ScrollView, TextInput} from 'react-native';
import {Card, Right, Left, Body, Button, Text, Root, Icon,CardItem} from 'native-base';

let _defz = require('../com/def');
import Footers from '../com/footer';
import Headers from '../com/header';
import Loader from '../com/loader';
import {jsonBeautify} from 'beautify-json';

class wallet extends Component {
  constructor() {
    super();

    this.state = {
      addresses: '',
      isLoading: false,
      itemToEditID: 0,
      primaryAddress: 0,
      itemToEditAddress: '',
      itemToEditPostalCode: '',
      itemToEditPrimary: 0,
    };
  }

  async getAddresses() {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token('user/account/wallet/cards', 'GET', _defz._token)
        .then(response => {
          console.log(jsonBeautify(response));
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
          if (response.status === 200) {
            this.setState({
              isLoading: false,
              addresses: response.card,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async saveAddress(address, postalCode, primary, addressID) {
    try {
      this.setState({isLoading: true});
      let formData = new FormData();
      formData.append('address', address);
      formData.append('postal_code', postalCode);
      formData.append('primary', primary);

      await _defz
        .send(
          `user/account/addresses/edit/${addressID}`,
          'POST',
          _defz._token,
          formData,
        )
        .then(response => {
          this.setState({isLoading: false});
          console.log(jsonBeautify(response));
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
          if (response.status === 200) {
            this.setState({addresses: [], itemToEditID: 0});
            this.getAddresses();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getAddresses();
  }

  render() {
    return (
      <Root>
        {!this.state.isLoading ? (
          <>
            <View style={styles.header}>
              <Button
                transparent
                style={styles.headerXbutton}
                onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="closecircleo"
                  type="AntDesign"
                  style={styles.headerXIcon}
                />
              </Button>
              <View style={styles.container}>
                <Headers
                  navigation={this.props.navigation}
                  route={'wallet'}
                />
                <ScrollView
                  contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}>

                  {this.state.addresses
                    ? this.state.addresses.map(item => {
                        return (
                          <View
                            style={
                              this.state.itemToEditID === item.id
                                ? styles.activeCard
                                : styles.addressCard
                            }>
                            {this.state.itemToEditID === item.id ? (
                              <>
                                <Button
                                  style={styles.closeEditButton}
                                  transparent
                                  onPress={() =>
                                    this.setState({itemToEditID: 0})
                                  }>
                                  <Icon
                                    name="closecircleo"
                                    type="AntDesign"
                                    style={styles.closeEditButtonIcon}
                                  />
                                </Button>
                                <TextInput
                                  value={this.state.itemToEditAddress}
                                  placeholder={'Your Address'}
                                  onChangeText={text =>
                                    this.setState({itemToEditAddress: text})
                                  }
                                  style={styles.textInput}
                                />
                                <TextInput
                                  placeholder={'Postal Code'}
                                  value={this.state.itemToEditPostalCode}
                                  onChangeText={text =>
                                    this.setState({itemToEditPostalCode: text})
                                  }
                                  style={styles.textInput}
                                />
                              </>
                            ) : (
                              <>
                                <Text style={styles.addresText}>
                                  {item.address}
                                </Text>
                                <Text>{item.postal_code}</Text>
                              </>
                            )}
                            <View style={styles.addressCardFooter}>
                              <Button
                                iconRight
                                transparent
                                onPress={() =>
                                  this.state.itemToEditID === item.id
                                    ? this.setState({
                                        primaryAddress: item.id,
                                        itemToEditPrimary: item.id,
                                      })
                                    : null
                                }
                                style={
                                  item.primary === 1 ||
                                  this.state.itemToEditPrimary === item.id
                                    ? styles.activePrimaryButton
                                    : styles.addressCardFooterButton
                                }>
                                <View style={{position: 'relative'}}>
                                  {item.primary === 1 ? (
                                    <Text
                                      style={
                                        item.primary === 1 ||
                                        this.state.itemToEditPrimary === item.id
                                          ? styles.primaryText
                                          : styles.addressCardFooterText
                                      }>
                                      Primary
                                    </Text>
                                  ) : (
                                    <View
                                      style={
                                        ([
                                          item.primary === 1 ||
                                          this.state.itemToEditPrimary ===
                                            item.id
                                            ? styles.primaryText
                                            : styles.addressCardFooterText,
                                        ],
                                        {
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                        })
                                      }>
                                      <Text style={{color: "gray"}}>Primary</Text>
                                      <Icon
                                        name="circle"
                                        type="FontAwesome"
                                        style={styles.footerButtonXIcon}
                                      />
                                    </View>
                                  )}
                                </View>
                              </Button>
                              {this.state.itemToEditID === item.id ? (
                                <Button
                                  transparent
                                  onPress={() => {
                                    this.saveAddress(
                                      this.state.itemToEditAddress,
                                      this.state.itemToEditPostalCode,
                                      this.state.itemToEditPrimary === item.id
                                        ? 1
                                        : 0,
                                      this.state.itemToEditID,
                                    );
                                  }}
                                  style={
                                    this.state.itemToEditID === item.id
                                      ? styles.activeEditButton
                                      : styles.addressCardFooterButton
                                  }>
                                  <Text
                                    style={
                                      this.state.itemToEditID === item.id
                                        ? styles.activeEditText
                                        : styles.addressCardFooterText
                                    }>
                                    Save
                                  </Text>
                                </Button>
                              ) : (
                                <Button
                                  transparent
                                  onPress={() =>
                                    this.state.itemToEditID
                                      ? null
                                      : this.setState({
                                          itemToEditID: item.id,
                                          primaryAddress: 0,
                                          itemToEditAddress: item.address,
                                          itemToEditPostalCode:
                                            item.postal_code,
                                        })
                                  }
                                  style={
                                    this.state.itemToEditID === item.id
                                      ? styles.activeEditButton
                                      : styles.addressCardFooterButtonEdit
                                  }>
                                  <Text
                                    style={
                                      this.state.itemToEditID === item.id
                                        ? styles.activeEditText
                                        : styles.addressCardFooterTextEdit
                                    }>
                                    Edit
                                  </Text>
                                </Button>
                              )}
                            </View>
                          </View>
                        );
                      })
                    : null}
                    <View style={{marginTop: 100}}/>
                </ScrollView>
              </View>
            </View>
            <Footers navigation={this.props.navigation} route={'account'} />
          </>
        ) : (
          <Loader />
        )}
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
  },
  headerXbutton: {
    alignSelf: 'flex-end',
    marginTop: _defz.height / 50,
  },
  headerXIcon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    margin: 5,
  },
  container: {
    backgroundColor: '#FAFAFA',
    marginTop: '3%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addressCard: {
    borderColor: '#707070',
    borderWidth: 1,
    elevation: 6,
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 10,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    position: 'relative',
    marginTop: 10,
  },
  activeCard: {
    borderColor: '#3D80F2',
    borderWidth: 3,
    elevation: 6,
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 10,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    position: 'relative',
    marginTop: 10,
  },
  closeEditButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeEditButtonIcon: {
    color: '#707070',
  },
  scrollView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: _defz.height / 3.33,
  },
  addressCardFooter: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2%',
    borderRadius: 10,
    elevation: 6,
    height: 50,
    paddingTop: 10,
    marginTop: _defz.height / 30,
  },
  addressCardFooterButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#707070',
    height: _defz.height / 30,
    backgroundColor: '#fff',
  },
  addressCardFooterButtonEdit: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#707070',
    height: _defz.height / 30,
    backgroundColor: '#C3BCBC',
  },
  addressCardFooterTextEdit: {
    color: '#fff',
    position: 'relative',
  },
  primaryButton: {
    borderColor: '#3D80F2',
    backgroundColor: '#fff',
  },
  primaryText: {
    color: '#3D80F2',
  },
  addressCardFooterText: {
    color: '#C3BCBC',
  },
  activeEditButton: {
    borderColor: '#fff',
    backgroundColor: '#3D80F2',
    borderRadius: 50,
    borderWidth: 1,
    height: _defz.height / 30,
  },
  activePrimaryButton: {
    borderColor: '#3D80F2',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    height: _defz.height / 30,
  },
  activeEditText: {
    color: '#fff',
  },
  textInput: {
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
  },
  addresText: {
    fontSize: 15,
  },
  notPrimaryConainer: {
    position: 'relative',
  },
  footerButtonXIcon: {
    fontSize: 25,
    color: 'silver',
    position: 'relative',
    left: _defz.width / 30,
  },
});

export default wallet;
