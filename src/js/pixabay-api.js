let currentPage = 1;

export const fetchImages = async (query, page = 1, perPage = 20) => {
  const effectivePerPage = query ? 15 : perPage;

  const API_KEY = '47502659-8e710eb0ff3e952458316b5b2';
  const BASE_URL = 'https://pixabay.com/api/';

  showLoader(true);

  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${effectivePerPage}`;
    console.log('Запрос к API:', url); // Логируем URL запроса

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка при получении данных: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Полученные данные:', data);

    if (!data.hits || data.hits.length === 0) {
      throw new Error('No images found');
    }

    // Если нет изображений, скрываем кнопку "Load more"
    if (data.hits.length < effectivePerPage || data.totalHits <= page * effectivePerPage) {
      hideLoadMoreButton();
    }

    return data.hits; // Возвращаем массив с изображениями
  } catch (error) {
    console.error(error);
    return []; // Возвращаем пустой массив в случае ошибки
  } finally {
    // Останавливаем лоадер, когда данные загружены
    showLoader(false);
  }
};

// Функция для показа/скрытия лоадера
const showLoader = (isLoading) => {
  const loader = document.getElementById('loader');
  if (loader) { // Проверяем, существует ли элемент с id 'loader'
    if (isLoading) {
      loader.style.display = 'block';
    } else {
      loader.style.display = 'none';
    }
  }
};


// Функция для скрытия кнопки "Load more"
const hideLoadMoreButton = () => {
  const loadMoreButton = document.getElementById('loadMoreButton');
  loadMoreButton.classList.add('is-hidden'); // Используем класс для скрытия
  console.log("Кнопка скрыта:", loadMoreButton);
  // loadMoreButton.style.display = 'none';
};

// Пример обработки события нажатия на кнопку "Load more"
document.getElementById('loadMoreButton').addEventListener('click', async () => {

  const loadMoreButton = document.getElementById('loadMoreButton');
  loadMoreButton.classList.add('is-hidden'); // Скрываем кнопку

  const loader = document.querySelector('.loader');
  loader.classList.remove('is-hidden'); // Показываем загрузчик

  const query = 'nature'; // Ваш запрос для поиска
  currentPage++; // Увеличиваем страницу после каждого клика

  const images = await fetchImages(query, currentPage, 15);
  if (images.length > 0) {
    // Добавляем новые изображения на страницу
    displayImages(images);
  }

    loader.classList.add('is-hidden'); // Прячем загрузчик после загрузки

});

// Функция для отображения изображений
const displayImages = (images) => {
  const imageContainer = document.getElementById('imageContainer');
  if (imageContainer) { // Проверяем, существует ли элемент с id 'imageContainer'
    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.webformatURL;
      imageContainer.appendChild(imgElement);
    });
  } else {
    // console.error('Элемент с id "imageContainer" не найден');
  }
};

