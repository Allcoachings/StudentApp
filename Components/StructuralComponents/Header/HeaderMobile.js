import React from 'react';
import { Text, View ,StyleSheet, Image,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { theme ,appLogo} from '../../config';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class HeaderMobile extends React.Component {
    state = {  }
    render() {
        console.log(this.props.replaceHeader)
        return (
            // <KeyboardAwareScrollView>
            <View style={styles.container}>
            {this.props.replaceHeader?(
                this.props.headerComponent
            ):(
                <>
                    <TouchableOpacity style={{margin:"1%"}} onPress={this.props.btnHandler}>
                        <Feather name={this.props.iconName} size={25} color={theme.secondaryColor}/>
                    </TouchableOpacity>
                    <View style={styles.headerSearch}>
                            <TextInput 
                                placeholder="Search Institute"
                                style={styles.searchInput}
                                onChangeText={(value)=>this.setState({search:value})}
                            />
                            <Feather name="search" size={20} color={theme.secondaryColor} style={styles.searchIcon}/>
                    </View>
                    <View style={{flex:0.2}}>
                        <Image
                            source={appLogo}
                            style={styles.headerLogo}
                        />  
                    </View>
                </>
                
            )}
            </View>
            // </KeyboardAwareScrollView>
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:theme.primaryColor,
        // justifyContent: 'center',
        alignItems: 'center'
    },
        headerSearch:
        {
            flex:0.9,
            margin:10, 
            height:30,
            borderColor:theme.secondaryColor,
            borderWidth:1,
            borderRadius:10,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems: 'center'
        },
            searchInput:
            {
                paddingLeft:10,
                flex:1, 
                color:theme.secondaryColor
            },
                searchIcon:
                {
                    margin:15
                },
            headerLogo:
            {
                width:35,
                height:35
            },
})
export default HeaderMobile;