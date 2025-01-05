import axios from 'axios';

const API_KEY = '47502659-8e710eb0ff3e952458316b5b2';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        page: page,
        per_page: perPage,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка запроса:', error);
  }
}
