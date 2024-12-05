// src/services/MoviesService.js
import axios from 'axios';
import { environment } from '../environment'; // Se hai creato environment.js

const apiUrl = environment.apiMovieUrl;
const bearerToken = environment.tmdbBearerToken;

// Verifica che le variabili siano definite
if (!apiUrl) {
  console.error('REACT_APP_API_MOVIE_URL non è definito nelle variabili di ambiente.');
}

if (!bearerToken) {
  console.error('REACT_APP_TMDB_BEARER_TOKEN non è definito nelle variabili di ambiente.');
}

// Funzione helper per le intestazioni
const getHeaders = () => ({
  Authorization: `Bearer ${bearerToken}`,
});

// Funzione helper per la gestione degli errori
const handleError = (err) => {
  console.error('Errore API:', err);
  throw new Error('Errore nella richiesta API. Riprova più tardi.');
};

// Metodi del servizio

const getGenres = async () => {
  try {
    const response = await axios.get(`${apiUrl}/genre/movie/list`, {
      headers: getHeaders(),
    });
    return response.data.genres;
  } catch (err) {
    handleError(err);
  }
};

const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${apiUrl}/movie/popular`, {
      params: { page, language: 'it-IT' },
      headers: getHeaders(),
    });
    return response.data.results;
  } catch (err) {
    handleError(err);
  }
};

const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(`${apiUrl}/discover/movie`, {
      params: { with_genres: genreId, language: 'it-IT', page },
      headers: getHeaders(),
    });
    return response.data.results;
  } catch (err) {
    handleError(err);
  }
};

// Altri metodi come getPopularTVShows, getMovieDetails, ecc.

// Assegnazione dei metodi a un oggetto
const MoviesService = {
  getGenres,
  getPopularMovies,
  getMoviesByGenre,
  // ...altri metodi
};

// Esportazione dell'oggetto come default
export default MoviesService;
