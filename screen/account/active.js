import React, {Component} from 'react';

import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, CardItem, Left, Right, Icon} from 'native-base';

import {EmptyGlass, Lid, LidCup, LidSleeveCup, Bag} from '../com/svg-files';

import Footers from '../com/footer';
const _defz = require('../com/def');

class Active extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: 'borrows',
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
              this.state.activeTab === 'orders' ? styles.activeTabButton : null,
              styles.tabButton,
            ]}>
            <Text
              style={[
                this.state.activeTab === 'orders' ? styles.activeTabText : null,
                styles.tabText,
              ]}>
              Orders
            </Text>
          </Button>
        </View>
        {this.state.activeTab === 'borrows' ? (
          <ScrollView style={styles.scrollView}>
            <View>
              <CardItem style={styles.card}>
                <Left style={styles.cardLeft}>
                  <LidCup width={_defz.width / 4} height={_defz.height / 9} />
                  <View style={styles.cardLeftInfo}>
                    <Text style={styles.cardLeftText}>lid</Text>
                    <Text style={styles.cardLeftText}>cup</Text>
                  </View>
                </Left>
                <Right style={styles.cardRight}>
                  <View style={styles.status}>
                    <View style={styles.timeCircleWarn}>
                      <Text style={styles.timeCircleWarnText}>1</Text>
                    </View>
                    <Text style={styles.statusText}>due today</Text>
                  </View>
                </Right>
              </CardItem>
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
                    <View style={styles.timeCircle}>
                      <Text style={styles.timeCircleText}>1</Text>
                    </View>
                    <Text style={styles.statusText}>days to return</Text>
                  </View>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left style={styles.cardLeft}>
                  <Bag width={_defz.width / 4} height={_defz.height / 9} />
                  <View style={styles.cardLeftInfo}>
                    <Text style={styles.cardLeftText}>bag</Text>
                  </View>
                </Left>
                <Right style={styles.cardRight}>
                  <View style={styles.status}>
                    <View style={styles.timeCircle}>
                      <Text style={styles.timeCircleText}>1</Text>
                    </View>
                    <Text style={styles.statusText}>days to return</Text>
                  </View>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left style={styles.cardLeft}>
                  <Lid width={_defz.width / 4} height={_defz.height / 9} />
                  <View style={styles.cardLeftInfo}>
                    <Text style={styles.cardLeftText}>lid</Text>
                  </View>
                </Left>
                <Right style={styles.cardRight}>
                  <View style={styles.status}>
                    <View style={styles.timeCircle}>
                      <Text style={styles.timeCircleText}>1</Text>
                    </View>
                    <Text style={styles.statusText}>days to return</Text>
                  </View>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left style={styles.cardLeft}>
                  <LidSleeveCup
                    width={_defz.width / 4}
                    height={_defz.height / 9}
                  />
                  <View style={styles.cardLeftInfo}>
                    <Text style={styles.cardLeftText}>lid</Text>
                    <Text style={styles.cardLeftText}>sleeve</Text>
                    <Text style={styles.cardLeftText}>cup</Text>
                  </View>
                </Left>
                <Right style={styles.cardRight}>
                  <View style={styles.status}>
                    <View style={styles.timeCircle}>
                      <Text style={styles.timeCircleText}>1</Text>
                    </View>
                    <Text style={styles.statusText}>days to return</Text>
                  </View>
                </Right>
              </CardItem>
            </View>
            <View style={{marginTop: 200}} />
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollView}>
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
                    <View style={styles.circleOrange} />
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
            </View>
            <View style={{marginTop: 200}} />
          </ScrollView>
        )}
        <Footers navigation={this.props.navigation} route={'active'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
  },
  activeTitle: {
    fontSize: 40,
    color: '#707070',
    alignSelf: 'center',
    fontFamily: 'FuturaPT-Medium',
    marginTop: _defz.height / 20,
  },
  tab: {
    width: '70%',
    backgroundColor: '#fff',
    elevation: 6,
    borderRadius: 30,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3D80F2',
  },
  activeTabText: {
    color: '#3D80F2',
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
    alignItems: 'center',
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
  circleOrange: {
    width: 40,
    height: 40,
    backgroundColor: '#F79F28',
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
  statusText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 20,
    color: '#707070',
  },
  timeCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  timeCircleText: {
    color: '#707070',
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
  },
  timeCircleWarn: {
    width: 40,
    height: 40,
    backgroundColor: '#E03174',
    borderRadius: 500,
    marginBottom: _defz.height / 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  timeCircleWarnText: {
    color: '#fff',
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
  },
  cardLeftText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 16,
    color: '#707070',
  },
});
export default Active;
