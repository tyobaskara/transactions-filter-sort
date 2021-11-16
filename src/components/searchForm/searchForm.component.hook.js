import { useState } from 'react';

const UseSearchFormHook = () => {
  const [searchInput, setSearchInput] = useState('');
  const [sortType, setSortType] = useState('');

  return {
    searchInput,
    setSearchInput,
    sortType,
    setSortType
  }
};

export default UseSearchFormHook;
