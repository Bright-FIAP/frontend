import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 7,
    marginBottom: 16,
  },
  containerOutline: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  containerSecondary: {
    backgroundColor: '#ffcd0e',
    borderColor: colors.primary,
  },
  containerDanger: {
    backgroundColor: 'red',
    borderColor: colors.border,
  },
  containerDangerOutline: {
    backgroundColor: colors.white,
    borderColor: 'red',
  },

  text: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  textOutline: {
    color: colors.primary,
  },
  textDanger: {
    color: 'red',
  },
});

export const Button = ({ onPress = () => {}, children = '', type }) => {
  const containerStyles = [styles.container];
  const textStyles = [styles.text];

  if (type === 'outline') {
    containerStyles.push(styles.containerOutline);
    textStyles.push(styles.textOutline);
  }
  if (type === 'secondary') {
    containerStyles.push(styles.containerSecondary);
    textStyles.push(styles.textOutline);
  }
  if (type === 'danger') {
    containerStyles.push(styles.containerDanger);
    textStyles.push(styles.text);
  }
  if (type === 'danger-outline') {
    containerStyles.push(styles.containerDangerOutline);
    textStyles.push(styles.textDanger);
  }

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};
