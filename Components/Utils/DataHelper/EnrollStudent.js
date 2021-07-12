import {serverApiUrl} from '../../config'

export   const enrollStudent=(studentId,courseId,insId,callback)=>
{

    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'institute/course/reviews/',
    {
        method: 'POST',  
        headers,
        body:JSON.stringify({studentId, courseId, insId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})     
} 


export   const checkUserEnrollment=(courseId,studentId,callback)=>
{

    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+'institute/course/reviews/'+courseId+'/'+studentId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({studentId, courseId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})     
} 