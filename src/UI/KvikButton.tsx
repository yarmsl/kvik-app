import React from 'react';
import {Button as Button} from 'react-native-elements';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {useTheme} from '../state/context/ThemeCtx';

export interface KvikButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const KvikButton = ({
  onPress,
  title,
  disabled,
  loading,
}: KvikButtonProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      width: '100%',
      height: 48,
      borderRadius: 8,
      backgroundColor: theme.prime,
    },
    disabled: {
      backgroundColor: '#A1DCE0',
    },
    disabledTitle: {
      color: '#fff',
    },
  });

  return (
    <>
      <Button
        onPress={onPress}
        title={title}
        disabled={disabled}
        buttonStyle={styles.button}
        disabledStyle={styles.disabled}
        disabledTitleStyle={styles.disabledTitle}
        loading={loading}
      />
    </>
  );
};

export default KvikButton;
