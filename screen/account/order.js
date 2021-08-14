import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Modal, Alert} from 'react-native';
import {CardItem, Right, Left, Button} from 'native-base';
import {styles} from './styles/order.styles';

import Headers from '../com/header';
import Footers from '../com/footer';
import Loader from '../com/loader';

import {jsonBeautify} from 'beautify-json';
import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';

let _defz = require('../com/def');

class Order extends Component {
  constructor() {
    super();

    this.state = {
      modalVisible: false,
      isLoading: false,
      order: null,
      products: null,
      totalPrice: null,
      deliveryCost: null,
      freeDeliveryCostOver: null,
    };
  }

  async getOrder(id) {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          `user/account/orders/info/${id}?offset=0&limit=100`,
          'GET',
          this.props.token,
        )
        .then(response => {
          this.setState({isLoading: false});
          console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({
              order: response.order,
              products: response.products,
            });
            if (response.order.fulfillment.type === 'nationwide_delivery') {
              this.setState({
                deliveryCost: response.order.fulfillment.data.nationwide_cost,
                freeDeliveryCostOver:
                  response.order.fulfillment.data.nationwide_free_over,
              });
            } else if (response.order.fulfillment.type === 'local_delivery') {
              this.setState({
                deliveryCost: response.order.fulfillment.data.local_cost,
                freeDeliveryCostOver:
                  response.order.fulfillment.data.local_cost,
              });
            } else {
              this.setState({
                deliveryCost: null,
                freeDeliveryCostOver: null,
              });
            }
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
  componentDidMount() {
    let id = this.props.navigation.state.params.id;
    this.getOrder(id);
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
          {this.state.isLoading ? (
            <Loader />
          ) : this.state.order && this.state.products ? (
            <>
              <View style={styles.info}>
                <View style={styles.infoLeft}>
                  <Text style={styles.infoText}>Date</Text>
                  <Text style={styles.infoText}>Seller</Text>
                  <Text style={styles.infoText}>Order</Text>
                  <Text style={styles.infoText}>Transaction</Text>
                  <Text style={styles.infoText}>
                    {this.state.order.fulfillment.type === 'pickup'
                      ? 'Collect'
                      : 'Delivery'}
                  </Text>
                </View>
                <View style={styles.infoRight}>
                  <Text style={styles.infoText}>
                    {this.state.order.created_at.slice(0, 10)}
                  </Text>
                  <Text style={styles.infoText}>
                    {this.state.order.vendor_info.name} -{' '}
                    {this.state.order.vendor_info.postal_code}
                  </Text>
                  <Text style={styles.infoText}>{this.state.order.ref_id}</Text>
                  <Text style={styles.infoTextBlue}>
                    £{this.state.order.total_price}
                  </Text>
                  <Text style={styles.infoTextAddress} numberOfLines={3}>
                    {this.state.order.fulfillment.type === 'pickup'
                      ? this.state.order.vendor_info.address
                      : 'Delivery'}
                  </Text>
                </View>
              </View>
              {/* <View style={styles.statusBox}>
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
               */}
              <Button
                style={styles.cancelBtn}
                transparent
                onPress={() => this.setState({modalVisible: true})}>
                <Text style={styles.cancelBtnText}>Cancel order?</Text>
              </Button>
              <ScrollView>
                <View>
                  {this.state.products.map(item => {
                    return (
                      <CardItem style={styles.card}>
                        <Left>
                          <View style={styles.cardLeft}>
                            <Text style={styles.count}>{item.count}</Text>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                          </View>
                        </Left>
                        <Right>
                          <Text style={styles.cardPrice}>£{item.price}</Text>
                        </Right>
                      </CardItem>
                    );
                  })}
                </View>
                <View style={styles.footer}>
                  <View style={styles.footerRow}>
                    {this.state.order.fulfillment.type === 'pickup' ? null : (
                      <>
                        <Text style={styles.footerRowText1}>Delivery</Text>
                        <Text style={styles.footerRowText2}>
                          {this.state.order.total_price >
                          this.state.freeDeliveryCostOver
                            ? 'free'
                            : `£${this.state.deliveryCost}`}
                        </Text>
                      </>
                    )}
                  </View>
                  <View style={styles.footerRow}>
                    <Text style={styles.footerRowText1}>Total</Text>
                    <Text style={styles.footerRowText2}>
                      £{this.state.order.total_price}
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: 200}} />
              </ScrollView>
            </>
          ) : null}
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

const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(Order);
