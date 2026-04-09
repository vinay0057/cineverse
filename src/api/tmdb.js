import axios from 'axios';

const API_KEY = 'd35b0dfd6d22bc79b0736d180ed4e33d'; // Get from https://www.themoviedb.org/settings/api
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (path, size = 'w500') => {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : '/placeholder.png';
};

export const endpoints = {
  trending: '/trending/movie/week',
  topRated: '/movie/top_rated',
  popular: '/movie/popular',
  search: '/search/movie',
  movieDetails: (id) => `/movie/${id}`,
  genres: '/genre/movie/list',
  discover: '/discover/movie',
};