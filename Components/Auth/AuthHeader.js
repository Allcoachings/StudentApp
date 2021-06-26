import React from 'react';
import { StyleSheet,View,Text,Image} from 'react-native';
import {appName,appLogo,logoName} from '../config'
import CardView from '../Utils/CardView'
class AuthHeader extends React.Component {
    state = {  }
    render() {
    
        return (
            <View style={styles.container}>
            {CardView
            (
                <View style={styles.headerBranding}>
                    <Image source={logoName} style={styles.brandingImage} />
                </View>
            ,{borderRadius:40,width:220,height:60})}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
        marginTop:"5%"
    },
        headerBranding:
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
            brandingImage: 
            {
                width:200,
                height:70
            },
            brandingText:
            {
                fontSize:20,
                fontWeight: '600'
            }
})
export default AuthHeader;