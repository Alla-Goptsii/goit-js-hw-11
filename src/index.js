import { refs } from './refs.js';
import { LoadMoreBtn } from './loadMore';
import { galeryTmpl } from './galeruTmpl.js';
import { ImagesAPIService } from './api-service.js';
import Notiflix from 'notiflix';
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
loadMoreBtn.refs.button.addEventListener('click', fetchImg);
// console.log(imagesAPIService.guery);

function onSearch(event) {
  event.preventDefault();

  imagesAPIService.query = event.currentTarget.searchQuery.value.trim();
  // debugger;
  if (!imagesAPIService.query || imagesAPIService.total === 0) {
    return Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  }
  loadMoreBtn.show();
  imagesAPIService.resetPage();
  clearGaleryContainer();
  fetchImg();
  event.currentTarget.reset();
}

function fetchImg() {
  loadMoreBtn.disabled();
  imagesAPIService.fetchImages().then(foto => {
    galeryMarkup(foto);
    loadMoreBtn.enable();
    // debugger;
    lightbox.refresh();
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
  const maxImages = data.totalHits;
  const allCountImg = refs.cotainer.children.length;
  console.log(allCountImg);

  if (allCountImg > maxImages) {
    loadMoreBtn.hide();
    return Notiflix.Notify.warning(
      `We're sorry, but you've reached the end of search results.`
    );
  } else if (!data.total) {
    loadMoreBtn.hide();
    return Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query: ${imagesAPIService.query}. Please try again.`
    );
  } else {
    loadMoreBtn.enable();
    return Notiflix.Notify.success(`Hooray! We found ${countImages} images.`);
  }
  // console.log(data);
}
