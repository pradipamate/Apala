import axios from 'axios';
import config from "./HomePageConfig"
const Server = config.BASE_URL;
var Action = config.ACTION;

class HomePageApi {

  getAllSpecialities = (token) => {
    let header = {
      Authorization: "Bearer " + token
    }
    return new Promise((resolve, reject) => {
      axios
        .get(Server + Action.GET_ALL_SPECIALITIES, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getWildSearchData = (data,token) => {
    let header = {
      Authorization: "Bearer " + token
    }
    return new Promise((resolve, reject) => {
      axios
        .get(Server + 'api/autocomplete?query='+data, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

 
  getSlots = async (data, token) => {
    console.log("data in getSlots================================>", `${Server + Action.GET_ALL_SPECIALITIES}/1/${data.guid}?date=${data.date}`);
    let header = {
      Authorization: "Bearer " + token
    }
    return await new Promise((resolve, reject) => {
      axios
        .get(`${Server + Action.GET_ALL_SLOTS}/1/${data.guid}?date=${data.date}`, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getAllFamilyMembers = async (token) => {
    let header = {
      Authorization: "Bearer " + token
    }
    return await new Promise((resolve, reject) => {
      axios
        .get(`${Server + Action.GET_FAMILY_MEMBERS}`, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  askQuestion = async (token, data) => {
    let header = {
      Authorization: "Bearer " + token
    }
    return await new Promise((resolve, reject) => {
      axios
        .post(`${Server + Action.ASK_QUESTIONS}`, data, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  getAllDiscussions = async (token) => {
    let header = {
      Authorization: "Bearer " + token
    }
    return await new Promise((resolve, reject) => {
      axios
        .get(`${Server + Action.GET_DISCUSSIONS}`, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

}

const instance = new HomePageApi();
export default instance;