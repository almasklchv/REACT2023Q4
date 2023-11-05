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
  weight: number;
  height: number;
  base_experience: string;
  is_default: boolean;
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}
