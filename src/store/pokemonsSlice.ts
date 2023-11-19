import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '../interfaces/pokemon';

export interface PokemonsSlice {
  pokemons: {
    pokemons: Pokemon[];
    loading: boolean;
    realLength: number;
  };
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemons: [] as Pokemon[],
    loading: true,
    realLength: 0,
  },
  reducers: {
    addPokemon(state, action: { payload: { pokemon: Pokemon } }) {
      if (!state.loading) state.loading = true;
      state.pokemons.push(action.payload.pokemon);
    },
    resetPokemons(state) {
      state.pokemons = [];
    },
    finish(state) {
      state.loading = false;
    },
    start(state) {
      state.loading = true;
    },
    setRealLength(state, action) {
      state.realLength = action.payload.realLength;
    },
  },
});

export const { addPokemon, resetPokemons, finish, start, setRealLength } =
  pokemonsSlice.actions;

export default pokemonsSlice.reducer;
