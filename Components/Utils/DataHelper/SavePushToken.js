import { serverApiUrl } from "../../config";

export const savePushToken=(id,mode,expoToken,callback)=>
{ 

    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+"notification/saveToken",
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({id, mode,expoToken})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
    
}