import { refs } from './refs.js';
// import { onSearch } from './on-search.js';
// import Notiflix from 'notiflix';
// import { LoadMoreButton } from './loadMore';
import { galeryTmpl } from './galeruTmpl.js';
import { ImagesAPIService } from './api-service.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
refs.searchForm.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);

const imagesAPIService = new ImagesAPIService();
// const LoadMoreButton = new onLoadMore({
//   selector: '.load-more',
//   hidden: true,
// });
// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// console.log(imagesAPIService);
function onSearch(event) {
  event.preventDefault();

  imagesAPIService.query = event.currentTarget.searchQuery.value.trim();
  //   if (!imagesAPIService.query) {
  //     return Notify.failure(
  //       `Sorry, there are no images matching your search query. Please try again.`
  //     );
  //   }
  imagesAPIService.resetPage();
  imagesAPIService.fetchImages().then(foto => {
    clearGaleryContainer(), galeryMarkup(foto);
  });
}

function onLoadMore() {
  imagesAPIService.fetchImages().then(galeryMarkup);
  console.log('click');

  //   jump(900);
}

function galeryMarkup(foto) {
  refs.cotainer.insertAdjacentHTML('beforeend', galeryTmpl(foto));
}
function clearGaleryContainer() {
  refs.cotainer.innerHTML = '';
}
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
