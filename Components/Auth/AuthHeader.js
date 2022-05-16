import React from 'react';
import { StyleSheet,View,Text,Image,Dimensions} from 'react-native';
import {appName,appLogo,appLogoName} from '../config'
import CardView from '../Utils/CardView'
const width = Dimensions.get('window').width
class AuthHeader extends React.Component {
    state = {  }
    render() {
    
        return (
            <View style={styles.container}>
            {/* {CardView
            ( */}
                <View style={styles.headerBranding}>
                    <Image source={appLogoName} style={styles.brandingImage} />
                </View>
            {/* ,{borderRadius:40,width:220,height:60}
            )} */}
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
        margin:20, 
        backgroundColor:'#fff',
    },
        headerBranding:
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center' ,
            alignSelf: 'center',
            width:'100%',
            marginLeft:'auto',
            backgroundColor:'#fff'
        },
            brandingImage: 
            {
               
                width:200,
                backgroundColor:'#fff',
                height:40,
                marginTop:10,
                resizeMode:'contain'

            },
            brandingText:
            {
                fontSize:20,
                backgroundColor:'#fff',
                fontWeight: '600'
            }
})
export default AuthHeader;