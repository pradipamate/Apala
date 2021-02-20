/* eslint-disable no-undef*/
import * as _ from 'lodash';
import config from '../Config';
import callApi from './request';
import {
    AsyncStorage,
} from 'react-native';

const axios = require("axios");

/*

 * App Apis
 *
 * Follow this format:
 * export const API_CONSTANT = `${base}/api end point`;
 */

// Endpoint could be local as well if we're serving jsons
const endpointLocation = 'remote';
const urls = {
    remote: {
        'login': 'api/login',
        'otp': 'api/otp/',
        'register': 'api/users/',
        'reset-password': 'api/users/password',
        'get-countries': 'api/areas/countries',
        'get-states': 'api/areas/states/',
        'get-cities': 'api/areas/cities/',
        'fetch-roles': 'api/roles',
        'fetch-services':'api/services',
        'fetch-streams': 'api/streams/',
        'fetch-qualification': 'api/qualifications/',
        'fetch-speciality': 'api/specialities/',
        'fetch-superSpeciality':'/api/superspecialiity',
        'save-profile': 'api/profiles',
        'update-person-info': 'api/personalinfo/users',
        'update-address-info': 'api/contacts/users',
        'search-all-consultant': 'api/consultants',
        'search-all-consultant-speciality': 'api/consultants/specialities/',
        'search-all-consultant-streams': 'api/consultants/streams/',
        'search-all-consultant-qualification': 'api/consultants/qualifications/',
        'search-all-consultant-symptoms': '/api/consultants/symptoms/',
        'get-consultant-details': 'api/consultants/details/',
        'stream': 'api/users/streams/',
        'qualification': 'api/users/qualifications/',
        'speciality': 'api/users/specialities/',
        'superSpeciality':'api/users/superspecialities',
        //   'upload-pic': 'api/profiles/uploadphoto',
        'upload-pic': '/api/profiles/uploadfile',
        'online-consultation': 'api/users/onlineconsultat',
        'family-physician': 'api/users/physician/',
        'membership-plan': 'api/memberships',
        'articles': 'api/articles',
        'user-membership-plan': 'api/users/memberships',
        'user-reports':'api/prescriptions',
        'fetch-bookings': 'api/users/bookings',
        'chat-history': 'chat/chathistory/',
        'toggle-online-status': 'api/consultants/status',
        'fetch-common-symptoms': 'api/symptoms?symptomtype=common',
        'fetch-all-symptoms': 'api/symptoms?symptomtype=all',
        'search-symptoms': 'api/symptoms/search/',
        'search-icds': '/api/icds/search/',
        'search-drugs': '/api/drugs/search/',
        'fetch-all-procedures': '/api/procedures',
        'fetch-all-care-plan': 'api/careplans',
        'fetch-all-diagnostic-test': 'api/diagnostics'




    }
}

function getEndpoint(endpoint) {
    if (urls[endpointLocation][endpoint]) {
        return config.api.host
            + urls[endpointLocation][endpoint];
    }
    return null;
}

function generateDefaultHeaders() {
    return {
        'Content-type': 'application/x-www-form-urlencoded'
    };
}
function generateFormDataHeaders() {
    return {
        "Content-Type": "multipart/form-data"
    }
}
function generateDefaultGetHeaders() {
    return {
        'Content-Type': 'application/json;'
    };
}
// /**
//  * API triggered for fetching user subscribed/Profile
//  * @return {obejct} of packages
//  */

export function callUserAuthentication(data) {
    // api / login
    return callApi(getEndpoint('login'), {
        method: 'post',
        data,
        removeAuthorizationHeader: true
    });
}


export function callRegisterMobile(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/users/mobileregister', {
        method: 'post',
        data,
        removeAuthorizationHeader: true
    });
}

export function callGenerateOTPForgetPassword(data) {
    return callApi(getEndpoint('otp') + data.mobile + '?request_type=forgotpass', {
        method: 'get',
        //query:{data},
        //   headers: generateDefaultGetHeaders(),
        removeAuthorizationHeader: true
    });
}
export function callGenerateOTP(data) {
    return callApi(getEndpoint('otp') + data.mobile, {
        method: 'get',
        //query:{data},
        //   headers: generateDefaultGetHeaders(),
        removeAuthorizationHeader: true
    });
}
export function callValidateOTP(data) {
    return callApi(getEndpoint('otp'), {
        method: 'post',
        data,
        removeAuthorizationHeader: true
    });
}
export function callRegisterUser(data) {
    //register
    return callApi(getEndpoint('register'), {
        method: 'post',
        data: data.userData,
        headers: { 'Authorization': "bearer " + data.otpToken },
        removeAuthorizationHeader: true
    });
}
// /reset-password
export function callResetPassword(data) {
    return callApi(getEndpoint('reset-password'), {
        method: 'put',
        data: { password: data.userData.password },
        headers: { 'Authorization': "bearer " + data.otpToken },
        removeAuthorizationHeader: true
    });
}

//save user info
export function callSaveUserInfo(data) {
    //  console.log(data);
    return callApi(getEndpoint('save-profile'), {
        method: 'post',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}



export function callFetchUserInfo(data) {
    //  console.log(data);
    return callApi(getEndpoint('save-profile'), {
        method: 'get',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callToggleOnlineStatus() {
    //  console.log(data);
    return callApi(getEndpoint('toggle-online-status'), {
        method: 'put',
        //    data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callFetchUserRelativesInfo() {
    //  console.log(data);
    //api/personalinfo/users
    return callApi(getEndpoint('update-person-info'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callFetchUserMembershipPlanInfo() {
    //  console.log(data);
    //api/personalinfo/users
    return callApi(getEndpoint('user-membership-plan'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callFetchUserReports() {
    //  console.log(data);
    //api/personalinfo/users
    return callApi(getEndpoint('user-reports'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callFetchConsultantDetails(data) {
    //  console.log(data);
    return callApi(getEndpoint('get-consultant-details') + data, {
        method: 'get',
        //    data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

//update-person-info
export function callUpdateUserPersonalInfo(data) {
    //  console.log(data);
    return callApi(getEndpoint('update-person-info'), {
        method: 'post',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callUpdateUserProfilePic(data) {
    return callApi(getEndpoint('upload-pic'), {
        method: 'post',
        data,
        // headers: generateFormDataHeaders(),
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callDeleteUserStream(data) {
    //  console.log(data);

    return callApi(getEndpoint('stream') + data, {
        method: 'delete',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callDeleteUserRelative(data) {
    //  console.log(data);
    return callApi(config.api.host + 'api/personalinfo/' + data + '/users', {
        method: 'delete',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callUpdateUserAddress(data) {
    return callApi(getEndpoint('update-address-info'), {
        method: 'post',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callUpdateUserPermanentAddress(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/contacts/PostPContact', {
        method: 'post',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callCountryFetch() {

    // get - countries
    return callApi(getEndpoint('get-countries'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callStateFetch(data) {
    //get - states
    return callApi(getEndpoint('get-states') + data, {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callCityFetch(data) {

    return callApi(getEndpoint('get-cities') + data, {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callFetchRoles() {

    return callApi(getEndpoint('fetch-roles'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callFetchServices() {

    return callApi(getEndpoint('fetch-services'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

//search-all-consultant

export function callFetchAllConsultants(data) {

    return callApi(getEndpoint('search-all-consultant'), {
        method: 'post',
        data: {
            filters: data
        },
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callFetchAllSpecialityWiseConsultants(ids, filters) {
    //api/consultants/specialities/
    return callApi(getEndpoint('search-all-consultant-speciality') + ids, {
        method: 'post',
        data: {
            filters
        },
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callFetchAllStreamWiseConsultants(ids, filters) {
    //api/consultants/specialities/
    return callApi(getEndpoint('search-all-consultant-streams') + ids, {
        method: 'post',
        data: {
            filters
        },
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
//
export function callFetchAllQualificationWiseConsultants(ids, filters) {
    //api/consultants/specialities/
    return callApi(getEndpoint('search-all-consultant-qualification') + ids, {
        method: 'post',
        data: {
            filters
        },
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callFetchAllSymptomsWiseConsultants(ids, filters) {
    //api/consultants/specialities/
    return callApi(getEndpoint('search-all-consultant-symptoms') + ids, {
        method: 'post',
        data: {
            filters
        },
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}


export function callUpdateRoles(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/Users/usersR', {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
//streams
export function callFetchStreams() {

    return callApi(getEndpoint('fetch-streams'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callUpdateStream(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/streams', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
//qualification

export function callFetchQualification() {

    return callApi(getEndpoint('fetch-qualification'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callAddQualification(data) {
    return callApi(getEndpoint('qualification'), {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callDeleteQualification(data) {
    return callApi(getEndpoint('qualification') + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function callUpdateQualification(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/qualifications/mappings/', {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
//speciality
//qualification

export function callFetchSpeciality() {

    return callApi(getEndpoint('fetch-speciality'), {
        method: 'get',
            removeAuthorizationHeader: false
    });
}
export function callFetchSuperSpeciality() {

    return callApi(getEndpoint('fetch-superSpeciality'), {
        method: 'get',
            removeAuthorizationHeader: false
    });
}
export function callFetchCommonSymptoms() {

    return callApi(getEndpoint('fetch-common-symptoms'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callFetchAllSymptoms() {

    return callApi(getEndpoint('fetch-all-symptoms'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callSearchSymptoms(data) {

    return callApi(getEndpoint('search-symptoms') + data, {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callSearchICDS(data) {

    return callApi(getEndpoint('search-icds') + data, {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callSearchDrugs(data) {

    return callApi(getEndpoint('search-drugs') + data, {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}


export function callFetchProcedures() {

    return callApi(getEndpoint('fetch-all-procedures'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callFetchCarePlans() {

    return callApi(getEndpoint('fetch-all-care-plan'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callFetchDiagnosticTestsSuggested() {

    return callApi(getEndpoint('fetch-all-diagnostic-test'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callUpdateSpeciality(data) {
    return callApi(getEndpoint('speciality'), {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callUpdateSuperSpeciality(data) {
    return callApi(getEndpoint('superSpeciality'), {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callDeleteSpeciality(data) {
    return callApi(getEndpoint('speciality') + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function callUpdateProfessionalInfo(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/professional', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}



export function callCreateOnlineConsulation(data) {

    return callApi(getEndpoint('online-consultation'), {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callUpdateOnlineConsulation(data) {

    return callApi(getEndpoint('online-consultation'), {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callFetchMembershipPlan() {

    return callApi(getEndpoint('membership-plan'), {
        method: 'get',
        removeAuthorizationHeader: false
    });
}
export function callFetchArticles() {
    return callApi(getEndpoint('articles'), {
        method: 'get',
        removeAuthorizationHeader: false
    });
}

export function callUpdateFamilyPhysician(data) {
    console.log(data);

    return callApi(getEndpoint('family-physician'), {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
export function callFetchChatList(id) {
    //fetch-bookings
    return callApi(getEndpoint('fetch-bookings'), {
        method: 'get',
        removeAuthorizationHeader: false
    });
}
//fetch chat list
export function callFetchChatMessages(data) {
    //chat-history
    return callApi(getEndpoint('chat-history') + data.toId + '?from=' + data.pageNumber + '&size=5', {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

export function callDeleteUserAllOnlineConsulation(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/onlineconsaltant/onlineconsaltantuser/' + data, {
        method: 'delete',
        data,
        removeAuthorizationHeader: false
    });
}
export function callFetchHomeVisitType() {
    return callApi('https://aapkadoctor.azurewebsites.net/api/homevisit/', {
        method: 'get',

        removeAuthorizationHeader: false
    });
}
export function callCreateHomeVisit(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/homevisit/mappings/', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callUpdateHomeVisit(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/homevisit/mappings/', {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
export function callDeleteHomeVisit(data) {
    //  api/homevisit/UpdateUserhomevisit
    return callApi('https://aapkadoctor.azurewebsites.net/api/homevisit/mappings/' + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function callDeleteUserAllHomeVisit(data) {
    //  api/homevisit/UpdateUserhomevisit
    return callApi('https://aapkadoctor.azurewebsites.net/api/homevisit/mappingsuser/' + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function callFetchAmbulanceType() {
    return callApi('https://aapkadoctor.azurewebsites.net/api/ambulanceservice', {
        method: 'get',

        removeAuthorizationHeader: false
    });
}
export function callCreateAmbulanceService(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/ambulanceservice/mappings', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callUpdateAmbulanceService(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/ambulanceservice/mappings', {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
export function callDeleteAmbulanceService(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/ambulanceservice/mappings/' + data, {
        method: 'delete',
        data,
        removeAuthorizationHeader: false
    });
}
export function callDeleteUserAllAmbulanceService(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/ambulanceservice/mappingsuser/' + data, {
        method: 'delete',
        data,
        removeAuthorizationHeader: false
    });
}
export function callFetchTPAType() {
    return callApi('https://aapkadoctor.azurewebsites.net/api/tpa', {
        method: 'get',

        removeAuthorizationHeader: false
    });
}

export function callCreateTPAService(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/tpa/mappings', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callUpdateTPAService(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/tpa/mappings', {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
export function calldeleteTPAService(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/tpa/mappings/' + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function calldeleteUserAllTPAService(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/tpa/mappingsuser/' + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}

export function callFetchLocumType() {
    return callApi('https://aapkadoctor.azurewebsites.net/api/locum', {
        method: 'get',

        removeAuthorizationHeader: false
    });
}


export function callCreateLocum(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/locum/mappings', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callUpdateLocum(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/locum/mappings', {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
export function callDeleteLocum(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/locum/mappings/' + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function callDeleteUserAllLocum(data) {

    return callApi('https://aapkadoctor.azurewebsites.net/api/locum/mappingsuser/' + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function callCreateDoctorAppointmentInfo(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/appointment', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callUpdateDoctorAppointmentInfo(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/appointment', {
        method: 'put',
        data,
        removeAuthorizationHeader: false
    });
}
export function callDeleteDoctorAppointmentInfo(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/appointment/' + data, {
        method: 'delete',
        removeAuthorizationHeader: false
    });
}
export function callDeleteDoctorAllAppointmentInfo(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/appointment/appointmentuser/' + data, {
        method: 'delete',

        removeAuthorizationHeader: false
    });
}
export function callCreateDoctorFrequencyInfo(data) {
    return callApi('https://aapkadoctor.azurewebsites.net/api/daily', {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
//fetch chat list


