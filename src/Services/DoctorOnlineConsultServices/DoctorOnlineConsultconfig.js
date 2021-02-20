import BASE_URL from '../BaseUrl'


module.exports={
    BASE_URL,
    ACTION:{
        GET_ONLINE_CONSULTANTS:"api/users/bookings/consultants?pageNumber=1&date=10/2/2020&service=chat",
        GET_ALL_DOCTORS:'/api/consultants',
        GET_ALL_SYMPTOMS:'/api/symptoms?symptomtype=common',
        GET_ALL_CONF_DIAGNOSIS:'api/icds',
        GET_TEST_REF:'api/diagnostics',
        GET_ALL_CARE_PLANS:'api/careplans',
        GET_PROC_SUGG:'api/procedures',
        GET_DRUGS:'api/drugs/search/',
        POST_PRESCRIPTION:'api/emr'
    }
}