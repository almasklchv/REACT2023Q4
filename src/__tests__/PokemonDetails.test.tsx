import { MemoryRouter } from 'react-router-dom';
import PokemonCard from '../app/components/PokemonCard';
import { mockPokemons } from '../mockData/pokemons';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../app/components/PokemonDetails';

import fetchMock from 'jest-fetch-mock';
import { mockPokemonData } from '../mockData/pokemon';
import { act } from 'react-dom/test-utils';

describe('PokemonDetails Component', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemonData));
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('loading indicator displays while fetching data', () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemons[0]} />
        <PokemonDetails />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText(/открыть/i));

    expect(screen.getByAltText(/loading.../i)).toBeDefined();
  });

  test('details card component correctly displays the data', async () => {
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
    expect(screen.getByText(/height: 70 cm/i)).toBeDefined();
    expect(screen.getByText(/base xp: 64/i)).toBeDefined();
    expect(screen.getByText(/is default: true/i)).toBeDefined();
  });
});
