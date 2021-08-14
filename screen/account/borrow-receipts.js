import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {CardItem, Right, Left, Icon} from 'native-base';
import {styles} from './styles/borrow-receipts.styles';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';
import {jsonBeautify} from 'beautify-json';
import Loader from '../com/loader';
import Headers from '../com/header';
import Footers from '../com/footer';

let _defz = require('../com/def');
class BorrowReceipts extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      borrowReceipts: null,
    };
  }

  async getBorrowReceipts() {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          'user/account/transactions?offset=0&limit=30',
          'GET',
          this.props.token,
        )
        .then(response => {
          this.setState({isLoading: false});
          console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({
              borrowReceipts: response.transactions,
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
    this.getBorrowReceipts();
  }
  render() {
    return (
      <View style={styles.container}>
        <Headers route={'Borrow receipts'} navigation={this.props.navigation} />
        <View style={styles.content}>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <ScrollView>
              <View>
                {this.state.borrowReceipts
                  ? this.state.borrowReceipts.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('borrowReceipt', {
                              id: item.id,
                            })
                          }
                          style={styles.card}>
                          <Left>
                            {/* <Text style={styles.cardTitle}>ApplePay</Text> */}
                            <Text style={styles.cardTitle}>
                              {item.total_price}
                            </Text>
                            <Text style={styles.cardFooter}>
                              Date: {item.created_at.slice(0, 10)}
                            </Text>
                          </Left>

                          <Right>
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
              </View>
              <View style={{marginTop: 100}} />
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
export default connect(mapStateToProps)(BorrowReceipts);
