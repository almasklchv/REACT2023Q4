import { createContext } from 'react';
import { Pokemon } from './interfaces/pokemon';

type MyContextType = {
  getPokemons: (pokemons: Pokemon[], realLength: number) => void;
  startLoader: () => void;
  pageNumber: number;
  pokemons: Pokemon[];
};

const initState = {
  getPokemons: () => {},
  startLoader: () => {},
  pageNumber: 1,
  pokemons: [],
};

export const MyContext = createContext<MyContextType>(initState);
