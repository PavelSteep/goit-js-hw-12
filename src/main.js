import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// Ссылка на кнопку и контейнер для картинок
const loadMoreButton = document.getElementById('loadMoreButton');
const imageContainer = document.getElementById('imageContainer');

let currentPage = 1; // Номер текущей страницы
const query = 'nature'; // Запрос по умолчанию, например, 'nature'


if (searchForm) {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    query = searchInput.value.trim();

    if (!query) {
      iziToast.error({ message: 'Please enter a search term' });
      return;
    }

    showLoader();
    clearGallery();

    try {
      const images = await fetchImages(query);

      if (images.length === 0) {
        iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!' });
      } else {
        renderImages(images);
        initializeLightbox();
      }
    } catch (error) {
      iziToast.error({ message: 'Something went wrong, please try again!' });
    } finally {
      hideLoader();
    }
  });
} else {
  console.error('Search form element not found');
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();

    if (!query) {
      iziToast.error({ message: 'Please enter a search term' });
      return;
    }

    showLoader();

    try {
      const images = await fetchImages(query);

      if (images.length === 0) {
        iziToast.info({ message: 'Sorry, there are no more images to load.' });
      } else {
        renderImages(images);
        initializeLightbox();
      }
    } catch (error) {
      iziToast.error({ message: 'Something went wrong, please try again!' });
    } finally {
      hideLoader();
    }
  });
} else {
  console.error('Load more button element not found');
}

function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Loading...';
  gallery.appendChild(loader);
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function initializeLightbox() {
  new SimpleLightbox('.gallery a');
}


// Массив с путями к дополнительным изображениям
const additionalImages = [
  'image3.jpg',
  'image4.jpg',
  'image5.jpg',
  'image6.jpg'
];

// Функция для загрузки изображений при нажатии на кнопку
async function loadMoreImages() {
  try {
    const images = await fetchImages(query, currentPage);

    if (images.length > 0) {
      renderImages(images, imageContainer); // Отображаем изображения
      currentPage++; // Увеличиваем номер страницы для следующей загрузки
    } else {
      loadMoreButton.disabled = true; // Отключаем кнопку, если изображений больше нет
      alert('Изображения не найдены');
    }
  } catch (error) {
    alert('Произошла ошибка при загрузке изображений');
    console.error(error);
  }
}

// Обработчик события для кнопки "Load more"
loadMoreButton.addEventListener('click', loadMoreImages);

// Обработчик формы поиска
if (searchForm) {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    query = searchInput.value.trim();

    if (!query) {
      alert('Пожалуйста, введите запрос');
      return;
    }

    currentPage = 1; // Сбросить номер страницы
    loadMoreButton.disabled = true; // Включить кнопку, если был новый запрос

    // Очистить контейнер и загрузить изображения для нового запроса
    imageContainer.innerHTML = '';
    loadMoreImages();
  });
}

// Загружаем изображения при первой загрузке страницы
loadMoreImages();
