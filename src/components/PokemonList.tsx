import { Pokemon } from '../interfaces/pokemon';
import { PokemonsSlice } from '../store/pokemonsSlice';
import PokemonCard from './PokemonCard';
import { useSelector } from 'react-redux';

const PokemonList = () => {
  const pokemons = useSelector(
    (state: PokemonsSlice) => state.pokemons.pokemons
  );
  const loading = useSelector((state: PokemonsSlice) => state.pokemons.loading);

  function renderPokemonCards(pokemons: Pokemon[]) {
    return pokemons.map((pokemon) => {
      return <PokemonCard key={pokemon.name} {...pokemon} />;
    });
  }

  if (!pokemons.length && !loading) return <div>Pokemons not found</div>;

  return <div data-testid="pokemon-list">{renderPokemonCards(pokemons)}</div>;
};

export default PokemonList;
