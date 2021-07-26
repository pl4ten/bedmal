import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {CardItem, Right, Left, Icon} from 'native-base';

import Headers from '../com/header';
import Footers from '../com/footer';

let _defz = require('../com/def');
class Transactions extends Component {
  render() {
    const navigate = this.props.navigation;
    return (
      <View style={styles.container}>
        <Headers route={'Transactions'} />
        <View style={styles.content}>
          <ScrollView>
            <View>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
              <CardItem style={styles.card}>
                <Left>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Text style={styles.cardTitle}>ApplePay</Text>
                    <Text style={styles.cardTitle}>- £29.12</Text>
                    <Text style={styles.cardFooter}>Date: 02/03/2020</Text>
                    <Text style={styles.cardFooter}>Ref:123-123-123-123</Text>
                  </TouchableOpacity>
                </Left>

                <Right>
                  <TouchableOpacity onPress={() => navigate('transaction')}>
                    <Icon
                      type="AntDesign"
                      name="arrowright"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </View>
            <View style={{marginTop: 100}} />
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
});

export default Transactions;
