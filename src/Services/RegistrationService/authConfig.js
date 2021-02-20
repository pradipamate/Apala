import BASE_URL from "../BaseUrl"


// const BASE_URL="https://svcaapkadoctor.azurewebsites.net/"


module.exports={
    BASE_URL,
    ACTION:{
        GET_MOBILE_OTP:"api/otp/",
        POST_OTPL:'api/otp',
        POST_CREATE_USER:"api/users",
        POST_CHANGE_PASS:"api/users/password",
        LOGIN:"api/login",
        ADD_MEMBER:"api/personalinfo/users",
        VERIFY_OTP:"api/otp",
        RESET_PASS:'api/users/password'
    }
}