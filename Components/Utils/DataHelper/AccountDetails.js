import {serverApiUrl} from '../../config'

export const fetchAccountDetails=(insId, callback)=>
{
        console.log(insId)
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/ins/'+insId+'/account',
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const updateAccountDetails=(accountHolderName, accountNumber, bankName, ifsc, insId, callback)=>
{
        console.log(insId)
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/ins/account',
        {
            method: 'PUT',  
            headers,
            body:JSON.stringify({accountHolderName, accountNumber, bankName, ifsc, insId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}
