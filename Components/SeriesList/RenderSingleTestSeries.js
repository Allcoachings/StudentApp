import React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,FlatList, Image,Platform, ScrollView, Dimensions, findNodeHandle,UIManager, Modal, TouchableWithoutFeedback} from 'react-native';
import { theme, dataLimit, serverBaseUrl } from '../config';
import { EvilIcons, Feather } from '@expo/vector-icons';
import CardView from '../Utils/CardView'
import {connect } from 'react-redux'
import Instructions from './Instructions'
import Toast from 'react-native-simple-toast';
import { Picker } from 'native-base';
import {updatePlaylist} from '../Utils/DataHelper/Course'
import Lock from '../Utils/Icons/Lock';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height;

class RenderSingleTestSeries extends React.Component {
    state = {
        modalVisible: false,
        selectedPlaylist: this.props.item?.playlistId,
        status:this.props.status
    }

    closeModal = () =>{
        this.setState({modalVisible: false})                                                    
    }


    actions = ['Change Playlist'];
    showThreeMenu=()=>
    {
         
      UIManager.showPopupMenu(
          findNodeHandle(this.state.icon),
          this.props.actions,
          this.onError,
          this.onPopupEvent
      )
        
    }

    onPopupEvent = (eventName, index) => {

        if (eventName !== 'itemSelected') return 
        switch (this.actions[index])
        {
            case "Change Playlist":
                      this.setState({showModal: true})
                break;
        }
    }
  
    onRef = icon => {
      if (!this.state.icon) {
        this.setState({icon})
      }
    }

    

    renderPickerItem=(item)=>
    {
        if(item.id!=-1)
        {
            return( 
            
                <Picker.Item label={item.name} value={item.id} />
            )
        }
    }

    setSelectedPlaylist=(selectedPlaylist)=>
    {
        this.setState({showModal: false, selectedPlaylist: selectedPlaylist},()=>updatePlaylist("testSeries",selectedPlaylist,this.props.item?.id,this.updateCallback))
    }

    updateCallback=(response)=>{
        if(response.status=="200")
        {
            Toast.show("Playlist Updated Successfully.",)
            this.props.changePlayList("testSeries", this.state.selectedPlaylist, this.props.index)
        }
        else
        {
            // console.log("error", response.status)
        }
    }
    

    render(){
        return( 
            <TouchableWithoutFeedback onPress={()=>{
                 if(this.props.checkEnrollment)
                 {
                    //  if(this.props.studentEnrolled||this.props.item?.demo)
                    //  {
                         if(this.props.addToHistory)
                         {
                            this.props.addToHistory("testSeries", this.props.item?.id)
                         }
                        
                        this.setState({modalVisible: true})
                    //  }else 
                    //  {
                    //      this.props.openPurchaseCourseModal?this.props.openPurchaseCourseModal():null
                    //  }
                    
                 }else
                 {

                    if(this.props.addToHistory)
                    {
                        this.props.addToHistory("testSeries", this.props.item?.id)
                    }
                    
                    this.setState({modalVisible: true})
                 }
                
            }}>
                <View>
               
                    {CardView(
                        
                        <View style={styles.list}>
                            <View>
                                <View style={styles.topRow}>
                                    <Text style={styles.titleText}>{this.props.item?.title}</Text>

                                </View> 
                                <View style={styles.bottomRow}>  
                                    
                                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text style={styles.queText}>{this.props.item?.questionCount} Questions</Text>
                                        <Text style={styles.timeText}>{this.props.item?.timeDuration} Minutes</Text>
                                        <Text style={styles.timeText}>{this.props.item?.maxMarks} Marks</Text>  
                                    </View>
                                </View>
                            </View>
                            <View  style={{marginLeft:'auto',flexDirection: 'row',justifyContent: 'flex-end'}}>
                                {this.props.checkEnrollment&&!this.props.studentEnrolled&&!this.props.item?.demo?(
                                    <View style={{height:30,width:30,backgroundColor:theme.secondaryColor,borderRadius:15}}>
                                        <Lock height={20} width={20}/>
                                    </View>
                                ):(
                                    <View style={styles.btnView}>
                                    {/* <EvilIcons name="play" size={20} style={{color: theme.primaryColor, marginRight: 3}}/> */}
                                    <Text style={styles.btnText}>{this.state.status?this.state.status==1?'Resume':'Reattempt':'Start'}</Text>
                                    
                                    </View>
                                )}
                               
                                {this.props.actions?(
                                        <TouchableOpacity style={{marginLeft: 'auto', marginTop: 8}} onPress={()=>this.showThreeMenu()}>
                                            <Feather name="more-vertical" size={20} color={theme.secondaryColor} style={{marginRight:'2%'}} ref={this.onRef}/>
                                        </TouchableOpacity>
                                    ):(null)}
                            </View>
                        </View>,
                        {margin: 10, borderWidth: 1, borderRadius: 10, borderColor: theme.labelOrInactiveColor},3
                        
                    )}
                    {this.state.showModal?(
                        <Modal
                            animationType="fade"
                            transparent={true}  
                            visible={this.state.showModal}
                        >
                            <View style={{height: height-80, width: width-80}}>
                                {CardView(
                                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    
                                            <Text style={{fontSize: 16, fontFamily: 'Raleway_600SemiBold',color: theme.secondaryColor}}> Select Playlist</Text>
                                
                                        <View style={{display: 'flex',flexDirection: 'column', borderWidth:1, borderRadius: 6}}>
                                        
                                            <Picker 
                                                style={{ height:50 }}
                                                selectedValue={this.state.selectedPlaylist}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.setSelectedPlaylist(itemValue)
                                                }> 
                                                {this.props.courseDocumentPlaylist&&this.props.courseDocumentPlaylist.map((item)=>this.renderPickerItem(item))}
                                            </Picker>
                                        </View>
                                    </View>,{height: height*0.15, width: width*0.9, marginTop: height*0.425, marginLeft: width*0.05, justifyContent: 'center', padding: 15}
                                )}
                            </View>
                        </Modal>
                    ):(null)}
                    {this.state.modalVisible?(
                        <Instructions 
                            closeModal={this.closeModal} 
                            modalVisible={this.state.modalVisible}
                            item={this.props.item}
                            navigation={this.props.navigation}
                            testStatus={this.state.status}
                            changeTestStatus={(status)=>{this.setState({status})}}
                            briefId={this.props.briefId}
                        />
                        
                    ):(
                        null
                    )}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    
    list:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        
    },
        topRow:
        {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
            queText:
            {
                fontSize: 12,
                color: theme.greyColor
            },
            timeText:
            { 
                fontSize: 12,
                color: theme.greyColor,
                marginLeft:10,
            },
    bottomRow:
    {
        flex: 1,
        flexDirection: 'row',
        marginTop: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
        titleText:
        {
            flex:0.95,
            fontSize: 18,
            color: theme.secondaryColor
        },
        btnView:
        {
            // borderWidth:1,
            flexDirection: 'row',
            backgroundColor: theme.accentColor,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 1,
            paddingBottom: 1,
            borderRadius: 10,
            marginBottom: 20,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
            btnText:
            {
                fontSize: 20,
                color: theme.primaryColor   
            }

})

export default RenderSingleTestSeries;