import { PokemonData } from '../../interfaces/pokemon';

export async function getListOfPokemons(
  pokemonData: PokemonData
): Promise<PokemonData[]> {
  if (!pokemonData) return [];

  const results = pokemonData.results;
  const pokemonPromises = results.map(
    async (pokemon: { name: string; url: string }) => {
      try {
        const response = await fetch(pokemon.url);
        if (response.ok) {
          const data: PokemonData = await response.json();
          return data;
        }
      } catch (error) {
        console.error('Error fetching data for a Pokémon:', error);
      }
    }
  );

  const resolvedPokemonDataArray = await Promise.all(pokemonPromises);

  const pokemonDataArray = resolvedPokemonDataArray.filter(
    (data): data is PokemonData => data !== undefined
  );

  return pokemonDataArray;
}
