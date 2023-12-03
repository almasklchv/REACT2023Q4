import React from 'react';
import styles from './Home.module.css';
import UserList from '../../components/UserList/UserList';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux';

const Home = () => {
  const users = useSelector(userSelector);
  localStorage.setItem('users', JSON.stringify(users));

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Link to={'/uncontrolled'}>
          <button className="button button-primary">Uncontrolled Form</button>
        </Link>
        <Link to={'/controlled'}>
          <button className="button button-secondary">Controlled Form</button>
        </Link>
      </div>

      <UserList />
    </div>
  );
};

export default Home;
