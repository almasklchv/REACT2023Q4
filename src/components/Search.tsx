import { FormEvent, useEffect, useState } from 'react';
import styles from '../styles/Search.module.scss';
import { Pokemon, PokemonAbility, PokemonData } from '../interfaces/pokemon';

interface SearchProps {
  getPokemons: (pokemons: Pokemon[], realLength: number) => void;
  startLoader: () => void;
}

const Search = (props: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') ?? ''
  );
  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [realLength, setRealLength] = useState(
    localStorage.getItem('searchTerm') ? 1 : 0
  );

  useEffect(() => {
    async function fetchData() {
      if (searchTerm) {
        const pokemonData = await getPokemonData(searchTerm ?? '');
        savePokemons(pokemonData);
      } else {
        const pokemonData = await getPokemonData(searchTerm ?? '');

        const pokemonDataArray = await getListOfPokemons(pokemonData);
        pokemonDataArray.forEach((pokemonData) => {
          if (pokemonData) {
            savePokemons(pokemonData);
          }
        });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    props.startLoader();
    props.getPokemons(pokemons, realLength);
  }, [pokemons]);

  async function getListOfPokemons(pokemonData: PokemonData) {
    const results = pokemonData.results;
    setRealLength(results.length);
    const pokemonPromises = results.map(
      async (pokemon: { name: string; url: string }) => {
        try {
          const response = await fetch(pokemon.url);
          if (response.ok) {
            const data: PokemonData = await response.json();
            return data;
          }
        } catch (error) {
          console.error('Error fetching data for a Pokémon:', error);
        }
      }
    );
    const pokemonDataArray = await Promise.all(pokemonPromises);
    return pokemonDataArray;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetPokemons();
    props.startLoader();
    localStorage.setItem('searchTerm', searchTerm);
    const pokemonData = await getPokemonData(searchTerm);
    setRealLength(1);
    if (searchTerm === '') {
      const pokemonDataArray = await getListOfPokemons(pokemonData);
      pokemonDataArray.forEach((pokemonData: PokemonData | undefined) => {
        if (pokemonData) {
          savePokemons(pokemonData);
        }
      });
    } else {
      savePokemons(pokemonData);
    }
  }

  async function getPokemonData(searchTerm: string): Promise<PokemonData> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data from the API`);
      }

      const data: PokemonData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  function createPokemonObject(pokemonData: PokemonData): Pokemon {
    const pokemonName: string = pokemonData.name ?? '';
    const pokemonAbilities: string[] =
      (pokemonData.abilities as PokemonAbility[])?.map(
        (ability) => ability.ability.name
      ) ?? [];
    const pokemonSprite = pokemonData.sprites.front_default;
    const pokemon: Pokemon = {
      imageURL: pokemonSprite,
      name: pokemonName,
      description: `Abilities: ${pokemonAbilities.join(', ')}`,
    };
    return pokemon;
  }

  function savePokemons(pokemonData: PokemonData) {
    const pokemon = createPokemonObject(pokemonData);
    setPokemons((prevPokemons) => [...prevPokemons, pokemon]);
  }

  function resetPokemons() {
    setPokemons([]);
  }

  return (
    <div>
      <form className={styles['search-form']} onSubmit={handleSubmit}>
        <input
          className={styles['search-form__input']}
          type="text"
          name="search-form__input"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="e.g. Charmander"
        />
        <button className={styles['search-form__button']}>
          <img src="/icons/search-icon.svg" alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default Search;
