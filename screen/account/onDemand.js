import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 500,
    backgroundColor: '#000',
  },
  content: {
    position: 'absolute',
    top: _defz.height / 15,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerXbutton: {
    alignSelf: 'flex-end',
    marginTop: _defz.height / 50,
  },
  headerXIcon: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 35,
    margin: 5,
  },
  heading: {
    marginTop: _defz.height / 15,
  },
  title: {
    fontFamily: 'FuturaPT-Medium',
    fontSize: 40,
  },
  subTitle: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
    color: '#707070',
  },
  scrollViewH: {
    width: '100%',
    marginTop: _defz.height / 25,
  },
  card: {
    backgroundColor: '#fff',
    width: _defz.width / 3,
    height: _defz.height / 3.5,
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  cardBorrowItemsText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 14,
    color: '#707070',
  },
  cardInfo: {
    marginTop: 10,
  },
  cardInfoTextTop: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 14,
    color: '#08D18C',
  },
  cardInfoTextBottom: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 13,
    color: '#E03174',
  },
  counter: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  counterButtonPlus: {
    fontSize: 45,
    color: '#707070',
  },
  counterButtonMines: {
    fontSize: 75,
    marginBottom: 10,
    color: '#707070',
  },
  count: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 25,
    color: '#707070',
  },
  tip: {
    backgroundColor: '#F0F0F0',
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: _defz.width / 30,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tipHead: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 16,
    color: '#707070',
  },
  tipTerms: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 16,
    color: '#3D80F2',
  },
  borrowBG: {
    width: '100%',
    height: _defz.height / 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  BorrowBGItems: {
    flexDirection: 'row',
  },
  BorrowBGItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BorrowBGItemText: {
    position: 'relative',
    bottom: 20,
    borderTopColor: '#C3BCBC',
    borderTopWidth: 1,
    fontSize: 25,
    width: _defz.width / 20,
    textAlign: 'center',
    color: '#707070',
    fontFamily: 'FuturaPT-Book',
  },
});
// fontFamily: 'FuturaPT-Medium',
// fontFamily: 'FuturaPT-Book',
export default OnDemand;
