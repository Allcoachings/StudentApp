import {serverApiUrl} from '../../config'



export   const reportQuestion=(text,description,questionId,testSeriesId,callback)=>
{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+'/question/reportQuestion',
    {
        method: 'POST',
        headers,
        body:JSON.stringify({text,description,question:{id:questionId},testseries:{id:testSeriesId}})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
        
} 