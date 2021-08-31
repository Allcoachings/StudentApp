// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
 
export const saveTestResult=(testSeriesData,callback)=>
{ 
 
    // {accuracy,correctQues,wrongQues,percentile,skippedQues,score,studentId,testSeriesId,timeTaken,userQuestionResponses}
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS');  
    fetch(serverApiUrl+"testSeries/saveresponse",
    {
        method: 'POST',  
        headers,
        body:JSON.stringify(testSeriesData)
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
