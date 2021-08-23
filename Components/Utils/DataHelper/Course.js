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

             fetch(serverApiUrl+'institute/'+instId+"/course",
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


//video section starts 
export const fetch_courses_videos=(courseId=-1,callback,playlistId=-1)=>
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
            let apiUrl;
            if(playlistId == -1)
            {
                apiUrl = serverApiUrl+'/institute/course/video/all/'+courseId
            }else
            {
                apiUrl = serverApiUrl+'/institute/course/video/playlist/'+playlistId
            }
                
             fetch(apiUrl,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}

//add video
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


// create playlist
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
            headers.append('Content-Type', 'application/json');
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
//fetch video playlist
export const fetch_video_playlist=(courseId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'/institute/course/video/playlists/'+courseId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

//video section ends here

//document section starts 
export const fetch_courses_documents=(courseId=-1,callback,playlistId=-1)=>
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
            let apiUrl;
            if(playlistId == -1)
            {
                apiUrl = serverApiUrl+'/institute/course/document/all/'+courseId
            }else
            {
                apiUrl = serverApiUrl+'/institute/course/document/playlist/'+playlistId
            }
                
             fetch(apiUrl,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}

//add document
export   const addCourseDocument =(document,name,courseId,callback,playlistId=-1)=>
{

    const newImageUri =  "file:///" + document.uri.split("file:/").join("");
            var formData   = new FormData();  
            formData.append("file",{ 
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: document.name
            }) 
             console.log("courseId",courseId)
             formData.append("name",name) 
              
             formData.append("playlistId",playlistId)
             formData.append("courseId",courseId)
             
            let headers = new Headers(); 
            headers.append('Content-Type', 'multipart/form-data');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS');  
             fetch(serverApiUrl+'institute/course/document/',
            {
                method: 'POST',  
                headers,
                body:formData
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}


// create document playlist
export   const addCourseDocumentPlaylist=(name,courseId,callback)=>
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
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS');  
             fetch(serverApiUrl+'/institute/course/document/createPlaylist',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({name,courseId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}
//fetch document playlist
export const fetch_document_playlist=(courseId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'/institute/course/document/playlists/'+courseId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

//document section ends here

//timetable section starts 
export const fetch_courses_timetable=(courseId,callback)=>
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
            let apiUrl = serverApiUrl+'/institute/course/timetable/all/'+courseId
             
                
             fetch(apiUrl,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}

//add timetable item
export   const addCourseTimetableItem =(title,subTitle,dateReverse,date,time,subjectId,insId,callback)=>
{

    // const newImageUri =  "file:///" + document.uri.split("file:/").join("");
    //         var formData   = new FormData();  
    //         formData.append("file",{ 
    //             uri : newImageUri,
    //             type: mime.getType(newImageUri),
    //             name: document.name
    //         }) 
    //          console.log("courseId",courseId)
    //          formData.append("name",name) 
              
    //          formData.append("playlistId",playlistId)
    //          formData.append("courseId",courseId)
             
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS');  

            let dateTime =  new Date(Date.parse(dateReverse+'T'+time+"+05:30"))
            console.log("string Date time",dateReverse+'T'+time,dateTime," y-",dateTime.getFullYear()," m-",dateTime.getMonth()," d-",dateTime.getDate()," h-",dateTime.getHours()," min-",dateTime.getMinutes());
             fetch(serverApiUrl+'/institute/course/timetable/addsubjectitem',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({date,title,subTitle,time,subjectId,insId,dateTime})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}


// create timetable subject
export   const addCourseTimeTableSubject=(name,courseId,callback)=>
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
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS');  
             fetch(serverApiUrl+'/institute/course/timetable/addsubject',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({name,courseId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}   
//fetch timetable playlist
// export const fetch_document_playlist=(courseId,callback)=>
// {
//     let headers = new Headers(); 
//     headers.append('Content-Type', 'application/json'); 

//     headers.append('Access-Control-Allow-Origin', serverApiUrl);
//     headers.append('Access-Control-Allow-Credentials', 'true');

//     headers.append('GET', 'POST', 'OPTIONS'); 

//      fetch(serverApiUrl+'/institute/course/document/playlists/'+courseId,
//     {
//         method: 'GET',  
//         headers,
//         // body:JSON.stringify({title,description,fees,instId})
//     })
//     .then((response)=>callback(response)) 
//     .catch((error)=>{console.log(error)})
// }

//document section ends here



//adding testseries with questions
export   const addTestSeries=( testSeries,questions,callback)=>
{
 
            var formData   = new FormData();   
            
            formData.append("testSeries",testSeries)  
            formData.append("questions",Object.values(questions))
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');
            console.log(testSeries)
            headers.append('GET', 'POST', 'OPTIONS'); 
             fetch(serverApiUrl+'institute/course/testseries/createseries',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({testSeries,questions:Object.values(questions)})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}

export const fetch_testSeries = (courseId,callback)=>
{

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            let apiUrl = serverApiUrl+'/institute/course/testseries/all/'+courseId
             
                
             fetch(apiUrl,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

}

export const fetch_latestUpcomingSchedule = (insId,callback)=>
{

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 
            let apiUrl = serverApiUrl+'/institute/course/timetable/latestupcoming/'+insId 
            fetch(apiUrl,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

}


