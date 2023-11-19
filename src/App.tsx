import { useEffect, useState } from 'react';
import Search from './components/Search';
import { Pokemon } from './interfaces/pokemon';
import './styles/globals.scss';
import Loader from './components/Loader';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from './components/Pagination';
import PokemonList from './components/PokemonList';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonsSlice, addPokemon, start } from './store/pokemonsSlice';

function App() {
  const pokemons = useSelector(
    (state: PokemonsSlice) => state.pokemons.pokemons
  );
  const realLength = useSelector(
    (state: PokemonsSlice) => state.pokemons.realLength
  );
  const loading = useSelector((state: PokemonsSlice) => state.pokemons.loading);
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams.get('page'))
  );
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search'));

  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.slice(1, 8)) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [location]);

  useEffect(() => {
    if (pageNumber !== 0) dispatch(start());
  }, [pageNumber]);

  useEffect(() => {
    if (pokemons.length > realLength) {
      const pokemonsTemp = Array.from(pokemons);
      pokemonsTemp.length = realLength;
      const pokemon: Pokemon = pokemonsTemp[realLength - 1];
      addPokemon({ pokemon: pokemon });
    }
  }, [pokemons]);

  useEffect(() => {
    setPageNumber(Number(searchParams.get('page')));
    setSearchTerm(searchParams.get('search'));
  }, [searchParams]);

  return (
    <div className="container">
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
    </div>
  );
}

export default App;
