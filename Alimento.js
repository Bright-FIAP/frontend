import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Icon } from '@rneui/themed';

export default class Alimento extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (typeof this.props.onPress === 'function') {
            this.props.onPress(this.props.item)
          }
        }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Card.Divider />
            <Card.Image
              style={styles.image}
              source={this.props.item.path}
            />
            <Card.Title style={styles.title}>{this.props.item.name}</Card.Title>
            <Text style={styles.descricao} numberOfLines={1}>
              {this.props.item.descricao}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'grid',
    borderTopLeftRadius: 5,
    padding: 0
  },
  card: {
    borderTopLeftRadius: 20,
    padding: 10
  },
  title: {
    marginBottom: 0,
    textAlign: 'left'
  },
  descricao: {
    marginBottom: 0,
    color: '#999',
  },
  image: {
    borderRadius: 7,
    padding: 0
  },
});
