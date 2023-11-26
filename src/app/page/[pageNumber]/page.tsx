import React from 'react';
import { PokemonData } from '../../../interfaces/pokemon';
import PokemonList from '../../components/PokemonList';
import Pagination from '../../components/Pagination';
import { convertPokemonData } from '../../resources/convert-pokemon-data';
import { getListOfPokemons } from '../../resources/get-list-of-pokemons';

async function getData(pageNumber: number) {
  const offset = pageNumber * 2 * 10 - 20;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`,
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
  params: { pageNumber: number };
}) {
  return {
    title: `Page ${params.pageNumber} | Pokemon Search`,
  };
}

const Page = async ({ params }: { params: { pageNumber: number } }) => {
  const pokemonData = await getData(params.pageNumber);
  const pokemons: PokemonData[] | [] = await getListOfPokemons(pokemonData);
  const convertedPokemons = convertPokemonData(pokemons);
  return (
    <div>
      <PokemonList pokemons={convertedPokemons} />
      <Pagination />
    </div>
  );
};

export default Page;
