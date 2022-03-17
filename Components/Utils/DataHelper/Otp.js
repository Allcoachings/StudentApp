// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 

export const generateOtp=(mobileNumber,callback)=>
{

    // console.log("gehereate")
    
            let headers = new Headers();

            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+'otp/generate/'+mobileNumber,
            {
                method: 'GET',  
                headers
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)}) 
        
} 

export const generateEmailOtp=(email,callback)=>
{

    // console.log("gehereate")
    
            let headers = new Headers();

            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+'otp/generateEmailOtp/'+email,
            {
                method: 'GET',  
                headers
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)}) 
        
} 

export   const validateOtp=(otpValue,mobileNumber,callback)=>
{

    
            // var formData   = new FormData(); 
            // formData.append("fetch_banners",'true') 
            // formData.append("offset",offset) 
            // formData.append("data_limit",limit)  
            let headers = new Headers();

            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 

            // console.log(otpValue)
             fetch(serverApiUrl+'otp/validate/',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({mobileNumber,otpValue})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
        
}