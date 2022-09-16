/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';
import { Text } from '../../components/Text';
import { useRecoveryAccount } from '../../util/Auth';

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
  iconCenter: {
    alignSelf: 'center',
    padding: 10,
  },
});

export const RecoveryAccount = props => {
  const { submit, errors, email, setEmail } = useRecoveryAccount();

  return (
    <View style={styles.container}>
      <SimpleLineIcons
        style={styles.iconCenter}
        name="lock"
        color="black"
        size={100}
      />
      <Text style={{ textAlign: 'center', marginBottom: 16 }}>
        Insira o seu email e enviaremos um link para você voltar a acessar a sua
        conta.
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button type="secondary" onPress={() => submit(props.navigation)}>
        Enviar link para Login
      </Button>
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
        <Text style={{ textAlign: 'center', marginBottom: 16 }}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};
