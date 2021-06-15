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
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerMain}> 
                    <View style={[styles.containerHeader,{flex:this.props.catInHeader?0.2:0.1},this.props.headerStyle]}>
                        {CardView(
                             <Header iconName={this.props.iconName} btnHandler={this.props.btnHandler} catInHeader={this.props.catInHeader} replaceHeader={this.props.replaceHeader} headerComponent={this.props.headerComponent}/> ,
                             {width:'100%',paddingLeft:5,paddingRight:5}
                        )}
                           

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
                    {this.props.screenWidth<=screenMobileWidth?(
                        <View style={[styles.pageBottomTab,{flex:this.props.catInHeader?0.11:0.1}]}>
                                <BottomTab replacBottomTab={this.props.replaceBottomTab} bottomComponentStyle={this.props.bottomComponentStyle}  bottomComponent={this.props.bottomComponent}/>
                        </View>
                    ):(null)}
                  
                </View>
            </View>
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
            flex:0.1
        },
        pageLayout:
        {
            flex:1,
            flexDirection: 'row',
         
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
            flex:0.1,
            
            marginTop:'auto'
        }
})

const mapStateToProps = (state)=>{
    return {
        screenWidth: state.screen.screenWidth
    }
}
export default connect(mapStateToProps)(PageStructure);