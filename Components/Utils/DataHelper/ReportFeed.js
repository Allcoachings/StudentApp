import {serverApiUrl} from '../../config'



export   const reportFeed=(text,description,feedId,callback)=>
{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+'/feedReport/report',
    {
        method: 'POST',
        headers,
        body:JSON.stringify({text,description,feed:{id:feedId}})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
        
} 