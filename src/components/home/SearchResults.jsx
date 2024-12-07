// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moviesService from '../../services/moviesService';
import MovieModal from '../modal/MovieModal';

const SearchResults = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genresMap, setGenresMap] = useState({});

  useEffect(() => {
    // Recupera la query di ricerca passata tramite location.state
    const query = location.state?.query || '';
    setSearchQuery(query);
    if (query) {
      fetchSearchResults(query);
    }
  }, [location.state]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await moviesService.searchMovies(query);
      if (response && response.results) {
        setSearchResults(response.results);
      }
      
      // Carichiamo i generi film (o serie TV) se necessario
      const genresData = await moviesService.getMovieGenres();
      const map = {};
      genresData.genres.forEach((genre) => {
        map[genre.id] = genre.name;
      });
      setGenresMap(map);
    } catch (error) {
      console.error('Errore nella ricerca:', error);
    }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5 pt-5">
      <h1 className="my-3">Risultati per "{searchQuery}"</h1>
      <div className="row">
        {searchResults.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="movie-card" style={{cursor:'pointer'}} onClick={() => openModal(movie)}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid"
                />
              ) : (
                <div className="poster-placeholder">N/A</div>
              )}
              <h5>{movie.title}</h5>
              <p>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N.D.'}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedMovie && (
        <MovieModal
          show={isModalOpen}
          handleClose={closeModal}
          movie={selectedMovie}
          genresMap={genresMap}
        />
      )}
    </div>
  );
};

export default SearchResults;
