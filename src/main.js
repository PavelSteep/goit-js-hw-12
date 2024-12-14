import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './scss/styles.scss';

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log(response.data);
    const posts = response.data;

    // Создаем список постов
    const postList = document.createElement('ul');
    posts.slice(0, 5).forEach(post => {
      const listItem = document.createElement('li');
      listItem.textContent = post.title;
      postList.appendChild(listItem);
    });

    document.body.appendChild(postList);
  })
  .catch(error => {
    console.error(error);
  });


  // Проверяем, что main.js подключен
  console.log('main.js подключен');

  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('ul')) {
      console.log('main.js подключен и DOM изменён');
    }
  });
  
