export function renderImages(images) {
  const gallery = document.querySelector('.gallery');

  // Очищаем старую галерею перед рендером новых изображений
  gallery.innerHTML = '';

  images.forEach(image => {
    const imageElement = document.createElement('a');
    imageElement.href = image.largeImageURL;
    imageElement.target = '_blank';

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    img.loading = 'lazy';
    img.classList.add('gallery-image');

    imageElement.appendChild(img);
    gallery.appendChild(imageElement);
  });
}
