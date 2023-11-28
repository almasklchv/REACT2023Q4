import React from 'react';
import { createPokemonObject } from '../../resources/create-pokemon-object';
import SearchInput from '../../components/SearchInput';
import PokemonCard from '../../components/PokemonCard';

async function getData(searchWord: string) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchWord}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  return response.json();
}

export function generateMetadata({
  params,
}: {
  params: { searchWord: string };
}) {
  return {
    title: `Search for ${params.searchWord}`,
  };
}

const Search = async ({ params }: { params: { searchWord: string } }) => {
  const pokemonData = await getData(params.searchWord);

  console.log(pokemonData);
  const convertedPokemon = createPokemonObject(pokemonData);
  return (
    <div>
      <SearchInput />
      <PokemonCard {...convertedPokemon} />
    </div>
  );
};

export default Search;
