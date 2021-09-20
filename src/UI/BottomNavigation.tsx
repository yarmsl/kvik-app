import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {useTheme} from '../state/context/ThemeCtx';
import KvikIcons from './KvikIcons';
import {HomeScreenProp} from '../../types/types';
import {useBottomNav} from '../state/context/BottomNavigationCtx';
import {useSelector} from 'react-redux';
import {rootModel} from '../state/reducers/rootReducer';

const BottomNavigation = (): JSX.Element => {
  const nav = useNavigation<HomeScreenProp>();
  const {route} = useBottomNav();
  const {userPhoto} = useSelector((state: rootModel) => state.user);
  const theme = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.bg,
    },
    text: {
      color: theme.second,
    },
    textHl: {
      color: theme.prime,
    },
    avatar: {
      backgroundColor: route === 'Profile' ? theme.prime : theme.second,
    },
  });

  return (
    <View style={[styles.wrapper, staticStyles.wrapper]}>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={() => nav.navigate('Home')}>
        <KvikIcons
          name="logo"
          size={24}
          color={route === 'Home' ? theme.prime : theme.second}
        />
        <Text
          style={
            route === 'Home'
              ? [styles.textHl, staticStyles.text]
              : [styles.text, staticStyles.text]
          }>
          Поиск
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={() => nav.navigate('Messages')}>
        <KvikIcons
          name="message"
          size={24}
          color={route === 'Messages' ? theme.prime : theme.second}
        />
        <Text
          style={
            route === 'Messages'
              ? [styles.textHl, staticStyles.text]
              : [styles.text, staticStyles.text]
          }>
          Сообщения
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={() => nav.navigate('PlaceOffer')}>
        <Icon name="add-circle" color={theme.prime} size={34} />
        <Text
          style={
            route === 'PlaceOffer'
              ? [styles.textHl, staticStyles.text]
              : [styles.text, staticStyles.text]
          }>
          Разместить
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={() => nav.navigate('Favorites')}>
        <KvikIcons
          name="like"
          size={24}
          color={route === 'Favorites' ? theme.prime : theme.second}
        />
        <Text
          style={
            route === 'Favorites'
              ? [styles.textHl, staticStyles.text]
              : [styles.text, staticStyles.text]
          }>
          Избранное
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={() => nav.navigate('Profile')}>
        <Avatar
          size="small"
          rounded
          icon={{name: 'person', size: 20, color: theme.bg}}
          containerStyle={[styles.avatar, staticStyles.avatar]}
          source={userPhoto ? {uri: userPhoto} : undefined}
        />
        <Text
          style={
            route === 'Profile'
              ? [styles.textHl, staticStyles.text]
              : [styles.text, staticStyles.text]
          }>
          Профиль
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const staticStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 54,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    elevation: 15,
    shadowOffset: {width: 0, height: -15},
    shadowOpacity: 0.05,
    shadowColor: '#000',
    shadowRadius: 7,
  },
  button: {
    width: '20%',
    height: '100%',
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 11,
    fontWeight: '400',
  },
  avatar: {
    width: 24,
    height: 24,
  },
});

export default BottomNavigation;
