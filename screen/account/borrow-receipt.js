import React, {Component} from 'react';
import {Text, View, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {CardItem, Right, Left, Button, Root, Icon} from 'native-base';
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
      vendor_info: null,
      borrowReceipts: null,
      activeBorrwed: null,
    };
  }

  async getBorrowReceipt(id) {
    console.log(id);
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
              borrowReceipts: response.borrow_receipts,
              activeBorrwed: response.borrow_receipts[0],
              vendor_info: response.vendor_info,
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
    let id = this.props.navigation.state.params.id;
    this.getBorrowReceipt(id);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.vendor_info && this.state.borrowReceipts ? (
          <View style={styles.content}>
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
              <Headers
                route={
                  this.state.vendor_info ? this.state.vendor_info.name : null
                }
                navigation={this.props.navigation}
                message
              />
            </View>
            <View style={styles.head}>
              <Text style={styles.headText} numberOfLines={1}>
                {this.state.vendor_info.address}
              </Text>
              <View style={styles.headBottom}>
                {this.state.activeBorrwed ? (
                  <>
                    <Text style={styles.headText}>
                      Borrow receipt {this.state.activeBorrwed.ref_id}
                    </Text>
                    <Text style={styles.headText}>
                      {this.state.activeBorrwed.due.split('T')[0]} |{' '}
                      {this.state.activeBorrwed.due.split('T')[1].slice(0, 8)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.headText}>Borrow receipt</Text>
                    <Text style={styles.headText} />
                  </>
                )}
              </View>
            </View>
            <ScrollView>
              <View style={styles.main}>
                <Text style={styles.mainTitle}>Borrowed</Text>
                <ScrollView
                  horizontal={true}
                  style={styles.scrollView}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.borrowReceipts.map(item => {
                    if (item.lid && item.sleeve && item.cup) {
                      return (
                        <TouchableOpacity
                          style={styles.card}
                          activeOpacity={1}
                          onPress={() => {
                            this.setState({activeBorrwed: item});
                          }}>
                          <LidSleeveCup
                            width={_defz.width / 4}
                            height={_defz.height / 7}
                          />
                          <Text style={styles.borrowedNumber}>
                            {item.count}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                    if (item.lid && item.cup && !item.sleeve) {
                      return (
                        <TouchableOpacity
                          style={styles.card}
                          activeOpacity={1}
                          onPress={() => {
                            this.setState({activeBorrwed: item});
                          }}>
                          <LidCup
                            width={_defz.width / 4}
                            height={_defz.height / 7}
                          />
                          <Text style={styles.borrowedNumber}>
                            {item.count}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                    if (!item.lid && !item.sleeve && item.cup) {
                      return (
                        <TouchableOpacity
                          style={styles.card}
                          activeOpacity={1}
                          onPress={() => {
                            this.setState({activeBorrwed: item});
                          }}>
                          <EmptyGlass
                            width={_defz.width / 4}
                            height={_defz.height / 7}
                          />
                          <Text style={styles.borrowedNumber}>
                            {item.count}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                    if (!item.lid && !item.sleeve && !item.cup && item.bag) {
                      return (
                        <TouchableOpacity
                          style={styles.card}
                          activeOpacity={1}
                          onPress={() => {
                            this.setState({activeBorrwed: item});
                          }}>
                          <Bag
                            width={_defz.width / 4}
                            height={_defz.height / 7}
                          />
                          <Text style={styles.borrowedNumber}>
                            {item.count}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
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
              <View style={{marginTop: 100}} />
            </ScrollView>
          </View>
        ) : null}
        <Footers navigation={this.props.navigation} route={'account'} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(BorrowReceipt);
