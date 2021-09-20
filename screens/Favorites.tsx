import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {useBottomNav} from '../src/state/context/BottomNavigationCtx';

const Favorites = (): JSX.Element => {
  const {setRoute} = useBottomNav();
  useFocusEffect(() => {
    setRoute('Favorites');
  });
  return (
    <View>
      <Text>Favorites</Text>
    </View>
  );
};

export default Favorites;
