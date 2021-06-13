import React from 'react';
import { StyleSheet,View,Text,Image} from 'react-native';
import {appName,appLogo} from '../config'
class AuthHeader extends React.Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBranding}>
                    <Image source={appLogo} style={styles.brandingImage} />
                    <Text style={styles.brandingText}>
                        {appName}
                    </Text>
                </View>
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
                width:50,
                height:50
            },
            brandingText:
            {
                fontSize:20,
                fontWeight: '600'
            }
})
export default AuthHeader;