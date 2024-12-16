import axios from 'axios';

const API_KEY = '47502659-8e710eb0ff3e952458316b5b2'; // Ваш ключ API

export async function fetchImages(query, page, perPage) {
  const url = `https://pixabay.com/api/`;
  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return response.data;
}






// import axios from 'axios';

// const API_KEY = '47502659-8e710eb0ff3e952458316b5b2';  // Ваш ключ API
// const BASE_URL = 'https://pixabay.com/api/';

// export async function fetchImages(query, page, perPage) {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         page: page,
//         per_page: perPage,
//         image_type: 'photo',
//         orientation: 'horizontal',
//       },
//     });
//     return {
//       hits: response.data.hits,
//       isLastPage: response.data.totalHits <= page * perPage,
//     };
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     throw error;
//   }
// }
