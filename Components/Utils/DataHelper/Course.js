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
export const fetch_courses_videos=(offset, dataLimit, courseId=-1,callback,playlistId=-1)=>
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
                apiUrl = serverApiUrl+'institute/course/video/all/'+courseId+'/'+offset+'/'+dataLimit
            }else
            {
                apiUrl = serverApiUrl+'institute/course/video/playlist/'+playlistId+'/'+offset+'/'+dataLimit
            }
               console.log(apiUrl) 
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
export   const addCourseVideo=(video,thumbnail,name,description,isDemo,demoLength,courseId,callback,callbackProgress,playlistId=-1)=>
{

    var formData   = new FormData();  
    const newImageUri =  "file:///" + video.uri.split("file:/").join("");
        
            formData.append("file",{ 
                uri : newImageUri,
                type: mime.getType(newImageUri),
                name: video.name
            })
    const newThumbnailUri =  "file:///" + thumbnail.uri.split("file:/").join("");
        
            formData.append("thumb",{ 
                uri : newThumbnailUri,
                type: mime.getType(newThumbnailUri),
                name: thumbnail.name
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
            //  fetch(serverApiUrl+'/institute/course/video/',
            // {
            //     method: 'POST',  
            //     headers,
            //     body:formData
            // })
            // .then((response)=>callback(response)) 
            // .catch((error)=>{console.log(error)})

            const xhr = new XMLHttpRequest();
            xhr.upload.onprogress = (e) => {
                //handle progress here, you can use progressEvent.loaded, progressEvent.total to calculate the progress
                var percentComplete = Math.ceil((e.loaded / e.total) * 100);
                console.log(percentComplete);
                callbackProgress(percentComplete)
            };
           
            xhr.open('POST', serverApiUrl+'/institute/course/video/');
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.responseType = 'json';
            xhr.onload = function() {
                
                callback({status: this.status,headers:{map:{location:xhr.getResponseHeader("location")}}})
              };
            xhr.send(formData);
            
        
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
export const fetch_courses_documents=(offset, dataLimit, courseId=-1,callback,playlistId=-1)=>
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
                apiUrl = serverApiUrl+'institute/course/document/all/'+courseId+'/'+offset+'/'+dataLimit
            }
            else
            {
                apiUrl = serverApiUrl+'/institute/course/document/playlist/'+playlistId+'/'+offset+'/'+dataLimit
            }
              console.log(apiUrl);  
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
export   const addCourseDocument =(document,name,courseId,callback,callbackProgress,playlistId=-1)=>
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
            //  fetch(serverApiUrl+'institute/course/document/',
            // {
            //     method: 'POST',  
            //     headers,
            //     body:formData
            // })
            // .then((response)=>callback(response)) 
            // .catch((error)=>{console.log(error)})

            const xhr = new XMLHttpRequest();
            xhr.upload.onprogress = (e) => {
                //handle progress here, you can use progressEvent.loaded, progressEvent.total to calculate the progress
                var percentComplete = Math.ceil((e.loaded / e.total) * 100);
                console.log(percentComplete);
                callbackProgress(percentComplete)
            };
           
            xhr.open('POST', serverApiUrl+'institute/course/document/');
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.responseType = 'json';
            xhr.onload = function() {
                
                callback({status: this.status,headers:{map:{location:xhr.getResponseHeader("location")}}})
              };
            xhr.send(formData);

       
   
        
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
export const fetch_courses_timetable=(offset, dataLimit,courseId,callback)=>
{

        console.log('fetch_courses_timetable', offset, dataLimit, courseId)
            // var formData   = new FormData(); 
            // formData.append("fetch_banners",'true') 
            // formData.append("offset",offset) 
            // formData.append("data_limit",limit)  
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            let apiUrl = serverApiUrl+'/institute/course/timetable/all/'+courseId+'/'+offset+'/'+dataLimit
             
                
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

export const fetch_testSeries = (offset, dataLimit, courseId,callback,playlistId=-1)=>
{
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            let apiUrl = serverApiUrl+'institute/course/testseries/all/'+courseId+'/'+offset+'/'+dataLimit
             
            if(playlistId == -1)
            {
                apiUrl = serverApiUrl+'institute/course/testseries/all/'+courseId+'/'+offset+'/'+dataLimit
            }else
            {
                apiUrl = serverApiUrl+'institute/course/testseries/playlist/'+playlistId+"/"+offset+"/"+dataLimit
            }
            console.log("api url bbhkbgdbkhdhkbncnncnnnn : ",apiUrl)
             fetch(apiUrl,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

}
// create playlist
export   const addCourseTestSeriesPlaylist=(name,courseId,callback)=>
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
             fetch(serverApiUrl+'/institute/course/testseries/createplaylist',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({name,courseId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})

       
   
        
}
export const fetch_testSeriesPlaylist = (courseId,callback)=>
{

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            let apiUrl = serverApiUrl+'/institute/course/testseries/all/playlists/'+courseId
             
                
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

export const getCourseCount=(insId,callback)=>
{
    console.log("insId",insId)
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/countcourse/"+insId,
        {
            method: 'GET', 
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


