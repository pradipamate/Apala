import axios from 'axios';
import config from "./authConfig"
 const Server = config.BASE_URL;
 var Action = config.ACTION;
 
class RegistrationApi {
    
      getMobileOTP=(mobileNo)=>{
        return new Promise((resolve, reject) => {
            axios
              .get(Server + Action.GET_MOBILE_OTP+ mobileNo)
              .then(function (response) {
                resolve(response);
              })
              .catch((e) => {
                reject(e);
              });
          });
      }
      verifyOTP=(data)=>{
        return new Promise((resolve, reject) => {
          axios
            .post(Server + Action.POST_OTPL, data)
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
      createUser=(token,data)=>{
        console.log("token========>",token)
        let header={
          Authorization: "Bearer "+token 
        }
        return new Promise((resolve, reject) => {
          axios
            .post(Server + Action.POST_CREATE_USER, data,{ headers:header})
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
      forgotPassword=(mobileNo)=>{
        return new Promise((resolve, reject) => {
          axios
            .get(`${Server}api/otp/${mobileNo}?request_type=forgotpass`)
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
      forgotverifyOTP=(data)=>{
        return new Promise((resolve, reject) => {
          axios
            .post(Server+Action.VERIFY_OTP,data)
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
      changePassword=(data)=>{
        
          return new Promise((resolve, reject) => {
          axios
          .put(Server + Action.POST_CHANGE_PASS, data)
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
      login=(data)=>{
        return new Promise((resolve, reject) => {
          axios
          .post(Server + Action.LOGIN, data)
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

      addNewMember=(token, data)=>{
        let header={
          Authorization:"Bearer "+token
        }
        return new Promise((resolve, reject) => {
          axios
          .post(Server + Action.ADD_MEMBER, data,{headers:header})
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

      changeForgotPassword=(token,data)=>{
        let header={
          Authorization:"Bearer "+token
        }
        return new Promise((resolve, reject) => {
          axios
          .put(Server + Action.RESET_PASS, data,{headers:header})
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }

    



}
const instance = new RegistrationApi();
export default instance;