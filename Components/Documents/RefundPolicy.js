import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import PageStructure from "../StructuralComponents/PageStructure/PageStructure";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { EvilIcons } from '@expo/vector-icons';
export default function RefundPolicy(props) {

    const source = {
        html: `
        <style>p{font-size:16px}</style>
        <h1>Refund Policy</h1>

        <p>Last updated on Dec 9th 2022</p>

        <p>ALL COACHING believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>

        <p>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</p>

        <p>ALL COACHING does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</p>

        <p>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 2 days of receipt of the products.</p>

        <p>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 2 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</p>

        <p>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</p>

        <p>In case of any Refunds approved by the ALL COACHING, it’ll take 9-15 days for the refund to be processed to the end customer.</p>
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