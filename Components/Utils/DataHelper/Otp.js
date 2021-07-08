// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 

export const generateOtp=(mobileNumber,callback)=>
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

            fetch(serverApiUrl+'otp/generate/'+mobileNumber,
            {
                method: 'GET',  
                headers
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
} 