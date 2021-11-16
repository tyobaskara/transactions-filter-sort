import React from 'react';

import UseSearchFormHook from './searchForm.component.hook';

import config from './searchForm.component.config';
import './searchForm.styles.scss';

const sortList = [{
  name: 'Nama A-Z',
  type: 'beneficiary_name=asc'
}, {
  name: 'Nama Z-A',
  type: 'beneficiary_name=desc'
}, {
  name: 'Tanggal terbaru',
  type: 'created_at=desc'
}, {
  name: 'Tanggal terlama',
  type: 'created_at=asc'
}];

const onSubmit = (props, hooks) => e => {
  e.preventDefault();
  const { searchInput, sortType } = hooks;

  props.onSearchSubmit({ searchInput, sortType });
};

const onInputChange = setSearchInput => e => {
  setSearchInput(e.target.value);
};

const _renderSearchInput = hooks => (
  <div className='searchForm__input'>
    <i className="fas fa-search"></i>
    <input 
      type='text' 
      placeholder='Cari nama atau bank' 
      value={hooks.searchInput} 
      onChange={onInputChange(hooks.setSearchInput)}
    />
  </div>
);

const onSortListClick = (props, hooks, selectedType) => () => {
  const { setSortType, sortType, searchInput } = hooks;

  if (sortType !== selectedType) {
    setSortType(selectedType);
    props.onSearchSubmit({ searchInput, sortType: selectedType });
  }
};

const _renderSortListTop = (sortType) => {
  const sort = sortList.find(item => item.type === sortType);

  return (
    <div className='searchForm__sort-list-top'>
      <span>{sortType ? sort.name : 'URUTKAN'}</span> <i className="fas fa-chevron-down"></i>
    </div>
  );
}
const _renderSortList = (props, hooks) => (
  <div className='searchForm__sort-list'>
    {_renderSortListTop(hooks.sortType)}

    <ul>
      {sortList.map(list => {
        const isActive = hooks.sortType === list.type;

        return (
          <li 
            key={list.name}
            className={isActive ? 'active' : ''}
            onClick={onSortListClick(props, hooks, list.type)}
          >{list.name}</li>
        )
      })}
    </ul>
  </div>
);

const SearchForm = props => {
  const hooks = UseSearchFormHook();

  return (
    <form
      onSubmit={onSubmit(props, hooks)}
      className='searchForm'
    >
      {_renderSearchInput(hooks)}
      {_renderSortList(props, hooks)}
    </form>
  );
};
SearchForm.displayName = config.displayName;
SearchForm.propTypes = config.propTypes;
SearchForm.defaultProps = config.defaultProps;

export default React.memo(SearchForm);
