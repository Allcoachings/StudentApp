// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
import mime from "mime";
// import {Base64} from '../../Base64' 
 
    export const fetch_student_history=(studentId,offset,dataLimit,callback)=>
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

             fetch(serverApiUrl+"student/history/fetch/"+studentId+"/"+offset+"/"+dataLimit,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

    export const fetch_student_purchase=(studentId,offset,dataLimit,callback)=>
    { 

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"institute/course/reviews/purchaseList/"+studentId+"/"+offset+"/"+dataLimit,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
        
    }


    export const updateStudentDetails=(id, userId, email, name, stateOfResidence, mobileNumber, studentImage, blocked,callback)=>
    { 

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"student/",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({id, userId, email, name, stateOfResidence, mobileNumber, studentImage, blocked})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
        
    }

    export const updateStudentImage=(id, image, callback)=>
    { 
        const newImageUri =  "file:///" + image.uri.split("file:/").join("");
        var formData   = new FormData();  
        formData.append("image",{ 
            uri : newImageUri,
            type: mime.getType(newImageUri),
            name: image.name
        })
        formData.append("id",id)  
        let headers = new Headers(); 
        headers.append('Content-Type',  'multipart/form-data');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"student/update/profile",
        {
            method: 'POST',  
            headers,
            body:formData
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
        
    }
