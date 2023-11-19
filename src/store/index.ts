import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemonsSlice';
import paginationReducer from './paginationSlice';

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pagination: paginationReducer,
  },
});
