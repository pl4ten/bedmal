import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CardItem, Right, Left, Body, Icon } from 'native-base';

import Headers from '../com/header';
import Footers from '../com/footer';

let _defz = require('../com/def');
class Orders extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Headers route={'Orders'} message />
        <View style={styles.content}>
          <ScrollView>
            <View>
              <CardItem style={styles.card}>
                <Left style={styles.cardLeft}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
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
                    onPress={() =>
                      this.props.navigation.navigate('transaction')
                    }>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </View>
            <View style={{ marginTop: 200 }} />
          </ScrollView>
        </View>
        <Footers navigation={this.props.navigation} route={'account'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
  },
  card: {
    marginTop: _defz.height / 50,
    minHeight: _defz.height / 10,
  },
  cardTitle: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 18,
    color: '#707070',
  },
  cardFooter: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 18,
    color: '#C3BCBC',
  },
  cardLeft: {
    flex: 2,
  },
  cardRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  status: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: _defz.width / 4,
  },
  circleBlack: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
  },
  circleGreen: {
    width: 40,
    height: 40,
    backgroundColor: '#08D18C',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
  },
  circlePink: {
    width: 40,
    height: 40,
    backgroundColor: '#E03174',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
  },
  statusText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
    color: '#707070',
  },
});
export default Orders;
