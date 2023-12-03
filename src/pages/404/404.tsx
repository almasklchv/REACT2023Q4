import React from 'react';
import styles from './404.module.css';

const NotFound = () => {
  return (
    <div className={styles['error-message']}>Page not found. Error 404.</div>
  );
};

export default NotFound;
