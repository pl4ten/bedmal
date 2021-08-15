import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Button, CardItem, Left, Right, Icon} from 'native-base';

import {styles} from './styles/active.styles';

import {EmptyGlass, Lid, LidCup, LidSleeveCup, Bag} from '../com/svg-files';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';

import Footers from '../com/footer';
import {jsonBeautify} from 'beautify-json';
import Loader from '../com/loader';

const _defz = require('../com/def');

class Active extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      activeTab: 'borrows',
      orders: null,
      borrows: null,
    };
  }
  async getActivesOrders() {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          'user/active/orders?offset=0&limit=100',
          'GET',
          this.props.token,
        )
        .then(response => {
          this.setState({isLoading: false});
          console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({
              orders: response.orders,
            });
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
  async getActiveBorrows() {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          'user/active/borrow-receipts?offset=0&limit=100',
          'GET',
          this.props.token,
        )
        .then(response => {
          this.setState({isLoading: false});
          console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({
              borrows: response.borrow_receipts,
            });
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
    this.getActivesOrders();
    this.getActiveBorrows();
  }

  timeDetector(date) {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            <Text style={styles.activeTitle}>Active</Text>
            <View style={styles.tab}>
              <Button
                onPress={() => this.setState({activeTab: 'borrows'})}
                transparent
                style={[
                  this.state.activeTab === 'borrows'
                    ? styles.activeTabButton
                    : null,
                  styles.tabButton,
                ]}>
                <Text
                  style={[
                    this.state.activeTab === 'borrows'
                      ? styles.activeTabText
                      : null,
                    styles.tabText,
                  ]}>
                  Borrows
                </Text>
              </Button>
              <Button
                onPress={() => this.setState({activeTab: 'orders'})}
                transparent
                style={[
                  this.state.activeTab === 'orders'
                    ? styles.activeTabButton
                    : null,
                  styles.tabButton,
                ]}>
                <Text
                  style={[
                    this.state.activeTab === 'orders'
                      ? styles.activeTabText
                      : null,
                    styles.tabText,
                  ]}>
                  Orders
                </Text>
              </Button>
            </View>
            {this.state.activeTab === 'borrows' ? (
              <ScrollView style={styles.scrollView}>
                <View>
                  {this.state.borrows
                    ? this.state.borrows.map(item => {
                        if (item.lid && item.sleeve && item.cup) {
                          return (
                            <CardItem style={styles.card}>
                              <Left style={styles.cardLeft}>
                                <LidSleeveCup
                                  width={_defz.width / 4}
                                  height={_defz.height / 9}
                                />
                                <View style={styles.cardLeftInfo}>
                                  <Text style={styles.cardLeftText}>lid</Text>
                                  <Text style={styles.cardLeftText}>
                                    sleeve
                                  </Text>
                                  <Text style={styles.cardLeftText}>cup</Text>
                                </View>
                              </Left>
                              <Right style={styles.cardRight}>
                                <View style={styles.status}>
                                  <View
                                    style={
                                      this.timeDetector(item.due) > 2
                                        ? styles.timeCircle
                                        : styles.timeCircleWarn
                                    }>
                                    <Text
                                      style={
                                        this.timeDetector(item.due) > 2
                                          ? styles.timeCircleText
                                          : styles.timeCircleWarnText
                                      }>
                                      {this.timeDetector(item.due)}
                                    </Text>
                                  </View>
                                  <Text style={styles.statusText}>
                                    days to return
                                  </Text>
                                </View>
                              </Right>
                            </CardItem>
                          );
                        }
                        if (item.lid && item.cup && !item.sleeve) {
                          return (
                            <CardItem style={styles.card}>
                              <Left style={styles.cardLeft}>
                                <LidCup
                                  width={_defz.width / 4}
                                  height={_defz.height / 9}
                                />
                                <View style={styles.cardLeftInfo}>
                                  <Text style={styles.cardLeftText}>lid</Text>
                                  <Text style={styles.cardLeftText}>cup</Text>
                                </View>
                              </Left>
                              <Right style={styles.cardRight}>
                                <View style={styles.status}>
                                  <View
                                    style={
                                      this.timeDetector(item.due) > 2
                                        ? styles.timeCircle
                                        : styles.timeCircleWarn
                                    }>
                                    <Text
                                      style={
                                        this.timeDetector(item.due) > 2
                                          ? styles.timeCircleText
                                          : styles.timeCircleWarnText
                                      }>
                                      {this.timeDetector(item.due)}
                                    </Text>
                                  </View>
                                  <Text style={styles.statusText}>
                                    {this.timeDetector(item.due) > 2
                                      ? 'days to return'
                                      : 'due today'}
                                  </Text>
                                </View>
                              </Right>
                            </CardItem>
                          );
                        }
                        if (!item.lid && !item.sleeve && item.cup) {
                          return (
                            <CardItem style={styles.card}>
                              <Left style={styles.cardLeft}>
                                <EmptyGlass
                                  width={_defz.width / 4}
                                  height={_defz.height / 9}
                                />
                                <View style={styles.cardLeftInfo}>
                                  <Text style={styles.cardLeftText}>cup</Text>
                                </View>
                              </Left>
                              <Right style={styles.cardRight}>
                                <View style={styles.status}>
                                  <View
                                    style={
                                      this.timeDetector(item.due) > 2
                                        ? styles.timeCircle
                                        : styles.timeCircleWarn
                                    }>
                                    <Text
                                      style={
                                        this.timeDetector(item.due) > 2
                                          ? styles.timeCircleText
                                          : styles.timeCircleWarnText
                                      }>
                                      {this.timeDetector(item.due)}
                                    </Text>
                                  </View>
                                  <Text style={styles.statusText}>
                                    {this.timeDetector(item.due) > 2
                                      ? 'days to return'
                                      : 'due today'}
                                  </Text>
                                </View>
                              </Right>
                            </CardItem>
                          );
                        }
                        if (
                          !item.lid &&
                          !item.sleeve &&
                          !item.cup &&
                          item.bag
                        ) {
                          return (
                            <CardItem style={styles.card}>
                              <Left style={styles.cardLeft}>
                                <Bag
                                  width={_defz.width / 4}
                                  height={_defz.height / 9}
                                />
                                <View style={styles.cardLeftInfo}>
                                  <Text style={styles.cardLeftText}>bag</Text>
                                </View>
                              </Left>
                              <Right style={styles.cardRight}>
                                <View style={styles.status}>
                                  <View
                                    style={
                                      this.timeDetector(item.due) > 2
                                        ? styles.timeCircle
                                        : styles.timeCircleWarn
                                    }>
                                    <Text
                                      style={
                                        this.timeDetector(item.due) > 2
                                          ? styles.timeCircleText
                                          : styles.timeCircleWarnText
                                      }>
                                      {this.timeDetector(item.due)}
                                    </Text>
                                  </View>
                                  <Text style={styles.statusText}>
                                    {this.timeDetector(item.due) > 2
                                      ? 'days to return'
                                      : 'due today'}
                                  </Text>
                                </View>
                              </Right>
                            </CardItem>
                          );
                        }
                        if (
                          item.lid &&
                          !item.sleeve &&
                          !item.cup &&
                          !!item.bag
                        ) {
                          return (
                            <CardItem style={styles.card}>
                              <Left style={styles.cardLeft}>
                                <Lid
                                  width={_defz.width / 4}
                                  height={_defz.height / 9}
                                />
                                <View style={styles.cardLeftInfo}>
                                  <Text style={styles.cardLeftText}>lid</Text>
                                </View>
                              </Left>
                              <Right style={styles.cardRight}>
                                <View style={styles.status}>
                                  <View
                                    style={
                                      this.timeDetector(item.due) > 2
                                        ? styles.timeCircle
                                        : styles.timeCircleWarn
                                    }>
                                    <Text
                                      style={
                                        this.timeDetector(item.due) > 2
                                          ? styles.timeCircleText
                                          : styles.timeCircleWarnText
                                      }>
                                      {this.timeDetector(item.due)}
                                    </Text>
                                  </View>
                                  <Text style={styles.statusText}>
                                    {this.timeDetector(item.due) > 2
                                      ? 'days to return'
                                      : 'due today'}
                                  </Text>
                                </View>
                              </Right>
                            </CardItem>
                          );
                        }
                      })
                    : null}
                </View>
                <View style={{marginTop: 200}} />
              </ScrollView>
            ) : (
              <ScrollView style={styles.scrollView}>
                <View>
                  {this.state.orders
                    ? this.state.orders.map(item => {
                        if (item.status === 'ready_to_pickup') {
                          return (
                            <CardItem style={styles.card}>
                              <Left style={styles.cardLeft}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.props.navigation.navigate('order')
                                  }>
                                  <Text style={styles.cardTitle}>
                                    {item.vendor_info.name}
                                  </Text>
                                  <Text style={styles.cardTitle}>
                                    {item.fulfillment
                                      ? 'Collection'
                                      : 'Delivery'}
                                  </Text>
                                  <Text style={styles.cardFooter}>
                                    {item.ref_id}
                                  </Text>
                                  <Text style={styles.cardFooter}>
                                    {'item.created_at.slice(0, 10)'}
                                  </Text>
                                  <Text style={styles.cardFooter}>
                                    £{item.total_price}
                                  </Text>
                                </TouchableOpacity>
                              </Left>
                              <Right style={styles.cardRight}>
                                <View style={styles.status}>
                                  <View style={styles.circleGreen} />
                                  <Text style={styles.statusText}>
                                    pick-up now
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.props.navigation.navigate('order')
                                  }>
                                  <Icon
                                    type="AntDesign"
                                    name="arrowright"
                                    style={styles.icon}
                                  />
                                </TouchableOpacity>
                              </Right>
                            </CardItem>
                          );
                        }
                      })
                    : null}

                  {/* <CardItem style={styles.card}>
                    <Left style={styles.cardLeft}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('order')}>
                        <Text style={styles.cardTitle}>
                          Tulip Cafe of Hampstead
                        </Text>
                        <Text style={styles.cardTitle}>Collection</Text>
                        <Text style={styles.cardFooter}>TC-200302LJS1</Text>
                        <Text style={styles.cardFooter}>02/03/2020</Text>
                        <Text style={styles.cardFooter}>£59.60</Text>
                      </TouchableOpacity>
                    </Left>
                    <Right style={styles.cardRight}>
                      <View style={styles.status}>
                        <View style={styles.circleOrange} />
                        <Text style={styles.statusText}>pick-up now</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('order')}>
                        <Icon
                          type="AntDesign"
                          name="arrowright"
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                 */}
                </View>
                <View style={{marginTop: 200}} />
              </ScrollView>
            )}
            <Footers navigation={this.props.navigation} route={'active'} />
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(Active);
