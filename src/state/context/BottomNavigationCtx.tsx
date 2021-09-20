import React, {createContext, useContext, useState} from 'react';
import {Child} from '../../../types/types';

export type BottomRoutes =
  | 'Home'
  | 'Messages'
  | 'PlaceOffer'
  | 'Favorites'
  | 'Profile';
export interface BottomNavTypes {
  route: BottomRoutes;
  setRoute: React.Dispatch<React.SetStateAction<BottomRoutes>>;
}

const bottomNavCtx = createContext({} as BottomNavTypes);

export const useBottomNav = (): BottomNavTypes => useContext(bottomNavCtx);

const BottomNavigationCtx = ({children}: Child): JSX.Element => {
  const [route, setRoute] = useState<BottomRoutes>('Home');

  return (
    <bottomNavCtx.Provider value={{route, setRoute}}>
      {children}
    </bottomNavCtx.Provider>
  );
};

export default BottomNavigationCtx;
