// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 

export   const addVideo=(title,description,video,callback)=>
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

             fetch(serverApiUrl+'/institute/course/',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)}) 
}

//add video comment
export   const addVideoComment=(comment,studentId,videoId,callback)=>
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
             fetch(serverApiUrl+'/institute/course/video/comment/add',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({comment,student:{id:studentId},videoId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)}) 
} 


//fetch_video_comments

export   const fetchVideoComments =( videoId,offset,dataLimit,callback)=>
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

             fetch(serverApiUrl+'/institute/course/video/comment/'+videoId+"/"+offset+"/"+dataLimit,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({comment,student:{id:studentId},videoId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)}) 
} 

//video views

export const updateVideoView =( videoId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS');  
    // console.log(serverApiUrl+'institute/course/video/views/'+videoId)
     fetch(serverApiUrl+'institute/course/video/views/'+videoId,
    {
        method: 'POST',  
        headers,
        // body:JSON.stringify({comment,student:{id:studentId},videoId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

