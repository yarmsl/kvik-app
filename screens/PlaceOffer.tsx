import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {useBottomNav} from '../src/state/context/BottomNavigationCtx';

const PlaceOffer = (): JSX.Element => {
  const {setRoute} = useBottomNav();
  useFocusEffect(() => {
    setRoute('PlaceOffer');
  });
  return (
    <View>
      <Text>PlaceOffer</Text>
    </View>
  );
};

export default PlaceOffer;
