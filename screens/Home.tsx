import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useBottomNav} from '../src/state/context/BottomNavigationCtx';
import {useTheme} from '../src/state/context/ThemeCtx';
import {useSelector} from 'react-redux';
import {rootModel} from '../src/state/reducers/rootReducer';
import OffersRender from '../src/components/OffersRender';

const Home = (): JSX.Element => {
  const theme = useTheme();
  const data = useSelector((state: rootModel) => state.posts);
  console.log(data);
  const user = useSelector((state: rootModel) => state.user);
  console.log(user);
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      width: '100%',
      minHeight: '100%',
      backgroundColor: theme.bg,
    },
  });
  const {setRoute} = useBottomNav();
  useFocusEffect(() => {
    setRoute('Home');
  });
  return (
    <ScrollView style={styles.wrapper}>
      <Text>Home</Text>
      <OffersRender offers={data} />
    </ScrollView>
  );
};

export default Home;
