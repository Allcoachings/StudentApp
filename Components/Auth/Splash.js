import React ,{useState} from 'react';
import { Text,StyleSheet,View,TouchableOpacity,ScrollView,Platform,Image,Dimensions,StatusBar,SafeAreaView,PixelRatio} from 'react-native';
import { theme } from '../config';

const height = Dimensions.get('screen').height

const { width } = Dimensions.get('window');
const Splash = () => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  // const setSliderPage = (event) => {
  //   const { currentPage } = sliderState;
  //   const { x } = event.nativeEvent.contentOffset;
  //   const indexOfNextScreen = Math.floor(x / width);
  //   if (indexOfNextScreen !== currentPage) {
  //     setSliderState({
  //       ...sliderState,
  //       currentPage: indexOfNextScreen,
  //     });
  //   }
  // };

  const { currentPage: pageIndex } = sliderState;

  return (
    < View style={{height:height}}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={{ flex: 1 ,height: height}}>
        <ScrollView
          style={{ flex: 1 ,}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={{}}
          // onScroll={(event: any) => {
          //   setSliderPage(event);
          // }}
        >
          <View style={{ width, height }}>
            <Image source={{uri:'https://www.membroz.com/wp-content/uploads/2020/04/08_Intro.jpg'}} style={styles.imageStyle}/>
            {/* <View style={styles.wrapper}>
              <Text style={styles.header}>Daily interactive live classes</Text>
              <Text style={styles.paragraph}>chat with your educator,ask your doubts and participate in polls</Text>
            </View> */}
          </View>
          <View style={{ width, height }}>
            <Image
              source={{uri:'https://www.membroz.com/wp-content/uploads/2020/04/08_Intro.jpg'}}
              style={styles.imageStyle}
            />
            {/* <View style={styles.wrapper}>
              <Text style={styles.header}>High quality Art work</Text>
              <Text style={styles.paragraph}>... for a fraction of the price</Text>
            </View> */}
          </View>
          <View style={{ width, height }}>
            <Image
              source={{uri:'https://www.membroz.com/wp-content/uploads/2020/04/08_Intro.jpg'}}
              style={styles.imageStyle}
            />
            {/* <View style={styles.wrapper}>
              <Text style={styles.header}>Daily interactive live classes</Text>
              <Text style={styles.paragraph}>chat with your educator,ask your doubts and participate in polls</Text>
            </View> */}
          </View>
          <View style={{ width, height }}>
            <Image
              source={{uri:'https://www.membroz.com/wp-content/uploads/2020/04/08_Intro.jpg'}}
              style={styles.imageStyle}
            />
            {/* <View style={styles.wrapper}>
              <Text style={styles.header}>Best deal on the market</Text>
              <Text style={styles.paragraph}>... let's find your next art</Text>
            </View> */}
          </View>
          <View style={{ width, height }}>
            <Image
              source={{uri:'https://www.membroz.com/wp-content/uploads/2020/04/08_Intro.jpg'}}
              style={styles.imageStyle}
            />
            {/* <View style={styles.wrapper}>
              <Text style={styles.header}>It's all about art</Text>
              <Text style={styles.paragraph}>... seriously, it is</Text>
            </View> */}
          </View>
        </ScrollView>
        {/* <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height:height,
    width: width,
    backgroundColor: theme.transparent,
    // flex: 0.35,
    // marginLeft:20,
    flexDirection:'row',
    justifyContent: 'center',
    resizeMode:'cover',

  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 15,
    color: theme.greyColor,
    textAlign: 'center',
    fontWeight: '400'
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: height*0.42,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'orange',
    marginLeft: 10,
  },
});

export default Splash