import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../interfaces/pokemon';
import styles from '../styles/components/PokemonCard.module.scss';

const PokemonCard = (props: Pokemon) => {
  const navigate = useNavigate();

  const openPokemonDetails = () => {
    navigate(`/pokemon/${props.name}`);
  };

  return (
    <div className={styles.container}>
      <img className={styles['pokemon-img']} src={props.imageURL} />
      <div className={styles['pokemon-info']}>
        <p className={styles['pokemon-info__name']}>{props.name}</p>
        <p className={styles['pokemon-info__description']}>
          {props.description}
        </p>
      </div>
      <button className={styles.btn} onClick={openPokemonDetails}>
        <img src="/icons/open.svg" alt="Open Button" />
        <p>открыть</p>
      </button>
    </div>
  );
};

export default PokemonCard;
