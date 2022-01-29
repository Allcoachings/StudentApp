import {serverApiUrl} from '../../config'
    
export   const saveMessage =(messageObj,callback,image=null)=>
{
    messageObj['images']=image;
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');  
    fetch(serverApiUrl+'studentMessage/add',
    {
        method: 'POST',  
        headers,
        body:JSON.stringify(messageObj)
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})       
}

export const addMessageImage=(messageObj,image,callback)=>
{

    let uploadedImageCounter=0,counter=0;
    let uploadedImageArray=[];
    image.map(item=>{
        uploadImage(item,(response)=>{
            counter++;
            if(response.status==201)
            {
                    uploadedImageCounter++;
                    uploadedImageArray.push({imageLink:response.headers.map.location}) 
            }
            if(counter>=image.length)
            {
                saveMessage(messageObj,callback,uploadedImageArray);
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

export const uploadImage=(image,callback)=>
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

 