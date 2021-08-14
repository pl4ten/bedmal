import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {CardItem, Right, Left, Icon} from 'native-base';
import {styles} from './styles/orders.styles';

import Headers from '../com/header';
import Footers from '../com/footer';
import Loader from '../com/loader';

import {jsonBeautify} from 'beautify-json';
import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';

let _defz = require('../com/def');
class Orders extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      orders: null,
    };
  }

  async getOrders() {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          'user/account/orders?offset=0&limit=100',
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
  componentDidMount() {
    this.getOrders();
  }

  render() {
    return (
      <View style={styles.container}>
        <Headers
          route={'Orders'}
          message={'chat_main'}
          navigation={this.props.navigation}
        />
        <View style={styles.content}>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <ScrollView>
              <View>
                {this.state.orders
                  ? this.state.orders.map(item => {
                      return (
                        <TouchableOpacity
                          style={styles.card}
                          onPress={() =>
                            this.props.navigation.navigate('order', {
                              id: item.id,
                            })
                          }>
                          <Left style={styles.cardLeft}>
                            <Text style={styles.cardTitle}>
                              {item.vendor_info.name}
                            </Text>
                            <Text style={styles.cardTitle}>
                              {item.fulfillment.type}
                            </Text>
                            <Text style={styles.cardFooter}>{item.ref_id}</Text>
                            <Text style={styles.cardFooter}>
                              {item.fulfillment.created_at.slice(0, 10)}
                            </Text>
                            <Text style={styles.cardFooter}>
                              £{item.total_price}
                            </Text>
                          </Left>
                          <Right style={styles.cardRight}>
                            <View style={styles.status}>
                              <View style={styles.circleBlack} />
                              <Text style={styles.statusText}>picked-up</Text>
                            </View>
                            <Icon
                              type="AntDesign"
                              name="arrowright"
                              style={styles.icon}
                            />
                          </Right>
                        </TouchableOpacity>
                      );
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
                    <View style={styles.circleGreen} />
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circlePink} />
                    <Text style={styles.statusText}>preparing</Text>
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circleBlack} />
                    <Text style={styles.statusText}>picked-up</Text>
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circleGreen} />
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circlePink} />
                    <Text style={styles.statusText}>preparing</Text>
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circleBlack} />
                    <Text style={styles.statusText}>picked-up</Text>
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circleGreen} />
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circlePink} />
                    <Text style={styles.statusText}>preparing</Text>
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circleBlack} />
                    <Text style={styles.statusText}>picked-up</Text>
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circleGreen} />
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
              <CardItem style={styles.card}>
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
                    <View style={styles.circlePink} />
                    <Text style={styles.statusText}>preparing</Text>
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
        </View>
        <Footers navigation={this.props.navigation} route={'account'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(Orders);
