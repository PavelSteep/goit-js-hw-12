function renderGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags }) => {
    return `
      <div class="col">
        <div class="card h-100">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" class="card-img-top" alt="${tags}">
          </a>
          <div class="card-body">
            <p class="card-text">${tags}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}



// export function renderGallery(images) {
//   const gallery = document.querySelector('.gallery');
//   const markup = images
//     .map(
//       ({ webformatURL, largeImageURL, tags }) => `
//       <a href="${largeImageURL}" class="gallery__item">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//       </a>
//     `
//     )
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', markup);
// }

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}







// export function renderImages(images) {
//   const gallery = document.querySelector('.gallery');

//   // Очищаем старую галерею перед рендером новых изображений
//   gallery.innerHTML = '';

//   images.forEach(image => {
//     const imageElement = document.createElement('a');
//     imageElement.href = image.largeImageURL;
//     imageElement.target = '_blank';

//     const img = document.createElement('img');
//     img.src = image.webformatURL;
//     img.alt = image.tags;
//     img.loading = 'lazy';
//     img.classList.add('gallery-image');

//     imageElement.appendChild(img);
//     gallery.appendChild(imageElement);
//   });
// }
