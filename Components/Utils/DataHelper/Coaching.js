// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
import mime from "mime";
export   const registerCoaching=(name,directorName,email,phone,password,address,city,state,category,about,logo,callback,status=1)=>
{

    const newImageUri =  "file:///" + logo.uri.split("file:/").join("");
            var formData   = new FormData();  
            formData.append("file",{ 
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: logo.name
            }) 
            formData.append("name",name)  
            formData.append("directorName",directorName)  
            formData.append("email",email)
            formData.append("phone",phone)
            formData.append("password",password)
            formData.append("address",address)
            formData.append("city",city)
            formData.append("state",state)
            formData.append("category",category)
            formData.append("about",about) 
            formData.append("status",status)
             
            let headers = new Headers(); 
            headers.append('Content-Type', 'multipart/form-data');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            
             fetch(serverApiUrl+'/institute/',
            {
                method: 'POST',  
                headers,
                body:formData
            })
            .then((response)=>{

                 
                return callback(response)
            }) 
            .catch((error)=>{console.log(error)})

       
   
        
}
 
export   const fetch_instituteDetails=(instId,callback)=>
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

             fetch(serverApiUrl+'/institute/'+instId,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
} 


export const fetch_coachingByCategory =(category,offset,dataLimit,callback)=>
{
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', "*");
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS');  
            console.log(serverApiUrl+'institute/category/'+category+"/"+offset+"/"+dataLimit)
             fetch(serverApiUrl+'institute/category/'+category+"/"+offset+"/"+dataLimit,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}


