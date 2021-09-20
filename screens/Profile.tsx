import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {useBottomNav} from '../src/state/context/BottomNavigationCtx';
import KvikButton from '../src/UI/KvikButton';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../src/state/actions/auth.actions';
import {rootModel} from '../src/state/reducers/rootReducer';

export interface getUserData {
  id: number;
}

const Profile = (): JSX.Element => {
  const {name, phone} = useSelector((state: rootModel) => state.user);
  const dispatch = useDispatch();
  const {setRoute} = useBottomNav();

  useFocusEffect(() => {
    setRoute('Profile');
  });

  return (
    <View>
      <Text>Profile</Text>
      <Text>{name}</Text>
      <Text>{phone}</Text>
      <KvikButton title="Выйти" onPress={() => dispatch(signOut())} />
    </View>
  );
};

export default Profile;
