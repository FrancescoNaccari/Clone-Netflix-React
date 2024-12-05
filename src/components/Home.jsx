import React, { useEffect, useState } from 'react';
import MovieModal from './MovieModal';
import { MoviesService } from '../services/moviesService';
import './Home.css';

const Home = () => {
  const [movieCategories, setMovieCategories] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genresMap, setGenresMap] = useState({});
  const [showAllSimilarMovies, setShowAllSimilarMovies] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    // Carica i film inizialmente con il filtro 'all'
    loadMovies('all');
  }, []);

  const loadMovies = (filter) => {
    const type = filter === 'tvshows' ? 'tv' : 'movie';

    if (filter === 'new') {
      loadTrendingContent(type);
    } else {
      loadContentByType(type);
    }
  };

  const loadContentByType = (type) => {
    const selectedGenreIds = getSelectedGenreIds(type);

    const genreObservables = selectedGenreIds.map((id) =>
      type === 'movie'
        ? MoviesService.getMoviesByGenre(id)
        : MoviesService.getTVShowsByGenre(id)
    );

    const getGenres = type === 'movie' ? MoviesService.getMovieGenres() : MoviesService.getTVGenres();

    getGenres().then((genreData) => {
      const genres = genreData.genres;
      const genresMap = genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {});

      setGenresMap(genresMap);

      Promise.all(genreObservables).then((genreMoviesArrays) => {
        const movieCategories = genreMoviesArrays
          .map((moviesData, index) => {
            const genreId = selectedGenreIds[index];
            const genreName = genresMap[genreId] || 'Sconosciuto';
            const movies = moviesData.results.map((movie) => mapMovieData(movie)) || [];
            return { name: genreName, movies };
          })
          .filter((category) => category.movies.length > 0);

        setMovieCategories(movieCategories);
        setFeaturedMovie(movieCategories[0]?.movies[0]);
      });
    });
  };

  const loadTrendingContent = (type) => {
    const trendingObservable =
      type === 'movie'
        ? MoviesService.getTrendingMovies()
        : MoviesService.getTrendingTVShows();

    trendingObservable().then((data) => {
      const movies = data.results?.map((movie) => mapMovieData(movie)) || [];
      setMovieCategories([{ name: 'Popolari', movies }]);
      setFeaturedMovie(movies[0]);
    });
  };

  const mapMovieData = (movie) => {
    return {
      ...movie,
      title: movie.title || movie.name,
      release_date: movie.release_date || movie.first_air_date,
      genres: getGenresString(movie.genre_ids ?? []),
    };
  };

  const getSelectedGenreIds = (type) => {
    return type === 'movie'
      ? [28, 35, 18, 10751, 27] // Azione, Commedia, Dramma, Famiglia, Horror
      : [10759, 35, 18, 10751, 16]; // Azione & Avventura, Commedia, Dramma, Famiglia, Animazione
  };

  const getGenresString = (genreIds) => {
    return genreIds.map((id) => genresMap[id]).filter(Boolean).join(' • ');
  };

  const scrollLeft = (categoryName) => {
    const container = getCategoryCarousel(categoryName);
    if (container) {
      container.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = (categoryName) => {
    const container = getCategoryCarousel(categoryName);
    if (container) {
      container.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  const getCategoryCarousel = (categoryName) => {
    const index = movieCategories.findIndex((category) => category.name === categoryName);
    return document.getElementById(`carousel-${categoryName}`) ?? null;
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const updateDisplayedSimilarMovies = () => {
    setSimilarMovies(showAllSimilarMovies ? similarMovies : similarMovies.slice(0, 9));
  };

  const toggleShowAllSimilarMovies = () => {
    setShowAllSimilarMovies(!showAllSimilarMovies);
    updateDisplayedSimilarMovies();
  };

  return (
    <div>
      <div className="hero-section" style={{ display: featuredMovie ? 'block' : 'none' }}>
        <img
          src={`https://image.tmdb.org/t/p/w1280${featuredMovie?.poster_path}`}
          alt={featuredMovie?.title}
          className="hero-img"
        />
        <div className="hero-content">
          <h1>{featuredMovie?.title}</h1>
          <p>{featuredMovie?.overview}</p>
          <button className="btn play-now">
            <i className="fas fa-play"></i> Guarda Ora
          </button>
          <button className="btn more-info">
            <i className="fas fa-info-circle"></i> Altre Info
          </button>
        </div>
      </div>

      <div className="carousel-section p-5" style={{ display: movieCategories.length > 0 ? 'block' : 'none' }}>
        {movieCategories.map((category) => (
          <div key={category.name}>
            <h2 className="category-title mb-1 mt-3">{category.name}</h2>
            <div className="carousel" id={`carousel-${category.name}`}>
              {category.movies.slice(0, 18).map((movie) => (
                <div
                  key={movie.id}
                  className="movie-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModal(movie)}
                >
                  <div className="poster-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="poster-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <MovieModal movie={selectedMovie} closeModal={closeModal} />}
    </div>
  );
};

export default Home;
