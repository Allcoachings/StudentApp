import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { theme, appLogo, Assets, imageProvider } from "../../config";
import CardView from "../../Utils/CardView";
import CustomActivtiyIndicator from '../../Utils/CustomActivtiyIndicator';
import EmptyList from '../../Utils/EmptyList'
import { connect } from "react-redux";
import BackArrow from "../../Utils/Icons/BackArrow"
import Search from "../../Utils/Icons/Search"
import ReplyBackIcons  from "../../Utils/Icons/ReplyBackIcons"
import Notification from "../../Utils/Icons/Notification"
import SearchModal from "./SearchModal";
import UserIcon from "./UserIcons";
import NotificationIcon from "./NotificationIcon";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class HeaderMobile extends React.Component {
  state = {
    search: false,
    filterData: false,
    searchWord:'',
    offset: 0,
    searchData:[],
    showResult: false,
    loadingData: false,
  };
 
  searchCallback=(response)=>{
    if(response.status==200)
    {
        response.json().then(data=>
        { 
            this.setState({searchData:data, showResult: true, loadingData: false})
        })
    }
  }

  closeModal=()=> this.setState({search:false})
  render() {
    return (
      // <KeyboardAwareScrollView>
      <View style={[styles.container,!this.props.catInHeader?({marginBottom:5}):(null)]}>
        {this.props.replaceHeader ? (
            this.props.headerComponent
        ) : (
          <>
            {(
              <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
             
             {this.props.iconName?(
              <TouchableOpacity 
                  onPress={this.props.btnHandler}
                  style={{height:'100%',alignItems: 'center'}}
              >
                    {this.props.iconName=="arrow-left"?
                      (<View style={{marginLeft:10}}>
                        <BackArrow height={24} width={24}/> 
                      </View>)
                  :(<Feather
                      name={this.props.iconName}
                      size={20}
                      color={theme.secondaryColor}
                  />)}
              </TouchableOpacity> 
             ):(null)}
                    
                

                  <View style={!(this.props.titleonheader||this.props.showTitle)?{alignItems: 'center',flex: 0.9}:{marginTop:2, flex: 0.9}}>
                    {(this.props.titleonheader||this.props.showTitle) ? 
                    (
                     this.props.titleWithImage?(
                       <View style={{flexDirection: 'row',alignItems: 'center'}}>
                         <Image source={appLogo} style={{resizeMode:'contain',width: 25,height: 25}} />
                         <Text 
                            numberOfLines={1}
                            style={{
                              fontSize: 20, 
                              alignSelf: "flex-start",
                              fontFamily: 'Raleway_600SemiBold',
                              marginLeft: 1,
                              paddingBottom:5
                            }}
                        >
                            {this.props.titleonheader}
                        </Text>
                       </View>
                     )
                     :
                     ( 
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 18, 
                            
                            textAlignVertical:'top',
                            alignSelf: "flex-start",
                            fontFamily: 'Raleway_600SemiBold',
                            marginLeft: 20,
                            paddingBottom:5,

                          }}
                        >
                          {this.props.titleonheader}
                          
                        </Text>
                      )
                    ) : (
                      <View>
                        <Image source={appLogo} style={styles.headerLogo} />
                      </View> 
                    )}
                  </View>
                  <View style={{justifyContent: 'flex-end',flexDirection: 'row',alignItems: 'center' ,width:'25%'}}>



                    {this.props.pinUnpinIcon?( 
                      <TouchableOpacity onPress={this.props.pinUnpinFunction} style={{marginRight:10,height:"100%",alignItems: 'center'}}>
                        <View >
                            {this.props.pinIconName}
                        </View>
                      </TouchableOpacity>
                    ):(null)}


                    {!this.props.noNotificationIcon?(
                  //     <TouchableOpacity style={{marginLeft:10,marginRight:15}}   onPress={() => this.props.rightIconOnPress()}>
                  //     {this.props.notificationreplaceshare ? (
                  //       <EvilIcons
                  //         name={this.props.notificationreplaceshare}
                  //         size={25}
                  //         color={theme.secondaryColor}
                  //         style={styles.notiIcon}
                  //       />
                  //     ) : (
                  //       <Notification height={24} width={24}/>
                  //     )}
                  // </TouchableOpacity>
                      <NotificationIcon
                        rightIconOnPress={this.props.rightIconOnPress}
                        notificationreplaceshare={this.props.notificationreplaceshare}
                      /> 
                  ):(null)} 




                    {!this.props.nosearchIcon?(
                    <TouchableOpacity
                      style={!this.props.noNotificationIcon?{}:{ marginLeft: 15 ,marginRight:15}}
                      onPress={() => this.setState({ search: true })}
                    >
                    <Search height={24} width={24}/>
                  </TouchableOpacity>
                  ):(this.props.searchReplace ? (
                    <TouchableOpacity>
                        <Text>Follow</Text>
                    </TouchableOpacity>
                  ):(null))}


                  
                  

                  {this.props.userIcon?(
                  //   <TouchableOpacity
                  //     style={{ marginLeft: 15,marginRight:0 }}
                  //     onPress={this.props.userIcon}
                  //   >
                  //   <Image
                  //     ref={(ref)=>this.userImageRef=ref}
                  //     source={{uri:imageProvider(this.props.user.studentImage)}}
                  //     style={{height: 25,width:25,backgroundColor:"blue",borderRadius:13}}
                  //     onError={(props)=>{
                  //       if(this.userImageRef)
                  //       {
                  //         this.userImageRef.setNativeProps({
                  //           // source: [Assets.profile.profileIcon],
                  //           src:[Image.resolveAssetSource(Assets.profile.profileIcon)],
                  //         })
                  //       }
                  //     }}
                  //   />
                  // </TouchableOpacity>
                  <UserIcon
                    userIcon={this.props.userIcon}

                  />
                  ):(
                    this.props.showShareIcon?(
                      <TouchableOpacity
                        style={{marginLeft:10  }}
                        onPress={this.props.shareFun}
                      >
                          <ReplyBackIcons width={25} height={25}/>
                      </TouchableOpacity>
                    ):(null))}
                </View>
              </View>
            )}
          </>
        )}

      {this.state.search?(

        <SearchModal
          isVisible={this.state.search}
          closeModal={()=>this.setState({search: false})}
          searchFun={this.props.searchFun}
          singleItem={this.props.singleItem}
          rowListing={this.props.rowListing}
          navigation={this.props.navigation}
          
        />
          ):(null)}
      </View>
      // </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    // flex: 1,
    // flexDirection: "row",
    backgroundColor: theme.primaryColor,
    marginHorizontal:5
    // justifyContent: 'space-between',
    // alignItems: "center", 

  },
  headerSearch: {
    flex: 1,
    margin: 10,
    height: 30,
    // borderColor: theme.secondaryColor,
    // borderWidth: 1,
    // borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "auto",
    alignSelf: "center",
  },
  searchInput: {
    paddingLeft: 10,
    flex: 1,
    color: theme.secondaryColor,
  },
  searchIcon: {
    margin: 5, 
  },
  notiIcon: {
    margin:15,
    
  },
  headerLogo: {
    width: 25,
    height: 25,
    alignSelf: "center", 
    resizeMode:'contain'
    
  },
});


const mapStateToProps = (state)=>{ 

  return {
      user : state.user.userInfo
  }
}
export default  connect(mapStateToProps)(HeaderMobile);
