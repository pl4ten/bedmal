import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Modal} from 'react-native';
import {CardItem, Right, Left, Button} from 'native-base';
import {styles} from './styles/order.styles';
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
        <Headers
          route={'Order'}
          message={'chat_main'}
          navigation={this.props.navigation}
        />
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

export default Order;
