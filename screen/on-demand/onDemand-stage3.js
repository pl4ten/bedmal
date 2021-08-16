import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button, Icon} from 'native-base';
import {
  EmptyGlass,
  LidCup,
  LidSleeveCup,
  Bag,
  BlueForward,
  EmptyGlassNoBG,
} from '../com/svg-files';
import {styles} from './styles/onDemand-stage3.styles';

import Headers from '../com/header';
import Footers from '../com/footer';

import {jsonBeautify} from 'beautify-json';
import {selectUserToken} from '../../redux/user/user.selectors';
import {selectOnDemandItems} from '../../redux/onDemand/onDemand.selectors';
import {addReturnItems} from '../../redux/onDemand/onDemand.actions';
import {connect} from 'react-redux';

const _defz = require('../com/def');

class OnDemandStage3 extends Component {
  constructor() {
    super();

    this.state = {
      returnedSleeve: 0,
      returnedCup: 0,
      returnedLid: 0,
      returnedBag: 0,
    };
  }

  componentDidMount() {
    let cups = 0;
    let lids = 0;
    let sleeves = 0;
    let bags = 0;
    this.props.onDemand.returns[0]
      ? this.props.onDemand.returns[0].map(item => {
          console.log(jsonBeautify(item));
          if (item.lid) {
            lids += item.count;
          }
          if (item.sleeve) {
            sleeves += item.count;
          }
          if (item.cup) {
            cups += item.count;
          }
          if (item.bag) {
            bags += item.count;
          }
        })
      : null;
    this.setState({
      returnedCup: cups,
      returnedLid: lids,
      returnedSleeve: sleeves,
      returnedBag: bags,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            transparent
            style={styles.headerXbutton}
            onPress={() => this.props.navigation.goBack()}>
            <Icon
              name="closecircleo"
              type="AntDesign"
              style={styles.headerXIcon}
            />
          </Button>
        </View>
        <ScrollView style={styles.mainScrollView}>
          <View style={styles.content}>
            <Headers
              route={'Ticket ready'}
              navigation={this.props.navigation}
            />
            <Text style={styles.heading}>Show at the till.</Text>
            <View style={styles.headingRow}>
              <Button
                transparent
                style={styles.editButton}
                onPress={() => this.props.navigation.navigate('onDemand')}>
                <Text style={styles.editButtonText}>Edit</Text>
              </Button>
              <Text style={styles.title}>Borrowing</Text>
            </View>
            <ScrollView
              style={styles.scrollViewH}
              horizontal
              scrollEnabled
              showsHorizontalScrollIndicator={false}>
              <View style={styles.card}>
                <LidSleeveCup
                  width={_defz.width / 4}
                  height={_defz.height / 7}
                />
                <Text style={styles.cardNumber}>
                  {this.props.onDemand.lid_sleeve_cup}
                </Text>
              </View>

              <View style={styles.card}>
                <Bag width={_defz.width / 4} height={_defz.height / 7} />
                <Text style={styles.cardNumber}>{this.props.onDemand.bag}</Text>
              </View>

              <View style={styles.card}>
                <EmptyGlass width={_defz.width / 4} height={_defz.height / 7} />
                <Text style={styles.cardNumber}>{this.props.onDemand.cup}</Text>
              </View>

              <View style={styles.card}>
                <LidCup width={_defz.width / 1} height={_defz.height / 7} />
                <Text style={styles.cardNumber}>
                  {this.props.onDemand.lid_cup}
                </Text>
              </View>
            </ScrollView>

            <View style={styles.headingRow}>
              <Button
                transparent
                style={styles.editButton}
                onPress={() =>
                  this.props.navigation.navigate('onDemandStage2')
                }>
                <Text style={styles.editButtonText}>Edit</Text>
              </Button>
              <Text style={styles.title}>Returned</Text>
            </View>
            <View style={styles.main}>
              <View style={styles.returned}>
                <Text style={styles.returnedText}>b.Cups </Text>
                <View style={styles.returnedItems}>
                  <View style={styles.returnedItem}>
                    <View style={styles.circle}>
                      <Text style={styles.circleNumber}>
                        {this.state.returnedSleeve}
                      </Text>
                    </View>
                    <Text style={styles.returnedItemText}>sleeve</Text>
                  </View>
                  <View style={styles.returnedItem}>
                    <View style={styles.circle}>
                      <Text style={styles.circleNumber}>
                        {this.state.returnedCup}
                      </Text>
                    </View>
                    <Text style={styles.returnedItemText}>cup</Text>
                  </View>
                  <View style={styles.returnedItem}>
                    <View style={styles.circle}>
                      <Text style={styles.circleNumber}>
                        {this.state.returnedLid}
                      </Text>
                    </View>
                    <Text style={styles.returnedItemText}>lid</Text>
                  </View>
                </View>
              </View>

              <View style={styles.returned}>
                <Text style={styles.returnedText}>b.Bags </Text>
                <View style={styles.returnedItems}>
                  <View style={styles.returnedBag}>
                    <View style={styles.circle}>
                      <Text style={styles.circleNumber}>
                        {this.state.returnedBag}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipHead}>Lost or broken a part?</Text>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('Terms')}>
                <Text style={styles.tipTerms}>
                  Click here to reduce waste and fees.
                </Text>
              </Button>
            </View>
            <View style={{marginTop: 100}} />
          </View>
        </ScrollView>

        <Footers navigation={this.props.navigation} route={'demand'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
  onDemand: selectOnDemandItems(state),
});
const mapDispatchToProps = dispatch => ({
  addReturnItems: items => dispatch(addReturnItems(items)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnDemandStage3);
