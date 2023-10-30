import { Component } from 'react';
import Search from './components/Search';
import { Pokemon } from './interfaces/pokemon';
import './styles/globals.scss';
import PokemonCard from './components/PokemonCard';
import Loader from './components/Loader';

class App extends Component {
  state = {
    pokemons: [] as Pokemon[],
    loading: true,
  };

  getPokemons = (pokemons: Pokemon[]) => {
    this.setState(() => ({
      pokemons,
      loading: false,
    }));
  };

  startLoader = () => {
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
  };

  renderPokemonCards = (pokemons: Pokemon[]) => {
    return pokemons.map((pokemon) => (
      <PokemonCard key={pokemon.name} {...pokemon} />
    ));
  };

  render() {
    return (
      <div className="container">
        <img className="logo" src="/icons/logo.svg" />
        <Search startLoader={this.startLoader} getPokemons={this.getPokemons} />
        {this.state.loading ? (
          <Loader />
        ) : (
          this.renderPokemonCards(this.state.pokemons)
        )}
      </div>
    );
  }
}

export default App;
