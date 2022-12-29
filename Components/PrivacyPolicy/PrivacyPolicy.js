import { ScrollView, View, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import PageStructure from "../StructuralComponents/PageStructure/PageStructure";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { EvilIcons } from '@expo/vector-icons';
export default function PrivacyPolicy(props) {

    const source = {
        html: `
        <style>p{font-size:16px}</style>
        <h1>Your privacy is important to us.</h1>

        

        <p>The user of this Website (“User”) agrees to be bound by the terms and conditions of this privacy policy (“Policy”). In the event the terms and conditions of the Policy are not agreeable to the User, the User is requested to refrain from using this Website.</p>
        
        
        
        
        <p>ALL COACHING is concerned about the privacy of the data and information of the Users accessing the website – ‘www.allcoaching.in’ or mobile applications-‘Allcoaching’ and ‘Marketing Tips by Allcoaching’ and the other associated/ancillary applications, products, websites and services managed by Allcoaching (“Website”) and otherwise engaging with Allcoaching through the Website.</p>
        
        
        
        <p>This Policy is a legally binding document between the User and Allcoaching. The terms of this Policy will be effective upon the User’s acceptance of the same (directly or indirectly in electronic form, by clicking on the “I accept the Privacy Policy” tab or by use of the Website) and will govern the relationship between the User and Allcoaching.</p>
        
        
        
        <p>This Policy forms an electronic contract within the provisions of the Information Technology Act, 2000 (“IT Act”), the rules made thereunder and the amended provisions pertaining to electronic documents/records in various statutes as amended by the IT Act, from time to time. This Policy does not require any physical, electronic or digital signature.</p>
        
        
        
        <p>This Policy shall, at all times be read and construed in consonance and along with the terms of use and access of the Website (“T&C”).</p>
        
        <p>Allcoaching will not differentiate between who is using the device to access the Website, so long as the log in/access credentials match with yours. In order to make the best use of the Website and enable your Information to be captured accurately on the Website, it is essential that you have logged in using your own credentials.</p>
        
        
        
        <p>This Policy highlights inter alia the type of data shared/collected from a User in the course of the User’s usage of the Website. The Policy further intends to apprise the User of the purposes for which the data of the User is collected and the Website’s policy with regard to sharing such personal information with third party entities.</p>
        
        
        
        <p>The terms “We”/ “Us”/ “Our” individually and collectively refer to and are synonymous with the term ‘Allcoaching’ and the terms “You” / “Your” / “Yourself” are to be construed to be synonymous with the term ‘User’.</p>
        
        
        
        <p>All defined terms used within this Policy but not specifically defined herein shall draw their meaning from the definition ascribed to such term under the T&C.</p>
        
        
        
        <p>COLLECTION OF INFORMATION</p>
        <p>Allcoaching may during the course of the User’s usage of the Website collect the following personal and nonpersonal information and such other information from the Users for accessing the Website (“Information”), as part of the voluntary registration process, any on-line survey or interaction on the Website or combination thereof, as may be required from time to time. The Information shall be collected in order to conduct operations on the Website. The Website collects or can request for the below mentioned Information from the Users</p>
        
        
        
        <p>Personal Information:</p>
        
        <p>Name of the User;</p>
        
        
        
        <p>Phone number (mobile and/or residence and/or alternative) of the User;</p>
        
        
        
        <p>Gender of the User;</p>
        
        
        
        <p>Date of birth of the User;</p>
        
        
        
        <p>Address (official/residence/other) of the User;</p>
        
        
        
        <p>Email Id (primary/alternative) of the User;</p>
        
        
        
        <p>Personal information received from social networking sites through which the User has registered to the Website including name, profile picture, email address or friends list, and any information made public in connection with that social media service;</p>
        
        
        
        <p>Personal information from the mobile device of the User such as their contact list including the name, phone number and the email address of the contact;</p>
        
        
        
        <p>Internet protocol (IP) address of the User; and</p>
        
        
        
        <p>Sensitive personal data such as passwords and payment details.</p>
        
        
        
        <p>Non-personal information:</p>
        
        
        
        <p>Details of internet or telecom service provider of the User;</p>
        
        
        
        <p>Location of a User;</p>
        
        <p>Type of internet browser being used by the User; and</p>
        
        
        
        <p>Such other information that may be required to access and operate the Website</p>
        
        
        
        <p>Please note that in addition to the above, the duration of use of the Website by the User may also be logged and stored by the Website.</p>
        
        
        
        <p>The Information may be collected and/or stored in electronic form, however, Allcoaching is hereby authorized by the User to collect/store such information in physical form as well.</p>
        
        
        
        <p>The Website may share the Information of a User with any third party entities subject to such entities adopting reasonable safety standards with respect to the use of such Information.</p>
        
        
        
        <p>REPRESENTATION AND WARRANTIES</p>
        <p>Every User hereby represents and warrants to Allcoaching that:</p>
        
        
        
        <p>all Information provided by the User is true, correct, current and updated;</p>
        
        
        
        <p>all Information provided by the User and the provision of such Information by the User does not in any manner violate any third party agreement, law, decree, order or judgement;</p>
        
        
        
        <p>all Information provided by the User does not belong to any third party, and if it does belong to a third party, the User is duly authorized by such Third Party to use, access and disseminate such Information;</p>
        
        <p>the officers, directors, contractors or agents of Allcoaching shall not be responsible in any manner whatsoever with regard to the authenticity or veracity of the Information that a User may provide to the Website; and</p>
        
        
        
        <p>the User shall indemnify and hold harmless Allcoaching and each of its officers, directors, contracts or agents and any third party relying on the Information provided by the User in the event the User is in breach of this Policy.</p>
        
        
        
        <p>Allcoaching represents and warrants to every User that:</p>
        
        
        
        <p>it shall not collect the User’s sensitive personal data unless such sensitive personal data is collected for a lawful purpose for which such collection of data is necessary;</p>
        
        
        
        <p>it shall not retain any sensitive personal data for longer than such sensitive personal data is required or can be lawfully used;</p>
        
        
        
        <p>in the event Allcoaching collects Information directly from the User, Allcoaching shall make reasonable effort to apprise the User of the purpose of such collection of Information, the intended recipient of the Information and the details of the agencies collecting and retaining the Information; and</p>
        
        
        
        <p>it has in place the security practices and procedures prescribed under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (“IT Rules”).</p>
        
        
        
        <p>PURPOSE AND USE OF INFORMATION</p>
        <p>All Information collected/stored by the Website shall be used for:</p>
        
        <p>providing information about new educational products and services to the Users;</p>
        
        
        
        <p>to continually improve the existing Website and service offerings;</p>
        
        
        
        <p>to conduct research and surveys;</p>
        
        
        
        <p>to implement the necessary security practices to ensure that all personal data are protected;</p>
        
        
        
        <p>to administer the User accounts in normal course of business;</p>
        
        
        
        <p>to contact the Users in case where fraud, illegal activities or breach of privacy is recorded;</p>
        
        
        
        <p>to enable the employees of or persons acting on behalf of Allcoaching to communicate with the User, as and when necessary, in order to provide the services requested by such User;</p>
        
        
        
        <p>such other purposes that Allcoaching, at its sole discretion, however subject to the principles contained in this Policy, may deem fit.</p>
        
        
        
        <p>SHARING OF INFORMATION</p>
        <p>Every User hereby expressly agrees that Allcoaching may share the Information collected from such User with its affiliates, employees, and such other individuals and institutions located within or outside India from time to time to ensure efficient management of Website traffic, to detect and prevent identity theft and other illegal acts, and to respond to legal, judicial, quasi-judicial law enforcement agencies or in connection with an investigation on matters related to public safety, as required and
        
        permitted by law and for such other purposes that Allcoaching may deem fit from time to time.</p>
        
        
        
        <p>DATA RETENTION</p>
        <p>Allcoaching shall retain Information for as long as is reasonably necessary in relation to the purposes for which this data was collected. In many instances, Allcoaching shall retain Information that is necessary for operation of the Website by the User, which may include maintaining this Information beyond when the User ceases using the Website.</p>
        
        
        
        <p>However, all Information pertaining to chats and student side test attempts shall only be retained by Allcoaching for a period of 1.5 years from date of receipt of such Information, after which such Information shall be automatically erased from the Allcoaching servers and databases.</p>
        
        
        
        <p>COOKIES AND THIRD PARTY WEBSITE LINKS</p>
        <p>The Website send cookies (small files containing a string of characters) to your computer, thereby uniquely identifying your browser. Cookies are used to track your preferences, help you login faster, and aggregated to determine user trends. This data is used to improve offerings, such as providing more content in areas of greater interest to a majority of users.</p>
        
        
        
        <p>Most browsers are initially set up to accept cookies, but you can reset your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
        
        
        
        <p>Disclaimer:</p>
        
        <p>Some of the Website features and services may not function properly if your cookies are disabled</p>
        
        
        
        <p>The Website may contain links that will redirect the Users to third party websites that may have access to the personal information of the User to which this Policy shall not be applicable. Thereby, every User agrees and acknowledges that accessing third party websites through links provided in the Website will solely be at the Users discretion. Additionally, Allcoaching shall under no circumstance be held liable for breach of privacy by such third party website nor shall it be liable for any objectionable content that may be displayed on such third party website. The Website may contain links to other websites, however, every User agrees and acknowledges that the Website shall not be responsible for the privacy practices of other third party websites which it does not own, manage or control.</p>
        
        
        
        <p>PROTECTION OF INFORMATION</p>
        <p>Allcoaching understands and acknowledges the importance of security and protection of the Information provided by and/or collected from the Users. Pursuant to the same, Allcoaching shall make the best efforts to ensure protection of Information by use of such security measures and programs that it may deem fit for the purpose. We shall employ best efforts to protect the Information against any unauthorized, illegal and fraudulent use of such Information by third parties.</p>
        
        
        
        <p>Notwithstanding anything to the contrary, Allcoaching shall not be held responsible for any loss, damage or misuse of the Information caused to the User, if such loss, damage or misuse is attributable to an event beyond the control of or attributable to Allcoaching or a force majeure event.</p>
        
        <p>Allcoaching shall ensure that the Website shall adopt appropriate encryption and security measures to prevent any hacking of the information of the Users and third parties and shall ensure that the User shall not be required or asked to disclose any Information, which may be prejudicial to the interests of the User. Currently, the content available on the Website is encrypted with AES 256 encryption where the data transfers are secured with HTTPS secured protocols and video content is delivered through HLS protocols.</p>
        
        
        
        <p>Allcoaching shall use the Information collected from the Users in accordance with applicable laws including but not limited to the IT Act and the rules made thereunder and use the Information only for the purpose for which it was furnished.</p>
        
        
        
        <p>Allcoaching has appropriate physical, electronic and managerial procedures in relation to the Website. The servers of the Website are accessible only to the authorized personnel and any Information of the User shall be shared with the authorized personnel only on a need to know basis to facilitate the services requested by the User. Allcoaching shall endeavor to safeguard the confidentiality of a User’s personally identifiable information, however, the transmissions made by means of the Internet cannot be made absolutely secure by the Website. The User agrees and acknowledges that Allcoaching shall not be liable for disclosure of any information due to errors in transmission or any unauthorized acts of third parties.</p>
        
        
        
        <p>The User agrees and acknowledges that Allcoaching shall be entitled to share the Information where such sharing is necessary for the lawful performance of the contractual obligations existing between Allcoaching and the User and for such</p>
        
        <p>purposes as it may deem fit, however, the disclosure of Information shall be in accordance with this Policy, the IT Act and the rules made thereunder.</p>
        
        
        
        <p>OPTION TO OPT-OUT AND WITHDRAWAL OF INFORMATION</p>
        <p>The User has the option of not providing its Information to Allcoaching. Further, Information provided and/or collected by Allcoaching may be withdrawn at any time during or pursuant to usage of the Website by a User. Users desirous of withdrawing the Information shall send an email to the grievance officer and request for such withdrawal. Allcoaching may subsequent to such withdrawal of information, at its sole discretion continue or discontinue the provision of its services to such User.</p>
        
        
        
        <p>GRIEVANCE REDRESSAL</p>
        <p>The User may, report violation of breach of privacy, Information or identify theft or grievances in relation to the Information shared, collected, stored or disseminated by Allcoaching in relation to the Website, to the grievance officer. The details of the grievance officer are as below:</p>
        
        
        
        <p>Grievance Redressal</p>
        
        
        
        <p>Attn: Mangal Yadav</p>
        
        
        
        <p>Address: Room No-10, S N Dudey Road, Near Yadav Nagar, Dahisar East,</p>
        
        
        
        <p>Mumbai-400068</p>
        
        
        
        <p>Phone Number: +91 9969196966</p>
        
        
        
        <p>E-mail Address: allcoachingss@gmail.com</p>
        
        
        
        <p>UPDATION OF POLICY</p>
        <p>Allcoaching reserves the right to change or update this Policy at any time. The User shall be notified of any change to the Policy having the effect of curtailing or limiting the existing User rights under the Policy. Any such changes or updation of the Policy shall be immediately effective upon posting to the Website and your continued use is deemed approval of all such changes.</p>
        
        
        
        <p>GOVERNING LAW AND JURISDICTION</p>
        <p>In the event of any dispute arising between the parties with respect to this Policy, the same shall be referred to the sole arbitrator and the arbitration shall be in accordance with Arbitration and Conciliation Act of 1996. The language of arbitration proceeding shall be English. The seat and place of arbitration shall be Mumbai Maharastra, India and the decision of the Arbitrator shall be final and binding on both parties herein.</p>
        
        
        
        <p>This contract shall be subject to the exclusive jurisdiction of courts in Mumbai Maharastra, India and shall be governed by the Indian laws.</p>
        
        
        
        <p>USE OF THE WEBSITE BY CHILDREN</p>
        <p>To register on thw website, you must meet the Age Requirements specified hereinbelow. If you are a ‘Minor’ or ‘Child’, i.e., an individual who does not meet the Age Requirements, then you may not register on the website, and only your parent can register on your behalf, agree to all website Terms and Conditions and enable access to you under their guidance and supervision.</p>
        
        
        
        <p>While some of our services may require collection of a Minor or Child’s personal information, we do not knowingly collect such personal information. In the event a Minor or Child utilizes the website, it is assumed that he / she has obtained the</p>
        
        <p>consent of the parent / legal guardian and such use is made available by the parents or legal guardian.</p>
        
        
        
        <p>Allcoaching will not be responsible for any consequences that arise as a result of misuse of our website, that may occur by virtue of any person including a Minor or Child registering on the website. Allcoaching reserves the right to terminate your subscription and / or refuse to provide you with access to the website if it is discovered that you do not meet the Age Requirements and the consent to use the website is not given by your parent / legal guardian. We will also take necessary steps to remove such information from our servers.</p>
        
        
        
        <p>If you are a parent / legal guardian and you are aware that your child has provided us with personal information without your consent, please contact us at</p>
        
        
        
        <p>allcoachingss@gmail.com</p>
        
        
        
        <p>If your Child faces bullying, abuse or harassment while availing our Services, please contact us at allcoachingss@gmail.com</p>
        
        
        
        <p>Age Requirements to register and use the website (“Age Requirements”):
        If you are a resident of India, then you must have attained at least eighteen (18) years of age, to register and use the website, or else act under parental consent.</p>
        
        
        
        <p>If you are a resident of Australia, then you must have attained at least eighteen (18) years of age, to register and use the website, or else act under parental consent.</p>
        
        <p>If you are a resident of Singapore, then you must have attained at least thirteen (13) years of age to register and use the website, or else act under parental consent.</p>
        
        
        
        <p>If you are a resident of South Korea, then you must have attained at least fourteen</p>
        
        
        
        <p>(14) years of age to register and use the website, or else act under parental consent.</p>
        
        
        
        <p>If you are a resident of Vietnam, then you must have attained at least sixteen (16) years of age to register and use the website, or else act under parental consent.</p>`
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