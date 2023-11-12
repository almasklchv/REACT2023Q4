import { useEffect, useState } from 'react';
import Search from './components/Search';
import { Pokemon } from './interfaces/pokemon';
import './styles/globals.scss';
import Loader from './components/Loader';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from './components/Pagination';
import { MyContext } from './MyContext';
import PokemonList from './components/PokemonList';

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

  return (
    <div className="container">
      <MyContext.Provider
        value={{ getPokemons, startLoader, pageNumber, pokemons }}
      >
        <div className={`left ${isModalOpen && 'to-left'}`}>
          <img className="logo" src="/icons/logo.svg" />
          <Search />
          {loading && <Loader />}
          <PokemonList />
          {!searchTerm && <Pagination />}
        </div>
        <div className="pokemonDetails">
          <Outlet />
        </div>
      </MyContext.Provider>
    </div>
  );
}

export default App;
