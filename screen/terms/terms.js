import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';

import {CardItem, Right, Left, Icon, Button} from 'native-base';

import {selectUserToken} from '../../redux/user/user.selectors';
import {connect} from 'react-redux';

var Footer = require('../com/footer').default;
var Header = require('../com/header').default;
let _defz = require('../com/def');

const {jsonBeautify} = require('beautify-json');
import {styles} from './styles/terms.styles';

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
        .get_via_token('user/account/terms', 'GET', this.props.token)
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
                    <TouchableOpacity
                      onPress={() => navigate('Term', {termId: item.id})}>
                      <CardItem style={styles.cardItem}>
                        <Left>
                          <TouchableOpacity
                            onPress={() => navigate('Term', {termId: item.id})}>
                            <Text style={{fontFamily: 'FuturaPT-Medium'}}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        </Left>

                        <Right>
                          <TouchableOpacity
                            onPress={() => navigate('Term', {termId: item.id})}>
                            <Icon
                              type="AntDesign"
                              name="arrowright"
                              style={{color: '#707070'}}
                            />
                          </TouchableOpacity>
                        </Right>
                      </CardItem>
                    </TouchableOpacity>
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
const mapStateToProps = state => ({
  token: selectUserToken(state),
});
export default connect(mapStateToProps)(Terms);
