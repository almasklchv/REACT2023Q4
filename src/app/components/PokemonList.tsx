'use client';

import { Pokemon } from '../../interfaces/pokemon';
import PokemonCard from './PokemonCard';
import styles from '../../styles/components/PokemonList.module.scss';

interface PokemonListInterface {
  pokemons: Pokemon[];
}

const PokemonList = (props: PokemonListInterface) => {
  function renderPokemonCards(pokemons: Pokemon[]) {
    return pokemons.map((pokemon) => {
      return <PokemonCard key={pokemon.name} {...pokemon} />;
    });
  }

  return (
    <div className={styles['pokemon-list']} data-testid="pokemon-list">
      {renderPokemonCards(props.pokemons)}
    </div>
  );
};

export default PokemonList;
