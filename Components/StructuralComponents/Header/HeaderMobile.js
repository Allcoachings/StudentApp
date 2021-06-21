import React from 'react';
import { Text, View ,StyleSheet, Image,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { theme ,appLogo} from '../../config';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class HeaderMobile extends React.Component {
    state = {   
        search:false
    }
    render() { 
        return (
            // <KeyboardAwareScrollView>
            <View style={styles.container}>
            {this.props.replaceHeader?(
                this.props.headerComponent
            ):(
                <>
                    <TouchableOpacity style={{margin:"1%",marginRight:'auto'}} onPress={this.props.btnHandler}>
                        <Feather name={this.props.iconName} size={25} color={theme.secondaryColor}/>
                    </TouchableOpacity>
                    
                    
                    {this.state.search?(
                        <View style={styles.headerSearch}>
                            <TextInput 
                                placeholder="Search Institute"
                                style={styles.searchInput}
                                onChangeText={(value)=>this.setState({search:value})}
                            />
                            <TouchableOpacity  onPress={()=>this.setState({search:false})}>
                                <Feather name="x" size={20} color={theme.secondaryColor} style={styles.searchIcon}/>
                            </TouchableOpacity>
                    </View> 
                    ):(
                        <>
                            <View style={{flex:0.2,alignSelf: 'center',}}>
                                <Image
                                    source={appLogo}
                                    style={styles.headerLogo}
                                />  
                            </View>
                            <TouchableOpacity  style={{marginLeft:'auto'}} onPress={()=>this.setState({search:true})}>
                                <Feather name="search" size={20} color={theme.secondaryColor} style={styles.searchIcon}/>
                            </TouchableOpacity>
                        </>
                    )}
                    <TouchableOpacity   onPress={()=>this.setState({search:true})}>
                                <Feather name="bell" size={20} color={theme.secondaryColor} style={styles.notiIcon}/>
                    </TouchableOpacity>
                     
                   
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
        // justifyContent: 'space-between',
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
            alignItems: 'center',
            marginLeft:'auto'
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
            notiIcon:
            {
                margin:5
            },
            headerLogo:
            {
                width:35,
                height:35
            },
})
export default HeaderMobile;