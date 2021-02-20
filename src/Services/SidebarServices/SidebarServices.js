import axios from 'axios';
import config from "./SidebarConfig"
 const Server = config.BASE_URL;
 var Action = config.ACTION;

 class SidebarApi {
    getUserDetails=(token)=>{
        
            let header={
                Authorization: "Bearer "+token 
              }
        console.log("header------------------------->>",header)
        return new Promise((resolve, reject) => {
          axios
          .get(Server + Action.GET_PROFILE_DETAILS, {headers:header})
            .then(function (response) {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
 }

 const instance = new SidebarApi();
export default instance;