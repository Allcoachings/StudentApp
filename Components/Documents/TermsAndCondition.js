import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import PageStructure from "../StructuralComponents/PageStructure/PageStructure";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { EvilIcons } from '@expo/vector-icons';
export default function TermsAndCondition(props) {

    const source = {
        html: `
        <style>p{font-size:16px}</style>
        <h1>Terms And Conditions</h1>

        <p>Last updated on Dec 9th 2022</p>

                        <p>The Website Owner, including subsidiaries and affiliates (“Website” or “Website Owner” or “we” or “us” or “our”) provides the information contained on the website or any of the pages comprising the website (“website”) to visitors (“visitors”) (cumulatively referred to as “you” or “your” hereinafter) subject to the terms and conditions set out in these website terms and conditions, the privacy policy and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.</p>

                        <p>Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern ALL COACHING''s relationship with you in relation to this website.</p>

                        <p>The term 'ALL COACHING' or 'us' or 'we' refers to the owner of the website whose registered/operational office is Room No- 10, Sitaram Ram Khelawan Yadav Chawl, S N Dubey Road, Near Yadav Nagar, Dahisar East, Mumbai- 400068 Mumbai MAHARASHTRA 400068. The term 'you' refers to the user or viewer of our website.</p>

                        <p>The use of this website is subject to the following terms of use:</p>

                        <p>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>

                        <p>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>

                        <p>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</p>

                        <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>

                        <p>All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.</p>

                        <p>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>

                        <p>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information.</p>

                        <p>You may not create a link to this website from another website or document without ALL COACHING’s prior written consent.</p>

                        <p>Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.</p>

                        <p>We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time</p>
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