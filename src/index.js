import { refs } from './refs.js';
import Notiflix from 'notiflix';
import { LoadMoreBtn } from './loadMore';
import { galeryTmpl } from './galeruTmpl.js';
import { ImagesAPIService } from './api-service.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
refs.searchForm.addEventListener('submit', onSearch);

const imagesAPIService = new ImagesAPIService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
console.log(loadMoreBtn);
loadMoreBtn.refs.button.addEventListener('click', fetchImg);

// console.log(imagesAPIService);
function onSearch(event) {
  event.preventDefault();

  imagesAPIService.query = event.currentTarget.searchQuery.value.trim();
  if (imagesAPIService.query === '') {
    return Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
  loadMoreBtn.show();
  imagesAPIService.resetPage();
  clearGaleryContainer();
  fetchImg();
}

function fetchImg() {
  loadMoreBtn.disabled();
  imagesAPIService.fetchImages().then(foto => {
    galeryMarkup(foto);
    loadMoreBtn.enable();
    // debugger;
    notificationTotalHits(foto);
  });
}

function galeryMarkup(foto) {
  refs.cotainer.insertAdjacentHTML('beforeend', galeryTmpl(foto));
}
function clearGaleryContainer() {
  refs.cotainer.innerHTML = '';
}

function notificationTotalHits(data) {
  const countImages = data.hits.length;
  console.log(countImages);
  const maxImages = data.totalHits;
  console.log(maxImages);
  console.log(refs.cotainer.children.length);
  if (countImages > maxImages) {
    loadMoreBtn.hide();
    return Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    // console.log(data);
  }
  //   else if (!data.total) {
  //     loadMoreButton.hide();
  //     return Notify.failure(
  //       `Sorry, there are no images matching your search query: ${apiService.query}. Please try again.`
  //     );
  //   } else {
  //     loadMoreButton.enable();
  //     return Notify.success(`Hooray! We found ${countImages} images.`);
  //   }
}
// return Notiflix.Notify.info(`Hooray! We found ${this.totalHits} images.`);
