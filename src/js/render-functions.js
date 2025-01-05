export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      (image) => `
      <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
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
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.classList.add('hidden');
}
