import React, {Component} from 'react';
import {Text, View, ScrollView, ImageBackground} from 'react-native';
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
import BorrowBG from '../../asset/img/borrowBg.png';

import Footers from '../com/footer';
const _defz = require('../com/def');

class OnDemand extends Component {
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
        <View style={styles.content}>
          <View style={styles.heading}>
            <Text style={styles.title}>Hi Luke,</Text>
            <Text style={styles.subTitle}>What would you like to borrow?</Text>
          </View>
          <ScrollView
            style={styles.scrollViewH}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}>
            <View style={styles.card}>
              <LidSleeveCup width={_defz.width / 4} height={_defz.height / 7} />
              <Text style={styles.cardBorrowItemsText}>lid + sleeve + cup</Text>
              <View style={styles.cardInfo}>
                <Text style={styles.cardInfoTextTop}>5-days free</Text>
                <Text style={styles.cardInfoTextBottom}>no cleaning fee</Text>
              </View>
              <View style={styles.counter}>
                <Button transparent style={styles.counterButton}>
                  <Text style={styles.counterButtonMines}>-</Text>
                </Button>
                <Text style={styles.count}>1</Text>
                <Button transparent style={styles.counterButton}>
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
                <Button transparent style={styles.counterButton}>
                  <Text style={styles.counterButtonMines}>-</Text>
                </Button>
                <Text style={styles.count}>1</Text>
                <Button transparent style={styles.counterButton}>
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
                <Button transparent style={styles.counterButton}>
                  <Text style={styles.counterButtonMines}>-</Text>
                </Button>
                <Text style={styles.count}>1</Text>
                <Button transparent style={styles.counterButton}>
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
                <Button transparent style={styles.counterButton}>
                  <Text style={styles.counterButtonMines}>-</Text>
                </Button>
                <Text style={styles.count}>1</Text>
                <Button transparent style={styles.counterButton}>
                  <Text style={styles.counterButtonPlus}>+</Text>
                </Button>
              </View>
            </View>
          </ScrollView>

          <View style={styles.tip}>
            <Text style={styles.tipHead}>
              Keep borrowing free. Return on time
            </Text>
            <Button transparent>
              <Text style={styles.tipTerms}>see full terms </Text>
            </Button>
          </View>
          <ImageBackground source={BorrowBG} style={styles.borrowBG}>
            <View style={styles.BorrowBGItems}>
              <View style={styles.BorrowBGItem}>
                <LidSleeveCup
                  width={_defz.width / 10}
                  height={_defz.height / 10}
                />
                <Text style={styles.BorrowBGItemText}>3</Text>
              </View>
              <View style={styles.BorrowBGItem}>
                <EmptyGlassNoBG
                  width={_defz.width / 9}
                  height={_defz.height / 10}
                />
                <Text style={styles.BorrowBGItemText}>3</Text>
              </View>
              <View style={styles.BorrowBGItem}>
                <LidCup width={_defz.width / 10} height={_defz.height / 10} />
                <Text style={styles.BorrowBGItemText}>3</Text>
              </View>
              <View style={styles.BorrowBGItem}>
                <Bag width={_defz.width / 10} height={_defz.height / 10} />
                <Text style={styles.BorrowBGItemText}>3</Text>
              </View>
            </View>
            <BlueForward width={_defz.width / 7} height={_defz.height / 7} />
          </ImageBackground>
        </View>

        <Footers navigation={this.props.navigation} route={'demand'} />
      </View>
    );
  }
}

export default OnDemand;
