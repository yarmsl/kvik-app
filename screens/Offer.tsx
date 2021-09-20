import React from 'react';
import {Text, View} from 'react-native';
import {OfferScreenProps, routeProps} from '../types/types';

interface OfferRouteProps extends routeProps {
  params: OfferScreenProps;
}
interface OfferProps {
  route: OfferRouteProps;
}

const Offer = ({route}: OfferProps): JSX.Element => {
  const offer = route.params.offer;
  return (
    <View>
      <Text>{offer.title}</Text>
      <Text>{offer.price}</Text>
      <Text>{offer.address}</Text>
    </View>
  );
};

export default Offer;
