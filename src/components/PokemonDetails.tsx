import React, { useEffect, useState } from 'react';
import styles from '../styles/components/PokemonDetails.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { PokemonData } from '../interfaces/pokemon';
import Loader from './Loader';

const PokemonDetails = () => {
  const location = useLocation();
  const pokemonName = location.pathname.slice(9);
  const [pokemonImg, setPokemonImg] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [baseXP, setBaseXP] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getPokemonDetails();
  }, []);

  async function getPokemonDetails() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase().trim()}`
    );
    const data: PokemonData = await response.json();

    setPokemonImg(data.sprites.front_default);
    setWeight(data.weight);
    setHeight(data.height);
    setBaseXP(data.base_experience);
    setIsDefault(data.is_default);
    setLoading(false);
  }

  function closeDetailsModal() {
    navigate(-1);
  }

  return (
    <div className={styles.container}>
      <button className={styles['close-btn']}>
        <img
          className={styles['close-img']}
          src="/icons/close.svg"
          alt="Close button"
          onClick={closeDetailsModal}
        />
      </button>
      {loading && <Loader />}
      {!loading && (
        <>
          <p className={styles['pokemon-name']}>{pokemonName}</p>
          <div className={styles['pokemon-info']}>
            <img
              className={styles['pokemon-info__img']}
              src={`${pokemonImg}`}
              alt=""
            />
            <div className={styles['pokemon-properties']}>
              <p>Weight: {weight / 10} kg</p>
              <p>Height: {height * 10} cm</p>
              <p>Base XP: {baseXP}</p>
              <p>Is Default: {isDefault.toString()}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
