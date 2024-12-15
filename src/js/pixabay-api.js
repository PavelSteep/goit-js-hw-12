import axios from 'axios';

const API_KEY = 'your_api_key';  // Замените на ваш ключ API
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        page,
        per_page: 15,
      },
    });

    // Полученные данные
    const data = response.data;

    // Проверка, если достигнут конец коллекции
    if (page * 15 >= data.totalHits) {
      // Можно управлять кнопкой "Загрузить еще" в главном файле (например, в main.js)
      alert("We're sorry, but you've reached the end of search results.");
    }

    return data;  // Возвращаем данные с изображениями
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
