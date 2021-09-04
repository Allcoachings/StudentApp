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
export const setUserInfo=(info)=>{
    console.log(info)
    return{
        type: actionTypes.SET_USER_INFO, //this type will be used to match the type
        payload:{
           info
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

export const setStatusBarHidden =(status)=>
{
    return{
        type:actionTypes.SET_STATUS_BAR_HIDDEN, //this type will be used to match
        payload:status

    }

}

export const setKeyboardHeight =(height)=>
{
    return{
        type:actionTypes.SET_KEYBOARD_HEIGHT, //this type will be used to match
        payload:height

    }
}

export const setActiveBottomTab =(tabIndex) => 
{
    return{
        type:actionTypes.SET_ACTIVE_BOTTOM_TAB, //this type will be used to match
        payload:tabIndex

    }
}
//screen reducer actions ends

//institute reducer

export const setInstituteDetails=(obj)=>
{
    return{
        type:actionTypes.SET_INSTITUTE_DETAILS, //this type will be used to match
        payload:{
            details:obj
        }       
    }
}

export const setInstituteAuth=(status)=>
{
    return{
        type:actionTypes.SET_INSTITUTE_AUTH,
        payload:{
            status
        }

    }
}

//institute reducer actions ends


//test series reducer actions starts

export const setTestResultData=(data)=>
{
    return{
        type:actionTypes.SET_TEST_RESULT_DATA,
        payload:{
            data
        }
    }
}

//test series reducer actions ends


//stacknavigation reducer actions starts

export const setNavigation = (navigation)=>
{
    return{
        type: actionTypes.SET_NAVIGATION,
        payload:{
            navigation : navigation
        }
    }
}

//stacknavigation reducer actions ends


