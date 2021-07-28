import React from 'react';
import {StyleSheet, Image, ImageBackground, View, Text} from 'react-native';

import {I18nManager} from 'react-native';
import {Root} from 'popup-ui';

import AsyncStorage from '@react-native-community/async-storage';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import signup from './screen/auth/signup';
import userprofile from './screen/profile/Profile';
import usermain from './screen/main/usermain';
import login from './screen/auth/login';
import forget from './screen/auth/forget';
import home from './screen/main/home';
import account from './screen/profile/account';
import chat_main from './screen/chat/chat_main';
import chat_one from './screen/chat/chat_one';
import wallet from './screen/profile/wallet';
import StoreFront from './screen/shop/store-front';
import Product from './screen/shop/product';
import Terms from './screen/terms/terms';
import Term from './screen/terms/term';
import SearchProduct from './screen/shop/search-product';
import Bag from './screen/shop/bag';
import verify from './screen/auth/verify';
import password from './screen/profile/password';

import Transactions from './screen/account/transactions';
import Transaction from './screen/account/transaction';
import Orders from './screen/account/orders';
import Order from './screen/account/order';
import Active from './screen/account/active';
import OnDemand from './screen/account/onDemand';

import Addresses from './screen/profile/addresses';
let _defz = require('./screen/com/def');
const RootStack = createStackNavigator(
  {
    signup: signup,
    userprofile: userprofile,
    usermain: usermain,
    login: login,
    forget: forget,
    account: account,
    wallet: wallet,
    chat_main: chat_main,
    chat_one: chat_one,
    home: home,
    storeFront: StoreFront,
    Product: Product,
    Terms: Terms,
    Term: Term,
    searchProduct: SearchProduct,
    Addresses: Addresses,
    bag: Bag,
    verify: verify,
    password: password,
    transactions: Transactions,
    transaction: Transaction,
    orders: Orders,
    order: Order,
    active: Active,
    onDemand: OnDemand,
  },
  {
    headerMode: 'none',
    initialRouteName: 'home',
  },
);

let AppContainer;

class SplashScreen extends React.Component {
  render() {
    return (
      <Root>
        <View style={styles.container}>
          <ImageBackground
            source={require('./asset/splash.png')}
            resizeMode="stretch"
            style={styles.splashImage}>
            <Image
              source={require('./asset/logo_white.png')}
              resizeMode="stretch"
              style={styles.logoImage}
            />

            <Text style={styles.text1}>Find Coffe You love </Text>
            <Text style={styles.text2}>Discover new Coffe shop</Text>
          </ImageBackground>
        </View>
      </Root>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: true};
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };
  async componentDidMount() {
    I18nManager.allowRTL(false);

    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    if (!this.state.isLoading) {
      let AppContainer;

      AppContainer = createAppContainer(RootStack);

      return <AppContainer />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '35%',
    alignSelf: 'center',
    fontFamily: 'FuturaPT-Bold',
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '3%',
    alignSelf: 'center',
    fontFamily: 'FuturaPT-Bold',
  },
  splashImage: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },
  logoImage: {
    alignSelf: 'center',
    height: '10%',
    width: '50%',
    marginTop: '20%',
  },
});
export default App;
