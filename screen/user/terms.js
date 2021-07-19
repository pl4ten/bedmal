import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {CardItem, Right, Left, Icon, Button} from 'native-base';

var Footer = require('../com/footer').default;
var Header = require('../com/header').default;
let _defz = require('../com/def');

const {jsonBeautify} = require('beautify-json');

class Terms extends Component {
  constructor() {
    super();
    this.state = {
      terms: [],
    };
  }
  async getTerms() {
    try {
      await _defz
        .get_via_token('user/account/terms', 'GET', _defz._token)
        .then(response => {
          console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({terms: response.terms});
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
    this.getTerms();
  }
  render() {
    const {navigate} = this.props.navigation;
    console.log(this.props.navigation);
    return (
      <View style={styles.termsContainer}>
        <View style={styles.header}>
          <Button
            transparent
            style={styles.headerButton}
            onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="closecircleo"
              type="AntDesign"
              style={styles.headerCloseIcon}
            />
          </Button>
        </View>
        <View style={styles.scrollViewContainer}>
          <Header navigation={this.props.navigation} route={'Terms'} />
          <ScrollView style={styles.scrollView}>
            <View>
              {this.state.terms
                ? this.state.terms.map(item => (
                    <CardItem style={styles.cardItem}>
                      <Left>
                        <TouchableOpacity
                          onPress={() => navigate('Term', {termId: item.id})}>
                          <Text>{item.title}</Text>
                        </TouchableOpacity>
                      </Left>

                      <Right>
                        <TouchableOpacity
                          onPress={() => navigate('Term', {termId: item.id})}>
                          <Icon
                            type="AntDesign"
                            name="arrowright"
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      </Right>
                    </CardItem>
                  ))
                : null}
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Footer navigation={this.props.navigation} route={'account'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  termsContainer: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '102%',
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 100,
  },
  headerCloseIcon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    zIndex: 100,
  },
  headerButton: {
    alignSelf: 'flex-end',
    zIndex: 100,
  },
  scrollViewContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    paddingTop: 20,
  },
  cardItem: {
    marginTop: 20,
    height: 60,
  },
  footer: {
    width: '100%',
    height: 90,
    zIndex: 99999,
    marginTop: 'auto',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Terms;
