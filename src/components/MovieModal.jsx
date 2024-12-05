import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoviesService } from '../services/moviesService';  // Adjust this import according to your file structure
import { Modal } from 'react-bootstrap';  // Assuming you're using React Bootstrap for modals

const MovieModal = ({ movie, closeModal }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [displayedSimilarMovies, setDisplayedSimilarMovies] = useState([]);
  const [showAllSimilarMovies, setShowAllSimilarMovies] = useState(false);

  useEffect(() => {
    if (movie) {
      loadMovieDetails();
    }
  }, [movie]);

  const loadMovieDetails = async () => {
    if (!movie.id) {
      console.error('Errore: il film selezionato non ha un ID valido.');
      return;
    }

    // Set initial movie details
    let movieDetails = {
      ...movie,
      runtime: 0,
      features: 'Non disponibile',
      ageRating: 'Tutti',
      ageRatingDescription: 'Adatto a tutti',
    };

    try {
      // Fetch movie details
      const detailsResponse = await MoviesService.getMovieDetails(movie.id);
      movieDetails = {
        ...movieDetails,
        runtime: detailsResponse.data.runtime || 120,
        features: detailsResponse.data.keywords?.keywords
          ? detailsResponse.data.keywords.keywords.map((k) => k.name).join(', ')
          : 'Non disponibile',
        ageRating: detailsResponse.data.adult ? '18+' : 'Tutti',
        ageRatingDescription: detailsResponse.data.adult
          ? 'Visione riservata ai maggiori di 18 anni'
          : 'Adatto a tutti',
      };

      // Fetch credits
      const creditsResponse = await MoviesService.getMovieCredits(movie.id);
      const directors = creditsResponse.data.crew.filter((c) => c.job === 'Director');
      const screenwriters = creditsResponse.data.crew.filter((c) => c.job === 'Screenplay');
      const topCast = creditsResponse.data.cast.slice(0, 5);

      movieDetails = {
        ...movieDetails,
        director: directors.map((d) => d.name).join(', ') || 'Non disponibile',
        screenplay: screenwriters.map((s) => s.name).join(', ') || 'Non disponibile',
        cast: topCast.map((c) => c.name).join(', ') || 'Non disponibile',
      };

      setSelectedMovie(movieDetails);

      // Fetch movie trailer
      const videoResponse = await MoviesService.getMovieVideos(movie.id);
      const trailer = videoResponse.data.results.find(
        (t) => t.type === 'Trailer' && t.site === 'YouTube'
      );
      if (trailer) {
        movieDetails.trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
      }

      // Fetch similar movies
      const similarMoviesResponse = await MoviesService.getSimilarMovies(movie.id);
      const filteredSimilarMovies = similarMoviesResponse.data.results.filter(
        (item) => item.poster_path
      );

      setSimilarMovies(filteredSimilarMovies);
      updateDisplayedSimilarMovies(filteredSimilarMovies);
    } catch (error) {
      console.error('Errore nella richiesta API:', error);
    }
  };

  const updateDisplayedSimilarMovies = (movies) => {
    setDisplayedSimilarMovies(showAllSimilarMovies ? movies : movies.slice(0, 9));
  };

  const toggleShowAllSimilarMovies = () => {
    setShowAllSimilarMovies(!showAllSimilarMovies);
    updateDisplayedSimilarMovies(similarMovies);
  };

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedMovie?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Trailer */}
        {selectedMovie?.trailerUrl && (
          <div className="trailer-container">
            <iframe
              src={selectedMovie.trailerUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="trailer-frame"
            ></iframe>
          </div>
        )}

        {/* Movie Details */}
        <div className="movie-details mt-4">
          <p>{selectedMovie?.release_date || 'Data di rilascio non disponibile'}</p>
          <p>{selectedMovie?.runtime} min</p>
          <p>{selectedMovie?.overview || 'Descrizione non disponibile'}</p>
        </div>

        {/* Similar Movies */}
        <div className="similar-titles mt-4">
          <h3>Altri titoli simili</h3>
          <div className="row">
            {displayedSimilarMovies.length > 0 ? (
              displayedSimilarMovies.map((similarMovie) => (
                <div className="col-12 col-sm-6 col-md-4 mb-4" key={similarMovie.id}>
                  <div className="similar-movie-item" onClick={() => loadMovieDetails(similarMovie)}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                      alt={similarMovie.title}
                      className="poster-img"
                    />
                    <p className="movie-title mt-2">{similarMovie.title}</p>
                    <p>{similarMovie.overview}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nessun titolo simile disponibile.</p>
            )}
          </div>
          <button onClick={toggleShowAllSimilarMovies}>
            {showAllSimilarMovies ? 'Mostra meno' : 'Mostra tutti'}
          </button>
        </div>

        {/* Footer */}
        <div className="modal-footer-info mt-4">
          <p><strong>Regia:</strong> {selectedMovie?.director}</p>
          <p><strong>Cast:</strong> {selectedMovie?.cast}</p>
          <p><strong>Sceneggiatura:</strong> {selectedMovie?.screenplay}</p>
          <p><strong>Classificazione per età:</strong> {selectedMovie?.ageRating}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MovieModal;
