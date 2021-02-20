import axios from 'axios';
import config from './ProfileServicesConfig';
import AsyncStorage from '@react-native-community/async-storage'

const Server = config.BASE_URL;
var Action = config.ACTION;

class ProfileServicesApi {
  getBasicDetails = (token) => {
    let header = {
      Authorization: 'Bearer ' + token,
    };

    return new Promise((resolve, reject) => {
      axios
        .get(Server + Action.GET_PROFILE_DETAILS, {headers: header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  postLifestyleDetails = (token , doc) => {
    console.log("Doc from lifestyle",doc)
    let header = {
      Authorization: 'Bearer ' + token,
    };

    return new Promise((resolve, reject) => {
      axios
        .post("https://svcaapkadoctor.azurewebsites.net/api/users/lifestyle", doc , {headers: header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  savePresonalInfo=(data,token)=>{
    console.log("token in services======",token);
    let header = {
        Authorization: 'Bearer ' + token,
      };
      return new Promise((resolve, reject) => {
        axios
          .post(Server + Action.POST_PERSONAL_DETAILS,data, {headers: header})
          .then(function (response) {
            resolve(response);
          })
          .catch((e) => {
              console.log("error=========>",e);
            reject(e);
          });
      });
  }

  getLifestyle=(token)=>{
    let header = {
      Authorization: 'Bearer ' + token,
    };
    return new Promise((resolve, reject) => {
      axios
        .get(Server + Action.GET_LIFESTYLE, {headers: header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
            console.log("error=========>",e);
          reject(e);
        });
    });
  }
  getProfession=(token)=>{
    let header = {
      Authorization: 'Bearer ' + token,
    };
    return new Promise((resolve, reject) => {
      axios
        .get(Server + Action.GET_PROFESSION, {headers: header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
            console.log("error=========>",e);
          reject(e);
        });
    });
  }

  changePassword=(data, token)=>{
    let header = {
      Authorization: 'Bearer ' + token,
    };
    return new Promise((resolve, reject) => {
      axios
        .put(Server + Action.CHANGE_PASS,data, {headers: header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
            console.log("error=========>",e);
          reject(e);
        });
    });
  }


}

const instance = new ProfileServicesApi();
export default instance;
