// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
import mime from "mime";

export const fetch_institute_reviews=(insId,offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/reviews/'+offset+'/'+dataLimit+'/id/'+insId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({insId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const reply=(id,reply,callback)=>
{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/reviews/',
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({id,reply})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const addStudentReview=(studentId,courseId,review,rating,callback)=>
{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/reviews/add/',
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({courseId,review,studentId,rating})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
