import axios from "axios";

// Exports to the frontside functions with axios server requests
export default {
  // Sends request with user data to user API
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

};