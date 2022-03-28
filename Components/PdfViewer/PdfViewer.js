import { Feather } from '@expo/vector-icons'
import { Text } from 'native-base'
import React,{useEffect, useState} from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, View,ScrollView, BackHandler } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { theme } from '../config'
import CardView from '../Utils/CardView'
import PDFRenderer from './PDFRenderer'
import BackArrow from '../Utils/Icons/BackArrow'
import { TOGGLE_HEADER } from '../Actions/types'
import { useDispatch } from 'react-redux'
import BackAlert from './BackAlert'
import BlinkView from '../Utils/BlinkView'
 const  PDFViewer =({route,navigation}) =>
{
    const [headerVisible,setHeaderVisible] =useState(true);

    const  [backAlertVisible,setBackAlertVisible] = useState(false)
    const dispatch = useDispatch()
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { 
           
           dispatch({type: TOGGLE_HEADER,payload:{status:false}})

        });
        
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);


      useEffect(() => {
            
            
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          ()=>{
             setBackAlertVisible(true)
            return true;
          }
        );
    
        return () => backHandler.remove();
      }, []);



      const  handleScroll=(event)=>
      {
          
              // console.log();
              if(event.nativeEvent.contentOffset.y>40)
              {
                   setHeaderVisible(false)
              }
              if(event.nativeEvent.contentOffset.y<40&&(!headerVisible))
              {
                setHeaderVisible(true)
              }
      }

    return (
     
      <>

         {CardView( 
                    <View style={{flex: 1,flexDirection: 'row',alignItems: 'center',}}>
                        {/* <View> */}
                            <TouchableOpacity onPress={()=> setBackAlertVisible(true)}>
                                <View style={{marginLeft:10,marginRight:5,height:24}}>
                                    <BackArrow height={24} width={24}/>
                                </View>
                            </TouchableOpacity>
                        {/* </View> */}
                        <View style={{marginBottom:5}}>
                          <Text
                            numberOfLines={1}
                              style={{fontFamily: 'Raleway_600SemiBold',fontSize:18}} 
                          >
                              {route.params.name}
                          </Text>
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
                                    <TouchableOpacity onPress={()=>this.setState({filterData: true, loadingData: true},()=>searchFun(this.state.offset, this.state.searchWord, this.searchCallback))}>
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
                    {width:'100%',height:55},2
                )}  
          <PDFRenderer pdf={route.params.pdf}/>
         <View style={{flexDirection: 'row',position:'absolute',bottom:80,left:40,zIndex:1000,elevation:1000,opacity:0.4}}>
                <BlinkView timeout={30000}>
                  <Text style={{color:theme.featureNoColor,fontSize: 12}}>{route.params.studentName}{"\n"}{route.params.studentNumber}</Text> 
                </BlinkView>
         </View>  

         {backAlertVisible?( <BackAlert
                    closeModal={()=>setBackAlertVisible(false)}
                    yesFun={()=>navigation.goBack()}
                    noFun={()=>setBackAlertVisible(false)}
                />):(null)}
       </>
    )
  
}

export default PDFViewer