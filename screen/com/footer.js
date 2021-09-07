import React from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import {Button, Footer, FooterTab} from 'native-base';

import {selectBagItems} from '../../redux/store/store.selectors';
import {connect} from 'react-redux';

import {
  FooterActive,
  FooterInActive,
  HomeInActive,
  HomeActive,
  MeActive,
  MeInActive,
  BagActive,
  BagInActive,
  Bag2,
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
            <Button vertical onPress={() => navigate('bag', {x: 1})}>
              <View style={styles.footerItem}>
                {route === 'bag' ? (
                  <BagActive />
                ) : this.props.bag.length > 0 ? (
                  <View style={styles.homeButtonWithBadge}>
                    <View style={styles.badgeCircle} />
                    <Button
                      style={styles.footerItem}
                      transparent
                      onPress={() =>
                        this.props.navigation.navigate('bag', {x: 1})
                      }>
                      <Bag2 />
                    </Button>
                  </View>
                ) : (
                  <Button
                    style={{marginTop: 11}}
                    transparent
                    onPress={() =>
                      this.props.navigation.navigate('bag', {x: 1})
                    }>
                    <BagInActive />
                  </Button>
                )}
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
    height: 65,
    borderWidth: 0.3,
  },
  footerTab: {
    backgroundColor: '#FAFAFA',
    alignSelf: 'flex-start',
  },
  footerItem: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  footerItemImg: {
    alignSelf: 'center',
    // margin: 15,
  },
  homeButtonWithBadge: {
    position: 'relative',
    marginTop: 10,
  },
  badgeCircle: {
    position: 'absolute',
    right: -5,
    top: -10,
    backgroundColor: '#E03174',
    borderRadius: 400,
    width: 20,
    height: 20,
    zIndex: 10,
  },
});

const mapStateToProps = state => ({
  bag: selectBagItems(state),
});
export default connect(mapStateToProps)(Footers);
