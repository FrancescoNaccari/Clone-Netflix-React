// src/components/Home.jsx
import React, { useEffect, useState, useRef } from 'react';
import MovieModal from './MovieModal';
import MoviesService from '../services/moviesService'; // Percorso corretto
import './Home.css';

const Home = () => {
  const [movieCategories, setMovieCategories] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genresMap, setGenresMap] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Riferimenti per i carousel
  const carouselRefs = useRef({});

  useEffect(() => {
    const loadGenresAndMovies = async () => {
      setLoading(true);
      try {
        // Recupera i generi
        const genres = await MoviesService.getGenres();
        const genresMapLocal = genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {});
        setGenresMap(genresMapLocal);

        // Recupera i film popolari
        const popularMovies = await MoviesService.getPopularMovies();
        setMovieCategories([{ name: 'Popolari', movies: popularMovies }]);
        setFeaturedMovie(popularMovies[0] || null);
      } catch (err) {
        setError(err.message || 'Errore sconosciuto.');
      } finally {
        setLoading(false);
      }
    };

    loadGenresAndMovies();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const getGenresString = (genreIds) => {
    if (!genreIds) return '';
    return genreIds.map((id) => genresMap[id]).filter(Boolean).join(' • ');
  };

  // Gestione dello scorrimento del carousel
  const scrollLeft = (categoryName) => {
    const container = carouselRefs.current[categoryName];
    if (container) {
      container.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = (categoryName) => {
    const container = carouselRefs.current[categoryName];
    if (container) {
      container.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  // Carica i film per genere
  const loadContentByType = async (type) => {
    const selectedGenreIds = getSelectedGenreIds(type);

    const genreMoviesPromises = selectedGenreIds.map((id) =>
      MoviesService.getMoviesByGenre(id) // Uso corretto
    );

    try {
      const genres = await MoviesService.getGenres();
      const genresMapLocal = genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {});
      setGenresMap(genresMapLocal);

      const genreMoviesArrays = await Promise.all(genreMoviesPromises);
      const movieCategories = genreMoviesArrays.map((movies, index) => {
        const genreId = selectedGenreIds[index];
        const genreName = genresMapLocal[genreId] || 'Sconosciuto';
        return { name: genreName, movies };
      }).filter(category => category.movies.length > 0);

      setMovieCategories(movieCategories);
      setFeaturedMovie(movieCategories[0]?.movies[0] || null);
    } catch (err) {
      setError(err.message || 'Errore nel caricamento dei contenuti.');
    }
  };

  // Carica i film iniziali
  const loadMovies = async (filter) => {
    const type = filter === 'tvshows' ? 'tv' : 'movie';

    if (filter === 'new') {
      await loadTrendingContent(type);
    } else {
      await loadContentByType(type);
    }
  };

  const getSelectedGenreIds = (type) => {
    return type === 'movie'
      ? [28, 35, 18, 10751, 27] // Azione, Commedia, Dramma, Famiglia, Horror
      : [10759, 35, 18, 10751, 16]; // Azione & Avventura, Commedia, Dramma, Famiglia, Animazione
  };

  // Opzionale: Implementa loadTrendingContent se necessario
  const loadTrendingContent = async (type) => {
    try {
      const trendingMovies = type === 'movie'
        ? await MoviesService.getPopularMovies()
        : await MoviesService.getPopularTVShows();

      setMovieCategories([{ name: 'Popolari', movies: trendingMovies }]);
      setFeaturedMovie(trendingMovies[0] || null);
    } catch (err) {
      setError(err.message || 'Errore nel caricamento dei contenuti popolari.');
    }
  };

  // Carica i contenuti iniziali
  useEffect(() => {
    loadMovies('all');
  }, []);

  return (
    <div>
      {loading && <p>Caricamento...</p>}
      {error && <p>{error}</p>}

      {/* Sezione Hero */}
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
            <button className="btn play-now">
              <i className="fas fa-play"></i> Guarda Ora
            </button>
            <button className="btn more-info">
              <i className="fas fa-info-circle"></i> Altre Info
            </button>
          </div>
        </div>
      )}

      {/* Sezioni Carousel */}
      {movieCategories.length > 0 && (
        <div className="carousel-section p-5">
          {movieCategories.map((category) => (
            <div key={category.name} style={{ position: 'relative', marginBottom: '2rem' }}>
              <h2 className="category-title mb-1 mt-3">{category.name}</h2>
              <div
                className="carousel"
                id={`carousel-${category.name}`}
                ref={(el) => (carouselRefs.current[category.name] = el)}
                style={{ display: 'flex', overflowX: 'scroll' }}
              >
                {category.movies.slice(0, 18).map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-item"
                    style={{ cursor: 'pointer', marginRight: '1rem' }}
                    onClick={() => openModal(movie)}
                  >
                    <div className="poster-container">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="poster-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Pulsanti di Scorrimento */}
              <button
                className="carousel-button left"
                onClick={() => scrollLeft(category.name)}
                aria-label={`Scorri a sinistra per ${category.name}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                }}
              >
                &#10094;
              </button>
              <button
                className="carousel-button right"
                onClick={() => scrollRight(category.name)}
                aria-label={`Scorri a destra per ${category.name}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                }}
              >
                &#10095;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal del Film */}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;
