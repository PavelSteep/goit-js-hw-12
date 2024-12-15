import { fetchImages } from '@api/pixabay-api';  // импортируем функцию из pixabay-api.js
import { renderImages } from './js/render-functions';
import heroImage from './img/hero.jpg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a');

let currentPage = 1;
let currentQuery = '';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// Добавляем изображение героя в DOM
const imageElement = document.createElement('img');
imageElement.src = heroImage;  // устанавливаем путь к изображению
imageElement.alt = "Hero Image";  // описание изображения

const heroSection = document.querySelector('.hero');
heroSection.appendChild(imageElement);

// Пример использования fetchImages с запросом 'flowers' для начальной загрузки изображений
fetchImages('flowers', currentPage)
  .then(data => {
    console.log(data); // Здесь можно обработать полученные данные
    renderImages(data.hits);  // Отображаем изображения на странице
    lightbox.refresh(); // Обновляем lightbox после загрузки изображений
  })
  .catch(error => console.error(error));

// Обработчик отправки формы поиска
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = e.target.elements.query.value;
  currentQuery = query;
  currentPage = 1;
  const data = await fetchImages(query, currentPage);
  renderImages(data.hits);  // Отображаем изображения на странице
  lightbox.refresh(); // Обновляем lightbox после загрузки новых изображений
  loadMoreBtn.style.display = 'block'; // Показываем кнопку "Загрузить ещё"
});

// Обработчик клика по кнопке "Загрузить ещё"
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  const data = await fetchImages(currentQuery, currentPage);
  renderImages(data.hits);  // Отображаем изображения на странице
  lightbox.refresh(); // Обновляем lightbox после загрузки новых изображений
  if (currentPage * 15 >= data.totalHits) {
    loadMoreBtn.style.display = 'none'; // Скрываем кнопку, если больше нет изображений
    alert("We're sorry, but you've reached the end of search results.");
  }
});












// import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// // import './scss/styles.scss';

// axios.get('https://jsonplaceholder.typicode.com/posts')
//   .then(response => {
//     console.log(response.data);
//     const posts = response.data;

//     // Создаем список постов
//     const postList = document.createElement('ul');
//     posts.slice(0, 5).forEach(post => {
//       const listItem = document.createElement('li');
//       listItem.textContent = post.title;
//       postList.appendChild(listItem);
//     });

//     document.body.appendChild(postList);
//   })
//   .catch(error => {
//     console.error(error);
//   });


//   // Проверяем, что main.js подключен
//   console.log('main.js подключен');

//   document.addEventListener('DOMContentLoaded', () => {
//     if (document.querySelector('ul')) {
//       console.log('main.js подключен и DOM изменён');
//     }
//   });
  
