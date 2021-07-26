import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Modal} from 'react-native';
import {CardItem, Right, Left, Button} from 'native-base';

import Headers from '../com/header';
import Footers from '../com/footer';

let _defz = require('../com/def');
class Order extends Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Headers route={'Order'} message />
        <View style={styles.content}>
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoText}>Date</Text>
              <Text style={styles.infoText}>Seller</Text>
              <Text style={styles.infoText}>Order</Text>
              <Text style={styles.infoText}>Transaction</Text>
              <Text style={styles.infoText}>Delivery</Text>
            </View>
            <View style={styles.infoRight}>
              <Text style={styles.infoText}>17 February 2021</Text>
              <Text style={styles.infoText}>Tulips Cafe - NW3 4UU</Text>
              <Text style={styles.infoText}>TC-LJS-210217-1</Text>
              <Text style={styles.infoTextBlue}>123-123-123-123</Text>
              <Text style={styles.infoTextAddress} numberOfLines={3}>
                32 Brondesbury Rd, Brondesbury, London, MW4 6DU 32 Brondesbury
                Rd, Brondesbury, London, MW4 6DU
              </Text>
            </View>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusBoxText}>Status</Text>
            <Text style={styles.statusPink}>pending</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusBoxText}>Status</Text>
            <Text style={styles.statusOrange}>order accepted</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusBoxText}>Status</Text>
            <Text style={styles.statusGreen}>on its way</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusBoxText}>Status</Text>
            <Text style={styles.statusGreen}>pick-up now</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusBoxText}>Status</Text>
            <Text style={styles.statusBlack}>cancelled</Text>
          </View>
          <Button
            style={styles.cancelBtn}
            transparent
            onPress={() => this.setState({modalVisible: true})}>
            <Text style={styles.cancelBtnText}>Cancel order?</Text>
          </Button>
          <ScrollView>
            <View>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <View style={styles.cardLeft}>
                    <Text style={styles.count}>1</Text>
                    <Text style={styles.cardTitle}>
                      Tulip Cafe of Hampstead
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text style={styles.cardPrice}>£2.45</Text>
                </Right>
              </CardItem>
            </View>
            <View style={{marginTop: 200}} />
          </ScrollView>
        </View>
        <Footers navigation={this.props.navigation} route={'account'} />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false});
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  Are you sure you wish to cancel?
                </Text>
                <View style={styles.modalButtons}>
                  <Button transparent>
                    <Text style={styles.yesText}>yes</Text>
                  </Button>
                  <Button
                    transparent
                    onPress={() => this.setState({modalVisible: false})}>
                    <Text style={styles.noText}>no</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
  },
  card: {
    marginTop: _defz.height / 50,
    minHeight: _defz.height / 10,
    paddingLeft: _defz.width / 20,
    paddingRight: _defz.width / 20,
  },
  cardTitle: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
    marginLeft: _defz.width / 15,
  },
  count: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
  },
  cardFooter: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 18,
    color: '#C3BCBC',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  infoText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
  },
  infoTextBlue: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#3D80F2',
  },
  infoTextAddress: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
    maxWidth: _defz.width / 1.5,
  },
  infoRight: {
    marginLeft: _defz.width / 30,
  },
  cardLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  statusBox: {
    width: '85%',
    backgroundColor: '#fff',
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: _defz.height / 50,
    paddingTop: '4%',
  },
  statusBoxText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
    color: '#707070',
  },
  statusPink: {
    backgroundColor: '#E03174',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  statusOrange: {
    backgroundColor: '#F79F28',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  statusGreen: {
    backgroundColor: '#08D18C',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  statusBlack: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 4,
    minWidth: _defz.width / 3,
    textAlign: 'center',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
  },
  cardPrice: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 15,
    color: '#707070',
  },
  cancelBtn: {
    alignSelf: 'center',
    marginTop: _defz.height / 70,
  },
  cancelBtnText: {
    fontFamily: 'FuturaPT-Medium',
    color: '#3D80F2',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    position: 'relative',
  },
  modalTitle: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
    color: '#E03174',
  },
  modalButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: _defz.height / 30,
  },
  yesText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
    color: '#C3BCBC',
  },
  noText: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 20,
    color: '#707070',
  },
});
export default Order;
