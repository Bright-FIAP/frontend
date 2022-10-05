import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Platform,
  ScrollView
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import receita from '../../../assets/strogonoff-frango.jpg'
import { Text } from '../../components/Text';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
    },
    receita: {
      width: 310,
      height: 230,
      alignSelf: 'center',
      borderRadius: 20
    },
    title: {
        alignSelf: 'center',  
        color: '#697278',
        paddingTop:10,
        fontSize: 13
    },
    titleReceita: {
        alignSelf: 'center',  
        color: '#2c2c2c',
        fontSize: 30,
        marginBottom: 20,
        top: -3,
    },
    subtitle: {
        alignSelf: 'flex-start',  
        color: '#697278',
        padding:0,
        textDecorationLine: 'underline'

    },
    ingredientes: {
        width:'100%',
        marginTop:0,
        marginBottom: 28,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 20
    }
  });

export function Receitas() {
    return(
    <ScrollView
    style={styles.container}
    >
      <Text type="subheader" style={styles.title}>ChefBot Recomenda ✓</Text>
      <Image source={receita} style={styles.receita} />
      <Text type="header" style={styles.titleReceita}>Strogonoff de frango</Text>
      <Text type="subheader" style={styles.subtitle}>Ingredientes:</Text>
      <Text style={styles.ingredientes}>
      • 2 tomates maduros em casca e semente picados{'\n'}
      • 1 cebola picada{'\n'}
      • 1 dente de alho ralado{'\n'}
      • 400 g de coxão mole ou frango picados{'\n'}
      • Sal a gosto{'\n'}
      • 1 lata de creme de leite{'\n'}
      • Katchup para dar cor</Text>
      <Text type="subheader" style={styles.subtitle}>Modo de preparo:</Text>
      <Text style={styles.ingredientes}>
      1 - Coloque em uma panela a cebola e o alho, refogue bem.{'\n'}
      2 - Colocar o tomate picado refogue até o tomate secar.{'\n'}
      3 - Coloque a carne ou frango e o sal, deixe secar a água que ira criar, doure a carne.{'\n'}
      4 - Coloque o creme de leite e o catchup e está pronto.{'\n'}
      5 - Acompanhe com arroz e batata palha.</Text>
    </ScrollView>
    );
}
