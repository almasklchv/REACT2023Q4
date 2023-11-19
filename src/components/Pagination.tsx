import styles from '../styles/components/Pagination.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PaginationSlice } from '../store/paginationSlice';

const Pagination = () => {
  const MAX_PAGE = 65;
  const MIN_PAGE = 1;
  const navigate = useNavigate();
  const pageNumber = useSelector(
    (state: PaginationSlice) => state.pagination.pageNumber
  );

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
      <p className={styles['page-number']}>{pageNumber}</p>
      <button
        data-testid="arrow to right"
        className={styles.btn}
        onClick={nextPage}
      >
        <img src="/icons/arrow-right.svg" alt="arrow to right" />
      </button>
    </div>
  );
};

export default Pagination;
