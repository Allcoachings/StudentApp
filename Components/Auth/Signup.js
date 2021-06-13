import React from 'react';
import { Text,StyleSheet,View,TouchableOpacity } from 'react-native';
import Fields from './Fields';
class Signup extends React.Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>  
            <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>Welcome Back! </Text>
            </View>
            <View>
                <Fields mode="signup" checkLabel="By pressing 'Signup' you agree to out Terms & Conditions" btnLabel="Sign Up"/>
            </View>
            
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column'
    },
        welcomeTextContainer:
        {
            flex:1,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        welcomeText:
        {
            fontSize:16,
            fontWeight: 'bold',
            marginTop:10,
            marginBottom:10
        },
        
})
 
export default Signup;