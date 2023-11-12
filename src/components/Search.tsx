import { FormEvent, useContext, useEffect, useState } from 'react';
import styles from '../styles/components/Search.module.scss';
import { Pokemon, PokemonAbility, PokemonData } from '../interfaces/pokemon';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { MyContext } from '../MyContext';

const Search = () => {
  const MAX_PAGE = 65;
  const MIN_PAGE = 1;

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') ?? ''
  );
  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [realLength, setRealLength] = useState(
    localStorage.getItem('searchTerm') ? 1 : 0
  );

  const [searchParams] = useSearchParams();
  let pageNumber: number = Number(searchParams.get('page'));
  const searchWord = searchParams.get('search');

  const navigate = useNavigate();
  const offset = pageNumber * 2 * 10 - 20;

  const location = useLocation();

  const { startLoader, getPokemons } = useContext(MyContext);

  useEffect(() => {
    async function fetchData() {
      startLoader();
      resetPokemons();
      if ((searchTerm || searchWord) && !pageNumber) {
        searchWord
          ? navigate(`/?search=${searchWord}`)
          : navigate(`/?search=${searchTerm}`);

        const pokemonData = await getPokemonData(
          searchWord ? searchWord : searchTerm
        );
        savePokemons(pokemonData);
      } else {
        if (pageNumber > MAX_PAGE) pageNumber = MAX_PAGE;
        else if (pageNumber < MIN_PAGE) pageNumber = MIN_PAGE;

        pageNumber ? navigate(`/?page=${pageNumber}`) : openFirstPage();

        const pokemonData = await getPokemonData('');

        const pokemonDataArray = await getListOfPokemons(pokemonData);
        pokemonDataArray.forEach((pokemonData) => {
          if (pokemonData) {
            savePokemons(pokemonData);
          }
        });
      }
    }

    if (location.pathname === '/') {
      fetchData();
    }
  }, [pageNumber]);

  useEffect(() => {
    startLoader();
    getPokemons(pokemons, realLength);
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
          console.error(
            'Error fetching data const navigate = useNavigate();for a Pokémon:',
            error
          );
        }
      }
    );
    const pokemonDataArray = await Promise.all(pokemonPromises);
    return pokemonDataArray;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetPokemons();
    startLoader();
    localStorage.setItem('searchTerm', searchTerm);
    const pokemonData = await getPokemonData(searchTerm);
    setRealLength(1);
    if (searchTerm === '') {
      openFirstPage();

      const pokemonDataArray = await getListOfPokemons(pokemonData);
      pokemonDataArray.forEach((pokemonData: PokemonData | undefined) => {
        if (pokemonData) {
          savePokemons(pokemonData);
        }
      });
    } else {
      navigate(`/?search=${searchTerm}`);
      savePokemons(pokemonData);
    }
  }

  async function getPokemonData(searchTerm: string): Promise<PokemonData> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}${
          !searchTerm && pageNumber ? `?offset=${offset}&limit=20` : ''
        }`
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

  function openFirstPage() {
    navigate('/?page=1');
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
