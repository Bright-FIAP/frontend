import React from 'react'
import { Text, Card, Icon } from '@rneui/themed';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

export default class AlimentoReceita extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (typeof this.props.onClosed === 'function') {
              this.props.onClosed()
            }
          }}>
          Voltar
                </TouchableOpacity>
        <Card.Image
          source={{ uri: this.props.alimento.path }}
          style={styles.image} />

        <Card.Title style={styles.titulo}>{this.props.alimento.name}</Card.Title>

        <View style={styles.iconeComTitulo}><Card.Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/135/135392.png" }}
          style={styles.icone} />
          <Text style={styles.titulo}> Ingredientes </Text></View>

        <View><Text style={styles.texto}>{this.props.alimento.ingredientes}</Text></View>

        <View style={styles.iconeComTitulo}><Card.Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/113/113339.png" }}
          style={styles.icone} />
          <Text style={styles.titulo}> Modo de preparo </Text></View>

        <View>
          <Text style={styles.texto}>{this.props.alimento.preparo}</Text>
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    fontSize: 17,
    color: '#f7d917',
    marginBottom: 20,
  },
  image: {
    borderRadius: 7,
    padding: 0
  },
  icone: {
    width: 24,
    height: 24,
  },
  iconeComTitulo: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  texto: {
    paddingHorizontal: 16
  }
});
