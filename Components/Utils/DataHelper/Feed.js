// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
import mime from "mime";

export   const saveFeed =(feed,callback,image=null)=>
{

      
    feed.feed['photoLocation']=image;
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');  
        fetch(serverApiUrl+'feed/add',
    {
        method: 'POST',  
        headers,
        body:JSON.stringify(feed)
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})

       
   
        
}




export const addImgeFeed=(feed,image,callback)=>
{
    uploadFeedImage(image,(response)=>{
        if(response.status==201)
        {
            saveFeed(feed,callback,response.headers.map.location)
        }else
        {
                callback(response);
        }
    })
}

export const uploadFeedImage=(image,callback)=>
{
      
    const newImageUri =  "file:///" + image.uri.split("file:/").join("");
            var formData   = new FormData();  
            formData.append("image",{ 
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: image.name
            }) 
             
             
             
            let headers = new Headers(); 
            headers.append('Content-Type', 'multipart/form-data');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS');  
             fetch(serverApiUrl+'feed/uploadimage',
            {
                method: 'POST',  
                headers,
                body:formData
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)}) 
}


export const fetch_institute_feed=(instId,offset,dataLimit,callback)=>
{

    
            // var formData   = new FormData(); 
            // formData.append("fetch_banners",'true') 
            // formData.append("offset",offset) 
            // formData.append("data_limit",limit)  
            let headers = new Headers();
            console.log(instId)
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 

             fetch(serverApiUrl+'feed/ins/'+instId+"/"+offset+"/"+dataLimit,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}


export const fetch_feed_all=(offset,dataLimit,callback)=>
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

             fetch(serverApiUrl+"feed/all/"+offset+"/"+dataLimit,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}

export const fetch_feed_by_category=(cat,offset,dataLimit,callback)=>
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
 
             fetch(serverApiUrl+"feed/bytag/"+offset+"/"+dataLimit+"/"+cat,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}