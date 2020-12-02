import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import CoinItem from './CoinsItem';
import Http from '../../libs/http';
import {colors} from '../../resources/colors';
import CoinsSearch from './CoinSearch';
import CoinSearch from './CoinSearch';

const CoinsScreen = (props) => {
  const url = 'https://api.coinlore.net/api/tickers/';

  const [state, setState] = useState({
    allCoins: [],
    coins: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const response = await Http.instance.get(url);
    setState({allCoins: response.data, coins: response.data});
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const goToCoinDetail = (coin) => {
    props.navigation.navigate('CoinDetails', {coin});
  };

  const handleSearch = (query) => {
    const coins = state.allCoins;
    if (!query) {
      setState({...state, coins});
    } else {
      const coinsFiltered = coins.filter((coin) => {
        return coin.name
          .toLowerCase()
          .includes(
            query.toLowerCase() ||
              coin.symbol.toLowerCase().includes(query.toLowerCase()),
          );
      });
      setState({...state, coins: coinsFiltered});
    }
  };

  return (
    <View style={style.container}>
      <CoinSearch onChange={handleSearch} />
      {isLoading ? (
        <ActivityIndicator style={style.loader} color="#fff" size="large" />
      ) : (
        <FlatList
          data={state.coins}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => goToCoinDetail(item)} />
          )}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    margin: 16,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
