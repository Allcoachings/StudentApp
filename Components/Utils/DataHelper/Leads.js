// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
import mime from "mime";

    export   const addLead=(courseId, insId, userId,callback)=>
    {

            // var formData   = new FormData(); 
            // formData.append("fetch_banners",'true') 
            // formData.append("offset",offset) 
            // formData.append("data_limit",limit)
            console.log('courseId',courseId) 
            let headers = new Headers();

            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+'institute/leads/add',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({courseId, insId, userId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
        
    } 

    export const fetchLeads=(insId,offset,dataLimit,callback)=>
    {
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"institute/leads/"+insId+"/"+offset+"/"+dataLimit,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }