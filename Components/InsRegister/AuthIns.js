import React, { useState } from 'react';
import { View } from 'react-native';
import InsRegister from './InsRegister';
import LoginIns from './LoginIns';





const switchAuthMode=()=>
{

}
const AuthIns = (props) =>{

    const [mode,setMode] = useState(1);


    switch(mode)
    {
        case 1:
            return(
                <View>
                   <LoginIns changeAuthMode={setMode} changeMode={props.route.params.changeMode}/>
                </View>
                )
        case 2:
            return(
                <InsRegister changeAuthMode={setMode} />
            )
    }
   
}

export default AuthIns;
