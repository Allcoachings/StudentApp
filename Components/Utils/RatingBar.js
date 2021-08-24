import React, {useRef, useState, useEffect,useCallback} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native'; 
import { theme } from '../config'

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


const RatingBar = (props) => {
    
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(props.progress);
  const [labelViewHeight,setLabelViewHeight] = useState(props.height)

//   useInterval(() => {
//     if(progress < 100) {
//       setProgress(progress + 5);
//     }
//   }, 1000);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: props.duration||100
    }).start();
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })
  const onTextLayout = useCallback(e => {
    setLabelViewHeight(e.nativeEvent.lines.length*labelViewHeight) 
  }, []);
  return (
    <View style={styles.container}> 
      <View style={[styles.progressBar,{backgroundColor: props.backgroundColor,borderRadius: props.borderRadius,height:  labelViewHeight,},props.style]}>
        {props.label?( 
            <Text style={[styles.ratingLabel,props.labelStyle]} onTextLayout={onTextLayout}>{props.label}</Text>
        ):(null)}
      
        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: props.progressColor, width ,borderRadius: props.borderRadius}}/>
      </View> 
    </View>
  );
}

export default RatingBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 2,
  },
  progressBar: {
    zIndex: 1,
    flexDirection: 'row', 
    width: '100%', 
    // flexShrink: 1
    
  },
    ratingLabel:
    {
      zIndex: 1000,
      position: 'absolute',
      left:0,
      paddingHorizontal:10,
      top:0,
      color:theme.greyColor,
      flexWrap:'wrap',
      width:'100%'
    }

});
