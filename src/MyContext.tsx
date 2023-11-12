import { createContext } from 'react';
import { Pokemon } from './interfaces/pokemon';

type MyContextType = {
  getPokemons: (pokemons: Pokemon[], realLength: number) => void;
  startLoader: () => void;
  pageNumber: number;
};

const initState = {
  getPokemons: () => {},
  startLoader: () => {},
  pageNumber: 1,
};

export const MyContext = createContext<MyContextType>(initState);
