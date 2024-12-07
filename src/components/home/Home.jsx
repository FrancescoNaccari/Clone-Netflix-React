// src/components/Home.js
import React, { useEffect, useState } from 'react';
import moviesService from '../../services/moviesService';
import { useFilter } from '../../context/FilterContext';
import { Carousel, Button } from 'react-bootstrap';
import MovieModal from '../modal/MovieModal';
import './Home.css';

const Home = () => {
  const { filter } = useFilter();
  const [movieCategories, setMovieCategories] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [genresMap, setGenresMap] = useState({});

  useEffect(() => {
    loadMovies(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadMovies = async (filterType) => {
    try {
      let type = filterType === 'tvshows' ? 'tv' : 'movie';
      if (filterType === 'new') {
        await loadTrendingContent(type);
      } else {
        await loadContentByType(type);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadContentByType = async (type) => {
    const selectedGenreIds =
      type === 'movie'
        ? [28, 35, 18, 10751, 27] // Azione, Commedia, Dramma, Famiglia, Horror
        : [10759, 35, 18, 10751, 16]; // Azione & Avventura, Commedia, Dramma, Famiglia, Animazione

    try {
      const genresData = type === 'movie' ? await moviesService.getMovieGenres() : await moviesService.getTVGenres();
      const genres = genresData.genres;
      const map = {};
      genres.forEach((genre) => {
        map[genre.id] = genre.name;
      });
      setGenresMap(map);

      const genrePromises =
        type === 'movie'
          ? selectedGenreIds.map((id) => moviesService.getMoviesByGenre(id))
          : selectedGenreIds.map((id) => moviesService.getTVShowsByGenre(id));

      const genreMoviesArrays = await Promise.all(genrePromises);
      const categories = genreMoviesArrays
        .map((moviesData, index) => {
          const genreId = selectedGenreIds[index];
          const genreName = map[genreId] || 'Sconosciuto';
          const movies = moviesData.results?.map(mapMovieData) || [];
          return { name: genreName, movies };
        })
        .filter((category) => category.movies.length > 0);

      setMovieCategories(categories);
      setFeaturedMovie(categories[0]?.movies[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTrendingContent = async (type) => {
    try {
      const trendingData = type === 'movie' ? await moviesService.getTrendingMovies() : await moviesService.getTrendingTVShows();
      const movies = trendingData.results?.map(mapMovieData) || [];
      setMovieCategories([{ name: 'Popolari', movies }]);
      setFeaturedMovie(movies[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const mapMovieData = (movie) => ({
    ...movie,
    title: movie.title || movie.name,
    release_date: movie.release_date || movie.first_air_date,
    genres: getGenresString(movie.genre_ids || []),
  });

  const getGenresString = (genreIds) => {
    return genreIds.map((id) => genresMap[id]).filter(Boolean).join(' • ');
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  return (
    <div>
      {/* Hero Section */}
      {featuredMovie && (
        <div className="hero-section">
          <img
            src={`https://image.tmdb.org/t/p/w1280${featuredMovie.poster_path}`}
            alt={featuredMovie.title}
            className="hero-img"
          />
          <div className="hero-content">
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview}</p>
            <Button variant="primary" className="btn play-now">
              <i className="fas fa-play"></i> Guarda Ora
            </Button>
            <Button variant="secondary" className="btn more-info" onClick={() => openModal(featuredMovie)}>
              <i className="fas fa-info-circle"></i> Altre Info
            </Button>
          </div>
        </div>
      )}

      {/* Carousel Sections */}
      <div className="carousel-section p-5">
        {movieCategories.map((category) => (
          <div key={category.name}>
            <h2 className="category-title mb-1 mt-3">{category.name}</h2>
            <Carousel indicators={false} interval={null}>
              {chunkArray(category.movies, 6).map((moviesChunk, idx) => (
                <Carousel.Item key={idx}>
                  <div className="d-flex justify-content-start">
                    {moviesChunk.map((movie) => (
                      <div
                        key={movie.id}
                        className="movie-item"
                        onClick={() => openModal(movie)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                      >
                        {movie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="poster-img"
                          />
                        ) : (
                          <div className="poster-container">
                            <p className="text-white">Non disponibile</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ))}
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal show={showModal} handleClose={closeModal} movie={selectedMovie} genresMap={genresMap} />
      )}
    </div>
  );
};

// Utility function to chunk array into smaller arrays
const chunkArray = (array, size) => {
  const results = [];
  for (let i = 0; i < array.length; i += size) {
    results.push(array.slice(i, i + size));
  }
  return results;
};

export default Home;
