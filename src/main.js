import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './scss/styles.scss';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let lightbox;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('d-none');

  try {
    const data = await fetchImages(query, page, perPage);
    if (data.hits.length === 0) {
      alert("No images found. Please try a different query.");
      return;
    }

    renderGallery(data.hits);
    lightbox = new SimpleLightbox('.gallery a');

    // Проверка конца коллекции
    toggleLoadMoreButton(data.isLastPage);
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
}

async function onLoadMore() {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);
    lightbox.refresh();

    smoothScrollToNextPage();

    // Проверка конца коллекции
    toggleLoadMoreButton(data.isLastPage);
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
}

function toggleLoadMoreButton(isLastPage) {
  if (isLastPage) {
    loadMoreBtn.classList.add('d-none');
  } else {
    loadMoreBtn.classList.remove('d-none');
  }
}

function smoothScrollToNextPage() {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth',
  });
}
