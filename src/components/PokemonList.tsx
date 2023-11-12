import { useContext } from 'react';
import { MyContext } from '../MyContext';
import { Pokemon } from '../interfaces/pokemon';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const { pokemons } = useContext(MyContext);

  function renderPokemonCards(pokemons: Pokemon[]) {
    return pokemons.map((pokemon) => {
      return <PokemonCard key={pokemon.name} {...pokemon} />;
    });
  }

  if (!pokemons.length) return <div>Pokemons not found</div>;

  return <div data-testid="pokemon-list">{renderPokemonCards(pokemons)}</div>;
};

export default PokemonList;
