import { useEffect, useState } from 'react';
import Search from './components/Search';
import { Pokemon } from './interfaces/pokemon';
import './styles/globals.scss';
import PokemonCard from './components/PokemonCard';
import Loader from './components/Loader';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from './components/Pagination';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [realLength, setRealLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams.get('page'))
  );
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search'));

  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.slice(1, 8)) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [location]);

  useEffect(() => {
    if (pageNumber !== 0) startLoader();
  }, [pageNumber]);

  useEffect(() => {
    if (pokemons.length > realLength) {
      const pokemonsTemp = Array.from(pokemons);
      pokemonsTemp.length = realLength;
      setPokemons(pokemonsTemp);
    }
  }, [pokemons]);

  useEffect(() => {
    setPageNumber(Number(searchParams.get('page')));
    setSearchTerm(searchParams.get('search'));
  }, [searchParams]);

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
      <div className={`left ${isModalOpen && 'to-left'}`}>
        <img className="logo" src="/icons/logo.svg" />
        <Search startLoader={startLoader} getPokemons={getPokemons} />
        {loading && <Loader />}
        {renderPokemonCards(pokemons)}
        {!searchTerm && <Pagination pageNumber={pageNumber} />}
      </div>
      <div className="pokemonDetails">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
