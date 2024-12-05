import React, { createContext, useState, useContext } from 'react';

// Definisci i tipi di filtro
export const FilterType = {
  ALL: 'all',
  MOVIES: 'movies',
  TVSHOWS: 'tvshows',
  NEW: 'new',
};

// Crea un contesto
const FilterContext = createContext();

// Crea un provider per gestire il filtro
export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(FilterType.ALL);

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <FilterContext.Provider value={{ filter, changeFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

// Hook per usare il contesto
export const useFilter = () => {
  return useContext(FilterContext);
};
