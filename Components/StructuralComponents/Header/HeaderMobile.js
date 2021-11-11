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
  FlatList
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { theme, appLogo, Assets, imageProvider } from "../../config";
import CardView from "../../Utils/CardView";
import CustomActivtiyIndicator from '../../Utils/CustomActivtiyIndicator';
import EmptyList from '../../Utils/EmptyList'
import { connect } from "react-redux";
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
            console.log("data",data)
            this.setState({searchData:data, showResult: true, loadingData: false})
        })
    }
  }

  closeModal=()=> this.setState({search:false})
  render() {
     
    return (
      // <KeyboardAwareScrollView>
      <View style={[styles.container,!this.props.catInHeader?({marginTop: 10,marginBottom:5}):(null)]}>
        {this.props.replaceHeader ? (
          this.props.headerComponent
        ) : (
          <>
            {(
              <View style={{flexDirection: 'row',alignItems: 'center'}}>
             
             {this.props.iconName?(
              <TouchableOpacity
                  
                    onPress={this.props.btnHandler}
                    >
                    <EvilIcons
                        name={this.props.iconName}
                        size={25}
                        color={theme.secondaryColor}
                    />
                    </TouchableOpacity> 
             ):(null)}
                    
                

                  <View style={!this.props.titleonheader?{alignItems: 'center',flex: 0.9}:{marginTop:2, flex: 0.9}}>
                    {this.props.titleonheader ? 
                    (
                     this.props.titleWithImage?(
                       <View style={{flexDirection: 'row',alignItems: 'center'}}>
                         <Image source={appLogo} style={{resizeMode:'contain',width: 25,height: 25}} />
                         <Text
                            style={{
                              fontSize: 20, 
                              numberOfLines: 1,
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
                          style={{
                            fontSize: 18, 
                            numberOfLines: 1,
                            alignSelf: "flex-start",
                            fontFamily: 'Raleway_600SemiBold',
                            marginLeft: 1,
                            paddingBottom:5
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

                  {this.props.pinUnpinIcon?(
                    <EvilIcons
                      name={this.props.pinIconName}
                      size={25}
                      color={theme.secondaryColor}
                  />
                  ):(null)}


                  {!this.props.noNotificationIcon?(
                    <TouchableOpacity    onPress={() => this.props.rightIconOnPress()}>
                      {this.props.notificationreplaceshare ? (
                        <EvilIcons
                          name={this.props.notificationreplaceshare}
                          size={25}
                          color={theme.secondaryColor}
                          style={styles.notiIcon}
                        />
                      ) : (
                        <EvilIcons
                          name="bell"
                          size={25}
                          color={theme.secondaryColor}
                          style={styles.notiIcon}
                        />
                      )}
                  </TouchableOpacity> 
                 ):(null)} 




                  {!this.props.nosearchIcon?(
                  <TouchableOpacity
                    style={!this.props.noNotificationIcon?{}:{ marginLeft: "auto" }}
                    onPress={() => this.setState({ search: true })}
                  >
                  <EvilIcons
                    name="search"
                    size={25}
                    color={theme.secondaryColor}
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
                ):(this.props.searchReplace ? (
                  <TouchableOpacity>
                      <Text>Follow</Text>
                  </TouchableOpacity>
                ):(null))}


                 
                 

                 {this.props.userIcon?(
                  <TouchableOpacity
                    style={{ marginLeft: "auto" }}
                    onPress={this.props.userIcon}
                  >
                  <Image
                    source={{uri:imageProvider(this.props.user.studentImage)}}
                    style={{height: 20,width:20,backgroundColor:"blue",borderRadius:10}}
                  />
                </TouchableOpacity>
                ):(
                  this.props.showShareIcon?(
                    <TouchableOpacity
                      style={{ marginLeft: "auto" }}
                    >
                      <EvilIcons
                        name="share-google"
                        size={25}
                        color={theme.secondaryColor}
                        style={styles.searchIcon}
                      />
                    </TouchableOpacity>
                  ):(null))}
              </View>
            )}
          </>
        )}

      {this.state.search?(

        <Modal
            transparent={false}
            visible={this.state.search}
            onShow={ () => { this.textInput.focus(); }}
            onRequestClose={this.closeModal}>
                
                {CardView(
                    <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                        <TextInput
                            placeholder="Search"
                            ref={ (input) => { this.textInput = input; }}
                            // autoFocus={true}
                            style={styles.searchInput}
                            onChangeText={(value) => this.setState({ searchWord: value })}
                        />
                        {this.state.searchWord!=''?(
                            this.state.filterData?(
                                <TouchableOpacity onPress={() => this.setState({ searchWord: '', offset: 0, filterData: false, showResult: false, searchData: [] },() =>this.textInput.clear())}>
                                    <EvilIcons
                                      name="x"
                                      size={20} 
                                      color={theme.secondaryColor}
                                      style={styles.searchIcon}
                                    />
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={()=>this.setState({filterData: true, loadingData: true},()=>this.props.searchFun(this.state.offset, this.state.searchWord, this.searchCallback))}>
                                    <EvilIcons 
                                      name={'chevron-right'} 
                                      size={15} 
                                      color={theme.labelOrInactiveColor} 
                                      style={styles.searchIcon}
                                    />
                                </TouchableOpacity>
                            )):(
                                <EvilIcons 
                                  name={'search'} 
                                  size={15} 
                                  color={theme.labelOrInactiveColor} 
                                  style={styles.searchIcon}
                                />
                        )} 
                    </View>,
                    {width:'95%', height:40,margin:10},2
                )}
                {this.state.loadingData?(
                    <CustomActivtiyIndicator mode="testItem" />
                  ):(
                    this.state.showResult?(
                      <FlatList 
                        data={this.state.searchData}  
                        showsVerticalScrollIndicator={false} 
                        renderItem={this.props.singleItem}
                        // numColumns={3}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<EmptyList image={Assets.noResult.noRes1}/>}
                      />
                ):(
                  null
                ))}
                
                 
          </Modal>
          ):(null)}
      </View>
      // </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.primaryColor,
    // justifyContent: 'space-between',
    alignItems: "center", 
  },
  headerSearch: {
    flex: 1,
    margin: 10,
    height: 40,
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
