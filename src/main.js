import { fetchImages } from './js/pixabay-api';
import { renderGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  theme: 'dark',
  position: 'topRight',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

let query = '';
let page = 1;

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const loader = document.createElement('span');
loader.classList.add('loader');

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreButton.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(e) {
  e.preventDefault();

  query = e.target.elements.query.value.trim();
  if (!query) return;

  page = 1;
  gallery.innerHTML = ''; // Удаляем старые изображения при новом поиске
  hideLoadMoreButton();
  document.body.appendChild(loader); // Показываем индикатор загрузки

  try {
    const data = await fetchImages(query, page);
    document.body.removeChild(loader); // Убираем индикатор загрузки
    if (data.hits.length === 0) {
      iziToast.info({ title: 'Нет результатов', message: 'Попробуйте другой запрос' });
      return;
    }
    renderGallery(data.hits);
    if (data.totalHits > page * 15) showLoadMoreButton(); // Показываем кнопку, если есть больше страниц
  } catch (error) {
    console.error('Ошибка:', error);
    document.body.removeChild(loader);
  }
}

async function onLoadMoreClick() {
  page += 1;
  document.body.appendChild(loader); // Показываем индикатор загрузки

  try {
    const data = await fetchImages(query, page);
    document.body.removeChild(loader); // Убираем индикатор загрузки
    renderGallery(data.hits);
    if (page * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({ title: 'Конец результатов', message: 'Больше изображений нет' });
    }
  } catch (error) {
    console.error('Ошибка:', error);
    document.body.removeChild(loader);
  }
}
