import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '29926103-ef277a018e47056ded665dd02';
const BASE_URL = 'https://pixabay.com/api/';

class ImagesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages() {
    console.log(this);

    try {
      const url = `${BASE_URL}?key=${API_KEY}&q=${this.query}&page=${this.page}&per_page=${this.per_page}&lang=en,ua&image_type=photo&orientation=horizontal&safesearch=true;`;
      const response = await axios.get(url);
      // return fetch(url)
      //   .then(response => response.json())
      //   .then(data => {
      //     this.incrementPage();

      //     return data;
      //     //   return data.foto;
      //   });
      return response.data;
    } catch (error) {
      error;
    }

    // get query() {
    // return this.searchQuery;
    //   }

    //   set query(newQuery) {
    //     this.searchQuery = newQuery;
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

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

export { ImagesAPIService };
