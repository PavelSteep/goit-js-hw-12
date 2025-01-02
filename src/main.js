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
const loadMoreButton = document.getElementById('loadMoreButton');

let currentPage = 1; // Номер текущей страницы
let query = 'nature'; // Запрос по умолчанию

// Функция для загрузки изображений
async function loadImages() {
  if (!query) {
    iziToast.error({ message: 'Please enter a search term' });
    return;
  }

  showLoader();

  try {
    const images = await fetchImages(query, currentPage);
    
    if (images.length === 0) {
      iziToast.info({ message: 'Sorry, there are no more images to load.' });
      hideLoadMoreButton(); // Скрываем кнопку, если больше нечего загружать
    } else {
      renderImages(images);  // Рендерим новые изображения
      initializeLightbox();
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong, please try again!' });
  } finally {
    hideLoader();
  }
}

// Обработчик отправки формы для поиска
if (searchForm) {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    query = searchInput.value.trim(); // Обновляем запрос

    if (!query) {
      iziToast.error({ message: 'Please enter a search term' });
      return;
    }

    currentPage = 1; // Сброс страницы на первую
    clearGallery();
    loadImages(); // Загружаем изображения для нового запроса
  });
} else {
  console.error('Search form element not found');
}

// Обработчик нажатия на кнопку "Загрузить больше"
if (loadMoreButton) {
  loadMoreButton.addEventListener('click', async () => {
    currentPage++; // Увеличиваем номер страницы
    loadImages(); // Загружаем изображения с новой страницы
  });
} else {
  console.error('Load more button element not found');
}

// Функция для отображения индикатора загрузки
function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Loading...';
  gallery.appendChild(loader);
}

// Функция для скрытия индикатора загрузки
function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
}

// Функция для очистки галереи
function clearGallery() {
  gallery.innerHTML = '';
}

// Функция для инициализации lightbox
function initializeLightbox() {
  new SimpleLightbox('.gallery a');
}

// Функция для скрытия кнопки "Загрузить больше"
function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}
