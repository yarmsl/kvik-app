import React from 'react';
import 'react-native-gesture-handler';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import BottomNavLayout from './src/UI/layouts/BottomNavLayout';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Messages from './screens/Messages';
import PlaceOffer from './screens/PlaceOffer';
import Favorites from './screens/Favorites';
import Registration from './screens/Registration';
import Login from './screens/Login';
import {useTheme} from './src/state/context/ThemeCtx';
import SaveAreaLayout from './src/UI/layouts/SaveAreaLayout';
import {useSelector} from 'react-redux';
import {rootModel} from './src/state/reducers/rootReducer';
import Offer from './screens/Offer';

const Stack = createStackNavigator();

const Screens = (): JSX.Element => {
  const {isAuth} = useSelector((state: rootModel) => state.auth);
  const theme = useTheme();
  return (
    <NavigationContainer>
      {isAuth ? (
        <BottomNavLayout>
          <Stack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
              headerMode: 'float',
              headerStatusBarHeight: 0,
              headerStyle: {backgroundColor: theme.bg, height: 56},
              headerTitleStyle: {color: theme.text},
              headerTintColor: theme.text,
              headerBackTitleVisible: false,
              cardStyleInterpolator:
                Platform.OS === 'ios'
                  ? CardStyleInterpolators.forHorizontalIOS
                  : CardStyleInterpolators.forScaleFromCenterAndroid,
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Messages"
              component={Messages}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PlaceOffer"
              component={PlaceOffer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Offer"
              component={Offer}
              options={{headerTitle: ''}}
            />
          </Stack.Navigator>
        </BottomNavLayout>
      ) : (
        <SaveAreaLayout>
          <Stack.Navigator
            initialRouteName={'Login'}
            screenOptions={{
              headerMode: 'float',
              headerStatusBarHeight: 0,
              headerStyle: {backgroundColor: theme.bg, height: 56},
              headerTitleStyle: {color: theme.text},
              headerTintColor: theme.text,
              headerBackTitleVisible: false,
              cardStyleInterpolator:
                Platform.OS === 'ios'
                  ? CardStyleInterpolators.forHorizontalIOS
                  : CardStyleInterpolators.forScaleFromCenterAndroid,
            }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Войти'}}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{title: 'Регистрация'}}
            />
          </Stack.Navigator>
        </SaveAreaLayout>
      )}
    </NavigationContainer>
  );
};
export default Screens;
