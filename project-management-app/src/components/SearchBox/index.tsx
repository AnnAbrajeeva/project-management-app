import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import style from './SearchBox.module.scss';

function SearchBox() {
  return (
    <div className={style.search}>
      <button>
        <SearchIcon />
      </button>
      <input type="text" placeholder="Type to Search..." />
    </div>
  );
}

export default SearchBox;
