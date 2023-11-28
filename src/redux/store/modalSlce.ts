import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  modal: {
    pokemonName: string;
    isOpen: boolean;
  };
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    pokemonName: '',
    isOpen: false,
  },
  reducers: {
    setPokemonName(state, action) {
      state.pokemonName = action.payload;
    },
    toggleModal(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setPokemonName, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
