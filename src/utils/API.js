const axios = require('axios');

const URL_PREFIX = 'http://localhost:3002';

const API = {

  login: function (userData) {
    return axios.post(`${URL_PREFIX}/login`, userData)
  },
  signup: function (userData) {
    return axios.post(`${URL_PREFIX}/signup`, userData)
  },

  getDashboard: function (token) {
    return axios.get(`${URL_PREFIX}/dashboard`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  // working on this
  getProfile: function (token) {
    return axios.get(`${URL_PREFIX}/api/users/`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  
  getAllGoals: function () {
    return axios.get(`${URL_PREFIX}/api/goals`);
  },
  getOneGoal: function (id) {
    return axios.get(`${URL_PREFIX}/api/goals/${id}`);
  },
  
}

export default API;