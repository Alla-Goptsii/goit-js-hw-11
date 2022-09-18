import axios from 'axios';

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
      console.log(response);
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error);
    }

    // get query() {
    // return this.searchQuery;
    //   }

    //   set query(newQuery) {
    //     this.searchQuery = newQuery;
    //   }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

export { ImagesAPIService };
