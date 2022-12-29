import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import PageStructure from "../StructuralComponents/PageStructure/PageStructure";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { EvilIcons } from '@expo/vector-icons';
export default function AboutUs(props) {

    const source = {
        html: `
        <style>p{font-size:16px}</style>
        <h1>About Us.</h1>

        <p>Allcoaching aims to build  India's largest education platform. with a mission to improve lives
        through learning, Allcoaching is the largest online learning destination that helps students,
        coaching businesses and governments to gain the skill needed to compete in today's economy. we
        use technology to empower great educators, coaching businesses, and a community of
        self-learners. our vision is to partner with the brightest mind and democratic education for
        Everyone is looking to learn.</p>
        <p>join us in our journey to change the future of online education</p>
        <p>visit at - <a href="https://allcoaching.in/">https://allcoaching.in/</a></p>
        <p>Follow us on-</p>
        <p>Twitter - <a href=" https://twitter.com/allcoachings"> https://twitter.com/allcoachings</a></p>
        <p>Facebook - <a href="https://www.facebook.com/allcoachings">https://www.facebook.com/allcoachings</a></p>
        <p>Instagram - <a href="https://www.instagram.com/allcoachings/">https://www.instagram.com/allcoachings/</a></p>
        <p>Youtube - <a href="https://www.youtube.com/@allcoaching">https://www.youtube.com/@allcoaching</a></p>
        <p>Linkedin - <a href="https://www.linkedin.com/company/allcoachings">https://www.linkedin.com/company/allcoachings</a></p>
        <p>Blog - <a href="https://allcoaching.in/blog">https://allcoaching.in/blog</a></p>
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