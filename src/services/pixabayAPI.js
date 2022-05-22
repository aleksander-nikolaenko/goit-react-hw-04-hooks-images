import { http } from './api';

const API_KEY = '25843803-c1ee694240c298b472c6158f7';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

export const fetchPictures = (query, page = 1) => {
  return http.get(
    `${BASE_URL}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
