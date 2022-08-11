/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';
import { useRegister } from '../../util/auth';
import logo from '../../../assets/bright-logo.png';
import { Text } from '../../components/Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 40,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 210,
    height: 130,
    alignSelf: 'center',
  },
});

export const Register = props => {
  const {
    submit,
    errors,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  } = useRegister();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text type="subheader" style={{ textAlign: 'center' }}>
        Cadastre-se e descubra receitas com o ChefBot
      </Text>
      <TextInput
        placeholder="Nome completo"
        value={name}
        onChangeText={text => setName(text)}
        errorText={errors.name}
        autoCapitalize="none"
      />
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
        Cadastra-se
      </Button>
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
        <Text style={{ textAlign: 'center', marginBottom: 16 }}>
          Já tem uma conta? Conecte-se
        </Text>
      </TouchableOpacity>
    </View>
  );
};
