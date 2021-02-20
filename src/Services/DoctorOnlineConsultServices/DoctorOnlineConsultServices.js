import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import config from "./DoctorOnlineConsultconfig"
const Server = config.BASE_URL;
var Action = config.ACTION;

class DoctorOnlineConsultApi {

  getAllOnllineConsults = async (token) => {

    
    let header = {
      Authorization: "Bearer " + token
    }

    return new Promise((resolve, reject) => {
      axios
        .get(Server + Action.GET_ONLINE_CONSULTANTS, { headers: header })
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  getAllSymptoms=(token)=>{
    let header={
      Authorization:"Bearer "+token
    }
    return new Promise((resolve, reject) => {
      axios
      .get(Server + Action.GET_ALL_SYMPTOMS, {headers:header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getAllConfirmedDiagnosis=(token, text)=>{
    let header={
      Authorization:"Bearer "+token
    }
    return new Promise((resolve, reject) => {
      axios
      .get(Server + Action.GET_ALL_CONF_DIAGNOSIS+"/search/"+text+"?pagenumber=2&pagesize=5", {headers:header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
 

  getDiagnosisTestref=(token)=>{
    let header={
      Authorization:"Bearer "+token
    }
    return new Promise((resolve, reject) => {
      axios
      .get(Server + Action.GET_TEST_REF, {headers:header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }


  getAllCarePalns=(token)=>{
    let header={
      Authorization:"Bearer "+token
    }
    return new Promise((resolve, reject) => {
      axios
      .get(Server + Action.GET_ALL_CARE_PLANS, {headers:header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getProcedureSuggested=(token)=>{
    let header={
      Authorization:"Bearer "+token
    }
    return new Promise((resolve, reject) => {
      axios
      .get(Server + Action.GET_PROC_SUGG, {headers:header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  getDrugList=(text,token)=>{
    let header={
      Authorization:"Bearer "+token
    }
    return new Promise((resolve, reject) => {
      axios
      .get(Server + Action.GET_DRUGS+text, {headers:header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  submitPrescription=(data,token)=>{
    let header={
      Authorization:"Bearer "+token
    }
    return new Promise((resolve, reject) => {
      axios
      .post(Server + Action.POST_PRESCRIPTION, data, {headers:header})
        .then(function (response) {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

const instance = new DoctorOnlineConsultApi();
export default instance;