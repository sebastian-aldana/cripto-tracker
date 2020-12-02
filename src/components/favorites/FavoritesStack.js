import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteScreen from './FavoriteScreen';
import {colors} from '../../resources/colors';

const Stack = createStackNavigator();

const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowOpacity: 0,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
