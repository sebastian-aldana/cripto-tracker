import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Platform} from 'react-native';
import {colors} from '../../resources/colors';

const CoinsItem = ({item, onPress}) => {
  const getImgArrow = () => {
    return item.percent_change_1h > 0
      ? require('../../assets/arrow_down.png')
      : require('../../assets/arrow_up.png');
  };

  return (
    <Pressable style={style.container} onPress={onPress} >
      <View style={style.row}>
        <Text style={style.symbolTex}>{item.name}</Text>
        <Text style={style.nameText}>{item.symbol}</Text>
        <Text style={style.priceText}>{`$ ${item.price_usd}`}</Text>
      </View>
      <View style={style.row} >
        <Text style={style.percentText}>{item.percent_change_1h}</Text>
        <Image  style={style.imgIcon} source={getImgArrow()} />
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomColor: colors.zircon,
    borderBottomWidth: 2,
    paddingLeft: Platform.OS === 'ios' ? 0 : 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolTex: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: colors.white,
    fontSize: 12,
    marginRight: 8,
  },
  priceText: {
    color: colors.white,
    fontSize: 14,
  },
  imgIcon: {
    width: 22,
    height: 22,
  }
});

export default CoinsItem;
