import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../../resources/colors';

const FavoriteEmptyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorite yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  }
});

export default FavoriteEmptyScreen;
