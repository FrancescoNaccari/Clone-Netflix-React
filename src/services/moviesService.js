// src/services/moviesService.js
import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const bearerToken = process.env.REACT_APP_TMDB_API_KEY;

const getHeaders = () => {
  return {
    Authorization: `Bearer ${bearerToken}`,
  };
};

const handleError = (error) => {
  console.error('Errore API:', error);
  return Promise.reject('Errore nella richiesta API. Riprova più tardi.');
};

export const MoviesService = {
  getPopularMovies: (page = 1) => {
    return axios
      .get(`${apiUrl}/movie/popular?page=${page}&language=it-IT`, { headers: getHeaders() })
      .catch(handleError);
  },

  getPopularTVShows: (page = 1) => {
    return axios
      .get(`${apiUrl}/tv/popular?page=${page}&language=it-IT`, { headers: getHeaders() })
      .catch(handleError);
  },

  getTrendingMovies: () => {
    return axios
      .get(`${apiUrl}/trending/all/day`, { headers: getHeaders() })
      .catch(handleError);
  },

  getGenres: () => {
    return axios
      .get(`${apiUrl}/genre/movie/list`, { headers: getHeaders() })
      .catch(handleError);
  },

  getMoviesByGenre: (genreId) => {
    return axios
      .get(`${apiUrl}/discover/movie?with_genres=${genreId}&language=it-IT`, { headers: getHeaders() })
      .catch(handleError);
  },

  getMovieDetails: (movieId) => {
    return axios
      .get(`${apiUrl}/movie/${movieId}`, { headers: getHeaders(), params: { language: 'it-IT' } })
      .catch(handleError);
  },

  searchMovies: (query) => {
    return axios
      .get(`${apiUrl}/search/movie`, {
        headers: getHeaders(),
        params: { query: query, language: 'it-IT' },
      })
      .catch(handleError);
  },
};
