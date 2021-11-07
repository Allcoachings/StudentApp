import * as actionTypes from "../Actions/types";
import { combineReducers } from "redux";

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
    stackNavigation:{}
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
    "id": "1",
    "name": "DU BUDDY",
    "email": "dubuddy@gmail.com",
    "mobile_number": "7302248204",
    "user_pic": "{ uri: 'https://picsum.photos/200' }"
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
            return{
                ...state,
                userInfo: action.payload.info

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
            
            console.log(itemsArr.splice(index,1)," ",index," ",action.payload.key)
             return{
                 ...state,
                 items:itemsArr
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
})


export default rootReducer