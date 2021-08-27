// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 

    export const fetchNotifications=(receiverId, receiverType, page, pageSize, callback)=>
    {
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+'notification/'+receiverId+'/'+receiverType+'/'+page+'/'+pageSize,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }