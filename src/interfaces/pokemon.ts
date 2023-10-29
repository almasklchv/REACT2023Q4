export interface Pokemon {
  imageURL: string;
  name: string;
  description: string;
}

export interface PokemonData {
  abilities?: object[];
  name?: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}
