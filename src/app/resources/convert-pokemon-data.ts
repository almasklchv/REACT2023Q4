import { PokemonData, Pokemon, PokemonAbility } from '../../interfaces/pokemon';

export function convertPokemonData(pokemonData: PokemonData[]): Pokemon[] {
  const pokemons: Pokemon[] = [];

  pokemonData.forEach((pokemon) => {
    const pokemonAbilities: string[] =
      (pokemon.abilities as PokemonAbility[])?.map(
        (ability) => ability.ability.name
      ) ?? [];
    const convertedPokemon: Pokemon = {
      imageURL: pokemon.sprites.front_default,
      name: pokemon.name ?? '',
      description: `Abilities: ${pokemonAbilities.join(', ')}`,
    };

    pokemons.push(convertedPokemon);
  });

  return pokemons;
}
