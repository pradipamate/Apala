import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,FlatList,Modal} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-cards';
import { ScrollView } from 'react-native';
import { Textarea} from 'native-base'
import {Input} from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm from 'react-native-simple-radio-button';
import StarRating from 'react-native-star-rating';


class Profile3 extends Component {

    static navigationOptions = {
        title: "",
        headerStyle: {
            backgroundColor: "rgba(3,179,143,1)",
            color: "white"
        },
        // headerLeft: () => (
        //     <TouchableOpacity
        //         style={{ marginLeft: 25 }}
        //     // onPress={() => this.props.navigation.goBack()}
        //     // title="+1"
        //     // color="#fff"
        //     >
        //         <AntIcon name="left" style={{ fontSize: 18, color: "#fff" }}></AntIcon>
        //     </TouchableOpacity>
        // ),
        // headerTintColor: '#000',
        // headerTitleStyle: {
        //     fontWeight: 'bold',
        // },
        
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false,
            starCount: 3.5,
            ReadAboutDis_section: [
                {
                    id: 1,
                 src: require('../../Images/SkinProblem.png'),
                },
                {
                    id: 2,
                 src: require('../../Images/SkinProblem.png'),
               },
                {
                    id: 3,
                src: require('../../Images/SkinProblem.png'),
                },
           ],
        };
    }

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
     

    renderReadAboutDis_section = ({ item }) => {
        return (
            <>
            <View key={item.id} >
                   <Image
                        square
                            style={{ height: 90, width:90,borderRadius:60, }}
                            source={item.src}
                        />
             </View>
            </>
        );
    };
    addReview=()=>{
        this.setState({
            modalVisible:true
        })
    }

    render() {
        var radio_props = [
            {label: 'Padmshree Clinic', value: 'Padmshree_Clinic' },
            {label: 'Sanjivini Hospital', value: 'Sanjivini_Hospital' },
            {label: 'Your Health Hospital', value: 'Other' },
          ];
        return (
            <>
            <ScrollView>
                <View>
                    <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "3%" }}>
                        <Text style={styles.text1}>
                            Reviews & Ratings
                        </Text>
                        <TouchableOpacity style={styles.button2}>
                            <Text style={{ color: "#fff", padding: 10,fontSize:10}} onPress={()=>this.addReview()}>Add Your Review</Text>
                        </TouchableOpacity>
                        <FontAwesomeIcon style={{ justifyContent: "center", margin: "2%" }} name="star" color="#fcd303" size={28} />
                        <Text style={[styles.text1, { fontSize: 20 }]}>4.0</Text>
                    </View>
                    <View style={styles.firstCard}>
                        <View style={{ marginHorizontal: "5%", marginVertical: "5%"}}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesomeIcon name="user-circle" color="rgba(3,179,143,1)" size={25} />
                                <Text style={styles.text3}>Patient 1 Name</Text>
                                <Text
                                    style={{
                                        color: "#7a7a7a", marginLeft: "auto",
                                        alignSelf: "flex-end", position: "relative",
                                    }}
                                // style={styles.icon1}
                                > 2 Days ago
                                </Text>
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: "10%", marginRight: "5%" }}>
                                <Text style={{ fontWeight: "bold", marginVertical: '1%'}}>
                                    <FontAwesomeIcon name="thumbs-up" color="#029400" size={18} />
                                 {" "}   Recommends the Doctor
                                </Text>
                                <Text>
                                    we ought to have saints' days to commemorate the great discoveries which have
                                    been made for all mankind, and perhaps for all time—or for whatever time may be
                                    left to us. Nature ... is a prodigal of pain. I should like to find a day when
                                    we can take a holiday, a day of jubilation when we can fête good Saint
                                    Anaesthesia and chaste and pure Saint Antiseptic. ... I should be bound to
                                    celebrate, among others, Saint Penicilli
                                </Text>
                                <View style={styles.line}></View>
                                <Text style={{fontWeight:'bold'}}>Dr.Xyz1 <Text>replied</Text></Text>
                                 <Text>
                                            Thanky so much
                                </Text>
                            </View>

                            <View style={{ marginHorizontal: "5%", marginVertical: "5%" }}>
                            <View style={{ flexDirection: "row",justifyContent:'space-between',width:'100%' }}>
                                <FontAwesomeIcon name="user-circle" color="rgba(3,179,143,1)" size={25} />
                                <Text style={styles.text3}>Patient 1 Name</Text>
                                <Text
                                    style={{
                                        color: "#7a7a7a", marginLeft: "auto",
                                        alignSelf: "flex-end", position: "relative",
                                    }}
                                // style={styles.icon1}
                                > 2 Days ago
                                </Text>
                            </View>
                            <View style={{ justifyContent: "center", marginLeft: "10%", marginRight: "5%" }}>
                                <Text style={{ fontWeight: "bold", marginVertical: '1%'}}>
                                    <FontAwesomeIcon name="thumbs-up" color="#029400" size={18} />
                                 {" "}   Recommends the Doctor
                                </Text>
                                <Text>
                                   Lorem ipsum dolar sit amet
                                </Text>
                            </View>
                         </View>

                        <View style={styles.line}></View>
                        <Text style={{color:'#03b38f',fontWeight:'bold',textAlign:'right'}}>Show All Reviews</Text>
                    </View>
                </View>

                <View style={{ marginHorizontal: "5%",}}>
                    <Text style={{fontWeight:'bold',marginBottom:'3%',marginTop:"3%"}}>Photos & Pratices</Text>
                        <View style={{flexDirection:'row'}}>
                                <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}   
                                        //style={{ marginBottom: '1%'}}
                                        data={this.state.ReadAboutDis_section}
                                        renderItem={this.renderReadAboutDis_section}
                                        keyExtractor={item => item.id}></FlatList>
                                <View style={{flexDirection:'column',justifyContent:'center'}}>
                                    <Text style={{fontWeight:'bold',}}>See All</Text>
                                </View>
                        </View>
                </View>

                <View style={{backgroundColor:'#fff',marginBottom:'10%',marginTop:'10%'}}>
                   <View style={{padding:'5%',marginHorizontal:'5%',flexDirection:'row',justifyContent:'space-between'}}>
                       <Text style={{fontWeight:"bold"}}>Q & A with Dr.XYZ1</Text>
                        <Text> <FontAwesomeIcon name="chevron-right" color="#000" size={16} /></Text>
                    </View>
                </View>

                <View style={{backgroundColor:'#fff'}}>
                    <View style={styles.listing}>
                       <Text style={{fontWeight:'bold',}}>Report An Issues</Text>
                        <Text> <FontAwesomeIcon name="thumbs-down" color="red" size={18} /></Text> 
                    </View>
                    <View style={styles.line1}></View>
                    <View style={styles.listing}>
                       <Text><FontAwesomeIcon name="phone" size={18}  color="#029400"/><Text style={{paddingLeft:'12%'}}> Eduction</Text></Text>
                       <Text><CheckBox
                           // value={isSelected}
                           // onValueChange={setSelection}
                            style={styles.checkbox}
                            /></Text>
                    </View>
                    <View style={styles.line1}></View>
                    <View style={styles.listing}>
                       <Text><FontAwesomeIcon name="map-marker" color="#029400" size={18} /><Text style={{paddingLeft:'12%'}}> Eduction</Text></Text>
                       <Text><CheckBox
                           // value={isSelected}
                           // onValueChange={setSelection}
                            style={styles.checkbox}
                            /></Text>
                    </View>
                    <View style={styles.line1}></View>
                    <View style={styles.listing}>
                       <Text><FontAwesomeIcon name="map-marker" color="#029400" size={18} /><Text style={{paddingLeft:'12%'}}> Experince</Text></Text>
                       <Text><CheckBox
                           // value={isSelected}
                           // onValueChange={setSelection}
                            style={styles.checkbox}
                            /></Text>
                    </View>
                    <View style={styles.line1}></View>
                    <View style={styles.listing}>
                             <View style={{width:'60%'}}>
                                <Input
                                            containerStyle={{ height: 40, }}
                                            placeholder='Add Comment*'
                                            style={{fontSize:14}} 
                                            inputContainerStyle={{ borderWidth: 1,paddingLeft:'2%',
                                            borderRadius:10,borderColor:'#03b38f'}}
                                            leftIconContainerStyle={{ marginLeft: 2 }}
                                            onChangeText={text => this.handlemobileChange(text)}
                                            errorMessage={this.state.userNameErrMsg}
                                            keyboardType='numeric'
                                                    />
                               </View>
                              <View>
                                <TouchableOpacity style={styles.button3}
                                                        onPress={() => this.handleSubmit()}>
                                                <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}}>Submit Report</Text>
                                </TouchableOpacity>   
                          </View>
                    </View>
                </View>
           </View>
           <View style={styles.line5}></View>
             <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={{ color: "#fff", padding: 12, }}>
                            <MaterialIconsIcon name="videocam"
                                style={{ color: "#fff", fontSize: 18, paddingRight: 5 }}></MaterialIconsIcon>
                                        Online Consultation</Text>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={{ color: "#fff", padding: 12, }}>
                            <MaterialCommunityIcon name="clipboard-text"
                                style={{ color: "#fff", fontSize: 18, paddingRight: 5 }}></MaterialCommunityIcon>
                                        Book Appointment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={{ color: "#fff", padding: 12, }}>
                            <FontAwesomeIcon name="home"
                                style={{ color: "#fff", fontSize: 18, paddingRight: 5 }}></FontAwesomeIcon>
                                       Home Visit</Text>
                    </TouchableOpacity>
                </View>


{/* Add Review Modal */}
<Modal
                        style={styles.modal}
                        animationType="slide"
                        coverScreen={true}
                        backdropOpacity={0.70}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        }} >
                        <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{position:'absolute',right:'5%',top:'2%'}}>
                                        <Icon
                                                name='times'
                                                size={25}
                                                color='#03b38f'
                                                type='material-community'
                                                onPress={() => this.setState({modalVisible:!this.state.modalVisible})}
                                            />
                                    </View>
                                    <View style={{marginHorizontal:'5%',marginTop:'4%'}}>
                                            <View style={{marginBottom:5,marginTop:15}}>
                                                <Text style={{fontWeight:'bold',fontSize:14}}>Review For</Text>
                                                <View style={{marginTop:'2%'}}>
                                                    <RadioForm 
                                                        radio_props={radio_props}
                                                        initial={0}
                                                        buttonSize={10}
                                                        formHorizontal={true}
                                                        buttonInnerColor={'#03b38f'}
                                                        buttonOuterColor={'#03b38f'}
                                                        style={{ marginRight:'-17%' }}
                                                        // labelStyle={{fontSize: 11,marginLeft:'1%'}}
                                                        labelStyle={{fontSize: 13,marginLeft:'-5%'}}
                                                        //buttonWrapStyle={{marginLeft: 8,fontSize:10}}
                                                        //buttonOuterSize={80}
                                                        onPress={(value) => this.handleGender(value)}/>
                                                </View>
                                            </View>

                                            <View style={styles.line6}></View>

                                            <View style={{marginBottom:5,marginTop:5}}>
                                                <Text style={{fontWeight:'bold',fontSize:13}}>How was your appointment experince with Dr.XYZ1</Text>
                                            </View>

                                            <View style={styles.line6}></View>

                                            <View style={{marginBottom:5,marginTop:5, flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={{fontWeight:'bold',fontSize:13}}>Rate For Dr.XYZ1</Text>
                                                <StarRating
                                                    starSize={18}
                                                    fullStarColor="#ffe100"
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={this.state.starCount}
                                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                />
                                            </View> 
                                             <View style={styles.line6}></View>

                                            <View style={{marginBottom:5,marginTop:5,justifyContent:'space-between',flexDirection:'row'}}>
                                                <Text style={{fontWeight:'bold',fontSize:13}}>Would you recommended Dr.XYZ1?</Text>
                                                <StarRating
                                                    starSize={18}
                                                    fullStarColor="#ffe100"
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={this.state.starCount}
                                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                />
                                            </View> 
                                             <View style={styles.line6}></View>
                                            <View style={{marginBottom:5,marginTop:5}}>
                                                <Text style={{fontWeight:'bold',fontSize:13}}>Give Your Valubale Feedback /Review  for Dr.XYZ1</Text>
                                            </View>

                                            <Textarea rowSpan={3} bordered placeholder="Add you Review or Feedback" />

                                            <View style={{marginBottom:5,marginTop:5}}>
                                                <Text style={{fontWeight:'bold',fontSize:14,color:'red'}}>Note: All Question are throrougly processed, please avoid any kind of abusive language,threats,etc</Text>

                                            </View> 

                                             <View style={{marginBottom:5,marginTop:5,flexDirection:'row',justifyContent:'flex-start',marginLeft:'-3%'}}>
                                                   <CheckBox
                                                       // value={isSelected}
                                                       // onValueChange={setSelection}
                                                        style={styles.checkbox}
                                                        />
                                                        <Text style={styles.label}>Keep My Review Publicity Anonymous</Text>
                                            </View>
                                            <Text style={{fontWeight:'bold',fontSize:13}}>Note: Your Indentity will be shared with doctor, if he/she ask for </Text>
                                            <View style={styles.line6} />
                                            <Text style={{ padding: 5,fontWeight:'bold',fontSize:10,textAlign:'center'}}>By Submitting my Review & Rating, I Agree to <Text style={{fontSize:10,color:'#03b38f'}}> Term & Condition</Text></Text>
                                            <View style={{justifyContent:'center',flexDirection:'row',padding:5}}>
                                                <TouchableOpacity style={{backgroundColor:'#03b38f',padding:5,borderRadius:10}}>
                                                    <Text style={{ color: "#fff", padding: 5,fontWeight:'bold' }}>Submitt</Text>
                                                </TouchableOpacity>
                                            </View> 
                                  </View>

                            </View>
                        </View>
                    </Modal>
            </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
        marginLeft:'0%',
       //backgroundColor:'red'
      },
      label: {
        marginTop: '5%',
        marginLeft:'-5%',
        fontSize:13
      },
    centeredView: {
      flex: 1,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
     // zIndex:99999,
    },
    modalView: {
        width:'100%',
        backgroundColor: "#f9f9f9",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#ccc",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:10
    },
    // modal:{
    //     zIndex: 2,
    //     position:'absolute',
    //     shadowColor: "#ccc",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 5,
    //   //backgroundColor:'red'
    // },
      line6: {
        borderColor:'#ccc',
        borderWidth:.4,
        marginTop:'1%',
        marginBottom:'1%'
         //width:'100%'
    },
   listing: {padding:'3%',marginHorizontal:'5%',flexDirection:'row',justifyContent:'space-between'},
    container: {
        flex: 1,
        height: hp("100%")
    },
    bottomView: {
        flexDirection: "row",
        justifyContent: "center",
        width: wp("100%"),
        backgroundColor: "white",
        bottom: 0
    },
    button3:{
        backgroundColor:'red',
         justifyContent: "center",
        //height: hp("10%"),
       // width: wp("30%"),
      // marginTop:'10%',
        borderRadius: 10,
        marginHorizontal: "1%",
      //  marginVertical: "5%",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,padding:10
    },
    button1: {
        justifyContent: "center",
        backgroundColor: "rgba(3,179,143,1)",
        height: hp("8%"),
        width: wp("30%"),
        borderRadius: 10,
        marginHorizontal: "1%",
        marginVertical: "3%",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
    },
    icon1: {
        marginHorizontal: "5%",
        marginVertical: "3%",
        color: "#029400"
    },
    button2: {
        justifyContent: "center",
        alignSelf: "flex-end",
        backgroundColor: "rgba(3,179,143,1)",
        height: hp("3%"),
        width: wp("35%"),
        borderRadius: 10,
        // marginHorizontal: "1%",
        marginVertical: "3%",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        position: "relative",
        marginLeft: "auto"
    },
    text1: {
        fontWeight: "bold",
        marginVertical: "2%",
        // marginHorizontal: "5%",
        // width: hp('30%'),
        fontSize: 15
    },
    firstCard: {
        // borderWidth: 1,
        // borderRadius: 2,
        flexDirection: "row",
        borderColor: "#CCC",
        flexWrap: "nowrap",
        backgroundColor: "#FFF",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        // elevation: 5,
        shadowOpacity: 0.21,
        shadowRadius: 0,
        // borderRadius: 12,
        overflow: "hidden",
        // marginTop: "5%",
        // marginHorizontal: "5%",
       // height: hp("100%"),
       // marginBottom:'10%'
    },
    text3: {
        alignSelf: "center",
        // marginVertical: "2%",
        fontFamily: "open-sans-regular",
        fontWeight: "bold",
        fontSize: 16,
        marginHorizontal: "3%"
    },
    line: {
        borderColor:'#ccc',
        borderWidth:.4,
        marginTop:'1%',
        marginBottom:'1%'
         //width:'100%'
    },
    line1: {
        borderColor:'#ccc',
        borderWidth:1,
        //marginTop:'1%',
         // marginBottom:'2%'
         //width:'100%'
    },
    line5: {
        borderColor:'#03b38f',
        borderWidth:1,
        //marginTop:'1%',
         // marginBottom:'2%'
         //width:'100%'
    },
})

export default Profile3;
