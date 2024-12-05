// src/components/MovieModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import moviesService from '../../services/moviesService';
import DOMPurify from 'dompurify';
import './MovieModal.css';

const MovieModal = ({ show, handleClose, movie, genresMap }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [displayedSimilarMovies, setDisplayedSimilarMovies] = useState([]);
  const [showAllSimilarMovies, setShowAllSimilarMovies] = useState(false);

  useEffect(() => {
    if (movie) {
      loadMovieDetails(movie.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  const loadMovieDetails = async (movieId) => {
    try {
      const details = await moviesService.getMovieDetails(movieId);
      const credits = await moviesService.getMovieCredits(movieId);
      const videos = await moviesService.getMovieVideos(movieId);
      const similar = await moviesService.getSimilarMovies(movieId);

      const directors = credits.crew.filter((c) => c.job === 'Director');
      const screenwriters = credits.crew.filter((c) => c.job === 'Screenplay');
      const topCast = credits.cast.slice(0, 5);

      const trailer = videos.results.find((t) => t.type === 'Trailer' && t.site === 'YouTube');

      const updatedMovie = {
        ...details,
        director: directors.map((d) => d.name).join(', ') || 'Non disponibile',
        screenplay: screenwriters.map((s) => s.name).join(', ') || 'Non disponibile',
        cast: topCast.map((c) => c.name).join(', ') || 'Non disponibile',
        trailerUrl: trailer
          ? DOMPurify.sanitize(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`)
          : null,
        genres: getGenresString(details.genres.map((g) => g.id)),
      };

      setSelectedMovie(updatedMovie);

      const filteredSimilarMovies = similar.results.filter((item) => item.poster_path).map(mapSimilarMovieData);
      setSimilarMovies(filteredSimilarMovies);
      setDisplayedSimilarMovies(filteredSimilarMovies.slice(0, 9));
    } catch (error) {
      console.error(error);
    }
  };

  const mapSimilarMovieData = (item) => ({
    id: item.id,
    title: item.title || item.name || 'Titolo non disponibile',
    poster_path: item.poster_path,
    overview: item.overview || 'Descrizione non disponibile',
    release_date: item.release_date || item.first_air_date || 'ND',
    runtime: item.runtime || 'ND',
    genres: getGenresString(item.genre_ids || []),
  });

  const getGenresString = (genreIds) => {
    return genreIds.map((id) => genresMap[id]).filter(Boolean).join(' • ');
  };

  const updateDisplayedSimilarMovies = () => {
    setDisplayedSimilarMovies(showAllSimilarMovies ? similarMovies : similarMovies.slice(0, 9));
  };

  const toggleShowAllSimilarMovies = () => {
    setShowAllSimilarMovies(!showAllSimilarMovies);
    updateDisplayedSimilarMovies();
  };

  const openSimilarMovie = (movie) => {
    loadMovieDetails(movie.id);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedMovie?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Trailer */}
        {selectedMovie?.trailerUrl && (
          <div className="trailer-container mb-4">
         <iframe
  src={selectedMovie.trailerUrl}
  title="Trailer"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="trailer-frame"
  height="100%"
  width="100%"
></iframe>
          </div>
        )}

        {/* Movie Details */}
        <div className="movie-details mt-4 px-4">
          <h2>{selectedMovie?.title}</h2>
          <div className="movie-info-line">
            <span>{new Date(selectedMovie?.release_date).getFullYear()}</span>
            <span>{selectedMovie?.runtime ? `${selectedMovie.runtime} min` : 'ND'}</span>
          </div>
          <p className="movie-description">
            {selectedMovie?.overview || 'Descrizione non disponibile.'}
          </p>
        </div>

        {/* Similar Movies */}
        <div className="similar-titles mt-4 px-4">
          <h3>Altri titoli simili</h3>
          <Row>
            {displayedSimilarMovies.length > 0 ? (
              displayedSimilarMovies.map((similarMovie) => (
                <Col xs={12} sm={6} md={4} key={similarMovie.id} className="mb-4">
                  <div
                    className="similar-movie-item p-2 text-start"
                    onClick={() => openSimilarMovie(similarMovie)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="poster-container">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                        alt={similarMovie.title}
                        className="poster-img img-fluid"
                      />
                      <div className="movie-details-overlay mt-1 d-flex justify-content-between pe-1">
                        <span>{new Date(similarMovie.release_date).getFullYear()}</span>
                        <span>{similarMovie.runtime !== 'ND' ? `${similarMovie.runtime} min` : 'ND'}</span>
                      </div>
                    </div>
                    <p className="movie-title mt-2">{similarMovie.title}</p>
                    <p className="movie-description">{similarMovie.overview}</p>
                  </div>
                </Col>
              ))
            ) : (
              <p>Nessun titolo simile disponibile.</p>
            )}
          </Row>
          {similarMovies.length > 9 && (
            <Button variant="link" onClick={toggleShowAllSimilarMovies}>
              {showAllSimilarMovies ? 'Mostra Meno' : 'Mostra Tutti'}
            </Button>
          )}
        </div>

        {/* Footer Info */}
        <div className="modal-footer-info mt-4 mx-2 mb-2 pb-4 px-4">
          <h4>Info su {selectedMovie?.title}</h4>
          <p>
            <strong>Regia:</strong> {selectedMovie?.director}
          </p>
          <p>
            <strong>Cast:</strong> {selectedMovie?.cast}
          </p>
          <p>
            <strong>Sceneggiatura:</strong> {selectedMovie?.screenplay}
          </p>
          <p>
            <strong>Generi:</strong> {selectedMovie?.genres}
          </p>
          <p>
            <strong>Caratteristiche:</strong> {selectedMovie?.features || 'Non disponibile'}
          </p>
          <p>
            <strong>Classificazione per età:</strong>{' '}
            <span className="age-classification">{selectedMovie?.ageRating || 'ND'}</span>{' '}
            {selectedMovie?.ageRatingDescription || ''}
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MovieModal;
