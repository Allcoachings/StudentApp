import React,{ useEffect,useRef,useState } from "react";
import { AppState,StyleSheet,Text,Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInSeconds } from "date-fns";
import { theme } from "../config";

const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem("@start_time");
 
      const now = new Date();
      return differenceInSeconds(now, Date.parse(startTime));
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };
 const formatTimer =(seconds)=>
  {
      let duration = seconds;
      let hours = duration/3600;
      duration = duration % (3600);

      let min = parseInt(duration/60);
      duration = duration % (60);

      let sec = parseInt(duration);

      if (sec < 10) {
      sec = `0${sec}`;
      }
      if (min < 10) {
      min = `0${min}`;
      }
      if (parseInt(hours, 10) > 0) {
      return (`${parseInt(hours, 10)}:${min}:${sec}`)
      }
      return (`${min}:${sec}`)
  }
  const recordStartTime = async () => {
    try {
      const now = new Date();
      await AsyncStorage.setItem("@start_time", now.toISOString());
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };
const Timer =(props)=>
{ 
    const appState = useRef(AppState.currentState);
    const [elapsed, setElapsed] = useState(0);
    const [time,setTime] = useState(props.time);
    const [interval, setInterval] = useState(null);
    const timeRef = useRef(props.time); 
    const [isRefreshRequired,setIsRefreshRequired] = useState(false)
    useEffect(() => {
        if(isRefreshRequired)
        {
            setTime(props.time);
            setIsRefreshRequired(false);
            timeRef.current=props.time;
            console.log("props.time",props.time);
        }
        
    },[props.time,isRefreshRequired])
    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange);
        return () => AppState.removeEventListener("change", handleAppStateChange);
    }, []);
    const handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) &&
        nextAppState === "active") {
        // We just became active again: recalculate elapsed time based 
        // on what we stored in AsyncStorage when we started.
        const elapsed = await getElapsedTime();
        // Update the elapsed seconds state
      
        
        setElapsed(elapsed);
    }
    if(appState.current=="active")
    {
        recordStartTime().then(()=>
        {
            
        })
    }
    
    appState.current = nextAppState;
    };

    useEffect(() =>{
        setTime(time-elapsed)
    },[elapsed])
     
    const countdown=()=>
    {
      
        
       let interval =  window.setInterval(()=>{
            
            if(time<=0)
            {
                window.clearInterval(interval);
                //alert lagna hai 
                // const button1 = {
                //     text: "Cancel",
                //     onPress: () => { notificationReceivedEvent.complete(); },
                //     style: "cancel"
                //  };
                const button2 = { text: "Submit Test", onPress: () => { props.timeUpAction({timeOver:true,isModalVisible:true})}};
                Alert.alert("Alert ", "Time Up", [ button2], { cancelable: false });
            }else
            {
                setTime(time-1)
            }

        },1000)
     setInterval(interval)  
    }
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action
          if(props.time-2>timeRef.current)
          {
              props.refresh();
              setIsRefreshRequired(true)
          }
         
          props.removeBackListener() 
            props.backHandlerListener()
        
 
          
           
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [props.navigation]);
     
      useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
          // The screen is focused
          // Call any action
          
          props.removeBackListener() 
          
           console.log("blurred",props)
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [props.navigation]);
     

      

     useEffect(() => {
         countdown();
         timeRef.current=time;
         props.updateTimeInParent(time)
         return window.clearInterval(interval)
     },[time])

    return(
        <Text style={styles.pauseBtnText}> {formatTimer(time)}</Text>
    )
} 
const styles = StyleSheet.create({
    pauseBtnText:
    {
        fontWeight:'bold',
        color: theme.greyColor
    },
});
export default Timer;