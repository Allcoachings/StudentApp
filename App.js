import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import RootReducer from './Components/Reducers'
import Main from './Components/Main'
import * as Font from 'expo-font'; 
const kruti_dev_010regular =require('./assets/fonts/kruti_dev_010regular.ttf')
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {NativeBaseProvider } from "native-base"
import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
  Raleway_100Thin_Italic,
  Raleway_200ExtraLight_Italic,
  Raleway_300Light_Italic,
  Raleway_400Regular_Italic,
  Raleway_500Medium_Italic,
  Raleway_600SemiBold_Italic,
  Raleway_700Bold_Italic,
  Raleway_800ExtraBold_Italic,
  Raleway_900Black_Italic,
} from '@expo-google-fonts/raleway';
import { pinnedInstituteList } from './Components/Utils/DataHelper/Subscription';
import BasicDataFetch from './Components/BasicDataFetch';
let store = createStore(RootReducer) 
  
  const App= ()=> {
    let [fontsLoaded] = useFonts({
      Raleway_100Thin,
      Raleway_200ExtraLight,
      Raleway_300Light,
      Raleway_400Regular,
      Raleway_500Medium,
      Raleway_600SemiBold,
      Raleway_700Bold,
      Raleway_800ExtraBold,
      Raleway_900Black,
      Raleway_100Thin_Italic,
      Raleway_200ExtraLight_Italic,
      Raleway_300Light_Italic,
      Raleway_400Regular_Italic,
      Raleway_500Medium_Italic,
      Raleway_600SemiBold_Italic,
      Raleway_700Bold_Italic,
      Raleway_800ExtraBold_Italic,
      Raleway_900Black_Italic,
      
    });

    useEffect( ()=>{


     (async()=>{   
       let isLoaded = await Font.loadAsync({
            kruti_dev_010regular
          })
          console.log(isLoaded, " kruti")
        })()
    },[])


     
    // if (!fontsLoaded) {
    //   return <AppLoading />;
    // }
    return (
      // <SafeAreaProvider>
      
        <Provider store={store}>
            <BasicDataFetch/>
            <Main/>
            
        </Provider>
       
    );
  }


export default App;