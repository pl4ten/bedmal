import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {CardItem, Right, Left, Icon, Button} from 'native-base';
import {styles} from './styles/transactions.styles';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';
import {jsonBeautify} from 'beautify-json';
import Loader from '../com/loader';
import Headers from '../com/header';
import Footers from '../com/footer';

let _defz = require('../com/def');
class Transactions extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      transactions: null,
    };
  }

  async getTransactions() {
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
              transactions: response.transactions,
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
    this.getTransactions();
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
              route={'Transactions'}
              navigation={this.props.navigation}
            />
            <ScrollView style={{height:_defz.height,backgroundColor: '#FAFAFA'}}>
              <View style={styles.content}>
                {this.state.transactions
                  ? this.state.transactions.map(item => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('transaction', {
                              id: item.id,
                            })
                          }
                          style={styles.card}>
                          <Left>
                            {/* <Text style={styles.cardTitle}>ApplePay</Text> */}
                            <Text style={styles.cardTitle}>
                              £{item.total_price}
                            </Text>
                            <Text style={styles.cardFooter}>
                              Date: {item.created_at.slice(0, 10)}
                            </Text>
                            <Text style={styles.cardFooter}>
                              Ref:{item.ref_id}
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
export default connect(mapStateToProps)(Transactions);
