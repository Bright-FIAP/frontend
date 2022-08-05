import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Icon } from '@rneui/themed';
import Alimento from './Alimento.js'

export default class ReceitasList extends React.Component {
  render() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.titleHeader} numberOfLines={1}>
            Receitas sugeridas
              </Text>
        </View>
        <FlatList
          data={this.props.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <Alimento
              item={item}
              onPress={(alimento) => {
                if (typeof this.props.onPress === 'function') {
                  this.props.onPress(alimento)
                }
              }} />
          }}
        />
      </>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
    alignSelf: 'center',
    alignItems: 'flex-end'
  },
  titleHeader: {
    marginTop: 16,
    color: '#f7d917',
    fontSize: 24
  },
});