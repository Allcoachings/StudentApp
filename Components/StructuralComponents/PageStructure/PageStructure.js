import React from 'react';
import { Text, View,StyleSheet,ScrollView } from 'react-native';
import Header from '../Header'
import {theme} from '../../config'
import {connect} from 'react-redux'
import {screenMobileWidth} from '../../config'
import BottomTab from '../../BottomTab'
import CardView from '../../Utils/CardView'

import { StatusBar } from 'expo-status-bar';
class PageStructure extends React.Component {
    state = {  }

    renderContent=() =>
    {
        return(
            <View style={styles.container}>
                <View style={styles.containerMain}> 
                    {this.switchRender(this.props.scrollMode)} 
                    {!this.props.noBottomTab&&this.props.screenWidth<=screenMobileWidth?(
                        <View style={[styles.pageBottomTab,{flex:this.props.catInHeader?0.9:0.102}]}>
                            <BottomTab 
                                replacBottomTab={this.props.replaceBottomTab} 
                                bottomComponentStyle={this.props.bottomComponentStyle}  
                                bottomComponent={this.props.bottomComponent}
                                navigation={this.props.navigation}
                                mode={this.props.userAuth?("student"):("institute")}
                            />
                        </View>
                    ):(null)} 
                </View>
            </View> 
        )
    }
 
    // handleScroll=(event)=> {
    //     console.log(event.nativeEvent.contentOffset.y);
    //     // if(event.nativeEvent.contentOffset.y>40)
    //     // {
    //     //     this.setState({catStyle:{position: 'absolute',top:0}})
    //     // }    
    // }  

    switchRender=(scrollMode)=>{
        console.log(scrollMode)
            switch(scrollMode)
            {
                case 'scroll':    
                    return(
                        <ScrollView>
                            <View style={[styles.containerHeader,this.props.headerStyle,{flex:this.props.catInHeader?0.1:0.07}]}> 
                                <Header 
                                    iconName={this.props.iconName}
                                    btnHandler={this.props.btnHandler}
                                    catInHeader={this.props.catInHeader}
                                    replaceHeader={this.props.replaceHeader}
                                    headerComponent={this.props.headerComponent}
                                    searchFun={this.props.searchFun}
                                    singleItem={this.props.singleItem}
                                    titleonheader={this.props.titleonheader}
                                    notificationreplaceshare={this.props.notificationreplaceshare}
                                    rightIconOnPress={this.props.rightIconOnPress}
                                    catStyle={this.state.catStyle}
                                    nosearchIcon={this.props.nosearchIcon}
                                    noNotificationIcon={this.props.noNotificationIcon}
                                    catOnpress={this.props.catOnpress}
                                    catType={this.props.catType}
                                    selectedCat={this.props.selectedCat}
                                    titleWithImage={this.props.titleWithImage}
                                    userIcon={this.props.userIcon} 
                                />  
                            </View>
                            <View style={[styles.pageLayout]}>  
                                <View style={styles.pageContent}>
                                    {this.props.children}
                                </View>
                            </View>
                        </ScrollView>
                    )
                default: 
                        return (
                            
                            <>
                            <View style={{flex:this.props.catInHeader?0.1:0.08,marginTop:-10}}>
                                <View style={[styles.containerHeader,this.props.headerStyle]} > 
                                        <Header 
                                            iconName={this.props.iconName}
                                            searchFun={this.props.searchFun}
                                            singleItem={this.props.singleItem}
                                            btnHandler={this.props.btnHandler}
                                            catInHeader={this.props.catInHeader}
                                            replaceHeader={this.props.replaceHeader}
                                            headerComponent={this.props.headerComponent}
                                            titleonheader={this.props.titleonheader}
                                            rightIconOnPress={this.props.rightIconOnPress}
                                            notificationreplaceshare={this.props.notificationreplaceshare} 
                                            nosearchIcon={this.props.nosearchIcon}
                                            noNotificationIcon={this.props.noNotificationIcon}
                                            catOnpress={this.props.catOnpress}
                                            catType={this.props.catType}
                                            selectedCat={this.props.selectedCat}
                                            titleWithImage={this.props.titleWithImage}
                                            userIcon={this.props.userIcon}
                                        />  
                                </View>
                            </View>
                            <View style={[styles.pageLayout]}>  
                                <View style={styles.pageContent}> 
                                        {this.props.children} 
                                </View>
                            </View>
                        </>
                            
                        )
            }

    }
    render() {
        return (
            <>
                {this.renderContent()}
            </>
            );
    }
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
            borderBottomWidth:0.5,
            marginBottom:-7,
            borderBottomColor:theme.labelOrInactiveColor
        },
        pageLayout:
        {

            flex:1,
            flexDirection: 'row',
            marginBottom:-5,  
        },
            leftNavContainer:
            {
                marginRight:"2%"
            },
            pageContent:
            {  
                flex:1,
                flexDirection: 'column', 
                marginHorizontal:5
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