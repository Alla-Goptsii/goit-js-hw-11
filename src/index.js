import { refs } from './refs.js';
// import { onSearch } from './on-search.js';
import Notiflix from 'notiflix';
import ImagesAPIService from './api-service.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// console.log(refs);
refs.searchForm.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoad);

const imagesAPIService = new ImagesAPIService();

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.searchQuery.value.trim();
  console.log(searchQuery);

  imagesAPIService.fetchImages(searchQuery);
}

function onInput() {
  console.log;
}

function onLoad() {}
//   const options = {
//     headers: {
//       Authorization: '29926103-ef277a018e47056ded665dd02',
//       q: поиск,
//       image_type: photo,
//       orientation: horizontal,
//       safesearch: true,
//     },
//   };

// const PARAMS =
//   '?key=${API_KEY}&q=${this.searchFoto}&page=${this.page}&per_page=${this.per_page}&lang=en,ua&image_type=photo&orientation=horizontal&safesearch=true';

// class ImagesAPIContainer {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.per_page = 10;
//   }

//     async fetchImages() {
//     try {
//   const url = `?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}`;
//   return await axios.get(url);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
