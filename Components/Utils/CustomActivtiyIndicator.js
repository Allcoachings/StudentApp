import React from 'react';
import { Dimensions, Text, View, StyleSheet,ActivityIndicator } from 'react-native';
import Shimmer from './Shimmer'; 
import { theme } from '../config';
import ShimmerHome from './ShimmerHome';
import ShimmerInstituteViewHeader from './ShimmerInstituteViewHeader';
import ShimmerProfile from './ShimmerProfile';
import ShimmerTestSeries from './ShimmerTestSeries';

const WIDTH = Dimensions.get('screen').width;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 40,
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      margin: 8,
    },
    avatar: { borderRadius: 30, width: 60, overflow: 'hidden' },
    upperText: { marginLeft: 8, marginTop: 14 },
    lowerText: { marginLeft: 8, marginTop: 4 },
  });
class CustomActivtiyIndicator extends React.Component {
    state = {  }




    render() {

        switch (this.props.mode)
        {
            case 'skimmer':
                return (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.avatar}>
                                <Shimmer width={60} height={60} />
                            </View>
                            <View>
                                <View style={styles.upperText}>
                                <Shimmer width={200} height={14} />
                                </View>
                                <View style={styles.lowerText}>
                                <Shimmer width={120} height={14} />
                                </View>
                            </View>
                        </View>
                        <Shimmer width={WIDTH} height={140} />
                    </View>
                )
                case 'homeShimmer':
                    return(<ShimmerHome />)
                case 'questionSkimmer':
                    return(<ShimmerHome />)
                case 'resultSkimmer':
                    return(<ShimmerHome />)
                case 'testSeries':
                    return(<ShimmerTestSeries />)
                case 'profile':
                    return(<ShimmerProfile />)
                case 'instituteView':
                    return(<ShimmerInstituteViewHeader />)
                case 'document':
                    return(<ShimmerInstituteViewHeader />)
                case 'video':
                    return(<ShimmerInstituteViewHeader />)

                default:
                    return (
                        <ActivityIndicator size="large" color={this.props.spinnerColor||theme.accentColor} />
                    );
        }


       
    }
}

export default CustomActivtiyIndicator;