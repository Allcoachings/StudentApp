import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text,StyleSheet,Image, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { serverBaseUrl, theme, Assets } from '../config';
import RenderDocument from '../InstituteView/RenderDocument';
import RenderVideo from '../InstituteView/RenderVideo';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
import EmptyList from '../Utils/EmptyList'
import CustomActivtiyIndicator from '../Utils/CustomActivtiyIndicator';
import {saveItemsOffline} from '../Utils/DownloadFile'
class Downloads extends Component {
  
   state = {
       activeTab:1,
       loading:true,
       actions:['Remove']
    };
    activeTab=(tabValue)=>{
        this.setState({activeTab:tabValue, data:[]},()=>
        {
            this.extractSavedItems(this.props.userInfo.id,this.state.activeTab==2?'document':'video');
        });

    }

    extractSavedItems=(uid,doctype)=>
    {
        this.setState({loading:true});
        AsyncStorage.getItem("offline").then((result)=>{
            if(result)
            {
                
                let offlineObj = JSON.parse(result)
                console.log(result);
                let documentArr = offlineObj[uid][doctype]
                console.log("documentArr", documentArr)
                if(documentArr)
                {
                    this.setState({data:documentArr,loading:false})
                }else
                {
                    this.setState({data:[],loading:false})
                }
            }else
            {
                this.setState({data:[],loading:false})
            }
        })
    }

    removeVideo =(index)=>
    {
        let data_arr = this.state.data;
        data_arr.splice(index,1)
        this.setState({data:data_arr})
        saveItemsOffline(data_arr,this.props.userInfo.id,this.state.activeTab==2?'document':'video');
        
    }
    switchTabRender=(activeTab)=>{

        
        if(this.state.loading)
        {
            <CustomActivtiyIndicator mode="skimmer"/>
        }
            
         
        switch (activeTab) {
            case 2: 
                    // return this.renderDocument({image:{uri:'https://picsum.photos/200'},title:'The Course2',institute:'CHandan coaching institute',Views:'104,234',date:'date here'})
                    return (
                        <FlatList
                            data={this.state.data}
                            renderItem={({item}) =><RenderDocument userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="offline" downloadMode={false} actions={this.state.actions}/>}
                            keyExtractor={(item)=>item.id}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />
                    )
                    
            case 1:
                return(
                    
                    <FlatList
                    data={this.state.data}
                    renderItem={({item,index}) =><RenderVideo  removeVideo={this.removeVideo} index={index} userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="offline" downloadMode={false} actions={this.state.actions}/>}
                    keyExtractor={(item)=>item.id}
                    ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                    />
                )
             
        }

    }
    componentDidMount() {
        
        this.didFocusListener = this.props.navigation.addListener(
            'focus',
            (obj) => {
                this.extractSavedItems(this.props.userInfo.id,this.state.activeTab==2?'document':'video');

            }
            );
    }
    componentWillUnmount() {
    
        if(this.didFocusListener)
        {
            this.didFocusListener.remove()
        }
    }
  render() {
    return (
        <PageStructure 
            iconName={"arrow-left"}
            btnHandler={() => {this.props.navigation.goBack()}}
            // headerComponent={this.header()}
            // replaceHeader={true}
            titleonheader={"Downloads"}
            headerStyle={{ justifyContent: 'center'}}
            replaceBottomTab={false}
            nosearchIcon={true}
            noNotificationIcon={true}
        >
            <View>
                <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/> 
                <View style={styles.profile_navigation}>
                        <View>
                            <Text style={[styles.navlink,{color:this.state.activeTab==1?theme.accentColor:theme.labelOrInactiveColor}]} onPress={()=>{this.activeTab(1)}}>Videos</Text>
                        </View>
                        <View>
                            <Text style={[styles.navlink,{color:this.state.activeTab==2?theme.accentColor:theme.labelOrInactiveColor}]} onPress={()=>{this.activeTab(2)}}>Documents</Text>
                        </View> 
                </View> 
                <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/>
                {this.switchTabRender(this.state.activeTab)}
            </View>
      </PageStructure>
    );
  }
}

const styles = StyleSheet.create({
    container: 
    {

    },
        purchage_coursewrapper:{
        flexDirection: 'row',
        marginTop: 20,
    },
    profile_navigation:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
        navlink:{
            fontSize: 20,
            color: theme.greyColor
        },

    curvedimage:{
        height: 90,
        width: 100,
        marginRight: 12,
        borderRadius: 10,
    },
    content: 
    {
        marginTop: '6%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
        videoContainer:
        {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row'
        },
            videoImage:
            {
                height: 100,
                width:  130,
                borderRadius: 10,
            },
            videoColumn:
            {
                marginLeft: 5,
                display: 'flex', 
                flexDirection: 'column'
            },
            videoText:
            {
                marginBottom: 5,
            },
        
        documentContainer:
        {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            // overflow: 'hidden'
            // justifyContent: 'center',
            // alignItems: 'center'
        },
            documentImage:
            {
                height: 100,
                width:  130,
                borderRadius: 10,
                marginRight: 10,
                borderColor: 'green', 
                // overflow: 'hidden'
            },
            documentTitle:
            {
                // flex: 1, 
                // flexWrap: 'wrap',
                flexShrink: 1,
                fontWeight: '700',
                marginBottom:10
                
            },
            documentText:
            {
                marginBottom:10,
                color: theme.secondaryColor,
            },
});

const  mapStateToProps = (state)=>
{
    return { 
        userInfo:state.user.userInfo,   
    }
} 
export default connect(mapStateToProps)( Downloads);
