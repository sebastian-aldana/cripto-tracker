import React, {useState} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import {colors} from '../../resources/colors';

const CoinSearch = (props) => {
  const [query, setQuery] = useState('');

  const handleText = (query) => {
    setQuery(query);
    if (props.onChange) {
      props.onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor={colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: colors.white,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinSearch;
