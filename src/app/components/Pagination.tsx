'use client';
import styles from '../../styles/components/Pagination.module.scss';
import { usePathname, useRouter } from 'next/navigation';

const Pagination = () => {
  const MAX_PAGE = 65;
  const MIN_PAGE = 1;
  const router = useRouter();
  const pageNumber = Number(usePathname().slice(6));

  function prevPage() {
    router.push(`/page/${pageNumber === MIN_PAGE ? MAX_PAGE : pageNumber - 1}`);
  }

  function nextPage() {
    router.push(`/page/${pageNumber === MAX_PAGE ? MIN_PAGE : pageNumber + 1}`);
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
