import { PokemonData, Pokemon, PokemonAbility } from '../../interfaces/pokemon';

export function createPokemonObject(pokemonData: PokemonData): Pokemon {
  const pokemonName: string = pokemonData.name ?? '';
  const pokemonAbilities: string[] =
    (pokemonData.abilities as PokemonAbility[])?.map(
      (ability) => ability.ability.name
    ) ?? [];
  const pokemonSprite = pokemonData.sprites.front_default;
  const pokemon: Pokemon = {
    imageURL: pokemonSprite,
    name: pokemonName,
    description: `Abilities: ${pokemonAbilities.join(', ')}`,
  };
  return pokemon;
}
