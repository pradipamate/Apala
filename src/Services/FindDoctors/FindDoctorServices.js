import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import config from "./Config"
const Server = config.BASE_URL;
var Action = config.ACTION;

class FindDoctorApi {

  getAllSymptoms = async () => {
    let token = AsyncStorage.getItem('Token');
    let header = {
      Authorization: "Bearer " + token
    }

    return new Promise((resolve, reject) => {
      axios
        .get(Server + Action.GET_ALL_SYMPTOMS, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  getAllDoctors = async(token,data) => {
    // let token = AsyncStorage.getItem('Token');
    console.log("token=======================================================================",token);
    let header = {
      Authorization: "Bearer " + token,
      'Content-Type': 'application/json',
      "Accept" : "application/json"
    }

    return new Promise((resolve, reject) => {
      axios
        .post(Server + Action.GET_ALL_DOCTORS,data, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

const instance = new FindDoctorApi();
export default instance;