// Функция для получения изображений из API с пагинацией
export const fetchImages = async (query, page = 1, perPage = 20) => {  // Параметр perPage установлен на 20
  const API_KEY = '47502659-8e710eb0ff3e952458316b5b2';
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    console.log('Запрос к API:', url); // Логируем URL запроса

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Полученные данные:', data); // Логируем полученные данные

    if (!data.hits || data.hits.length === 0) {
      throw new Error('No images found');
    }

    return data.hits; // Возвращаем массив с изображениями
  } catch (error) {
    console.error(error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};
