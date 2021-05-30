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

  getDashboard: function (token) {
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
  getOneGroup: function (id) {
    return axios.get(`${URL_PREFIX}/api/groups/${id}`);
  },
  deleteGoal: function (id, token) {
    return axios.delete(`${URL_PREFIX}/api/goals/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  },
  createGoal: function (newGoalData, mytoken) {
    console.log(mytoken);
    return axios.post(`${URL_PREFIX}/api/goals/`, newGoalData, {
      headers: {
        authorization: `Bearer ${mytoken}`
      }
    });
  }
  
}

export default API;
