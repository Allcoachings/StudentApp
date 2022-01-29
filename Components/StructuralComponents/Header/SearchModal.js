import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet ,Modal,View,Text,TouchableWithoutFeedback,TextInput, FlatList} from 'react-native';
import { Assets, dataLimit, theme } from '../../config';
import CardView from '../../Utils/CardView';
import CustomActivtiyIndicator from '../../Utils/CustomActivtiyIndicator';
import EmptyList from '../../Utils/EmptyList';
import BackArrow from "../../Utils/Icons/BackArrow"

function SearchModal({isVisible,closeModal,singleItem,searchFun,rowListing}) {

    const [searchWord,setSearchWord] = useState()
    const [searchData,setSearchData] = useState([])
    const textInput = useRef()
    const[loadingData,setLoadingData] = useState(false)
    const [offset,setOffset] = useState(0)
    const [searched,setSearched]  = useState(false)
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
          searchFun(offset,searchWord, searchCallback) 
        }
        
    },[searchWord,offset])

  return (
    <Modal
    transparent={false}
    visible={isVisible}
    onShow={ () => { textInput.current.focus(); }}
    onRequestClose={closeModal}>
        
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
                    <Feather
                    name={'x'} 
                    size={30} 
                    color={theme.secondaryColor} 
                    style={styles.searchIcon}
                  />

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
                renderItem={singleItem}
                numColumns={rowListing?1:3}
                keyExtractor={item => item.id}
                ListEmptyComponent={searched&&<EmptyList image={Assets.noResult.noRes1}/>}
              />
          )}
        
         
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
})
export default SearchModal;
