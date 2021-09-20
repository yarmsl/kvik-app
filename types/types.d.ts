import {ReactElement} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {PostModel} from '../src/state/reducers/postsReducer';

interface Child {
  children: ReactElement;
}
type OfferScreenProps = {
  offer: PostModel;
};
type RootStackParamList = {
  Home: undefined;
  Messages: undefined;
  PlaceOffer: undefined;
  Favorites: undefined;
  Profile: undefined;
  Offer: OfferScreenProps;
  Registration: undefined;
  Login: undefined;
};

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface themeShema {
  bg: '#fff' | '#000';
  bg2: '#fff' | '#2c2c2c';
  text: '#000' | '#fff';
  prime: '#00a0ab';
  second: '#8f8f8f' | '#e9e9e9';
  highlight: '#E9E9E9' | '#5a5a5a';
  yellow: '#fff6a5';
}

interface routeProps {
  key: string;
  name: string;
  path: string | undefined;
}
