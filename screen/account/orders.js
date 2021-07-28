import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {CardItem, Right, Left, Icon} from 'native-base';
import {styles} from './styles/orders.styles';
import Headers from '../com/header';
import Footers from '../com/footer';

let _defz = require('../com/def');
class Orders extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Headers
          route={'Orders'}
          message={'chat_main'}
          navigation={this.props.navigation}
        />
        <View style={styles.content}>
          <ScrollView>
            <View>
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
            </View>
            <View style={{marginTop: 200}} />
          </ScrollView>
        </View>
        <Footers navigation={this.props.navigation} route={'account'} />
      </View>
    );
  }
}

export default Orders;
