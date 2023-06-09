import { useState } from 'react';
import propTypes from 'prop-types';
import {
  ClearIcon,
  IconButton,
  SearchField,
  SearchForm,
  SearchIcon,
  ClearIconWrapper,
} from './NewsSearch.styled';

const InputNewsFindPet = ({ setSearchWord }) => {
  const [query, setQuery] = useState('');

  const onQueryChangeHandler = e => {
    const query = e.target.value;
    setQuery(query);
    setSearchWord(query);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    let query = e.target.elements.search.value;
    setSearchWord(query);
  };

  const onClearHandler = () => {
    setQuery('');
    setSearchWord('');
  };

  return (
    <SearchForm onSubmit={onSubmitHandler}>
      <SearchField
        type="text"
        name="search"
        placeholder="Search"
        onChange={onQueryChangeHandler}
        value={query}
      />

      {!query ? (
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      ) : (
        <ClearIconWrapper>
          <ClearIcon onClick={onClearHandler} tabIndex={0} />
        </ClearIconWrapper>
      )}
    </SearchForm>
  );
};

InputNewsFindPet.propTypes = {
  setSearchWord: propTypes.func.isRequired,
};

export default InputNewsFindPet;
