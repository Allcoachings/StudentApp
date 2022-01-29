// import { saveToAsyncStorage,retrivingFromStorage } from '../localDbTools';
import {serverApiUrl} from '../../config'
// import {Base64} from '../../Base64' 
import mime from "mime";

            export   const saveFeed =(feed,callback,image=null)=>
            {
                feed['feedImages']=image;
                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json');  
                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS');  
                    fetch(serverApiUrl+'feed/add',
                {
                    method: 'POST',  
                    headers,
                    body:JSON.stringify(feed)
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})       
            }

            export const addImgeFeed=(feed,image,callback)=>
            {

                let uploadedImageCounter=0,counter=0;
                uploadedImageArray=[];
                image.map(item=>{
                    uploadFeedImage(item,(response)=>{
                        counter++;
                        if(response.status==201)
                        {
                                uploadedImageCounter++;
                                uploadedImageArray.push(response.headers.map.location) 
                        }
                        if(counter>=image.length)
                        {
                            saveFeed(feed,callback,uploadedImageArray);
                        }

                         
                    })
                })
                

                    // if(response.status==201)
                    // {
                        
                    // }else
                    // {
                    //         callback(response);
                    // }
                 
            }

            export const uploadFeedImage=(image,callback)=>
            {
                // console.log("Upload",typeof image)
                if(typeof image == 'object'&&image.feedImage&&image.feedImage.startsWith("files/"))
                {
                    callback({status:201,headers:{map:{location:image}}})
                    return;
                }
                // const newImageUri =  "file:///" + image.uri.split("file:/").join("");
                var formData   = new FormData();  
                // formData.append("image",{ 
                //     uri : newImageUri,
                //     type: mime.getType(newImageUri),
                //     name: image.name
                // }) 
                let filename = image.uri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                formData.append("image",{ 
                    uri : image.uri,
                    type: type,
                    name: filename,
                })
                
                
                let headers = new Headers(); 
                headers.append('Content-Type', 'multipart/form-data');  
                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS');  
                fetch(serverApiUrl+'feed/uploadimage',
                {
                    method: 'POST',  
                    headers,
                    body:formData
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)}) 
            }


            export const fetch_institute_feed=(instId,offset,dataLimit,callback)=>
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

                fetch(serverApiUrl+'feed/ins/'+instId+"/"+offset+"/"+dataLimit,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }           


            export const fetch_feed_all=(offset,dataLimit,callback)=>
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

                fetch(serverApiUrl+"feed/all/"+offset+"/"+dataLimit,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }

            export const fetch_feed_by_category=(cat,offset,dataLimit,callback)=>
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
    
                fetch(serverApiUrl+"feed/bycat/"+offset+"/"+dataLimit+"/"+cat,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }

           
            export const like_feed=(feedId,likerType,likerId,callback)=>
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
                // console.log(feedId,serverApiUrl+"feed/like/feed/"+feedId+"/"+likerType+"/"+likerId)
                fetch(serverApiUrl+"feed/like/feed/"+feedId+"/"+likerType+"/"+likerId,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }
            export const unLike_feed=(feedId,likerType,likerId,callback)=>
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
    
                fetch(serverApiUrl+'feed/unlike/feed/'+feedId+'/'+likerType+'/'+'/'+likerId,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }


            export const votePoll=(feedId,optionId,voterType,voterId,callback)=>
            {
                // var formData   = new FormData(); 
                // formData.append("fetch_banners",'true') 
                // formData.append("offset",offset) 
                // formData.append("data_limit",limit) 
                // // console.log(serverApiUrl+"vote/feed/"+feedId+"/"+optionId+"/"+voterType+"/"+voterId) 
                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
    
                fetch(serverApiUrl+"feed/vote/feed/"+feedId+"/"+optionId+"/"+voterType+"/"+voterId,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response, optionId)) 
                .catch((error)=>{console.log(error)})
            }

            export const fetch_student_feed=(studentId,offset,dataLimit,callback)=>
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
    
                fetch(serverApiUrl+"feed/student/"+studentId+"/"+offset+"/"+dataLimit,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }
            

            export const fetch_comments=(feedId,offset,dataLimit,callback)=>
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
    
                fetch(serverApiUrl+'feed/feed/comment/'+feedId+'/'+offset+'/'+dataLimit,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }


            export const singleFeed=(id,callback)=>
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
    
                fetch(serverApiUrl+'feed/byid/'+id,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }


            export const add_comment=(comment, commenter, feedId, insId, studentId, callback)=>
            {
                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
    
                fetch(serverApiUrl+'feed/feed/comment',
                {
                    method: 'POST',  
                    headers,
                    body:JSON.stringify({comment, commenter, feedId, insId, studentId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
            }
