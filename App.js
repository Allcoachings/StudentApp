import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import RootReducer from './Components/Reducers'
import Main from './Components/Main'
// import * as Font from 'expo-font';
import { AppLoading } from 'expo';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
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
    // if (!fontsLoaded) {
    //   return <AppLoading />;
    // }
    return (
      // <SafeAreaProvider>
        <Provider store={store}>
            <Main/>
        </Provider>
      // </SafeAreaProvider>
    );
  }


export default App;