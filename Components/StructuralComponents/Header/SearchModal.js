import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet ,Modal,View,Text,TouchableWithoutFeedback,TextInput,Image, FlatList} from 'react-native';
import { Assets, dataLimit, imageProvider, theme } from '../../config';
import CardView from '../../Utils/CardView';
import CustomActivtiyIndicator from '../../Utils/CustomActivtiyIndicator';
import { SearchInstitute } from '../../Utils/DataHelper/Search';
import EmptyList from '../../Utils/EmptyList';
import BackArrow from "../../Utils/Icons/BackArrow"

function SearchModal({isVisible,closeModal,singleItem,searchFun,rowListing}) {

    const [searchWord,setSearchWord] = useState("")
    const [searchData,setSearchData] = useState([])
    const textInput = useRef()
    const[loadingData,setLoadingData] = useState(false)
    const [offset,setOffset] = useState(0)
    const [searched,setSearched]  = useState(false)
   

   const search=(offset, search, callback)=>{
      SearchInstitute(search, offset, dataLimit, callback)
  }  
  const renderSearchIns=(item,closeModal)=>{
         
    return(
        <View>
            <TouchableWithoutFeedback style={{marginBottom: '5%'}} onPress={()=>{closeModal();this.redirectTo(item)}}>
                <View style={styles.instituteheader}>
                    {CardView(
                        <Image source={{uri:imageProvider(item.logo)}} style={styles.instituteheaderLogo}/>
                        ,[styles.logoCard,{width:"15%",height:50,borderRadius:10, marginLeft: 20}])
                    } 
                    <View style={styles.instituteheaderMeta}>
                        <View style={{flexDirection: 'column'}}>
                            <Text numberOfLines={1} style={[styles.instituteheaderText,{fontSize:12,fontFamily: 'Raleway_600SemiBold',width:"100%"}]}>{item.name}</Text>
                            <Text numberOfLines={1} style={[styles.instituteheaderText,{color:"grey",fontSize:10,fontFamily: 'Raleway_600SemiBold',width:"100%"}]}>{item.directorName}</Text>
                        </View>
                    </View>
                </View>     
            </TouchableWithoutFeedback>
        </View>  
    )
}
const searchFunction = searchFun||search
const singleItemLayout = singleItem||renderSearchIns
    const searchCallback=(response)=>
    {
      console.log(response.status)
        if(response.status==200)
        {   setSearched(true)
            response.json().then(data=>
            { 
              console.log("data ",data)
                // this.setState({searchData:data, showResult: true, loadingData: false})
                setSearchData(data) 
            })
        }
        setLoadingData(false)
      }

    useEffect(()=>{ 
        if(searchWord)
        {
          setLoadingData(true)
          searchFunction(offset,searchWord, searchCallback) 
        }
        
    },[searchWord,offset]) 
  return (
    <Modal
    transparent={true}
    visible={isVisible}
    onShow={ () => { textInput.current.focus(); }}
    onRequestClose={closeModal}>
        <View style={{backgroundColor:theme.primaryColor,height:"100%"}}>
        {CardView(
            <View style={{flex: 1,flexDirection: 'row',alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={()=>{closeModal()}}>
                  <View style={{marginLeft:10,marginRight:5}}>
                      <BackArrow height={24} width={24}/>
                  </View>
                </TouchableWithoutFeedback>
                <View>
                  <TextInput
                      placeholder="Search"
                      ref={ (input) => { textInput.current = input; }}
                      // autoFocus={true}
                      style={styles.searchInput}
                      onChangeText={(value) => setSearchWord(value)}
                  />
                </View>
                <View style={{marginLeft:'auto'}}>
                    {/* {this.state.searchWord!=''?(
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
                            <Feather 
                              name={'x'} 
                              size={30} 
                              color={theme.secondaryColor} 
                              style={styles.searchIcon}
                            />
                    )} */}
                    

                </View>
            </View>,
            {width:'100%',height:50},2
        )}
        {loadingData?(
            <CustomActivtiyIndicator mode="testItem" />
          ):(
           
              <FlatList
                data={searchData}  
                showsVerticalScrollIndicator={false} 
                renderItem={({item})=> singleItemLayout(item,closeModal)}
                numColumns={1}
                keyExtractor={item => item.id}
                ListEmptyComponent={searched&&<EmptyList image={Assets.noResult.noRes1}/>}
              />
          )}
        </View>
         
  </Modal>
  );
}

const styles = StyleSheet.create({

    searchInput: {
        paddingLeft: 10,
        flex: 1,
        color: theme.secondaryColor,
      },
      searchIcon: {
        margin: 5, 
      },
      instituteheader:
      {
          flexDirection:'row',
          flex:0.3,   
          marginBottom:10,
          marginTop:5
      },
          logoCard:
          { 
              flexWrap:'wrap',
              overflow: 'hidden',
          }, 
              instituteheaderLogo:
              {
                  width:"100%",
                  height:"100%",
                  resizeMode:"contain", 
              },  
          instituteheaderMeta:
          {
              flex:1,
              flexDirection:'column',
              marginLeft:'5%',
              marginRight:'5%'
          },
              instituteheaderText:
              {
                  flex:1,
                  flexWrap:'wrap', 
                  fontFamily: 'Raleway_700Bold',
                  fontSize:14, 
      
              },  
})
export default SearchModal;
