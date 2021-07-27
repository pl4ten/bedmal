import React from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import {Button, Footer, FooterTab} from 'native-base';

import {
  FooterActive,
  FooterInActive,
  HomeInActive,
  HomeActive,
  MeActive,
  MeInActive,
  BagActive,
  BagInActive,
  OnDemandActive,
  OnDemandInActive,
} from './svg-files';

const heights = Dimensions.get('screen').height;
const widths = Dimensions.get('screen').width;

let route = '';

class Footers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    route = this.props.route;
    return (
      <View style={styles.footerContainer}>
        <Footer style={styles.footer}>
          <FooterTab active style={styles.footerTab}>
            <Button vertical onPress={() => navigate('home')}>
              <View style={styles.footerItem}>
                {route === 'home' ? <HomeActive /> : <HomeInActive />}
              </View>
            </Button>
            <Button vertical onPress={() => navigate('account')}>
              <View style={styles.footerItem}>
                {route === 'account' ? <MeActive /> : <MeInActive />}
              </View>
            </Button>
            <Button vertical onPress={() => navigate('onDemand')}>
              <View style={styles.footerItem}>
                {route === 'demand' ? <OnDemandActive /> : <OnDemandInActive />}
              </View>
            </Button>
            <Button vertical onPress={() => navigate('active')}>
              <View style={styles.footerItem}>
                {route === 'active' ? <FooterActive /> : <FooterInActive />}
              </View>
            </Button>
            <Button vertical onPress={() => navigate('bag')}>
              <View style={styles.footerItem}>
                {route === 'bag' ? <BagActive /> : <BagInActive />}
              </View>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footer: {
    backgroundColor: '#FAFAFA',
    borderColor: 'silver',
    height: heights / 10,
    borderWidth: 1,

  },
  footerTab: {
    backgroundColor: '#FAFAFA',
    alignSelf: 'flex-start',
    marginTop:"3%"
  },
  footerItem: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  footerItemImg: {
    alignSelf: 'center',
    margin: 15,
  },
});

export default Footers;
