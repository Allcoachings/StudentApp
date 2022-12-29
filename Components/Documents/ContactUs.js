import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import PageStructure from "../StructuralComponents/PageStructure/PageStructure";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { EvilIcons } from '@expo/vector-icons';
export default function ContactUs(props) {

    const source = {
        html: `
        <style>p{font-size:16px}</style>
        <h1>Contact Us</h1>

        <p>Last updated on Dec 9th 2022</p>

        <p>You may contact us using the information below:</p>

                        <p>Merchant Legal entity name: ALL COACHING</p>
                        <p>Registered Address: Room No- 10, Sitaram Ram Khelawan Yadav Chawl, S N Dubey Road, Near Yadav Nagar, Dahisar East, Mumbai- 400068 Mumbai MAHARASHTRA 400068</p>
                        <p>Operational Address: Room No- 10, Sitaram Ram Khelawan Yadav Chawl, S N Dubey Road, Near Yadav Nagar, Dahisar East, Mumbai- 400068 Mumbai MAHARASHTRA 400068</p>
                        <p>Telephone No: 9969196966</p>
                        <p>E-Mail ID: allcoachingss@gmail.com</p>
        `
    };

    const { width } = useWindowDimensions();

    return (
        <>


            <View style={{ top: 30, marginBottom: 110, paddingLeft: 2, paddingRight: 2 }}>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <EvilIcons name="arrow-left" size={50} style={{
                            fontWeight: 700, ...Platform.select({
                                web: {
                                    cursor: 'pointer',
                                }
                            }),
                        }} />
                    </TouchableOpacity>

                    <ScrollView>

                        <View>
                            <RenderHtml
                                contentWidth={width}
                                source={source}
                                style={{ marginTop: -20 }}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>

        </>



    )
}