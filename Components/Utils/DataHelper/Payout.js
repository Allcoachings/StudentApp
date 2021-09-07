// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
import mime from "mime";

 
 
export const fetchInsPayouts=(institute,page,pageSize,callback)=>
{
    
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
// console.log("pauout ins     ",{institute})
     fetch(serverApiUrl+'payouts/byIns/'+page+'/'+pageSize,
    {
        method: 'POST',  
        headers,
        body:JSON.stringify(institute)
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetchInsPayoutsTotal=(institute,callback)=>
{
    
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
// console.log("pauout ins     ",{institute})
     fetch(serverApiUrl+'payouts/byIns/total',
    {
        method: 'POST',  
        headers,
        body:JSON.stringify(institute)
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
export const fetchInsPayoutsTotalToday=(institute,callback)=>
{
    
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
// console.log("pauout ins     ",{institute})
     fetch(serverApiUrl+'payouts/byIns/todaysTotal',
    {
        method: 'POST',  
        headers,
        body:JSON.stringify(institute)
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


 
