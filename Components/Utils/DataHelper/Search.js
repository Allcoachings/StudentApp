import {serverApiUrl} from '../../config'
    

    export const SearchInstitute=(searchword,offset,dataLimit,callback)=>
    {

        console.log(searchword,offset,dataLimit)
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"search/ins/"+searchword+"/"+offset+"/"+dataLimit,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }


    export const SearchTestSeries=(searchword,offset,dataLimit,callback)=>
    {
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"search/testSeries/"+searchword+"/"+offset+"/"+dataLimit,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

    export const SearchInstituteByCategory=(searchword,category,offset,dataLimit,callback)=>
    {
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"search/ins/"+searchword+"/"+offset+"/"+dataLimit,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }