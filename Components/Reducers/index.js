import * as actionTypes from "../Actions/types";
import { combineReducers } from "redux";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from "react-native";
 
// create your reducers here

/*
    steps to create  a reducer
    1. define a default state  

    ==>    const initial_reducerName_state={}

    2.handle all the action of reducer

    ==> const reducerName = (state = initial_reducerName_state,action)=>
        {
            // will switch through the actions and update default state

            switch(action.type)
            {
                case actionTypes.ACTION_NAME
                    return {
                        ...state,
                        reducerStateElementNameToUpdate:action.payload.PAYLOAD_NAME
                    }
                default :
                
                    return state

            } 
        }
*/

//app reducer
const initialState = {
    stackNavigation:null,
   
}

const app_redux = (state=initialState,action)=>
{
    switch(action.type)
    {
        case actionTypes.SET_NAVIGATION:
            return {
                ...state,
                stackNavigation:action.payload.navigation
            }
        
        default:
            return state
    }
}

//category reducer
const initialCategoriesState = {
    categories:[]
}

const categories_redux = (state=initialCategoriesState,action)=>
{
    switch(action.type)
    {
        case actionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories:action.payload.data
            }

        default:
            return state
    }
}


//user reducer starts
const initial_user_state=
{
    userAuthStatus:false,
    userInfo:{}, 
    pinnedInstitute:{},
    count:0
}

const user_reducer=(state=initial_user_state,action)=>
{

    switch(action.type)
    {
        case actionTypes.USER_AUTH_STATUS:
        return{
                ...state,
                userAuthStatus: action.payload.authStatus
            }
        case actionTypes.SET_USER_INFO:
            AsyncStorage.setItem("authInfo", JSON.stringify({...action.payload.info,authType:"user"}))
            return{
                ...state,
                userInfo: action.payload.info 
            }
        case actionTypes.SET_PINNED_INSTITUTE:
            return{
                ...state,
                pinnedInstitute: action.payload.data 
            }
        case actionTypes.SET_PINNED_INSTITUTE_COUNT:
            return{
                ...state,
                count: action.payload.count 
            }
        default :
            return state
    }
}
//user reducer ends

//screen reducers starts
const initial_screen_state=
{
    screenWidth:0,
    statusBarHidden:false,
    keyboardHeight:null,
    activeBottomTab:'Home'
}
const screen_reducer=(state=initial_screen_state,action)=>
{
    switch(action.type)
    {
        case actionTypes.SCREEN_WIDTH_CONFIG_CHANGE:
            return {
                ...state,
                screenWidth: action.payload.screenWidth
            }
        case actionTypes.SET_STATUS_BAR_HIDDEN:
            return {
                ...state,
                statusBarHidden: action.payload
            }
        case actionTypes.SET_KEYBOARD_HEIGHT:
            return {
                ...state,
                keyboardHeight: action.payload
            }
        case actionTypes.SET_ACTIVE_BOTTOM_TAB:
            return {
                ...state,
                activeBottomTab: action.payload
            }
        default:
            return state
    }
}


const initial_institute_state = {
    authStatus:false,
    details:
    {
     
    }
}


const institute_reducer =(state=initial_institute_state,action)=>
{

    switch(action.type)
    {
        case actionTypes.SET_INSTITUTE_DETAILS:
            return {
                ...state,
                details:action.payload.details,
            }
        case actionTypes.SET_INSTITUTE_AUTH:
            return {
                ...state,
                authStatus: action.payload.status,
            }
          
        default:
            return state
    }
}

const initial_test_series_state = {
   data:{}
}
const testSeries_reducer=(state=initial_test_series_state,action) => 
{
    switch(action.type)
    {
        case actionTypes.SET_TEST_RESULT_DATA:
            return{
                ...state, 
                data:action.payload.data
            }
        default:
            return state
        
    }
}

const initial_downloadItem_state = 
{
    items:[

    ],
    progress:0
}
const downloadReducer=(state=initial_downloadItem_state,action) =>
{
    switch(action.type)
    {
        case actionTypes.SET_DOWNLOADING_ITEM:
            return{
                ...state, 
                items:[...state.items,{...action.payload.item,progress:action.payload.progress}]
            }
        case actionTypes.SET_DOWNLOADING_PROGRESS:
            
            var index = state.items.findIndex( item => {
                
                return item.url == action.payload.key 
            })
            let items  = [...state.items];
            if(items[index])
            {
                items[index].progress = action.payload.progress;
            }
           
            return{
                ...state,
                items
             }
        case actionTypes.REMOVE_DOWNLOADING_ITEM:
            var index = state.items.findIndex( item => {
                
                return item.url == action.payload.key 
            })
            let itemsArr  = [...state.items];
            
            // console.log(itemsArr.splice(index,1)," ",index," ",action.payload.key)
             return{
                 ...state,
                 items:itemsArr
             }
            
        default:
            return state
        
    }
}

const initial_header_state=
{
    props:{},
    isHeaderVisible:true,
    showCategoriesInHeader:false,
    headerOffset:new Animated.Value(0)
}
const headerReducer = (state = initial_header_state, action) =>{


    switch(action.type)
    {
        case actionTypes.SET_HEADER_PROPS:
            return{
                ...state, 
                props:action.payload.props
            }
       
        case actionTypes.TOGGLE_HEADER:
            return {
                ...state,
                isHeaderVisible:action.payload.status
            }
        case actionTypes.SHOW_CATEGORIES_IN_HEADER:
            return {
                ...state,
                showCategoriesInHeader:action.payload.status
            }
        case actionTypes.SET_HEADER_OFFSET:
            return {
                ...state,
                headerOffset: action.payload.offset
            }
        default:
            return state
        
    }
}       
    
const rootReducer = combineReducers({
        user:user_reducer,
        screen:screen_reducer,
        institute:institute_reducer,
        testSeries:testSeries_reducer,
        layout:app_redux,
        categories:categories_redux,
        download:downloadReducer,
        header:headerReducer
})


export default rootReducer