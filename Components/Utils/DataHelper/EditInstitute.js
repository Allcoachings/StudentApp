// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
import mime from "mime";
// import {Base64} from '../../Base64' 

export const updateInstituteDetails=(id, about, address, city, directorName, email, logo, name, phone, state, password, callback)=>
{ 

    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/editInstitute",
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({id, about, address, city, directorName, email, logo, name, phone, state, password})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
    
}
