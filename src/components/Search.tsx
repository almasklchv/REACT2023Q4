import { ChangeEvent, Component, FormEvent } from 'react';
import styles from '../styles/Search.module.scss';
import { Pokemon, PokemonAbility, PokemonData } from '../interfaces/pokemon';

interface SearchProps {
  getPokemons: (pokemons: Pokemon[]) => void;
  startLoader: () => void;
}

interface SearchState {
  searchTerm: string;
  pokemons: Pokemon[];
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') ?? '',
      pokemons: [],
    };
  }

  async componentDidMount() {
    const pokemonData = await this.getPokemonData('');

    const pokemonDataArray = await this.getListOfPokemons(pokemonData);
    pokemonDataArray.forEach((pokemonData: PokemonData | undefined) => {
      if (pokemonData) {
        this.savePokemons(pokemonData);
      }
    });

    this.setState((prevState) => {
      prevState.pokemons.length = 20;
      return prevState;
    });
  }

  getListOfPokemons = async (pokemonData: PokemonData) => {
    const results = pokemonData.results;
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
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.resetPokemons();
    this.props.startLoader();
    const pokemonData = await this.getPokemonData(this.state.searchTerm);
    if (this.state.searchTerm === '') {
      const pokemonDataArray = await this.getListOfPokemons(pokemonData);
      pokemonDataArray.forEach((pokemonData: PokemonData | undefined) => {
        if (pokemonData) {
          this.savePokemons(pokemonData);
        }
      });
      this.setState((prevState) => {
        prevState.pokemons.length = 20;
        return prevState;
      });
    } else {
      this.savePokemons(pokemonData);
    }
  };

  getPokemonData = async (searchTerm: string): Promise<PokemonData> => {
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
  };

  createPokemonObject = (pokemonData: PokemonData): Pokemon => {
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
  };

  savePokemons = (pokemonData: PokemonData) => {
    const pokemon = this.createPokemonObject(pokemonData);
    this.setState(
      (prevState) => ({
        pokemons: [...prevState.pokemons, pokemon],
      }),
      () => {
        this.props.getPokemons(this.state.pokemons);
      }
    );
  };

  resetPokemons = () => {
    this.setState({
      pokemons: [],
    });
  };

  setSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    this.setState({
      searchTerm,
    });
    localStorage.setItem('searchTerm', searchTerm);
  };

  render() {
    return (
      <>
        <form className={styles['search-form']} onSubmit={this.handleSubmit}>
          <input
            className={styles['search-form__input']}
            type="text"
            name="search-form__input"
            onChange={this.setSearchTerm}
            value={this.state.searchTerm}
            placeholder="e.g. Charmander"
          />
          <button className={styles['search-form__button']}>
            <img src="/icons/search-icon.svg" alt="Search" />
          </button>
        </form>
      </>
    );
  }
}

export default Search;
