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

export const saveTestResultIntermediate=(testSeriesData,callback)=>
{ 
 
    // {accuracy,correctQues,wrongQues,percentile,skippedQues,score,studentId,testSeriesId,timeTaken,userQuestionResponses}
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS');  
    fetch(serverApiUrl+"testSeries/saveresponse-intermediate",
    {
        method: 'POST',  
        headers,
        body:JSON.stringify(testSeriesData)
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
    
}
export const getResponseByTestSeriesIdAndUserId=(testSeriesId, userId,callback)=>
{ 
 
    // {accuracy,correctQues,wrongQues,percentile,skippedQues,score,studentId,testSeriesId,timeTaken,userQuestionResponses}
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS');  
    fetch(serverApiUrl+"testSeries/get-user-response/"+testSeriesId+"/"+userId,
    {
        method: 'GET',  
        headers, 
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


    export const getTestSeriesStudentResponse = (id, offset, datalimit, callback) => {
        // console.log("getTestSeriesStudentResponse",id)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
    
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');
    
        headers.append('GET', 'POST', 'OPTIONS');
        let apiUrl = serverApiUrl + '/testSeries/get-testseries-student-response/' + id + "/" + offset + "/" + datalimit;
        fetch(apiUrl,
            {
                method: 'GET',
                headers,
            })
            .then((response) => callback(response))
            .catch((error) => {  console.log(error) })
    }