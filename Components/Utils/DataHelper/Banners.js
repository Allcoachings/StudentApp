// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 

export   const fetch_Banners=(placeholder,callback)=>
{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+'mainbanners/byplaceholder/'+placeholder,
    {
        method: 'GET',  
        headers
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)}) 
} 