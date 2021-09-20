import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Child} from '../../../types/types';
import BottomNavigation from '../BottomNavigation';
import {getUserData} from '../../state/actions/user.actions';
import {useTheme} from '../../state/context/ThemeCtx';
import {rootModel} from '../../state/reducers/rootReducer';

const BottomNavLayout = ({children}: Child): JSX.Element => {
  const dispatch = useDispatch();
  const {idUser} = useSelector((state: rootModel) => state.auth);
  if (idUser) {
    dispatch(getUserData(+idUser));
  }
  const theme = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: theme.bg,
    },
    root: {
      flex: 1,
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.root}>{children}</View>
        <BottomNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BottomNavLayout;
