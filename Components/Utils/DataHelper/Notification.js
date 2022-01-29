// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 

    export const fetchNotifications=(receiverId, receiverType, type, page, pageSize, callback)=>
    {
        // console.log(receiverId, receiverType, page, pageSize)
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 
            if(type=="all")
            {
                apiUrl='notification/'+receiverId+'/'+receiverType+'/'+page+'/'+pageSize
            }
            else
            {
                apiUrl='notification/'+receiverId+'/'+receiverType+'/'+type+'/'+page+'/'+pageSize
            }
            console.log(apiUrl)

            fetch(serverApiUrl+apiUrl,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }
    
    
    export const updateNotificationSeenStatus=(isSeen,id, callback)=>
    {
        // console.log(receiverId, receiverType, page, pageSize)
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 
            
            const apiUrl='notification/update/notificationSeenStatus/'+isSeen+'/'+id
             
            

            fetch(serverApiUrl+apiUrl,
            {
                method: 'Put', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }