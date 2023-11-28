'use client';
import { FormEvent, useState } from 'react';
import styles from '../../styles/components/Search.module.scss';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') ?? ''
  );

  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchTerm) {
      router.push('/page/1');
    } else {
      router.push(`/search/${searchTerm}`);
    }

    localStorage.setItem('searchTerm', searchTerm);
  }

  return (
    <div>
      <form className={styles['search-form']} onSubmit={handleSubmit}>
        <input
          className={styles['search-form__input']}
          type="text"
          name="search-form__input"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="e.g. Charmander"
        />
        <button className={styles['search-form__button']}>
          <img src="/icons/search-icon.svg" alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
