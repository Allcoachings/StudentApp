import React, { useState, useEffect} from 'react';
import { Text, View ,TouchableOpacity,StyleSheet,Image} from 'react-native';
import {screenMobileWidth, theme, appLogo} from '../config'

const CatView = (props) => {


        const [isSelected,setSelected] =  useState(false);
        const [selectedCat,setSelectedCat] =  useState({id:-1});

        useEffect(() =>{
            if(props.selectedCat&&props.selectedCat.id != selectedCat.id)
            {
                setSelected(false)
            }
        })
        const onPressHandler = (item)=>
        {
            // console.log('Press')
            setSelected(!isSelected);
            setSelectedCat(item);
            props.setSelected(item)
        }
    return (
        <TouchableOpacity style={[styles.container,{ backgroundColor:isSelected ? theme.accentColor:theme.primaryColor,}]} onPress={()=>onPressHandler(props.item)}>
            <Text style={[styles.text]}>{props.item.name}</Text>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    container:{
        margin:10, 
        padding:5,
        flexDirection: 'row', 
        borderWidth: 0.5, 
        borderColor: theme.labelOrInactiveColor, 
        borderRadius:20,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text:{
        fontFamily:'Raleway_600SemiBold', 
        fontSize: 18
    },

})
export default CatView;
