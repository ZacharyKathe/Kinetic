<<<<<<< HEAD
import axios from "axios";

// Exports to the frontside functions with axios server requests
export default {
  // Sends request with user data to user API
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

};
=======
const axios = require('axios');

const URL_PREFIX = 'http://localhost:3002';

const API = {

  login: function (userData) {
    return axios.post(`${URL_PREFIX}/login`, userData)
    // .then((res) => {
    //   if(res.data.success) {
    //     document.window.location.href = '/dashboard'
    //   }
    // })
  },
  signup: function (userData) {
    return axios.post(`${URL_PREFIX}/signup`, userData)
  },

  getProfile: function (token) {
    return axios.get(`${URL_PREFIX}/dashboard`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  // working on this
  getUser: function (id) {
    return axios.get(`${URL_PREFIX}/api/users/${id}`)
  },
  
  getAllGoals: function () {
    return axios.get(`${URL_PREFIX}/api/goals`);
  },
  getOneGoal: function (id) {
    return axios.get(`${URL_PREFIX}/api/goals/${id}`);
  },
  
}

export default API;
>>>>>>> 5ca82f3c8296d6e82802ad3d058058254f37bdf1
