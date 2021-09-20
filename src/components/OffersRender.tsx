import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../state/context/ThemeCtx';
import {PostModel} from '../state/reducers/postsReducer';
import KvikOfferCard from '../UI/KvikOfferCard';

interface OffersRenderProps {
  offers: PostModel[];
}

const OffersRender = ({offers}: OffersRenderProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.bg,
    },
  });
  return (
    <View style={[staticStyles.wrapper, styles.wrapper]}>
      {offers.length > 0 &&
        offers.map((offer, i) => {
          return <KvikOfferCard key={i} offer={offer} />;
        })}
    </View>
  );
};

const staticStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default OffersRender;
