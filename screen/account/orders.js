import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {CardItem, Right, Left, Icon, Button} from 'native-base';
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
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <View style={styles.main}>
            <View style={styles.heading}>
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
            </View>
            <Headers
              route={'Orders'}
              message={'chat_main'}
              navigation={this.props.navigation}
            />
            <View style={styles.content}>
              <ScrollView>
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
                              {item.fulfillment.type.split('_').join('-')}
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
                              <View
                                style={
                                  item.status === 'pending' ||
                                  item.status === 'not_payed' ||
                                  item.status === 'preparing '
                                    ? styles.circlePink
                                    : item.status === 'accepted'
                                    ? styles.circlePink
                                    : item.status === 'rejected' ||
                                      item.status === 'canceled' ||
                                      item.status === 'picked_up' ||
                                      item.status === 'delivered'
                                    ? styles.circleBlack
                                    : item.status === 'ready_to_pickup' ||
                                      item.status === 'being_delivered'
                                    ? styles.circleGreen
                                    : null
                                }
                              />
                              <Text style={styles.statusText}>
                                {item.status.split('_').join('-')}
                              </Text>
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
              </ScrollView>
              <View style={{marginBottom: 300,}} />
            </View>
          </View>
        )}
        <Footers navigation={this.props.navigation} route={'account'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(Orders);
