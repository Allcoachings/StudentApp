import {serverApiUrl} from '../../config'
import mime from "mime";

export const uploadFile=(image, callback)=>
    { 
        const newImageUri =  "file:///" + image.uri.split("file:/").join("");
        var formData   = new FormData();  
        formData.append("file",{ 
            uri : newImageUri,
            type: mime.getType(newImageUri),
            name: image.name
        })
        let headers = new Headers(); 
        headers.append('Content-Type',  'multipart/form-data');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"files/upload",
        {
            method: 'POST',  
            headers,
            body:formData
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
        
    }