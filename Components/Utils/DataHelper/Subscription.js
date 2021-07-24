import {serverApiUrl} from '../../config'

    export const fetchSubscribedStudentList=(id,offset,dataLimit,callback)=>
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

            fetch(serverApiUrl+"subscription/ins/"+id+"/"+offset+"/"+dataLimit,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const fetchSubscribedInstituteList=(id,offset,dataLimit,callback)=>
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

            fetch(serverApiUrl+"subscription/student/"+id+"/"+offset+"/"+dataLimit,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }


    export const checkSubscription=(studentId,insId,callback)=>
    { 
        console.log("insIdhhaaallooo",insId)
        console.log("studentIdhhaaalllooo",studentId)
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"subscription/checksubscription",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({studentId,insId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }


    export const subscribe=(studentId,insId,callback)=>
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

            fetch(serverApiUrl+"subscription/subscribe",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({studentId,insId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }


    export const unsubscribe=(studentId,insId,callback)=>
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

            fetch(serverApiUrl+"subscription/unsubscribe",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({studentId,insId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

