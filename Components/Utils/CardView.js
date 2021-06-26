import React from 'react';

import {Platform,View,StyleSheet} from 'react-native'

import {Card} from 'react-native-shadow-cards';

const CardView =(code,style,elevation=10)=> {

    if(Platform.OS=='web')
    {
        return(
            <View style={[styles.CARD_VIEW,style]} >
                {code}
            </View>
        )
    }
    else
    {
            return(
                <Card style={[style]} elevation={elevation}>
                    {code}
                </Card>
                )
    }

}

const styles = StyleSheet.create({
    CARD_VIEW: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 20,
        zIndex:20
    }
})


export default CardView