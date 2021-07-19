import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const _defz = require('./def');

// footer svg imports
// ------------------------
import FooterActiveSvg from '../../asset/svg/active.svg';
import FooterInActiveSvg from '../../asset/svg/inActive.svg';
// ------------------------
import HomeInActiveSvg from '../../asset/svg/home-inActive.svg';
import HomeActiveSvg from '../../asset/svg/home-active.svg';
// ------------------------
import MeInActiveSvg from '../../asset/svg/me-inActive.svg';
import MeActiveSvg from '../../asset/svg/me-active.svg';
// ------------------------
import OnDemandInActiveSvg from '../../asset/svg/onDemand-inActive.svg';
import OnDemandActiveSvg from '../../asset/svg/onDemand-active.svg';
// ------------------------
import BagActiveSvg from '../../asset/svg/bag-active.svg';
import BagInActiveSvg from '../../asset/svg/bag-inActive.svg';
// ------------------------

// ohter svg's
import NewMassageSvg from '../../asset/svg/new-masssage.svg';
import NoMassageSvg from '../../asset/svg/no-massage.svg';
import MassageSvg from '../../asset/svg/message.svg';
import InfoSvg from '../../asset/svg/info.svg';
import SearchSvg from '../../asset/svg/search.svg';
import ArrowBackSvg from '../../asset/svg/arrow-back.svg';
import SearchBoxSvg from '../../asset/svg/SearchBox.svg';
import SearchBoxBlueSvg from '../../asset/svg/SearchBoxBlue.svg';
import BorrowCupSvg from '../../asset/svg/BorrowCup.svg';
import SwitchOnSvg from '../../asset/svg/switch-on.svg';
import SwitchOffSvg from '../../asset/svg/switch-off.svg';
import EmptyGlassSvg from '../../asset/svg/empty-glass.svg';
import LocationSvg from '../../asset/svg/location.svg';
import LocationWhiteSvg from '../../asset/svg/location-white.svg';
import BuyButtonSvg from '../../asset/svg/Buy button.svg';
import BuyButtonBlueSvg from '../../asset/svg/Buybutton-blue.svg';
import CheckButtonSvg from '../../asset/svg/checkButton.svg';

// footer items
export class FooterActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <FooterActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text style={styles.activeText}>Active</Text>
      </View>
    );
  }
}
export class FooterInActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <FooterInActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text>Active</Text>
      </View>
    );
  }
}

export class HomeInActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <HomeInActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text>Home</Text>
      </View>
    );
  }
}
export class HomeActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <HomeActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text style={styles.activeText}>Home</Text>
      </View>
    );
  }
}

export class MeInActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <MeInActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text>Me</Text>
      </View>
    );
  }
}
export class MeActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <MeActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text style={styles.activeText}>Me</Text>
      </View>
    );
  }
}

export class OnDemandInActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <OnDemandInActiveSvg
          width={_defz.width / 10}
          height={_defz.width / 12}
        />
        <Text>On-demond</Text>
      </View>
    );
  }
}
export class OnDemandActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <OnDemandActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text style={styles.activeText}>On-demond</Text>
      </View>
    );
  }
}

export class BagInActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <BagInActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text>Bag</Text>
      </View>
    );
  }
}
export class BagActive extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <BagActiveSvg width={_defz.width / 10} height={_defz.width / 12} />
        <Text style={styles.activeText}>Bag</Text>
      </View>
    );
  }
}

// other svgs
export class NewMassage extends React.Component {
  render() {
    return <NewMassageSvg width={_defz.width / 10} />;
  }
}
export class NoMassage extends React.Component {
  render() {
    return <NoMassageSvg width={_defz.width / 10} />;
  }
}
export class Massage extends React.Component {
  render() {
    return <MassageSvg width={_defz.width / 10} />;
  }
}
export class Info extends React.Component {
  render() {
    return <InfoSvg width={_defz.width / 25} />;
  }
}

export class ArrowBack extends React.Component {
  render() {
    return <ArrowBackSvg width={_defz.width / 12} height={_defz.height / 12} />;
  }
}
export class Search extends React.Component {
  render() {
    return <SearchSvg width={_defz.width / 10} height={_defz.height / 10} />;
  }
}
export class SearchBox extends React.Component {
  render() {
    return <SearchBoxSvg width={_defz.width / 2} height={_defz.height / 15} />;
  }
}
export class SearchBoxBlue extends React.Component {
  render() {
    return (
      <SearchBoxBlueSvg width={_defz.width / 2} height={_defz.height / 15} />
    );
  }
}
export class BorrowCupLarge extends React.Component {
  render() {
    return <BorrowCupSvg width={_defz.width / 7} height={_defz.height / 8} />;
  }
}
export class BorrowCupSmall extends React.Component {
  render() {
    return <BorrowCupSvg width={_defz.width / 10} height={_defz.height / 10} />;
  }
}
export class SwitchOn extends React.Component {
  render() {
    return <SwitchOnSvg width={_defz.width / 5} height={_defz.height / 25} />;
  }
}
export class SwitchOff extends React.Component {
  render() {
    return <SwitchOffSvg width={_defz.width / 5} height={_defz.height / 25} />;
  }
}
export class EmptyGlass extends React.Component {
  render() {
    return (
      <EmptyGlassSvg width={this.props.width} height={this.props.height} />
    );
  }
}
export class Location extends React.Component {
  render() {
    return <LocationSvg width={_defz.width / 20} height={_defz.height / 20} />;
  }
}
export class LocationWhite extends React.Component {
  render() {
    return (
      <LocationWhiteSvg width={_defz.width / 20} height={_defz.height / 20} />
    );
  }
}

export class BuyButton extends React.Component {
  render() {
    return <BuyButtonSvg width={_defz.width / 6} height={_defz.height / 6} />;
  }
}
export class BuyButtonBlue extends React.Component {
  render() {
    return (
      <BuyButtonBlueSvg width={_defz.width / 6} height={_defz.height / 6} />
    );
  }
}
export class CheckButton extends React.Component {
  render() {
    return (
      <CheckButtonSvg width={_defz.width / 10} height={_defz.height / 10} />
    );
  }
}
const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    color: '#3D80F2',
  },
});
