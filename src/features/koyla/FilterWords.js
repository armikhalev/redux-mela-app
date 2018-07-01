import React from 'react';

const FilterWords = props =>
  <input className="koyla-filter-words"
    placeholder='Type in a word'
    onChange={e => props.inputHandler(e.target.value)} />;

export default FilterWords;