import React from 'react';
import {Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useBottomNav} from '../src/state/context/BottomNavigationCtx';

const Messages = (): JSX.Element => {
  const {setRoute} = useBottomNav();
  useFocusEffect(() => {
    setRoute('Messages');
  });

  return (
    <View>
      <Text>Messages</Text>
    </View>
  );
};

export default Messages;
