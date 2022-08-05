import React from 'react'
import { View } from 'react-native';
import ReceitasList from './ReceitasList.js'
import AlimentoReceita from './AlimentoReceita.js'
import dados from './data/alimentos.json'

export default class App extends React.Component {

  state = {
    alimentoSelecionado: null
  }
  render() {
    return (
      <View>
        {this.state.alimentoSelecionado == null && (
          <ReceitasList
            data={dados}
            onPress={(alimento) => this.setState({ alimentoSelecionado: alimento })} />
        )}

        {this.state.alimentoSelecionado != null && (
          <AlimentoReceita 
            alimento={ this.state.alimentoSelecionado }
            onClosed={ () => {
              this.setState({ alimentoSelecionado : null })
            } } />
        )}

      </View>
    )
  }
}
