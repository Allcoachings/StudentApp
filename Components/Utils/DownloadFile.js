import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverBaseUrl } from '../config';
export const downloadFile=(item,url,userId,savingDocTye,callback) => {
    FileSystem.downloadAsync(
        serverBaseUrl+url,
        FileSystem.cacheDirectory + url.replace('files/','')
      )
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


 export const saveItemsOffline=(item,userId,savingDocTye) => {
   
    let savingItem= {[userId]:{[savingDocTye]:[item]}};
      AsyncStorage.setItem("offline",JSON.stringify(savingItem)).then(()=>{
        console.log("document saved")
      });
 }



 