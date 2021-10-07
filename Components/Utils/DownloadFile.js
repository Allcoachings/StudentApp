import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverBaseUrl } from '../config';
import { Toast } from 'native-base';
export  const downloadFile= async (item,url,userId,savingDocTye,callback,downloadProgressCallbackfun) => {

  const isSaved =   await checkSavedOffline(item,userId,savingDocTye) 
  if(!isSaved) 
  {
    const downloadResumable = FileSystem.createDownloadResumable(
      serverBaseUrl+url,
      FileSystem.cacheDirectory + url.replace('files/',''),
      {},
      (progress)=>downloadProgressCallback(progress,downloadProgressCallbackfun)
    );
 
    downloadResumable.downloadAsync()
      .then(({ uri }) => {
          let offlineItem = {...item,fileAddress:uri}
          saveOffline(offlineItem,userId,savingDocTye)
          callback({status:'success',item:offlineItem})
          console.log('Finished downloading to ', uri);
      })
      .catch(error => {
          callback({status:'error',error})
          console.error(error);
      });
  }else
  {
    callback({status:'already'});
    // console.log('File Already Saved')
  }
    
 }
 const downloadProgressCallback = (downloadProgress ,callback)=> {
  const progress =
    downloadProgress.totalBytesWritten /
    downloadProgress.totalBytesExpectedToWrite;
    console.log(progress);
    callback(progress*100);
   
}
 export const saveOffline=(item,userId,savingDocTye)=>
 {
     AsyncStorage.getItem("offline").then((result)=>
     {
      
        let savingItem;
       
         if(result)
         {

                savingItem = JSON.parse(result)       
                console.log('Saving',savingItem);  
                 
                savingItem[userId][savingDocTye].push(item);

                
         }else
         {
            savingItem= {[userId]:{[savingDocTye]:[item]}};
            
         }
    
         AsyncStorage.setItem("offline",JSON.stringify(savingItem)).then(()=>{
             console.log("document saved")
         });
     })
     
 }
 
 export   const  checkSavedOffline= async (item,userId,savingDocTye)=>
 {
        const result =  await AsyncStorage.getItem("offline") 
 
        let savingItem; 
         if(result)
         { 
                savingItem = JSON.parse(result)        
                 
                
                let filtered = savingItem[userId][savingDocTye].filter(savedItem=>savedItem.id==item.id) 
                if(filtered.length > 0)
                {
                  return true
                }else
                {
                  return false;
                }    
         }else
         {
            return false;
            
         } 
    
     
 }


 export const saveItemsOffline=(item,userId,savingDocTye) => {
   
    let savingItem= {[userId]:{[savingDocTye]:item}};
      AsyncStorage.setItem("offline",JSON.stringify(savingItem)).then(()=>{
        console.log("document saved")
      });
 }



 