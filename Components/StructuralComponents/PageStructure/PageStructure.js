import React, { useEffect, useRef } from 'react';
import { Text, View,StyleSheet,ScrollView } from 'react-native';
import Header from '../Header'
import {theme} from '../../config'
import {connect, useDispatch, useSelector} from 'react-redux'
import {screenMobileWidth} from '../../config'
import BottomTab from '../../BottomTab'
import CardView from '../../Utils/CardView'
import { StatusBar } from 'expo-status-bar';
import { SET_HEADER_PROPS, TOGGLE_HEADER } from '../../Actions/types';
const PageStructure =(props)=> {
   
    // const navigation = useSelector(state=>state.layout.stackNavigation)
    const dispatch = useDispatch()
    const focusedRef = useRef(false)
    // handleScroll=(event)=> {
    //     // console.log(event.nativeEvent.contentOffset.y);
    //     // if(event.nativeEvent.contentOffset.y>40)
    //     // {
    //     //     this.setState({catStyle:{position: 'absolute',top:0}})
    //     // }    
    // }  

    
    useEffect(() => { 
            dispatch({type: SET_HEADER_PROPS,payload:{props}})
            // console.log("props updated successfully")
        
    },[props])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => { 
          focusedRef.current=true 
           dispatch({type: SET_HEADER_PROPS,payload:{props}}) 
           dispatch({type: TOGGLE_HEADER,payload:{status:true}})

        });
        
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [props.navigation]);
 

     

    const switchRender=(scrollMode)=>{ 
            switch(scrollMode)
            {
                case 'scroll':    
                    return(
                        <ScrollView>
                            <View style={[styles.containerHeader,props.headerStyle,{flex:props.catInHeader?0.1:0}]}> 
                            
                                <Header 
                                    iconName={props.iconName}
                                    btnHandler={props.btnHandler}
                                    catInHeader={props.catInHeader}
                                    replaceHeader={props.replaceHeader}
                                    headerComponent={props.headerComponent}
                                    searchFun={props.searchFun}
                                    singleItem={props.singleItem}
                                    titleonheader={props.titleonheader}
                                    notificationreplaceshare={props.notificationreplaceshare}
                                    rightIconOnPress={props.rightIconOnPress}
                                     
                                    nosearchIcon={props.nosearchIcon}
                                    noNotificationIcon={props.noNotificationIcon}
                                    catOnpress={props.catOnpress}
                                    catType={props.catType}
                                    selectedCat={props.selectedCat}
                                    titleWithImage={props.titleWithImage}
                                    userIcon={props.userIcon} 
                                    pinUnpinIcon={props.pinUnpinIcon}
                                    pinIconName={props.pinIconName}
                                    searchReplace={props.searchReplace}
                                    showShareIcon={props.showShareIcon}
                                    pinUnpinFunction={props.pinUnpinFunction}
                                    showTitle={props.showTitle}
                                />  
                            </View>
                            <View style={[styles.pageLayout,{marginTop:props.catInHeader?0:15}]}>  
                                <View style={styles.pageContent}>
                                    {props.children}
                                </View>
                            </View>
                        </ScrollView>
                    )
                default: 
                        return (
                            
                            <>
                            <View style={{flex:props.catInHeader?0.1:0,marginTop:-10,zIndex:100}}>
                                <View style={[styles.containerHeader,props.headerStyle]} > 
                                        <Header 
                                            iconName={props.iconName}
                                            searchFun={props.searchFun}
                                            singleItem={props.singleItem}
                                            btnHandler={props.btnHandler}
                                            catInHeader={props.catInHeader}
                                            replaceHeader={props.replaceHeader}
                                            headerComponent={props.headerComponent}
                                            titleonheader={props.titleonheader}
                                            rightIconOnPress={props.rightIconOnPress}
                                            notificationreplaceshare={props.notificationreplaceshare} 
                                            nosearchIcon={props.nosearchIcon}
                                            noNotificationIcon={props.noNotificationIcon}
                                            catOnpress={props.catOnpress}
                                            catType={props.catType}
                                            selectedCat={props.selectedCat}
                                            titleWithImage={props.titleWithImage}
                                            userIcon={props.userIcon}
                                            pinUnpinIcon={props.pinUnpinIcon}
                                            pinIconName={props.pinIconName}
                                            searchReplace={props.searchReplace}
                                            showShareIcon={props.showShareIcon}
                                            pinUnpinFunction={props.pinUnpinFunction}
                                            showTitle={props.showTitle}
                                        />  
                                </View>
                            </View>
                            <View style={[styles.pageLayout,{marginTop:props.catInHeader?0:15}]}>  
                                <View style={styles.pageContent}> 
                                        {props.children} 
                                </View>
                            </View>
                        </>
                            
                        )
            }

    }
     
    return(
        <View style={styles.container}>
            <View style={styles.containerMain}> 
                {switchRender(props.scrollMode)}  
            </View>
        </View> 
    )
     
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.appBackgroundColor,
    },
    containerMain:
    {
        flexDirection:'column',
        flex: 1,
        
    },
        containerHeader:
        {
            overflow: 'hidden',
            // borderBottomWidth:0.5,
            marginBottom:-7,
            // borderBottomColor:theme.labelOrInactiveColor
        },
        pageLayout:
        {

            flex:1,
            flexDirection: 'row',
            marginBottom:-5,  
            
        },
            
            pageContent:
            {  
                flex:1,
                flexDirection: 'column', 
                marginHorizontal:5,
                
            },
        pageBottomTab:
        {
            marginTop:'auto',
            flex:0.2
        }
})

const mapStateToProps = (state)=>{
    return {
        screenWidth: state.screen.screenWidth,
        userAuth: state.user.userAuthStatus,
    }
}
export default connect(mapStateToProps)(PageStructure);