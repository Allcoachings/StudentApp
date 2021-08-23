import React, { useState, useEffect} from 'react';
import { Text, View ,TouchableOpacity,Image} from 'react-native';
import {screenMobileWidth, theme, appLogo} from '../config'

const CatView = (props) => {


        const [isSelected,setSelected] =  useState(false);
        const [selectedCat,setSelectedCat] =  useState({key:-1});

        useEffect(() =>{
            if(props.selectedCat&&props.selectedCat.key != selectedCat.key)
            {
                setSelected(false)
            }
        })
        const onPressHandler = (item)=>
        {
            console.log('Press')
            setSelected(!isSelected);
            setSelectedCat(item);
            props.setSelected(item)
        }
    return (
        <TouchableOpacity style={{backgroundColor:isSelected ? theme.accentColor:theme.primaryColor, flexDirection: 'row', borderWidth: 0.5, borderColor: 'black', borderRadius:20, justifyContent: 'center', alignItems: 'center'}} onPress={()=>onPressHandler(props.item)}>
            <Image
                source={appLogo}
                style={{height: 20, width: 20, marginRight: 5}}
            />
            <Text style={{fontFamily:'Raleway_400Regular', fontSize: 18}}>{props.item.label}</Text>
        </TouchableOpacity>
    )
};

export default CatView;
