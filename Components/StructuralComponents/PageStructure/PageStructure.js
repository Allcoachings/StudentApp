import React from 'react';
import { Text, View,StyleSheet,ScrollView } from 'react-native';
import Header from '../Header'
import {theme} from '../../config'
import {connect} from 'react-redux'
import {screenMobileWidth} from '../../config'
import BottomTab from '../../BottomTab'
import CardView from '../../Utils/CardView'
class PageStructure extends React.Component {
    state = {  }

    renderContent=() =>
    {
        return(
            <View style={styles.container}>
                <View style={styles.containerMain}> 
                     {this.switchRender(this.props.scrollMode)}
                     
                    {!this.props.noBottomTab&&this.props.screenWidth<=screenMobileWidth?(
                        <View style={[styles.pageBottomTab,{flex:this.props.catInHeader?0.11:0.102}]}>
                                <BottomTab 
                                    replacBottomTab={this.props.replaceBottomTab} 
                                    bottomComponentStyle={this.props.bottomComponentStyle}  
                                    bottomComponent={this.props.bottomComponent}
                                    navigation={this.props.navigation}
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
            switch(scrollMode)
            {
                case 'scroll':    
                    return(
                        <ScrollView style={{flex:this.props.catInHeader?0.2:0.08}} >
                            <View style={[styles.containerHeader,this.props.headerStyle]}> 
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
                                />  
                            </View>
                            <View style={[styles.pageLayout,this.props.screenWidth<=screenMobileWidth?({   margin:'2%'}):(null)]}> 
                                {this.props.screenWidth>screenMobileWidth?(
                                    <View style={styles.leftNavContainer}> 
                                            <Text>Left Navbar</Text>
                                    </View> 
                                ):(
                                    null
                                )} 
                                <View style={styles.pageContent}>
                                    {this.props.children}
                                </View>
                            </View>
                        </ScrollView>
                    )
                default: 
                        return (
                            
                            <>
                                <View style={[styles.containerHeader,{flex:this.props.catInHeader?0.2:0.1},this.props.headerStyle]}> 
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
                                        />  
                                    </View>
                                    <View style={[styles.pageLayout,this.props.screenWidth<=screenMobileWidth?({   margin:'2%'}):(null)]}> 
                                        {this.props.screenWidth>screenMobileWidth?(
                                            <View style={styles.leftNavContainer}> 
                                                    <Text>Left Navbar</Text>
                                            </View> 
                                        ):(
                                            null
                                        )} 
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
            this.renderContent()
            );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.appBackgroundColor
    },
    containerMain:
    {
        flexDirection:'column',
        flex: 1,
        
    },
        containerHeader:
        {
            overflow: 'hidden',
            borderBottomWidth:1,
            marginBottom:-7,
            borderBottomColor:theme.labelOrInactiveColor
        },
        pageLayout:
        {

            flex:1,
            flexDirection: 'row',
            marginBottom:-5
        },
            leftNavContainer:
            {
                marginRight:"2%"
            },
            pageContent:
            {
                 
                flex:1,
                flexDirection: 'column'
            },
        pageBottomTab:
        {
            flex:0.089, 
            
            marginTop:'auto'
        }
})

const mapStateToProps = (state)=>{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(PageStructure);