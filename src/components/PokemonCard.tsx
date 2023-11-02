import { Pokemon } from '../interfaces/pokemon';
import styles from '../styles/PokemonCard.module.scss';

const PokemonCard = (props: Pokemon) => {
  return (
    <div className={styles.container}>
      <img className={styles['pokemon-img']} src={props.imageURL} />
      <div className={styles['pokemon-info']}>
        <p className={styles['pokemon-info__name']}>{props.name}</p>
        <p className={styles['pokemon-info__description']}>
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
