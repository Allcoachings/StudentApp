// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
 
export const fetch_testSeries_questions=(seriesId,offset,dataLimit,callback)=>
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

             fetch(serverApiUrl+"institute/course/testseries/questions/"+seriesId+"/"+offset+"/"+dataLimit,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}


    export const fetch_testSeries_category=(offset,dataLimit,callback)=>
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

             fetch(serverApiUrl+"admintestseries/testseriesdata/"+offset+"/"+dataLimit,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }
    export const fetch_testSeries_subcategoryByCategory=(catId,offset,dataLimit,callback)=>
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

                fetch(serverApiUrl+"admintestseries/testSubCategoryByCategoryId/"+catId+"/"+offset+"/"+dataLimit,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
        }

    export const fetchTestSeriesBySubCategory=(subId,offset,dataLimit,callback)=>
    {
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"admintestseries/subcategory/content/bysubcategory/"+offset+"/"+dataLimit+"/"+subId,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

    export const seriesList=(subId,offset,dataLimit,callback)=>
    {
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"admintestseries/subcategory/content/testseries/"+offset+"/"+dataLimit+"/"+subId,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }
    
    export const seriesListForUser=(userId,subId,offset,dataLimit,callback)=>
    {
            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json');  
            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true'); 
            headers.append('GET', 'POST', 'OPTIONS'); 

            fetch(serverApiUrl+"admintestseries/subcategory/content/testseries/forUser/"+userId+"/"+offset+"/"+dataLimit+"/"+subId,
            {
                method: 'GET', 
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }
