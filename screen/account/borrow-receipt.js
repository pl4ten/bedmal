import React, {Component} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import {styles} from './styles/borrow-receipt.styles';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';
import {jsonBeautify} from 'beautify-json';
import Loader from '../com/loader';
import Headers from '../com/header';
import Footers from '../com/footer';

import {LidCup, LidSleeveCup, Bag, EmptyGlass} from '../com/svg-files';

let _defz = require('../com/def');
class BorrowReceipt extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  async getBorrowReceipt(id) {
    try {
      this.setState({isLoading: true});
      await _defz
        .get_via_token(
          `user/account/borrow-receipts/info/${id}`,
          'GET',
          this.props.token,
        )
        .then(response => {
          this.setState({isLoading: false});
          console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({
              //   borrowReceipts: response.transactions,
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
    this.getBorrowReceipt();
  }
  render() {
    return (
      <View style={styles.container}>
        <Headers
          route={'Tulip Cafe'}
          navigation={this.props.navigation}
          message
        />
        <View style={styles.content}>
          <View style={styles.head}>
            <Text style={styles.headText} numberOfLines={1}>
              32 Hampstead High Street, Hampstead, London, NW3 4UU
            </Text>
            <View style={styles.headBottom}>
              <Text style={styles.headText}>Borrow receipt TC2003021536</Text>
              <Text style={styles.headText}>02/03/2020 | 15:36</Text>
            </View>
          </View>
          <View style={styles.main}>
            <Text style={styles.mainTitle}>Borrowed</Text>
            <ScrollView
              horizontal={true}
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.card}>
                <EmptyGlass width={_defz.width / 4} height={_defz.height / 7} />
                <Text style={styles.borrowedNumber}>1</Text>
              </View>
              <View style={styles.card}>
                <LidCup width={_defz.width / 4} height={_defz.height / 7} />
                <Text style={styles.borrowedNumber}>1</Text>
              </View>
              <View style={styles.card}>
                <LidSleeveCup
                  width={_defz.width / 4}
                  height={_defz.height / 7}
                />
                <Text style={styles.borrowedNumber}>1</Text>
              </View>
              <View style={styles.card}>
                <Bag width={_defz.width / 4} height={_defz.height / 7} />
                <Text style={styles.borrowedNumber}>1</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.main}>
            <Text style={styles.mainTitle}>Returned</Text>
            <View style={styles.returned}>
              <Text style={styles.returnedText}>b.Cups </Text>
              <View style={styles.returnedItems}>
                <View style={styles.returnedItem}>
                  <View style={styles.circle}>
                    <Text style={styles.circleNumber}>1</Text>
                  </View>
                  <Text style={styles.returnedItemText}>sleeve</Text>
                </View>
                <View style={styles.returnedItem}>
                  <View style={styles.circle}>
                    <Text style={styles.circleNumber}>1</Text>
                  </View>
                  <Text style={styles.returnedItemText}>sleeve</Text>
                </View>
                <View style={styles.returnedItem}>
                  <View style={styles.circle}>
                    <Text style={styles.circleNumber}>1</Text>
                  </View>
                  <Text style={styles.returnedItemText}>sleeve</Text>
                </View>
              </View>
            </View>

            <View style={styles.returned}>
              <Text style={styles.returnedText}>b.Bags </Text>
              <View style={styles.returnedItems}>
                <View style={styles.returnedBag}>
                  <View style={styles.circle}>
                    <Text style={styles.circleNumber}>1</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Footers navigation={this.props.navigation} route={'account'} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(BorrowReceipt);
