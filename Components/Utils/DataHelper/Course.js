// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
import mime from "mime";

export   const addCourse=(title,description,fees,instId,callback)=>
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


export const fetch_institute_courses=(instId,callback)=>
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

             fetch(serverApiUrl+'/institute/'+instId+"/course",
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}
export const fetch_courses_banners=(courseId,callback)=>
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

             fetch(serverApiUrl+'/institute/course/banners/all/'+courseId,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}
 


export   const addCourseBanner=(banner,courseId,callback)=>
{

    const newImageUri =  "file:///" + banner.uri.split("file:/").join("");
            var formData   = new FormData();  
            formData.append("file",{ 
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: banner.name
            }) 
             formData.append("courseId",courseId)
             
            let headers = new Headers(); 
            headers.append('Content-Type', 'multipart/form-data');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            console.log("register   working")
             fetch(serverApiUrl+'/institute/course/banners/upload/',
            {
                method: 'POST',  
                headers,
                body:formData
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}

export const fetch_courses_videos=(courseId,callback)=>
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

             fetch(serverApiUrl+'/institute/course/video/all/'+courseId,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}

export   const addCourseVideo=(video,name,description,isDemo,demoLength,courseId,callback,playlistId=-1)=>
{

    const newImageUri =  "file:///" + video.uri.split("file:/").join("");
            var formData   = new FormData();  
            formData.append("file",{ 
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: video.name
            }) 
             console.log("courseId",courseId)
             formData.append("name",name)
             formData.append("description",description)

             formData.append("isDemo",isDemo)
             formData.append("demoLength",demoLength)
             
             formData.append("courseId",courseId)
             formData.append("playlistId",playlistId)
             
            let headers = new Headers(); 
            headers.append('Content-Type', 'multipart/form-data');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS');  
             fetch(serverApiUrl+'/institute/course/video/',
            {
                method: 'POST',  
                headers,
                body:formData
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}



export   const addCourseVideoPlaylist=(name,courseId,callback)=>
{

    // const newImageUri =  "file:///" + video.uri.split("file:/").join("");
            // var formData   = new FormData();  
            // formData.append("file",{ 
            //     uri : newImageUri,
            //     type: mime.getType(newImageUri),
            //     name: video.name
            // }) 
            //  console.log("courseId",courseId)
            //  formData.append("name",name)
            //  formData.append("description",description)

            //  formData.append("isDemo",isDemo)
            //  formData.append("demoLength",demoLength)
             
            //  formData.append("courseId",courseId)
            //  formData.append("playlistId",playlistId)
             
            let headers = new Headers(); 
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS');  
             fetch(serverApiUrl+'/institute/course/video/createPlaylist',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({name,courseId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}
export const fetch_video_playlist=(courseId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'/institute/course/banners/all/'+courseId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

