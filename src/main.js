import { fetchImages } from './js/pixabay-api';
import { renderGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';

let query = '';
let page = 1;

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreButton.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(e) {
  e.preventDefault();

  query = e.target.elements.query.value.trim();
  if (!query) return;

  page = 1;
  hideLoadMoreButton();
  const data = await fetchImages(query, page);
  renderGallery(data.hits);
  if (data.hits.length > 0) showLoadMoreButton();
}

async function onLoadMoreClick() {
  page += 1;
  const data = await fetchImages(query, page);
  renderGallery(data.hits);
  if (data.hits.length === 0 || page * 15 >= data.totalHits) {
    hideLoadMoreButton();
    alert("We're sorry, but you've reached the end of search results.");
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
    onLoadMoreClick();
  }
});
