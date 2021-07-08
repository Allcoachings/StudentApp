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


//user reducer starts
const initial_user_state=
{
    userAuthStatus:true
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
        default :
            return state
    }
}
//user reducer ends

//screen reducers starts
const initial_screen_state=
{
    screenWidth:0
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
        default:
            return state
    }
}


const initial_institute_state = {
    details:
    {
    
    "about": "Jj",
    "address": undefined,
    "category": undefined,
    "city": "Jj",
    "directorName": "Test",
    "email": "Test",
    "id": "2",
    "logo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540cyberflow%252Fallcoaching/DocumentPicker/4d36e69f-b79e-45ba-9e4e-ea704dec2a70.jpg",
    "name": "Test",
    "password": "",
    "phone": "Test",
    "state": "Jj",
    "status": 1,
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
        default:
            return state
    }
}

const rootReducer = combineReducers({
        user:user_reducer,
        screen:screen_reducer,
        institute:institute_reducer
})


export default rootReducer