'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/PokemonDetails.module.scss';
import { PokemonData } from '../../interfaces/pokemon';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/store/modalSlce';
import { ModalState } from '../../redux/store/modalSlce';

const PokemonDetails = () => {
  const pokemonName = useSelector(
    (state: ModalState) => state.modal.pokemonName
  );

  const [pokemonImg, setPokemonImg] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [baseXP, setBaseXP] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonDetails();
  }, []);

  const dispatch = useDispatch();

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
    dispatch(toggleModal());
  }

  return (
    <div data-testid="details" className={styles.container}>
      <button
        data-testid="close-btn"
        className={styles['close-btn']}
        onClick={closeDetailsModal}
      >
        <img
          className={styles['close-img']}
          src="/icons/close.svg"
          alt="Close button"
        />
      </button>
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
