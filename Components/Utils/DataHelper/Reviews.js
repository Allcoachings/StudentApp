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

export const reply=(id, reply, rating,review,courseId, studentId, insId,callback)=>
{
    console.log(id, reply, rating, review, courseId, studentId, insId)
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/reviews/',
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({id, reply})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const addStudentReview=(studentId,courseId,review,rating,callback)=>
{
    console.log('addStudentReview',courseId,review,studentId,rating)
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


export const findReviewByStudentId=(studentId,insId,callback)=>
{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/reviews/'+insId+'/'+studentId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({studentId,insId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateReview=(id, review, rating, callback)=>
{
    console.log(id, review, rating)
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/reviews/updateReview/',
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({id, review, rating})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
