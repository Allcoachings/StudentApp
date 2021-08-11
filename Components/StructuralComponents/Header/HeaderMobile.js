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
import { Feather } from "@expo/vector-icons";
import { theme, appLogo } from "../../config";
import CardView from "../../Utils/CardView";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class HeaderMobile extends React.Component {
  state = {
    search: false,
    filterData: false,
    searchWord:'',
    offset: 0,
    searchData:[],
    showResult: false
  };

  searchCallback=(response)=>{
    if(response.status==200)
    {
        response.json().then(data=>
        {
            console.log("data",data)
            this.setState({searchData:data, showResult: true})
        })
    }
  }

  closeModal=()=> this.setState({search:false})
  render() {
     
    return (
      // <KeyboardAwareScrollView>
      <View style={styles.container}>
        {this.props.replaceHeader ? (
          this.props.headerComponent
        ) : (
          <>
            {this.state.search ? (
                CardView(
                    <View style={{flex: 1,flexDirection: 'row'}}>
                        <TextInput
                        placeholder="Search Institute"
                        style={styles.searchInput}
                        onChangeText={(value) => this.setState({ search: value })}
                        />
                        <TouchableOpacity
                          onPress={() => this.setState({ search: false })}
                        >
                        <Feather
                            name="x"
                            size={20}
                            color={theme.secondaryColor}
                            style={styles.searchIcon}
                        />
                        </TouchableOpacity>
                    </View>,
                    styles.headerSearch,2
                )
            ) : (
              <>
             
                    <TouchableOpacity
                    style={{ margin: "1%",marginTop: 15}}
                    onPress={this.props.btnHandler}
                    >
                    <Feather
                        name={this.props.iconName}
                        size={25}
                        color={theme.secondaryColor}
                    />
                    </TouchableOpacity> 
                

                <View style={!this.props.titleonheader?{alignSelf: 'center',marginLeft: "auto"}:{marginTop:15}}>
                  {this.props.titleonheader ? (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        alignSelf: "flex-start",
                        marginLeft: 10,
                      }}
                    >
                      {this.props.titleonheader}
                    </Text>
                  ) : (
                    <View>
                      <Image source={appLogo} style={styles.headerLogo} />
                    </View>
                    
                  )}
                </View>
                {!this.props.nosearchIcon?(
                <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={() => this.setState({ search: true })}
                >
                  <Feather
                    name="search"
                    size={20}
                    color={theme.secondaryColor}
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
                ):(null)}


                 {!this.props.noNotificationIcon?(
                    <TouchableOpacity   style={!this.props.nosearchIcon?{}:{ marginLeft: "auto" }} onPress={() => this.props.rightIconOnPress()}>
                      {this.props.notificationreplaceshare ? (
                        <Feather
                          name={this.props.notificationreplaceshare}
                          size={20}
                          color={theme.secondaryColor}
                          style={styles.notiIcon}
                        />
                      ) : (
                        <Feather
                          name="bell"
                          size={20}
                          color={theme.secondaryColor}
                          style={styles.notiIcon}
                        />
                      )}
                  </TouchableOpacity> 
                 ):(null)} 
                
              </>
            )}
          </>
        )}

{this.state.search?(

        <Modal
            animationType="slide"
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
                                    <Feather
                                      name="x"
                                      size={20}

                                      color={theme.secondaryColor}
                                      style={styles.searchIcon}
                                    />
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={()=>this.setState({filterData: true},()=>this.props.searchFun(this.state.offset, this.state.searchWord, this.searchCallback))}>
                                    <Feather 
                                      name={'arrow-right'} 
                                      size={15} 
                                      color={theme.labelOrInactiveColor} 
                                      style={styles.searchIcon}
                                    />
                                </TouchableOpacity>
                            )):(
                                <Feather 
                                  name={'search'} 
                                  size={15} 
                                  color={theme.labelOrInactiveColor} 
                                  style={styles.searchIcon}
                                />
                        )} 
                    </View>,
                    {width:'95%', height:40,margin:10},2
                )}
                {this.state.showResult?(
                  <FlatList 
                    data={this.state.searchData}  
                    showsVerticalScrollIndicator={false} 
                    renderItem={this.props.singleItem}
                    // numColumns={3}
                    keyExtractor={item => item.id}
                  />
                ):(
                  null
                )}
                
                 
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
    margin: 15,
  },
  notiIcon: {
    margin: 5,
  },
  headerLogo: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginLeft:'35%'
    
  },
});
export default HeaderMobile;
