import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {date2str, ToRubles} from '../lib/services';
import {setLikeAndComment} from '../state/actions/user.actions';
import {useTheme} from '../state/context/ThemeCtx';
import {PostModel} from '../state/reducers/postsReducer';
import {rootModel} from '../state/reducers/rootReducer';
import {FavoritesTypes} from '../state/reducers/userReducer';
import {HomeScreenProp} from '../../types/types';

export interface KvikOfferCardProps {
  offer: PostModel;
  size?: 'small' | 'default';
}

export interface commView {
  width: string;
  color: '#000' | '#fff' | '#fff6a5';
}

const commercialView = (
  commercial: 0 | 1 | 2,
  mainColor: '#000' | '#fff',
): commView => {
  switch (commercial) {
    case 0:
      return {width: '50%', color: mainColor};
    case 1:
      return {width: '50%', color: '#fff6a5'};
    case 2:
      return {width: '100%', color: '#fff6a5'};
    default:
      return {width: '50%', color: mainColor};
  }
};

const likeRender = (favorites: FavoritesTypes[], id: number): boolean => {
  const res = favorites?.filter(fav => fav.post_id === id);
  if (res?.length === 1) {
    return res[0].condition;
  }
  return false;
};

const KvikOfferCard = ({
  offer,
  size = 'default',
}: KvikOfferCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const nav = useNavigation<HomeScreenProp>();
  const {id, photo, price, title, address, created_at, commercial} = offer;
  const {favorites} = useSelector((state: rootModel) => state.user);
  const {idUser} = useSelector((state: rootModel) => state.auth);
  const theme = useTheme();
  const likeCondition = likeRender(favorites, +id);
  const styles = StyleSheet.create({
    wrapper: {
      width:
        size === 'default' ? commercialView(commercial, theme.bg).width : 168,
    },
    container: {
      backgroundColor: commercialView(commercial, theme.bg).color,
    },
    text: {
      color: theme.text,
    },
    textLight: {
      color: theme.second,
    },
  });
  return (
    <View style={[styles.wrapper, staticStyles.wrapper]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[staticStyles.container, styles.container]}
        onPress={() => nav.navigate('Offer', {offer: offer})}>
        <View style={staticStyles.imageContainer}>
          <Icon
            size={30}
            iconStyle={staticStyles.icon}
            containerStyle={staticStyles.iconContainer}
            color={'#fff'}
            name={likeCondition ? 'favorite' : 'favorite-outline'}
            onPress={() =>
              dispatch(
                setLikeAndComment({
                  idUser: idUser,
                  post_id: +id,
                  comment: '',
                  condition: !likeCondition,
                }),
              )
            }
          />
          <Image
            style={staticStyles.image}
            resizeMode={'cover'}
            source={{uri: `${photo[0]}`}}
          />
        </View>

        <View style={staticStyles.info}>
          <Text style={[staticStyles.price, styles.text]}>
            {ToRubles(price)}
          </Text>
          <Text style={[staticStyles.title, styles.text]}>{title}</Text>
          <View>
            <Text style={[staticStyles.text, styles.textLight]}>{address}</Text>
            <Text style={[staticStyles.text, styles.textLight]}>
              {date2str(created_at)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const staticStyles = StyleSheet.create({
  wrapper: {
    height: 272,
    padding: 4,
  },
  container: {
    width: '100%',
    height: 264,
    borderRadius: 8,
    elevation: 20,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowColor: '#000',
    shadowRadius: 20,
  },
  imageContainer: {
    width: '100%',
    height: 172,
    position: 'relative',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    borderRadius: 30,
    top: 7,
    right: 7,
    zIndex: 10,
  },
  icon: {
    backgroundColor: '#0000001A',
    padding: 3,
  },
  info: {
    height: 92,
    padding: 8,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 21,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
  },
  text: {
    fontSize: 11,
    fontWeight: '400',
  },
});
export default KvikOfferCard;
