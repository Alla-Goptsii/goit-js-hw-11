import axios from 'axios';

// const PARAMS =
//   '?key=${API_KEY}&q=${this.searchFoto}&page=${this.page}&per_page=${this.per_page}&lang=en,ua&image_type=photo&orientation=horizontal&safesearch=true';

export default class ImagesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 10;
  }

  fetchImages(searchQuery) {
    const API_KEY = '29926103-ef277a018e47056ded665dd02';
    const BASE_URL = 'https://pixabay.com/api/';
    fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&lang=en,ua&image_type=photo&orientation=horizontal&safesearch=true;`
    )
      .then(r => r.json())
      .then(console.log('что-то'));
    //   }
    //   }

    //   async fetchImages() {
    //     try {
    //       const url = `?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}`;
    //       // const  await
    //       return await axios.get(url);
    //     } catch (err) {
    //       console.log(err);
    //     }
  }
}

// export { ImagesAPIService };
