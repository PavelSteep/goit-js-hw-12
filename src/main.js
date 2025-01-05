import { fetchImages } from './js/pixabay-api';
import { renderGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

// Настройки iziToast
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
loader.className = 'loader hidden';
document.body.append(loader);

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreButton.addEventListener('click', onLoadMoreClick);

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

async function onSearchSubmit(e) {
  e.preventDefault();

  query = e.target.elements.query.value.trim();
  if (!query) return;

  page = 1;
  gallery.innerHTML = ''; // Удаляем предыдущие результаты
  hideLoadMoreButton();
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    toggleLoader(false);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Уведомление',
        message: 'Ничего не найдено. Попробуйте изменить запрос.',
      });
      return;
    }

    renderGallery(data.hits);
    showLoadMoreButton();
  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      title: 'Ошибка',
      message: 'Не удалось загрузить данные. Повторите попытку позже.',
    });
  }
}

async function onLoadMoreClick() {
  page += 1;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    toggleLoader(false);

    if (data.hits.length === 0 || page * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Конец',
        message: 'Вы достигли конца результатов поиска.',
      });
    } else {
      renderGallery(data.hits);
    }
  } catch (error) {
    toggleLoader(false);
    iziToast.error({
      title: 'Ошибка',
      message: 'Не удалось загрузить данные. Повторите попытку позже.',
    });
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
    onLoadMoreClick();
  }
});
