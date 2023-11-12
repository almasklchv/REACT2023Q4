import { MemoryRouter } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { mockPokemons } from '../mockData/pokemons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import { act } from 'react-dom/test-utils';

import fetchMock from 'jest-fetch-mock';
import { mockPokemonData } from '../mockData/pokemon';

describe('PokemonCard Component', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('Card component renders the relevant card data', async () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemons[0]} />
        <PokemonDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeDefined();
    expect(screen.getByText(/abilities: overgrow, chlorophyll/i)).toBeDefined();
  });

  test('Click on Card component opens Details component', async () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemons[0]} />
        <PokemonDetails />
      </MemoryRouter>
    );

    await act(async () => {
      userEvent.click(screen.getByText(/открыть/i));
    });
    expect(screen.getByText(/weight: 6.9 kg/i)).toBeDefined();
  });

  test('Click on Card component opens Details component and triggers API call', async () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemons[0]} />
        <PokemonDetails />
      </MemoryRouter>
    );

    await act(async () => {
      userEvent.click(screen.getByText(/открыть/i));
    });

    expect(screen.getByText(/weight: 6.9 kg/i)).toBeDefined();
    expect(fetchMock.mock.calls.length).toBe(1);
  });
});
