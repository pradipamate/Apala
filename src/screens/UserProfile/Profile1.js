import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
  Switch, Modal
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Container,
  Header,
  Title,
  Content,
  CardItem,
  Item,
  Label,
  Thumbnail,
  Left,
  Right,
  Body,
} from 'native-base';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { Accordion } from 'native-base';
import { Card } from 'react-native-cards';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePath from '../../Services/ImagePath';
import { isNull } from 'lodash';
//import Logout from '../../Components/Logout'
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';

const dataArray = [
  {
    title: 'Mulund . Padmashree Clinic',
    fees: '500',
  },
  { title: 'Thane . Sanjeevani Hospital', fees: '750' },
  { title: 'Chembur. SDS Hospital', fees: '550' },
];

class Profile1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 4,
      doctordata: {},
      lifestyle: {},
      regNum: '',
      business: [],
      online_Consultations: {},
      qualificaton: '',
      specialities: '',
      hospitalobj: {},
      userbasicinfo: {},
      activeSections: [],
      placeholder: "",
      //logoutmodal:false,
      docTiming: [
        {
          id: 1,
          day: 'MONDAY',
          dayTiming: '10:00AM - 03:00PM',
          eveTiming: '06:00AM - 09:00PM',
        },
        {
          id: 2,
          day: 'WEDNESDAY',
          dayTiming: '10:00AM - 03:00PM',
          eveTiming: '06:00AM - 09:00PM',
        },
        {
          id: 3,
          day: 'FRIDAY',
          dayTiming: '10:00AM - 03:00PM',
          eveTiming: '06:00AM - 09:00PM',
        },
        {
          id: 4,
          day: 'SUNDAY',
          dayTiming: '10:00AM - 03:00PM',
          eveTiming: '06:00AM - 09:00PM',
        },
      ],
    };
  }
  componentDidMount() {
    this.getDoctorDetails();
  }

  getDoctorDetails = async () => {
    let token = await AsyncStorage.getItem('Token');
    fetch('https://svcaapkadoctor.azurewebsites.net/api/profiles', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          loading: false,
        });
        console.log('doctor profile----------------------->>>1', response);
        // let business=[];
        if (!response.lifestyle) {
          console.log("no life style------------------------->>")
          this.setState({
            lifestyle: [{
              profession: "Doctoe",
            }]
          })

        } if (response.online_Consultations) {
          this.setState({
            online_Consultations: response.online_Consultations,
          });
          console.log("feesss--------------------------->>", this.state.online_Consultations)

        } else {
          // this.setState({ online_Consultations: response.online_Consultations, })
        }
        if (response.business !== []) {
          this.setState({ business: response.business })
          console.log("business is there=---------------------------")
        } else {
          console.log("business is not there=---------------------------",response.business)
          this.setState({ business: response.business })
        }
        if (!response.hospitalobj) {
          this.setState({ hospitalobj: {} })
        }


        let regNum = response.qualifications[0].reg_number;
        let qualifications = [];
        response.qualifications.map((data) => {
          qualifications.push(data.qualified_name);
        });
        console.log('qualificaton', qualifications.toString());
        let qualificaton = qualifications.toString();

        //specialities
        let specialities = [];
        response.specialities.map((data) => {
          specialities.push(data.name);
        });
        console.log('qualificaton', specialities.toString());
        let specialities1 = specialities.toString();

        let hospitalobj = response.business[0];

        this.setState({
          doctordata: response.user,
          // lifestyle: response.lifestyle,
          userbasicinfo: response.userbasicinfo,
          qualificaton: qualificaton,
          specialities: specialities1,
          regNum: regNum,
          // online_Consultations: response.online_Consultations,
          // business: response.business,
          hospitalobj: hospitalobj,
          placeholder: response.userbasicinfo.profile_photo_path
        });

      })

      .catch((error) => {
        console.error(error);
      });
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: '2%' }}>
          <EntypoIcon name="location-pin" color="rgba(3,179,143,1)" size={25} />{' '}
          {item.name}
        </Text>
        {expanded ? (
          <AntIcon
            style={{ fontSize: 18 }}
            color="rgba(3,179,143,1)"
            name="down"
          />
        ) : (
            <AntIcon style={{ fontSize: 18 }} color="rgba(3,179,143,1)" name="up" />
          )}
      </View>
    );
  }

  _renderContent = (item) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          // paddingLeft: "10%",
          // fontStyle: "italic",
        }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile2')}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon
              name="circle"
              color="rgba(3,179,143,1)"
              style={{ marginLeft: '5%', marginTop: '1%' }}
            />
            <Text
              style={{ color: '#7a7a7a' }}
            // style={styles.icon1}
            >
              {' '}
              Max 15 min wait time + Verified Details
            </Text>
          </View>
          {/* <Text style={{color: 'rgba(3,179,143,1)', marginHorizontal: '10%'}}>
            Charges for Consultation
          </Text> */}
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcon
              name="clipboard-text"
              color="rgba(3,179,143,1)"
              size={14}
              style={{ marginLeft: '5%', marginTop: '1%', }}
            />
            {/* <Text style={{color: '#7a7a7a', fontSize: 15}}>
              {' '}
              In clinic consultaion fees:
            </Text> */}
            {/* <FontAwesomeIcon
              name="rupee"
              color="black"
              size={20}
              style={{marginLeft: '4%', marginTop: '1%'}}
            /> */}
            <Text
              style={{
                color: 'rgba(3,179,143,1)',
                fontSize: 12,
                fontWeight: 'bold',
                marginLeft: '2%',
                paddingBottom: '5%'
              }}>
              {item.short_address}
            </Text>
          </View>
          {/* <Text style={[styles.icon1, {marginLeft: '10%'}]}>
            <FontAwesomeIcon name="circle" /> Available Today
          </Text> */}
          {/* {item.content} */}
        </TouchableOpacity>
      </View>
    );
  };

  renderTiming = ({ item }) => {
    console.log('item========================', item);
    return (
      <>
        <Card
          style={{
            borderRadius: 10,
            width: wp('40%'),
            height: hp('14%'),
            backgroundColor: '#e6e6e6',
          }}>
          {/* <CardImage
                        source={{ uri: url }}
                        style={{ width: 200, height: "auto", borderRadius: 15, position: 'relative' }}
                    //title={item.SubTitle}
                    /> */}
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginVertical: '10%',
              marginHorizontal: '5%',
            }}>
            <Text
              style={{
                marginHorizontal: 'auto',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {item.day}
            </Text>
            <Text style={{ marginHorizontal: 'auto', fontSize: 15 }}>
              {item.dayTiming}
            </Text>
            <Text style={{ marginHorizontal: 'auto', fontSize: 15 }}>
              {item.eveTiming}
            </Text>
          </View>
        </Card>
      </>
    );
  };

  clearAsyncStorage() {
    // console.log("ddddddd")
    // this.setState({
    //   logoutmodal:true
    // })

    //let userName = await AsyncStorage.getItem("Token")
    //console.log("userName",userName);
    // let userName=AsyncStorage.setItem("Token",null)
    //<FlashMessage duration={5000}>
    //<strong>I will disapper in 5 seconds!</strong>
    //</FlashMessage>
    AsyncStorage.setItem("Logedin", "false")
    //console.log("userName");
    // await AsyncStorage.clear()
    // .then(keys => AsyncStorage.multiRemove(keys))
    // .then(() => alert('success'));
    this.props.navigation.navigate('Registeroption')
  }

  // logout(){
  //     AsyncStorage.setItem("Logedin","false")
  //      this.props.navigation.navigate('Registeroption')
  // }


  render() {
    let imgPath = ImagePath + this.state.userbasicinfo.profile_photo_path;

    console.log(this.state.placeholder)
    return (
      <View style={styles.container}>
        <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
          <Body>
            <Title
              style={{
                color: '#fff',
                marginLeft: '8%',
                fontSize: 16,
                width: '100%',
              }}>
              Doctor Profile
              </Title>
          </Body>

          <Right style={{ flexDirection: 'row' }}>
            <TouchableOpacity
            //  onPress={() => this.props.navigation.('NotificationTab')}
            >
              <Icon1
                name="notifications-outline"
                color="#fff"
                size={22}
                style={{ marginRight: '5%' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.clearAsyncStorage()}>
              <Icon
                name="logout"
                color="#fff"
                size={24}
                style={{ marginRight: '3%' }}
              />
            </TouchableOpacity>
          </Right>

          {/* <Logout loading={this.state.logoutmodal} /> */}

        </Header>

        <ScrollView>
          {/* <View style={styles.responsiveBox}> */}

          <View style={styles.firstCard}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.icon1}>
                <FontAwesomeIcon name="circle" /> Available
              </Text>
              <View
                style={{
                  //marginLeft: '37%',
                  //marginHorizontal: '5%',
                  marginVertical: '3%',
                }}
              >
                <StarRating
                  // starStyle={{ alignSelf: "flex-end", marginRight: "5%" }}
                  starSize={22}
                  fullStarColor="#ffe100"
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
              <View>
                <TouchableOpacity style={{ backgroundColor: '#03b38f', padding: 5, borderRadius: 10, marginVertical: '4%' }}>
                  <Text onPress={() => this.props.navigation.navigate('EditDoctorProfile')} style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }} >Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#c9c9c9',
                borderBottomWidth: 1,
                marginLeft: '3%',
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <View>
                {this.state.placeholder !== null ?
                  <Image
                    source={{ uri: imgPath }}
                    style={styles.cardItemImagePlace}></Image>
                  :
                  <Image
                    source={require('../../Images/placeholder_image.png')}
                    style={styles.cardItemImagePlace}></Image>}
                    
                <Text style={{ color: '#525151', marginHorizontal: '10%' }}>

                  {this.state.userbasicinfo.uid}
                </Text>
              </View>
              <View>
                <Text style={styles.text3}>
                  {this.state.doctordata.first_name}{' '}
                </Text>
                {/* {this.state.lifestyle.profession !== "" ?
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text5}>
                      {this.state.lifestyle.profession}
                    </Text>
                  </View>
                  : null} */}
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text5}>
                    Reg.ID:
                  </Text>
                  <Text style={styles.text4}>{this.state.regNum}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text4}>EXPERIENCE IN YEARS</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text
                      style={{
                        marginHorizontal: '5%',
                        alignSelf: 'center',
                      }}>
                      Overall
                    </Text>
                    <Text style={[styles.text4, { alignSelf: 'center' }]}>
                      00
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        marginHorizontal: '5%',
                        alignSelf: 'center',
                      }}>
                      As a specialist
                    </Text>
                    <Text style={[styles.text4, { alignSelf: 'center' }]}>
                      00
                    </Text>
                  </View>
                </View>
                {/* <Text>lksdj</Text> */}
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginHorizontal: '5%',
                  marginTop: '4%',
                }}>
                <FontAwesomeIcon
                  name="graduation-cap"
                  style={{
                    color: 'rgba(3,179,143,1)',
                    fontSize: 18,
                  }}></FontAwesomeIcon>{' '}
                {this.state.qualificaton}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginHorizontal: '5%',
                  marginTop: '4%',
                }}>
                <FoundationIcon
                  name="clipboard-notes"
                  style={{
                    color: 'rgba(3,179,143,1)',
                    fontSize: 18,
                  }}></FoundationIcon>{' '}
                {this.state.specialities}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginHorizontal: '5%',
                  marginTop: '4%',
                }}>
                <SimpleLineIconsIcon
                  name="badge"
                  style={{
                    color: 'rgba(3,179,143,1)',
                    fontSize: 18,
                  }}></SimpleLineIconsIcon>
                Most Recomended
              </Text>
              <Text
                style={{
                  marginHorizontal: '5%',
                  marginTop: '4%',
                }}>
                <MaterialIconsIcon
                  name="star-rate"
                  style={{
                    color: 'rgba(3,179,143,1)',
                    fontSize: 18,
                  }}></MaterialIconsIcon>
                   Most Recomended
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
              <Text
                style={{
                  marginHorizontal: '5%',
                  marginTop: '4%',
                }}>
                <MaterialIconsIcon
                  name="verified"
                  style={{
                    color: 'rgba(3,179,143,1)',
                    fontSize: 18,
                  }}></MaterialIconsIcon>
                Verified & Trusted
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: '5%' }}>
            <Text style={styles.text1}>
              Book Online Consultation Appointment
            </Text>
            <Text style={styles.text2}>Pay online & Get 20% off</Text>
          </View>




          <View style={styles.secondCard}>
            <FontAwesomeIcon
              name="rupee"
              style={{
                fontSize: 18,
                marginLeft: '7%',
                marginVertical: '5%',
              }}></FontAwesomeIcon>
            {this.state.online_Consultations.chat_fees !== "" || null ?
              <Text
                style={{
                  marginLeft: '2%',
                  marginVertical: '3%',
                  fontSize: 18,
                  color: 'rgba(3,179,143,1)',
                }}>
                {this.state.online_Consultations.chat_fees} /-
            </Text>
              : null}
            <View>
              <Text
                style={{
                  width: hp('30%'),
                  marginVertical: "5%",
                  marginRight: '3%',
                  marginLeft: '3%',
                  fontSize: 18
                }}>
                chat Fees
              </Text>
            </View>
          </View>





          <View style={styles.secondCard}>
            <FontAwesomeIcon
              name="rupee"
              style={{
                fontSize: 18,
                marginLeft: '7%',
                marginVertical: '5%',
              }}></FontAwesomeIcon>
            <Text
              style={{
                marginLeft: '2%',
                marginVertical: '3%',
                fontSize: 18,
                color: 'rgba(3,179,143,1)',
              }}>
              {this.state.online_Consultations.voice_fees} /-
            </Text>
            <View>
              <Text
                style={{
                  width: hp('30%'),
                  marginVertical: "5%",
                  marginRight: '3%',
                  marginLeft: '3%',
                  fontSize: 18
                }}>
                Voice Fees
              </Text>

            </View>
          </View>

          <View style={styles.secondCard}>
            <FontAwesomeIcon
              name="rupee"
              style={{
                fontSize: 18,
                marginLeft: '7%',
                marginVertical: '5%',
              }}></FontAwesomeIcon>
            <Text
              style={{
                marginLeft: '2%',
                marginVertical: '3%',
                fontSize: 18,
                color: 'rgba(3,179,143,1)',
              }}>
              {this.state.online_Consultations.voice_fees} /-
              </Text>
            <View>
              <Text
                style={{
                  width: hp('30%'),
                  marginVertical: "5%",
                  marginRight: '3%',
                  marginLeft: '3%',
                  fontSize: 18
                }}>
                Voice Fees
                </Text>
            </View>
          </View>

          {/* 
          <Modal
            isVisible={ this.state.loading }
            animationIn='fadeIn'
            animationOut='fadeOut'
            hasBackdrop={ false }
            coverScreen={ true } >
            <View style={ styles.centeredView }>
              <View style={ styles.modalView }>
                <Text style={{fontWeight:'bold',color:"#03b38f"}} onPress={()=>this.logout}>Logout</Text>
              </View>
            </View>
          </Modal> */}

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <Text style={styles.text1}>
              Hospitals & Clinics Dr.{this.state.userbasicinfo.user_full_name} provides Consultation
            </Text>
          </View>
          <View>
            <Accordion
              dataArray={this.state.business}
              expanded={0}
              icon="arrow-down"
              expandedIcon="arrow-up"
              iconStyle={{ color: 'rgba(3,179,143,1)' }}
              expandedIconStyle={{ color: 'rgba(3,179,143,1)' }}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '5%',
              marginTop: '3%',
            }}>
            <Text style={styles.text1}>Clinic Details</Text>
          </View>
          <View style={styles.thirdCard}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      styles.text4,
                      { marginLeft: '5%', fontSize: 16, marginTop: '2%' },
                    ]}>
                    {this.state.hospitalobj.name}
                  </Text>
                  <Text
                    style={{
                      color: 'blue',
                      alignContent: 'flex-end',
                      marginHorizontal: '15%',
                      marginVertical: '2%',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() =>
                      Linking.openURL('https://www.google.com/maps/')
                    }>
                    Get Location
                  </Text>
                </View>
                <Text
                  style={{ color: '#7a7a7a', marginLeft: '5%', fontSize: 13 }}
                // style={styles.icon1}
                >
                  {' '}
                  {this.state.hospitalobj.short_address}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      color: '#7a7a7a',
                      fontSize: 13,
                      marginLeft: '5%',
                      width: wp('37%'),
                    }}>
                    {' '}
                    Clinic fees:
                  </Text>
                  <FontAwesomeIcon
                    name="rupee"
                    color="black"
                    size={20}
                    style={{ marginLeft: '4%', marginTop: '1%' }}
                  />
                  <Text
                    style={{
                      color: 'rgba(3,179,143,1)',
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginLeft: '2%',
                    }}>
                    200 /-
                  </Text>
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderLeftColor: '#9e9e9e',
                      marginHorizontal: '2%',
                    }}
                  />
                  <Text style={styles.text6}>Pay online & Get 20% off</Text>
                </View>
                {/* <Text
                  style={{
                    color: '#575757',
                    fontSize: 15,
                    marginLeft: '5%',
                    fontSize: 16,
                    width: wp('37%'),
                    marginVertical: '3%',
                  }}>
                  Timings
                </Text> */}

                {/* <View
                  style={{
                    paddingRight: 15,
                    width: wp('100%'),
                    paddingLeft: 15,
                  }}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    style={{
                      width: wp('100%'),
                      // marginLeft: "2%", marginRight: "2%"
                      // marginHorizontal: "3%"
                    }}
                    data={this.state.docTiming}
                    renderItem={this.renderTiming}
                    keyExtractor={(item) => item.id}></FlatList>
                </View> */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: wp('100%'),
                  }}> */}
                {/* <TouchableOpacity style={styles.button1}>
                    <Text style={{color: '#fff', padding: 12}}>
                      <MaterialIconsIcon
                        name="videocam"
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          paddingRight: 5,
                        }}></MaterialIconsIcon>
                      Online Consultation
                    </Text>
                    <View style={{ flexDirection: "row", marginHorizontal: "5%", marginTop: "5%"}}>
                                            <MaterialIconsIcon name="videocam"
                                                style={{ color: "#fff", fontSize: 18 }}></MaterialIconsIcon>
                                            <Text style={{ color: "#fff", marginHorizontal: "5%", fontSize: 16 }}>
                                                Online Consultation
                                </Text>
                                        </View>
                  </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.button1}>
                    <Text style={{color: '#fff', padding: 12}}>
                      <MaterialCommunityIcon
                        name="clipboard-text"
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          paddingRight: 5,
                        }}></MaterialCommunityIcon>
                      Book Appointment
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button1}>
                    <Text style={{color: '#fff', padding: 12}}>
                      <FontAwesomeIcon
                        name="home"
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          paddingRight: 5,
                        }}></FontAwesomeIcon>
                      Home Visit
                    </Text>
                  </TouchableOpacity>
                */}
                {/* </View> */}
              </View>
            </View>
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}

export default Profile1;

const styles = StyleSheet.create({

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: '10%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
    position: 'absolute',
    top: "3%",
    right: 0,
    //  flex: 1,
    // justifyContent: "center",
    //  alignItems: "center",
    //marginTop: 22
  },
  container: {
    flex: 1,
  },
  button1: {
    justifyContent: 'center',
    backgroundColor: 'rgba(3,179,143,1)',
    height: hp('8%'),
    width: wp('30%'),
    borderRadius: 10,
    marginHorizontal: '1%',
    marginVertical: '3%',
  },
  responsiveBox: {
    width: wp('100%'),
    height: hp('100%'),
    borderWidth: 2,
    borderColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // marginHorizontal: "10%",
    // marginVertical: "10%"
  },
  secondCard: {
    // borderWidth: 1,
    // borderRadius: 2,
    flexDirection: 'row',
    borderColor: '#CCC',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    // elevation: 5,
    shadowOpacity: 0.21,
    shadowRadius: 0,
    // borderRadius: 12,
    overflow: 'hidden',
    // marginTop: "5%",
    // marginHorizontal: "5%",
    height: hp('7%'),
  },
  thirdCard: {
    // borderWidth: 1,
    // borderRadius: 2,
    flexDirection: 'row',
    borderColor: '#CCC',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    // elevation: 5,
    shadowOpacity: 0.21,
    shadowRadius: 0,
    // borderRadius: 12,
    overflow: 'hidden',
    marginBottom: '5%',
    paddingBottom: '5%'
    // marginTop: "5%",
    // marginHorizontal: "5%",
    // height: hp('47%'),
  },
  icon1: {
    marginHorizontal: '5%',
    marginVertical: '3%',
    color: '#029400',
  },
  firstCard: {
    // flex: 1,
    // flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 2,
    borderColor: '#CCC',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.21,
    shadowRadius: 0,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: '2%',
    marginHorizontal: '3%',
    // height: hp('55%')
  },
  cardItemImagePlace: {
    backgroundColor: '#ccc',
    height: 85,
    width: 85,
    // margin: 16,
    borderRadius: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    // elevation: 5,
    shadowOpacity: 0.21,
    shadowRadius: 0,
    marginVertical: '5%',
    marginHorizontal: '5%',
  },
  text1: {
    fontWeight: 'bold',
    marginVertical: '2%',
    // marginHorizontal: "5%",
    width: hp('30%'),
    fontSize: 15,
  },
  text2: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    marginVertical: '2%',
    marginHorizontal: '5%',
    color: 'rgba(3,179,143,1)',
    width: wp('20%'),
  },
  text3: {
    justifyContent: 'flex-start',
    marginTop: '4%',
    fontFamily: 'open-sans-regular',
    fontWeight: 'bold',
    fontSize: 16,
    // marginLeft: "5%"
  },
  text5: {
    fontFamily: 'pt-sans-regular',
    color: '#757575',
    // marginHorizontal: "5%",
    fontSize: 14,
  },
  text4: {
    alignSelf: 'auto',
    fontFamily: 'open-sans-regular',
    color: 'rgba(3,179,143,1)',
    // marginHorizontal: "5%",
    fontWeight: 'bold',
    fontSize: 15,
  },
  text6: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    // marginVertical: "2%",
    // marginHorizontal: "5%",
    color: 'rgba(3,179,143,1)',
    width: wp('25%'),
  },
  fourthCard: {
    // flex: 1,
    // flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 2,
    borderColor: '#CCC',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.21,
    shadowRadius: 0,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: '2%',
    marginHorizontal: '3%',
    height: hp('25%'),
  },
});
