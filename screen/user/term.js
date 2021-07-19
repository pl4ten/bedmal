import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Alert} from 'react-native';
import {Root} from 'native-base';
import {Button, Icon} from 'native-base';

var Footer = require('../com/footer').default;
var Header = require('../com/header').default;
let _defz = require('../com/def');
const {jsonBeautify} = require('beautify-json');

class Term extends Component {
  constructor() {
    super();
    this.state = {
      terms: null,
    };
  }
  async getTerm(x) {
    try {
      await _defz
        .get_via_token('user/account/terms/info/' + x, 'GET', _defz._token)
        .then(response => {
          console.log(jsonBeautify(response));
          if (response.status === 200) {
            this.setState({terms: response.term});
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
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    let dataItem = navigation.getParam('termId', 'all');
    this.getTerm(dataItem);
  }
  render() {
    return (
      <Root>
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
        <View style={styles.content}>
          <Header
            navigation={this.props.navigation}
            route={
              this.state.terms ? <Text> {this.state.terms.title} </Text> : null
            }
          />
          <ScrollView style={{flexGrow: 0.5}}>
            {this.state.terms ? (
              <Text style={styles.termsText}>{this.state.terms.content}</Text>
            ) : null}
            <View style={{marginTop: 1500}} />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Footer navigation={this.props.navigation} route={'account'} />
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
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
  content: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
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
  scrollView: {
    paddingTop: 20,
  },
  footer: {
    backgroundColor: 'red',
    width: '100%',
    height: 90,
    zIndex: 99999,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  termContent: {
    textAlign: 'justify',
    width: '95%',
    paddingLeft: 5,
    flex: 1,
    backgroundColor: 'white',
  },
  termsText: {
    color: '#707070',
    fontSize: 16,
    width: "92%",
    alignSelf: "center"
  },
});
export default Term;
