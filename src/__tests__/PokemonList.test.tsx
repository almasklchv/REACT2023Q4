import React from 'react';
import { render, screen } from '@testing-library/react';
import { MyContext } from '../MyContext';
import PokemonList from '../components/PokemonList';
import { MemoryRouter } from 'react-router-dom';
import { mockPokemons } from '../mockData/pokemons';

const mockContextValue = {
  getPokemons: () => {},
  startLoader: () => {},
  pageNumber: 1,
  pokemons: mockPokemons,
};

describe('PokemonList component', () => {
  test('PokemonList renders Pokemon cards correctly', () => {
    render(
      <MemoryRouter>
        <MyContext.Provider value={mockContextValue}>
          <PokemonList />
        </MyContext.Provider>
      </MemoryRouter>
    );

    // Verify that each Pokemon card is rendered
    const pikachuCard = screen.getByText(/squirtle/i);
    const bulbasaurCard = screen.getByText(/bulbasaur/i);

    expect(pikachuCard).toBeDefined();
    expect(bulbasaurCard).toBeDefined();
  });

  test('PokemonList renders 20 pokemons', () => {
    render(
      <MemoryRouter>
        <MyContext.Provider value={mockContextValue}>
          <PokemonList />
        </MyContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('pokemon-list').children.length).toBe(20);
  });

  test('PokemonList renders not found, if no pokemons', () => {
    render(
      <MemoryRouter>
        <MyContext.Provider value={{ ...mockContextValue, pokemons: [] }}>
          <PokemonList />
        </MyContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('pokemon-list')).toBeDefined();
    expect(screen.getByText(/pokemons not found/i)).toBeDefined();
  });
});
