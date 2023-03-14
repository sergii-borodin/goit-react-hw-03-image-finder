import axios from 'axios';

const API_KEY = '33114079-512de0a5f20d2e91152223fbb';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const response = await axios.get(`?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);

  return response.data;
};
