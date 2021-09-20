import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {phoneFormat} from '../src/lib/phoneFormat';
import {useForm, Controller} from 'react-hook-form';
import {signIn} from '../src/state/actions/auth.actions';
import {useTheme} from '../src/state/context/ThemeCtx';
import {rootModel} from '../src/state/reducers/rootReducer';
import KvikButton from '../src/UI/KvikButton';
import {HomeScreenProp} from '../types/types';

export interface AuthData {
  phone: string;
  password: string;
}

const Login = (): JSX.Element => {
  const nav = useNavigation<HomeScreenProp>();
  const dispatch = useDispatch();
  const {handleSubmit, control, setError} = useForm<AuthData>();
  const [visible, setVisible] = useState(true);

  const theme = useTheme();
  const themes = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.bg,
    },
    input: {
      borderColor: theme.second,
    },
    text: {
      color: theme.text,
    },
  });

  const handleLogin = (data: AuthData) => {
    data.phone = `+${data.phone.replace(/\D/g, '')}`;
    dispatch(signIn(data));
  };

  const {isset} = useSelector((state: rootModel) => state.auth);

  useEffect(() => {
    if (isset) {
      setError('password', {type: 'validate', message: 'Неверные данные'});
    }
  }, [isset, setError]);

  return (
    <View style={[themes.wrapper, styles.wrapper]}>
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Input
            containerStyle={styles.container}
            inputContainerStyle={[themes.input, styles.input]}
            inputStyle={themes.text}
            placeholder="+7 (999) 777-77-77"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            maxLength={18}
            placeholderTextColor={theme.second}
            value={value}
            onChangeText={text => onChange(phoneFormat(text))}
            errorMessage={error ? error.message : undefined}
            leftIcon={
              <Icon name="phone" type="entypo" color={theme.prime} size={24} />
            }
          />
        )}
        rules={{
          required: 'Введите номер',
          minLength: {
            value: 17,
            message: 'Введите номер полностью',
          },
        }}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Input
            containerStyle={styles.container}
            inputContainerStyle={[themes.input, styles.input]}
            placeholder="Пароль"
            placeholderTextColor={theme.second}
            value={value}
            autoCompleteType="password"
            secureTextEntry={visible}
            onChangeText={onChange}
            errorMessage={error ? error.message : undefined}
            leftIcon={
              <Icon name="lock" type="entypo" color={theme.prime} size={24} />
            }
            rightIcon={
              <Icon
                onPress={() => setVisible(p => !p)}
                name={visible ? 'eye' : 'eye-with-line'}
                color={theme.second}
                type="entypo"
              />
            }
          />
        )}
        rules={{
          required: 'Введите пароль',
          //  minLength: {
          //    value: 8,
          //    message: 'минимум 8 символов',
          //  },
        }}
      />
      <KvikButton
        onPress={handleSubmit(data => handleLogin(data))}
        title="Войти"
      />
      <KvikButton
        title="Регистрация"
        onPress={() => nav.navigate('Registration')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 32,
    width: '100%',
    height: '100%',
  },
  container: {
    paddingHorizontal: 0,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
});

export default Login;
