import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      (image) => `
      <div class="photo-card">
        <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${image.likes}</p>
          <p class="info-item"><b>Views</b> ${image.views}</p>
          <p class="info-item"><b>Comments</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
        </div>
      </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  // Инициализация SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img', // использование изображения в качестве подписи
    captionType: 'alt', // использование атрибута alt для подписи
    captionDelay: 250,
    overlay: true, // затемнение фона
    stopPropagation: true // отключение пассивных слушателей
  });  
}


export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.style.display = 'block';
  }
}
