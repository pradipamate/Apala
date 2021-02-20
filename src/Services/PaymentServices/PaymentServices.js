import axios from 'axios';
import config from "./PaymentServicesConfig"
 const Server = config.BASE_URL;
 var Action = config.ACTION;

 class PaymentApi {
   
    proceedToPay=(token, data)=>{
        console.log("token=====", token);
            let header={
                Authorization: "Bearer "+token 
              }
        return new Promise((resolve, reject) => {
          axios
          .post(Server + Action.PROCEED_TO_PAY,data, {headers:header})
            .then(function (response) {
              resolve(response);
            },function(err){
              console.log("err------------>>>",err)
            })
            // .catch((e) => {
            //   reject(e);
            // });
        });
      }
      callTrasaction=(token,transaction_data)=>{
        console.log("transaction_data===========",transaction_data);
        console.log("token=====", token);
            let header={
                Authorization: "Bearer "+token 
              }
        // return new Promise((resolve, reject) => {
        //   axios
        //   .post(Server + Action.PROCEED_TO_PAY,transaction_data, {headers:header})
        //     .then(function (response) {
        //       resolve(response);
        //     })
        //     .catch((e) => {
        //       reject(e);
        //     });
        // });
       return fetch(`${BASE_URL}/api/transactions`, {
          method: "POST",
          body: JSON.stringify(transaction_data),
          headers: {
              "Authorization": "Bearer "+token,
            "Content-Type": "application/json"
          },
        
        }).then(function(response) {
            console.log("response==========",response);
          response.status     //=> number 100–599
          response.statusText //=> String
          response.headers    //=> Headers
          response.url        //=> String
        
          return response.text()
        }, function(error) {
          error.message //=> String
        })
      }

      handleResponse=(orederID, token)=>{
        console.log("token=====", token);
            let header={
                Authorization: "Bearer "+token 
              }
        return new Promise((resolve, reject) => {
          axios
          .get(Server + Action.VALIDATE_STATUS+orederID, {headers:header})
            .then(function (response) {
              resolve(response);
            },function(err){
              console.log("err------------>>>",err)
            })
            // .catch((e) => {
            //   reject(e);
            // });
        });
      }
      
      
 }

 const instance = new PaymentApi();
export default instance;