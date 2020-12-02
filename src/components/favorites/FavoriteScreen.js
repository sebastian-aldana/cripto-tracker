import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FavoriteEmptyScreen from './FavoriteEmptyScreen';
import {colors} from '../../resources/colors';
import Storage from '../../libs/storage';
import CoinsItem from '../coins/CoinsItem';

const FavoriteScreen = (props) => {
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  useEffect(() => {
    getFavorites();
  }, [favoriteCoins]);

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetails', {coin});
  };

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favorites = await Storage.instance.multiGet(keys);
      const favoritesParsed = favorites.map((favorite) =>
        JSON.parse(favorite[1]),
      );
      setFavoriteCoins(favoritesParsed);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(favoriteCoins.length > 0);

  return (
    <View style={styles.container}>
      {favoriteCoins.length < 0 ? (
        <FavoriteEmptyScreen />
      ) : (
        <FlatList
          data={favoriteCoins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoriteScreen;
