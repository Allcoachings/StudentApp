import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet,Text, View ,TouchableOpacity} from 'react-native';
import { theme } from '../config';
import CardView from '../Utils/CardView'
class SocialAuth extends React.Component {
    state = {  }


    renderSocialAuthBtn=(icon,handler)=>
    {
        return(
            CardView(
                <TouchableOpacity style={styles.authBtn} onPress={handler}>
                    <Feather name={icon} size={20} />
                </TouchableOpacity>,
                [styles.authCard]
            )
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>or Signin with</Text>
                <View style={styles.social_authBtnContainer}>
                    {this.renderSocialAuthBtn('facebook',()=>{})}
                    {this.renderSocialAuthBtn('facebook',()=>{})}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center', 
    },
    label:
    {
        flex:1,
        alignSelf: 'center',
        color:theme.labelOrInactiveColor,
        fontWeight: 'bold',
        margin:15
    },
    social_authBtnContainer:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
        authCard:
        {
            borderRadius:25, 
            width:50,
            height:50,
            padding:10,
            backgroundColor:theme.primaryColor,
            borderColor:theme.primaryColor,
            justifyContent: 'center',
            alignItems: 'center'
        },
})
export default SocialAuth;