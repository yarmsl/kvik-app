import React, {createContext, useContext, useState, useEffect} from 'react';
import {Child, themeShema} from '../../../types/types';
import {useColorScheme} from 'react-native';
import darkTheme from '../../UI/themes/dark';
import defaultTheme from '../../UI/themes/default';

const ThemeCtx = createContext({} as themeShema);

export const useTheme = (): themeShema => useContext(ThemeCtx);

const ThemeProvider = ({children}: Child): JSX.Element => {
  const [theme, setTheme] = useState<themeShema>(defaultTheme);
  const colorShema = useColorScheme();

  useEffect(() => {
    switch (colorShema) {
      case 'light':
        return setTheme(defaultTheme);
      case 'dark':
        return setTheme(darkTheme);
      case null:
        return setTheme(defaultTheme);
      default:
        return setTheme(defaultTheme);
    }
  }, [colorShema]);

  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
};

export default ThemeProvider;
