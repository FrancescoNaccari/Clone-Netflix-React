// src/services/moviesService.js
import axios from 'axios';
import { environment } from '../environment';

const apiClient = axios.create({
  baseURL: environment.apiMovieUrl,
  headers: {
    Authorization: `Bearer ${environment.tmdbBearerToken}`,
  },
});

const handleError = (error) => {
  console.error('API Error:', error);
  throw new Error('API request failed. Please try again later.');
};

const moviesService = {
  getPopularMovies: (page = 1) =>
    apiClient
      .get(`/movie/popular`, {
        params: { page, language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getPopularTVShows: (page = 1) =>
    apiClient
      .get(`/tv/popular`, {
        params: { page, language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getTrendingMovies: () =>
    apiClient
      .get(`/trending/all/day`, {
        params: { language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getMovieGenres: () =>
    apiClient
      .get(`/genre/movie/list`, {
        params: { language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getTVGenres: () =>
    apiClient
      .get(`/genre/tv/list`, {
        params: { language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getMoviesByGenre: (genreId) =>
    apiClient
      .get(`/discover/movie`, {
        params: { with_genres: genreId, language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getTVShowsByGenre: (genreId) =>
    apiClient
      .get(`/discover/tv`, {
        params: { with_genres: genreId, language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getMovieDetails: (movieId) =>
    apiClient
      .get(`/movie/${movieId}`, {
        params: { language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  getMovieCredits: (movieId) =>
    apiClient
      .get(`/movie/${movieId}/credits`)
      .then((res) => res.data)
      .catch(handleError),

  getMovieVideos: (movieId) =>
    apiClient
      .get(`/movie/${movieId}/videos`)
      .then((res) => res.data)
      .catch(handleError),

  getSimilarMovies: (movieId) =>
    apiClient
      .get(`/movie/${movieId}/similar`, {
        params: { language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),

  searchMovies: (query) =>
    apiClient
      .get(`/search/movie`, {
        params: { query, language: 'it-IT' },
      })
      .then((res) => res.data)
      .catch(handleError),
};

export default moviesService;
