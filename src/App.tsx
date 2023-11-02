import { useEffect, useState } from 'react';
import Search from './components/Search';
import { Pokemon } from './interfaces/pokemon';
import './styles/globals.scss';
import PokemonCard from './components/PokemonCard';
import Loader from './components/Loader';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [realLength, setRealLength] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemons.length > realLength) {
      const pokemonsTemp = Array.from(pokemons);
      pokemonsTemp.length = realLength;
      setPokemons(pokemonsTemp);
    }
  }, [pokemons]);

  function getPokemons(pokemons: Pokemon[], realLength: number) {
    setPokemons(pokemons);
    setLoading(false);
    setRealLength(realLength);
  }

  function startLoader() {
    setLoading(true);
  }

  function renderPokemonCards(pokemons: Pokemon[]) {
    return pokemons.map((pokemon) => {
      return <PokemonCard key={pokemon.name} {...pokemon} />;
    });
  }

  return (
    <div className="container">
      <img className="logo" src="/icons/logo.svg" />
      <Search startLoader={startLoader} getPokemons={getPokemons} />
      {loading ? <Loader /> : renderPokemonCards(pokemons)}
    </div>
  );
}

export default App;
