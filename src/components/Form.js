import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 4,
  },
  labelText: {
    color: colors.gray,
    fontSize: 18,
    marginBottom: 4,
  },
  textInput: {
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 8,
  },
  border: {
    height: 1,
    backgroundColor: colors.border,
  },
  borderError: {
    backgroundColor: colors.error,
  },
  errorText: {
    marginTop: 5,
    color: colors.error,
  },
});

export const TextInput = ({ label, errorText, ...rest }) => {
  const borderStyles = [styles.border];

  if (errorText && errorText.length > 0) {
    borderStyles.push(styles.borderError);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <RNTextInput style={styles.textInput} {...rest} />
      <View style={borderStyles} />
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
};
