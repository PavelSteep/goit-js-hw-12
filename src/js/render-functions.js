export const renderImages = (images) => {
  const gallery = document.querySelector('.gallery');

  console.log('Изображения для отображения:', images);

   // Очищаем галерею перед вставкой новых изображений
  gallery.innerHTML = '';

  if (images.length === 0) {
    gallery.innerHTML = '<p>No images found</p>';
    return;
  }

  // Строим строки HTML для всех изображений с использованием lazy loading
  const cards = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class="card">
        <a href="${largeImageURL}" target="_blank">
          <img 
            src="${webformatURL}" 
            data-src="${largeImageURL}" 
            alt="${tags || 'Image'}" 
            loading="lazy"
            class="lazy-load" 
          />
        </a>
        <p>Likes: ${likes} | Views: ${views} | Comments: ${comments} | Downloads: ${downloads}</p>
      </div>
    `;
  }).join(''); // Преобразуем массив строк в одну строку

  // Вставляем все карточки в галерею
  gallery.insertAdjacentHTML('beforeend', cards);

  // Инициализация lazy loading
  const lazyImages = document.querySelectorAll('.lazy-load');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.classList.remove('lazy-load');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '0px 0px 50px 0px' // Задержка загрузки, когда изображение почти попадает в экран
  });

  lazyImages.forEach(image => {
    imageObserver.observe(image);
  });
};
