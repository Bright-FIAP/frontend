import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import colors from '../../constants/colors';
import { Button } from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});

export const Settings = (props) => (
  <View style={styles.container}>
    <Button onPress={() => Alert.alert('you pressed the default button')}>
      Default Button
    </Button>
    <Button onPress={() => Alert.alert('you pressed the default button')}>
      Other Default Button
    </Button>
    <Button
      type="danger-outline"
      onPress={() => props.navigation.navigate('Login')}
    >
      Sair
    </Button>
  </View>
);
