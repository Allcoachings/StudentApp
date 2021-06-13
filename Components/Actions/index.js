import * as actionTypes from "./types"; 


//create all the actions of all the reducers here group 
//all the functions reducer wise and please use comments for every group and every action 

/*
    steps to create a new action

    export const actionName=(actionParameters)=>
    {
        return{
            type: actionTypes.SET_USER_LOADING_STATUS, //this type will be used to match the type in reducer
            payload:{ 
                actionParameters //as an object use key value pair k:v 
            }
        }
    }

*/

//user reducer actions starts
export const userAuthStatus=(status)=>{
    return{
        type: actionTypes.USER_AUTH_STATUS, //this type will be used to match
        payload:{
            authStatus: status
        }
    }
}
//user reducer actions ends

//screen reducer actions starts
export const screenWidthConfigChange=(width)=>
{
    return{
        type: actionTypes.SCREEN_WIDTH_CONFIG_CHANGE, //this type will be used to match
        payload:{
            screenWidth:width
        }
    }
}

//screen reducer actions ends
