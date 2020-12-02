import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import {colors} from '../../resources/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

const CoinDetailScreen = (props) => {
  const {
    route: {params},
  } = props;

  const [coin, setCoin] = useState({});

  const [markets, setMarkets] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  };

  useEffect(() => {
    setCoin(params.coin);
    props.navigation.setOptions({title: params.coin.symbol});
    getMarkets(params.coin.id);
    getFavorite(params.coin.id);
  }, []);

  const getSymbolIcon = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '_');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const addFavorite = async () => {
    const value = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, value);

    if (stored) {
      setIsFavorite(true);
    }
  };

  const getFavorite = async (coinId) => {
    const key = `favorite-${coinId}`;
    const favoriteString = await Storage.instance.get(key);
    if (favoriteString) {
      setIsFavorite(Boolean(favoriteString));
    } else {
      setIsFavorite(Boolean(favoriteString));
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure ?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;
          const removed = await Storage.instance.remove(key);
          if (removed) {
            setIsFavorite(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    }else {
      addFavorite();
    }
  };

  const getSections = (coin) => {
    const sections = [
      {title: 'Market Cap', data: [coin.market_cap_usd]},
      {title: 'Volume', data: [coin.volume24]},
      {title: 'Change 24H', data: [coin.percent_change_24h]},
    ];
    return sections;
  };

  return (
    <View style={style.container}>
      <View style={style.subHeader}>
        <View style={style.row}>
          <Image
            style={style.imageContainer}
            source={{uri: getSymbolIcon(coin.name)}}
          />
          <Text style={style.titleText}>{coin.name}</Text>
        </View>
        <View>
          <Pressable
            onPress={toggleFavorite}
            style={[
              style.buttonFavorite,
              isFavorite ? style.buttonFavoriteRemove : style.buttonFavoriteAdd,
            ]}>
            <Text style={style.buttonFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add Favorite'}
            </Text>
          </Pressable>
        </View>
      </View>
      <SectionList
        style={style.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={style.sectionItem}>
            <Text style={style.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={style.sectionHeader}>
            <Text style={style.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={style.marketTitle}>Markets</Text>
      <FlatList
        style={style.list}
        horizontal
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 8,
  },
  imageContainer: {
    width: 25,
    height: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    color: colors.white,
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  buttonFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  buttonFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  buttonFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
  buttonFavoriteText: {
    color: colors.white,
  },
});

export default CoinDetailScreen;
