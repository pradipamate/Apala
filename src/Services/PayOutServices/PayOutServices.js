import axios from 'axios';
import config from './PayOutServicesConfig';
import AsyncStorage from '@react-native-community/async-storage'

const Server = config.BASE_URL;
var Action = config.ACTION;

class PayoutServices {
    getEarnings = (today,token) => {
    let header = {
      Authorization: 'Bearer ' + token,
    };

    return new Promise((resolve, reject) => {
      axios
        .get(Server + Action.GET_ALL_EARNINGS+"?date="+today, {headers: header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

 


}

const instance = new PayoutServices();
export default instance;
