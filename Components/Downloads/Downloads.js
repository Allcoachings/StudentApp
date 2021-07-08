import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import { theme } from '../config';
import PageStructure from '../StructuralComponents/PageStructure/PageStructure'
class Downloads extends Component {
  
   state = {
       activeTab:1
    };
    activeTab=(tabValue)=>{
        this.setState({activeTab:tabValue});
    }
    switchTabRender=(activeTab)=>{
        switch (activeTab) {
            case 2: 
                    return this.renderDocument({image:{uri:'https://picsum.photos/200'},title:'The Course2',institute:'CHandan coaching institute',Views:'104,234',date:'date here'})
                    
            case 1:
                return(
                    <View>
                            {/* <View style={styles.content}>
                                <TouchableOpacity 
                                    onPress={()=>{this.activeTab('liveClass')}} style={[styles.liveClassOuter,this.state.activeTab=='liveClass'?({backgroundColor:'red'}):({backgroundColor: theme.primaryColor})]}>
                                    <View style={styles.liveClassInner}>
                                        <Feather name="disc" size={13} color={theme.primaryColor}/>
                                        <Text style={styles.liveClassText}>Live Now</Text>
                                    </View>
                                </TouchableOpacity>
                                {this.renderList('Videos', 'play-circle', 'videos')}
                                {this.renderList('Test Series', 'copy', 'testSeries')}
                                {this.renderList('Document', 'file', 'document')}
                                {this.renderList('Time Table', 'clock', 'timeTable')}
                            </View>
                            
                            <View style={styles.purchage_coursewrapper}>
                            <View>
                                <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.curvedimage}/>
                            </View>
                           
                                <View style={{flex: 1,justifyContent: 'space-evenly'}}>
                                    <Text>The Course-2</Text>
                                    <Text>Chapter two realease</Text>
                                    <Text>Module-3</Text>
                                </View>
                            </View> */}
                            {this.renderVideos({image:{uri: 'https://picsum.photos/200' },title:'The Course2',description:'Video description here',date:'date here'})}
                    </View>
                )
             
        }

    }

    renderDocument=(item)=>{
        return(
            <View style={styles.documentContainer}>
                <View>
                    <Image source={item.image} style={styles.documentImage}/>
                </View>
                <View style={{flexShrink: 1}}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.documentTitle}>{item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.documentText}>{item.institute}</Text>
                    </View>
                    <View>
                        <Text style={styles.documentText}>{item.Views} {item.date}</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderVideos=(item)=>{
        return(
            <View style={styles.videoContainer}>
                <View>
                    <Image source={item.image} style={styles.videoImage}/>
                </View>
                <View style={styles.videoColumn}>
                    <View>
                        <Text style={styles.videoText}>{item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.videoText}>{item.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.videoText}>{item.date}</Text>
                    </View>
                </View>
            </View>
        )
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

export default Downloads;