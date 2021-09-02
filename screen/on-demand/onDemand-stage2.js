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
import {styles} from './styles/onDemand-stage2.styles';

import Loader from '../com/loader';
import Headers from '../com/header';
import Footers from '../com/footer';

import {jsonBeautify} from 'beautify-json';
import {selectUserToken} from '../../redux/user/user.selectors';
import {selectOnDemandItems} from '../../redux/onDemand/onDemand.selectors';
import {addReturnItems} from '../../redux/onDemand/onDemand.actions';
import {connect} from 'react-redux';

import BorrowBG from '../../asset/img/borrowBg.png';

const _defz = require('../com/def');

class OnDemandStage2 extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      borrowedItems: null,
      selectedReturns: [],
      finallReturns: [],
    };
  }
  handleItemSelect(id) {
    let items = [...this.state.selectedReturns];

    if (items.includes(id)) {
      items.splice(items.indexOf(id), 1);

      this.setState({
        selectedReturns: items,
      });
    } else {
      items.push(id);
      items = [...new Set(items)];

      this.setState({
        selectedReturns: items,
      });
    }
  }
  async getBorrowedItems() {
    this.setState({isLoading: true});
    try {
      await fetch(
        'https://bedmal-core.aralstudio.top/api/user/on-demand/borrowed-items',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.props.token,
          },
        },
      )
        .then(res => res.json())
        .then(response => {
          // console.log(jsonBeautify(response));
          this.setState({isLoading: false});
          if (response.status === 200) {
            this.setState({borrowedItems: response.borrowed_items});
          }
          if (response.status === 400) {
            Alert.alert('Error', response.errors[0].message, [{text: 'ok'}], {
              cancelable: true,
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
  timeDetector(date) {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  componentDidMount() {
    this.getBorrowedItems();
    let selecteds = [];
    this.props.onDemand.returns[0]
      ? this.props.onDemand.returns[0].map(item => {
          selecteds.push(item.id);
        })
      : null;
    this.setState({selectedReturns: [...new Set(selecteds)]});
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
        <View style={styles.content}>
          <Headers
            route={'Add any returns'}
            navigation={this.props.navigation}
          />
          <Text style={styles.heading}>Tap to select.</Text>
          <ScrollView
            style={styles.scrollViewH}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}>
            {this.state.borrowedItems
              ? this.state.borrowedItems.map(item => {
                  if (item.lid && item.sleeve && item.cup) {
                    return (
                      <TouchableOpacity
                        style={
                          this.state.selectedReturns.includes(item.id)
                            ? styles.cardActive
                            : styles.card
                        }
                        activeOpacity={1}
                        onPress={() => this.handleItemSelect(item.id)}>
                        <LidSleeveCup
                          width={_defz.width / 4}
                          height={_defz.height / 7}
                        />
                        <Text style={styles.cardBorrowItemsText}>
                          lid + sleeve + cup
                        </Text>
                        <View
                          style={
                            this.timeDetector(item.due.slice(0, 10)) > 1
                              ? styles.borrowItemFooter
                              : styles.borrowItemFooterWarn
                          }>
                          <Text
                            style={
                              this.timeDetector(item.due.slice(0, 10)) > 1
                                ? styles.borrowItemFooterText
                                : styles.borrowItemFooterTextWarn
                            }>
                            {this.timeDetector(item.due.slice(0, 10)) > 1
                              ? this.timeDetector(item.due.slice(0, 10)) +
                                ' days left'
                              : 'due today'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  if (!item.lid && !item.sleeve && !item.cup && item.bag) {
                    return (
                      <TouchableOpacity
                        style={
                          this.state.selectedReturns.includes(item.id)
                            ? styles.cardActive
                            : styles.card
                        }
                        activeOpacity={1}
                        onPress={() => this.handleItemSelect(item.id)}>
                        <Bag
                          width={_defz.width / 4}
                          height={_defz.height / 7}
                        />
                        <Text style={styles.cardBorrowItemsText}>bag</Text>
                        <View
                          style={
                            this.timeDetector(item.due.slice(0, 10)) > 1
                              ? styles.borrowItemFooter
                              : styles.borrowItemFooterWarn
                          }>
                          <Text
                            style={
                              this.timeDetector(item.due.slice(0, 10)) > 1
                                ? styles.borrowItemFooterText
                                : styles.borrowItemFooterTextWarn
                            }>
                            {this.timeDetector(item.due.slice(0, 10)) > 1
                              ? this.timeDetector(item.due.slice(0, 10)) +
                                ' days left'
                              : 'due today'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  if (!item.lid && !item.sleeve && item.cup) {
                    return (
                      <TouchableOpacity
                        style={
                          this.state.selectedReturns.includes(item.id)
                            ? styles.cardActive
                            : styles.card
                        }
                        activeOpacity={1}
                        onPress={() => this.handleItemSelect(item.id)}>
                        <EmptyGlass
                          width={_defz.width / 4}
                          height={_defz.height / 7}
                        />
                        <Text style={styles.cardBorrowItemsText}>cup only</Text>
                        <View
                          style={
                            this.timeDetector(item.due.slice(0, 10)) > 1
                              ? styles.borrowItemFooter
                              : styles.borrowItemFooterWarn
                          }>
                          <Text
                            style={
                              this.timeDetector(item.due.slice(0, 10)) > 1
                                ? styles.borrowItemFooterText
                                : styles.borrowItemFooterTextWarn
                            }>
                            {this.timeDetector(item.due.slice(0, 10)) > 1
                              ? this.timeDetector(item.due.slice(0, 10)) +
                                ' days left'
                              : 'due today'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  if (item.lid && item.cup && !item.sleeve) {
                    return (
                      <TouchableOpacity
                        style={
                          this.state.selectedReturns.includes(item.id)
                            ? styles.cardActive
                            : styles.card
                        }
                        activeOpacity={1}
                        onPress={() => this.handleItemSelect(item.id)}>
                        <LidCup
                          width={_defz.width / 1}
                          height={_defz.height / 7}
                        />
                        <Text style={styles.cardBorrowItemsText}>
                          lid + cup
                        </Text>
                        <View
                          style={
                            this.timeDetector(item.due.slice(0, 10)) > 1
                              ? styles.borrowItemFooter
                              : styles.borrowItemFooterWarn
                          }>
                          <Text
                            style={
                              this.timeDetector(item.due.slice(0, 10)) > 1
                                ? styles.borrowItemFooterText
                                : styles.borrowItemFooterTextWarn
                            }>
                            {this.timeDetector(item.due.slice(0, 10)) > 1
                              ? this.timeDetector(item.due.slice(0, 10)) +
                                ' days left'
                              : 'due today'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })
              : null}
          </ScrollView>

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
          <ImageBackground source={BorrowBG}resizeMode={'stretch'}  style={styles.borrowBG}>
            {!this.state.selectedReturns.length ? (
              <Text style={styles.noReturnsText}>No returns</Text>
            ) : (
              <View style={styles.BorrowBGItems}>
                <ScrollView
                  style={styles.scrollViewH2}
                  horizontal
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}>
                  {this.state.borrowedItems
                    ? this.state.borrowedItems.map(item => {
                        if (this.state.selectedReturns.includes(item.id)) {
                          if (item.lid && item.sleeve && item.cup) {
                            return (
                              <View style={styles.BorrowBGItem}>
                                <LidSleeveCup
                                  width={_defz.width / 10}
                                  height={_defz.height / 10}
                                />
                                <Text style={styles.BorrowBGItemText}>
                                  {item.count}
                                </Text>
                              </View>
                            );
                          }
                          if (
                            !item.lid &&
                            !item.sleeve &&
                            !item.cup &&
                            item.bag
                          ) {
                            return (
                              <View style={styles.BorrowBGItem}>
                                <Bag
                                  width={_defz.width / 10}
                                  height={_defz.height / 10}
                                />
                                <Text style={styles.BorrowBGItemText}>
                                  {item.count}
                                </Text>
                              </View>
                            );
                          }
                          if (!item.lid && !item.sleeve && item.cup) {
                            return (
                              <View style={styles.BorrowBGItem}>
                                <EmptyGlassNoBG
                                  width={_defz.width / 10}
                                  height={_defz.height / 10}
                                />
                                <Text style={styles.BorrowBGItemText}>
                                  {item.count}
                                </Text>
                              </View>
                            );
                          }
                          if (item.lid && item.cup && !item.sleeve) {
                            return (
                              <View style={styles.BorrowBGItem}>
                                <LidCup
                                  width={_defz.width / 10}
                                  height={_defz.height / 10}
                                />
                                <Text style={styles.BorrowBGItemText}>
                                  {item.count}
                                </Text>
                              </View>
                            );
                          }
                        }
                      })
                    : null}
                </ScrollView>
              </View>
            )}

            <Button
              transparent
              style={styles.forwardButton}
              onPress={() => {
                this.state.finallReturns = [];
                this.state.borrowedItems
                  ? this.state.borrowedItems.map(item => {
                      if (this.state.selectedReturns.includes(item.id)) {
                        this.state.finallReturns.push(item);
                      }
                    })
                  : null;
                this.props.addReturnItems(this.state.finallReturns);
                this.props.navigation.navigate('onDemandStage3');
              }}>
              <BlueForward width={_defz.width / 7} height={_defz.height / 7} />
            </Button>
          </ImageBackground>
        </View>
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
  addReturnItems: items => dispatch(addReturnItems(items)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnDemandStage2);
