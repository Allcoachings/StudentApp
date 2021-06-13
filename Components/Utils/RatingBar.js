import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native'; 

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
//   useInterval(() => {
//     if(progress < 100) {
//       setProgress(progress + 5);
//     }
//   }, 1000);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100
    }).start();
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })
  return (
    <View style={styles.container}> 
      <View style={[styles.progressBar,{backgroundColor: props.backgroundColor,borderRadius: props.borderRadius, height:  props.height,}]}>
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
    flexDirection: 'row', 
    width: '100%', 
    
  }
});
