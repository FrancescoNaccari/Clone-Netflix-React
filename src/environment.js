export const environment = {
  production: process.env.NODE_ENV === 'production',
  apiMovieUrl: process.env.REACT_APP_API_MOVIE_URL,
  tmdbApiKey: process.env.REACT_APP_TMDB_API_KEY,
  apiBack: process.env.REACT_APP_API_BACK,
  tmdbBearerToken: process.env.REACT_APP_TMDB_BEARER_TOKEN,
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
};
