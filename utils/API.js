import axios from "axios";

const BASE_URL = "https://finnhub.io/api/v1/webhook/";
const KEY_ID = "?token=c2lsp3iad3ice2neka00";

// Exports to the frontside functions with axios server requests
export default {
  // Sends request with user data to user API
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  // Sends request to stock market API to get stock market values
  getStock: function() {
    return axios.get(BASE_URL + "list" + KEY_ID);
  }
};