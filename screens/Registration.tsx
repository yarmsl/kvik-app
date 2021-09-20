import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Icon, Input} from 'react-native-elements';
import {phoneFormat} from '../src/lib/phoneFormat';
import {useTheme} from '../src/state/context/ThemeCtx';
import {StyleSheet} from 'react-native';
import KvikButton from '../src/UI/KvikButton';
import {getDataByPost} from '../src/lib/fetch';
import {rootModel} from '../src/state/reducers/rootReducer';
import {useSelector, useDispatch} from 'react-redux';
import {signUp} from '../src/state/actions/auth.actions';

export interface RegData {
  name: string;
  surname: string;
  phone: string;
  password: string;
  password_check: string;
}

export interface responseReg {
  message: 'user created' | 'user already exists';
  id?: number;
}

const Registration = (): JSX.Element => {
  const {handleSubmit, control, watch} = useForm<RegData>();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [visibleR, setVisibleR] = useState(true);
  const [sendData, setSendData] = useState({} as RegData);
  const [checkPhone, setCheckPhone] = useState('');
  const [digits, setDigits] = useState('');
  const [errorCheck, setErrorCheck] = useState(false);
  const {exist} = useSelector((state: rootModel) => state.auth);

  useEffect(() => {
    if (exist) {
      setErrorCheck(true);
    }
  }, [exist, setErrorCheck]);

  const styles = StyleSheet.create({
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
  const handleRegistration = (data: RegData) => {
    data.phone = `+${data.phone.replace(/\D/g, '')}`;
    console.log(data);
    setSendData(data);
    getDataByPost('/api/checkphone', {phone: data.phone}).then(r =>
      setCheckPhone(r as string),
    );
  };

  const handleCheck = (text: string) => {
    setDigits(text);
    const lastDigits = checkPhone.substr(-4);
    if (text === lastDigits) {
      dispatch(signUp(sendData));
    }
  };

  return (
    <>
      {checkPhone ? (
        <View style={[staticStyles.wrapper, styles.wrapper]}>
          <Text>Введите последние 4 цифры</Text>
          <Input
            containerStyle={staticStyles.container}
            inputContainerStyle={[styles.input, staticStyles.input]}
            inputStyle={styles.text}
            maxLength={4}
            value={digits}
            onChangeText={handleCheck}
            errorMessage={errorCheck ? 'Вы уже зарегистрированы' : undefined}
          />
        </View>
      ) : (
        <View style={[staticStyles.wrapper, styles.wrapper]}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                containerStyle={staticStyles.container}
                inputContainerStyle={[styles.input, staticStyles.input]}
                inputStyle={styles.text}
                placeholder="Иван"
                autoCompleteType="name"
                maxLength={25}
                placeholderTextColor={theme.second}
                value={value}
                onChangeText={text => onChange(text)}
                errorMessage={error ? error.message : undefined}
              />
            )}
            rules={{
              required: 'Введите имя',
            }}
          />
          <Controller
            name="surname"
            control={control}
            defaultValue=""
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                containerStyle={staticStyles.container}
                inputContainerStyle={[styles.input, staticStyles.input]}
                inputStyle={styles.text}
                placeholder="Иванов"
                autoCompleteType="username"
                maxLength={25}
                placeholderTextColor={theme.second}
                value={value}
                onChangeText={text => onChange(text)}
                errorMessage={error ? error.message : undefined}
              />
            )}
            rules={{
              required: 'Введите фамилию',
            }}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                containerStyle={staticStyles.container}
                inputContainerStyle={[styles.input, staticStyles.input]}
                inputStyle={styles.text}
                placeholder="+7 (999) 777-77-77"
                keyboardType="phone-pad"
                autoCompleteType="tel"
                maxLength={18}
                placeholderTextColor={theme.second}
                value={value}
                onChangeText={text => onChange(phoneFormat(text))}
                errorMessage={error ? error.message : undefined}
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
                containerStyle={staticStyles.container}
                inputContainerStyle={[staticStyles.input, styles.input]}
                placeholder="Пароль"
                placeholderTextColor={theme.second}
                value={value}
                autoCompleteType="password"
                secureTextEntry={visible}
                onChangeText={onChange}
                errorMessage={error ? error.message : undefined}
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
          <Controller
            name="password_check"
            control={control}
            defaultValue=""
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <Input
                containerStyle={staticStyles.container}
                inputContainerStyle={[staticStyles.input, styles.input]}
                placeholder="Повторите пароль"
                placeholderTextColor={theme.second}
                value={value}
                autoCompleteType="password"
                secureTextEntry={visibleR}
                onChangeText={onChange}
                errorMessage={error ? error.message : undefined}
                rightIcon={
                  <Icon
                    onPress={() => setVisibleR(p => !p)}
                    name={visibleR ? 'eye' : 'eye-with-line'}
                    color={theme.second}
                    type="entypo"
                  />
                }
              />
            )}
            rules={{
              required: 'Подтвердите пароль',
              validate: value =>
                value === watch('password') ? undefined : 'Пароли не совпадают',
              //  minLength: {
              //    value: 8,
              //    message: 'минимум 8 символов',
              //  },
            }}
          />
          <KvikButton
            title="Зарегестрироваться"
            onPress={handleSubmit(data => handleRegistration(data))}
          />
        </View>
      )}
    </>
  );
};

const staticStyles = StyleSheet.create({
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

export default Registration;
