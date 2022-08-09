/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';
import { useLogin } from '../../util/auth';
import { Text } from '../../components/Text';
import logo from '../../../assets/bright-logo.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 40,
    justifyContent: 'center',
  },
  logo: {
    width: 301,
    height: 159,
    alignSelf: 'center',
  },
});

export const Login = props => {
  const { submit, errors, email, setEmail, password, setPassword } = useLogin();

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />
      {/* <Text type="header" style={{ textAlign: 'center' }}>
        Login
      </Text> */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <Button type="secondary" onPress={() => submit(props.navigation)}>
        Entrar
      </Button>
      <TouchableOpacity onPress={() => props.navigation.navigate('RecoveryAccount')}>
        <Text style={{ textAlign: 'center', marginBottom: 16 }}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 16,
        }}
      >
        ──────── ou ────────
      </Text>
      <Button onPress={() => props.navigation.navigate('Register')}>
        Criar Nova Conta
      </Button>
    </View>
  );
};
