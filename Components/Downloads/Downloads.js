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
import {pauseDownload, saveItemsOffline} from '../Utils/DownloadFile'
import { removeDownloadingItem } from '../Actions';
 
class Downloads extends Component {
  
   state = {
       activeTab:1,
       loading:true,
       actions:['Remove'],
       downloadingItemActions:['Cancel']
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
    cancelDownload =(item)=>
    {
        pauseDownload(item,()=>{ 
            this.props.removeDownloadingItem(item.url)
        });
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
                        <>
                        <FlatList
                        data={this.props.downloadItems.filter((item)=>item.type=='document')}
                        renderItem={({item,index}) =><RenderVideo  removeVideo={()=>this.cancelDownload(item)} index={index} userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="offline" downloadMode={true} savingItem={true} actions={this.state.downloadingItemActions} progress={item.progress}/>}
                        ListEmptyComponent={()=>(this.props.downloadItems.filter(item=>item.type=='video').lengh==0?<EmptyList image={Assets.noResult.noRes1}/>:null)}
                        // ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />
                        <FlatList
                            data={this.state.data}
                            renderItem={({item}) =><RenderDocument userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="offline" downloadMode={false} actions={this.state.actions}/>}
                            keyExtractor={(item)=>item.id}
                            ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />
                        </>
                    )
                    
            case 1:
                return(
                    <>
                        <FlatList
                        data={this.props.downloadItems.filter((item)=>item.type=='video')}
                        renderItem={({item,index}) =><RenderVideo  removeVideo={()=>this.cancelDownload(item)} index={index} userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="offline" downloadMode={true} savingItem={true} actions={this.state.downloadingItemActions} progress={item.progress}/>}
                        keyExtractor={(item)=>item.id}
                        // ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                        />
                        <FlatList
                        data={this.state.data}
                        renderItem={({item,index}) =><RenderVideo  removeVideo={this.removeVideo} index={index} userId={this.props.userInfo.id} item={item} navigation={this.props.navigation} addToHistory={this.addToHistory} mode="offline" downloadMode={false} actions={this.state.actions}/>}
                        keyExtractor={(item)=>item.id}
                        ListEmptyComponent={()=>(this.props.downloadItems.filter(item=>item.type=='video').lengh==0?<EmptyList image={Assets.noResult.noRes1}/>:null)}
                        />
                    </>
                )
             
        }

    }
    componentDidUpdate(prevProps,prevState) {
        console.log("this.props.downloadItems",prevProps.downloadItems.length,this.props.downloadItems.length)

        if(prevProps.downloadItems.length!=this.props.downloadItems.length)
        {
            setTimeout(()=>{
                this.extractSavedItems(this.props.userInfo.id,this.state.activeTab==2?'document':'video');
            },2000)
            
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
    
        if(this.didFocusListener&&this.didFocusListener.remove)
        {
            this.didFocusListener.remove()
        }
    }
  render() {
    return (
        <PageStructure 
            iconName={"chevron-left"}
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
                {/* <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:10}}/>  */}

                
                <View style={styles.profile_navigation}>
                        <View style={[styles.btnView1,this.state.activeTab==1?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                            <Text style={[styles.btnText,{color:this.state.activeTab==1?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.activeTab(1)}}>Videos</Text>
                        </View>
                        <View style={[styles.btnView1,this.state.activeTab==2?({backgroundColor:theme.accentColor,borderColor:theme.accentColor}):({backgroundColor:theme.primaryColor,borderColor:theme.labelOrInactiveColor})]}>
                            <Text style={[styles.btnText,{color:this.state.activeTab==2?theme.primaryColor:theme.greyColor}]} onPress={()=>{this.activeTab(2)}}>Documents</Text>
                        </View> 
                </View> 
                <View style={{borderBottomWidth: 1, borderColor: theme.labelOrInactiveColor, marginTop:3}}/>
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

            btnView1:
            {
                flex: 0.4,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor:theme.greyColor,
                borderRadius: 5,
                borderWidth:1,
                margin: 2, 
                justifyContent:'center',
                alignItems: 'center'
            },
                btnText:
                {
                    fontFamily: 'Raleway_600SemiBold',
                    fontSize: 16,
                    color: theme.greyColor
                },
});

const  mapStateToProps = (state)=>
{
    return { 
        userInfo:state.user.userInfo, 
        downloadItems:state.download.items  
    }
} 
export default connect(mapStateToProps,{removeDownloadingItem})( Downloads);
