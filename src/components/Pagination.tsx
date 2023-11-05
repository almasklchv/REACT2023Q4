import React from 'react';
import styles from '../styles/components/Pagination.module.scss';
import { PaginationProps } from '../interfaces/pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Pagination = (props: PaginationProps) => {
  const MAX_PAGE = 65;
  const MIN_PAGE = 1;

  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page'));
  const navigate = useNavigate();

  function prevPage() {
    navigate(`/?page=${pageNumber === MIN_PAGE ? MAX_PAGE : pageNumber - 1}`);
  }

  function nextPage() {
    navigate(`/?page=${pageNumber === MAX_PAGE ? MIN_PAGE : pageNumber + 1}`);
  }

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={prevPage}>
        <img src="/icons/arrow-left.svg" alt="arrow to left" />
      </button>
      <p className={styles['page-number']}>{props.pageNumber}</p>
      <button className={styles.btn} onClick={nextPage}>
        <img src="/icons/arrow-right.svg" alt="arrow to right" />
      </button>
    </div>
  );
};

export default Pagination;
