const axios = require("axios").default;
export default class newApiImg {
  constructor() {
    this.page = 1;
    this.searchQuery = "";
  }
  fetchImg(query, page) {
    return axios.get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=23531683-f7bec5b5f56f02023e7381294`
    );
  }
  resetPage() {
    this.page = 1;
  }
}
