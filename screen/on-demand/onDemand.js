import React, {Component} from 'react';
import {Text, View, ScrollView, ImageBackground, Alert} from 'react-native';
import {Button, Icon} from 'native-base';
import {
  EmptyGlass,
  LidCup,
  LidSleeveCup,
  Bag,
  BlueForward,
  EmptyGlassNoBG,
} from '../com/svg-files';
import {styles} from './styles/onDemand.styles';

import Footers from '../com/footer';
import Loader from '../com/loader';

import {jsonBeautify} from 'beautify-json';
import {selectUserToken} from '../../redux/user/user.selectors';
import {selectOnDemandItems} from '../../redux/onDemand/onDemand.selectors';
import {
  addToBascket,
  removeFromBascket,
} from '../../redux/onDemand/onDemand.actions';
import {connect} from 'react-redux';

import BorrowBG from '../../asset/img/borrowBg.png';

const _defz = require('../com/def');

class OnDemand extends Component {
  constructor() {
    super();

    this.state = {
      userName: null,
      isLoading: false,
    };
  }
  async getprofile() {
    this.setState({isLoading: true});
    try {
      await _defz
        .get_via_token('user/account/profile', 'GET', this.props.token)
        .then(response => {
          // console.log(response);
          this.setState({isLoading: false});
          if (response.status === 200) {
            this.setState({userName: response.profile.personal_info.name});
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
    this.getprofile();
  }
  render() {
    return !this.state.isLoading ? (
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
        <ScrollView style={styles.mainScroll}>
          <View style={styles.content}>
            <View style={styles.heading}>
              <Text style={styles.title}>
                Hi {this.state.userName ? this.state.userName : null},
              </Text>
              <Text style={styles.subTitle}>
                What would you like to borrow?
              </Text>
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
                <Text style={styles.cardBorrowItemsText}>
                  lid + sleeve + cup
                </Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardInfoTextTop}>5-days free</Text>
                  <Text style={styles.cardInfoTextBottom}>no cleaning fee</Text>
                </View>
                <View style={styles.counter}>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() =>
                      this.props.removeFromBascket('lid_sleeve_cup')
                    }>
                    <Text style={styles.counterButtonMines}>-</Text>
                  </Button>
                  <Text style={styles.count}>
                    {this.props.onDemand.lid_sleeve_cup}
                  </Text>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() => this.props.addToBascket('lid_sleeve_cup')}>
                    <Text style={styles.counterButtonPlus}>+</Text>
                  </Button>
                </View>
              </View>

              <View style={styles.card}>
                <Bag width={_defz.width / 4} height={_defz.height / 7} />
                <Text style={styles.cardBorrowItemsText}>bag</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardInfoTextTop}>5-days free</Text>
                  <Text style={styles.cardInfoTextBottom}>no cleaning fee</Text>
                </View>
                <View style={styles.counter}>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() => this.props.removeFromBascket('bag')}>
                    <Text style={styles.counterButtonMines}>-</Text>
                  </Button>
                  <Text style={styles.count}>{this.props.onDemand.bag}</Text>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() => this.props.addToBascket('bag')}>
                    <Text style={styles.counterButtonPlus}>+</Text>
                  </Button>
                </View>
              </View>

              <View style={styles.card}>
                <EmptyGlass width={_defz.width / 4} height={_defz.height / 7} />
                <Text style={styles.cardBorrowItemsText}>cup only</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardInfoTextTop}>5-days free</Text>
                  <Text style={styles.cardInfoTextBottom}>no cleaning fee</Text>
                </View>
                <View style={styles.counter}>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() => this.props.removeFromBascket('cup')}>
                    <Text style={styles.counterButtonMines}>-</Text>
                  </Button>
                  <Text style={styles.count}>{this.props.onDemand.cup}</Text>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() => this.props.addToBascket('cup')}>
                    <Text style={styles.counterButtonPlus}>+</Text>
                  </Button>
                </View>
              </View>

              <View style={styles.card}>
                <LidCup width={_defz.width / 1} height={_defz.height / 7} />
                <Text style={styles.cardBorrowItemsText}>lid + cup</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardInfoTextTop}>5-days free</Text>
                  <Text style={styles.cardInfoTextBottom}>no cleaning fee</Text>
                </View>
                <View style={styles.counter}>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() => this.props.removeFromBascket('lid_cup')}>
                    <Text style={styles.counterButtonMines}>-</Text>
                  </Button>
                  <Text style={styles.count}>
                    {this.props.onDemand.lid_cup}
                  </Text>
                  <Button
                    transparent
                    style={styles.counterButton}
                    onPress={() => this.props.addToBascket('lid_cup')}>
                    <Text style={styles.counterButtonPlus}>+</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>

            <View style={styles.tip}>
              <Text style={styles.tipHead}>
                Keep borrowing free. Return on time
              </Text>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('Terms')}>
                <Text style={styles.tipTerms}>see full terms </Text>
              </Button>
            </View>
            <ImageBackground source={BorrowBG} style={styles.borrowBG}>
              {this.props.onDemand.lid_cup === 0 &&
              this.props.onDemand.lid_sleeve_cup === 0 &&
              this.props.onDemand.cup === 0 &&
              this.props.onDemand.bag === 0 ? (
                <Text style={styles.noReturnsText}>Return only</Text>
              ) : (
                <View style={styles.BorrowBGItems}>
                  {this.props.onDemand.lid_cup > 0 ? (
                    <View style={styles.BorrowBGItem}>
                      <LidCup
                        width={_defz.width / 10}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.BorrowBGItemText}>
                        {this.props.onDemand.lid_cup}
                      </Text>
                    </View>
                  ) : null}
                  {this.props.onDemand.lid_sleeve_cup > 0 ? (
                    <View style={styles.BorrowBGItem}>
                      <LidSleeveCup
                        width={_defz.width / 10}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.BorrowBGItemText}>
                        {this.props.onDemand.lid_sleeve_cup}
                      </Text>
                    </View>
                  ) : null}
                  {this.props.onDemand.cup > 0 ? (
                    <View style={styles.BorrowBGItem}>
                      <EmptyGlassNoBG
                        width={_defz.width / 10}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.BorrowBGItemText}>
                        {this.props.onDemand.cup}
                      </Text>
                    </View>
                  ) : null}
                  {this.props.onDemand.bag > 0 ? (
                    <View style={styles.BorrowBGItem}>
                      <Bag
                        width={_defz.width / 10}
                        height={_defz.height / 10}
                      />
                      <Text style={styles.BorrowBGItemText}>
                        {this.props.onDemand.bag}
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
              <Button
                transparent
                style={styles.forwardButton}
                onPress={() =>
                  this.props.navigation.navigate('onDemandStage2')
                }>
                <BlueForward
                  width={_defz.width / 7}
                  height={_defz.height / 7}
                />
              </Button>
            </ImageBackground>
          </View>
          <View style={{marginTop: 200,}} />
        </ScrollView>
        <Footers navigation={this.props.navigation} route={'demand'} />
      </View>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => ({
  token: selectUserToken(state),
  onDemand: selectOnDemandItems(state),
});
const mapDispatchToProps = dispatch => ({
  addToBascket: item => dispatch(addToBascket(item)),
  removeFromBascket: item => dispatch(removeFromBascket(item)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnDemand);
