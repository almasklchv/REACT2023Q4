import { Component } from 'react';
import { Pokemon } from '../interfaces/pokemon';
import styles from '../styles/PokemonCard.module.scss';

class PokemonCard extends Component<Pokemon> {
  render() {
    return (
      <div className={styles.container}>
        <img className={styles['pokemon-img']} src={this.props.imageURL} />
        <div className={styles['pokemon-info']}>
          <p className={styles['pokemon-info__name']}>{this.props.name}</p>
          <p className={styles['pokemon-info__description']}>
            {this.props.description}
          </p>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
