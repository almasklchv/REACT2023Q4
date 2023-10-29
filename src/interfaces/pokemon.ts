export interface Pokemon {
  imageURL: string;
  name: string;
  description: string;
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonData {
  abilities?: object[];
  name?: string;
  sprites: {
    front_default: string;
  };
  results: PokemonResult[];
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}
