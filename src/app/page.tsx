'use client';

import { useRouter } from 'next/navigation';
import SearchInput from './components/SearchInput';

const Home = () => {
  const router = useRouter();

  function openFirstPage() {
    router.push('/page/1');
  }

  return (
    <>
      <div>
        <SearchInput />
        <button className="btn" onClick={openFirstPage}>
          Показать всех покемонов
        </button>
      </div>
    </>
  );
};

export default Home;
