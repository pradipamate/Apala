

import React, { Component, useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, ScrollView, TouchableOpacity, AsyncStorage, FlatList, Modal, Image, Switch, StyleSheet, Text, Alert,TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'
import SelectMultiple from 'react-native-select-multiple'
// import { Container, Header, Title, Left, Right, Body } from 'native-base';
import { Container, Header, Title, Content, Card, CardItem, Item, Label, Button, Thumbnail, Left, Right, Icon, Body, Textarea } from 'native-base';
import { Input } from 'react-native-elements'
import imagepath from '../../Services/ImagePath'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'
// const findDoctordata = [
//   {
//     id: 1,
//     name: 'shivam Parswar,Physician',
//     Vname: 'Corona Vaccine',
//     details: '23rd Aug 2020,11:30 AM',
//     buttonurl: 'FindDoctor',
//     buttonname: 'Find Doctors',
//     desp: 'Article on how to tacle or take prescautions on corona Virus Pandemic. Article on how to tacle or take prescau- tions on corona Virus Pandemic',
//     url: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',

//   },
//   {
//     id: 2,
//     name: 'Ajit Dhadke,Gynaecologist',
//     Vname: 'Corona Vaccine',
//     details: '2nd sept 2020,11:30 AM',
//     buttonurl: 'https://www.google.com/',
//     buttonname: 'Start Consulting',
//     desp: 'Article on how to tacle or take prescautions on corona Virus Pandemic. Article on how to tacle or take prescau- tions on corona Virus Pandemic',

//     url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
//   },
//   {
//     id: 3,
//     name: 'Akshay Raskar,Dentist',
//     Vname: 'Swain Flu Vaccine',
//     details: '20th Jan 2020,11:30 AM',
//     buttonurl: 'https://www.google.com/',
//     buttonname: 'Start Consulting',
//     desp: 'Article on how to tacle or take prescautions on corona Virus Pandemic. Article on how to tacle or take prescau- tions on corona Virus Pandemic',
//     url: 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80',
//   },
// ]

let who_can_see = [
  { label: "Patients Can See", value: 'patient' },
  { label: "All Doctors Can See", value: 'doctor' },
  { label: "Everyone Can See", value: 'public' },
]
const Tab = createMaterialTopTabNavigator();

export default function App(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [myCases, setMyCases] = useState([]);
  const [discussions, setDiscussion] = useState([])
  const [likeIcon, setlikeIcon] = useState("thumb-up")
  const [comment, setcomment] = useState([])
  const [token, setToken] = useState("")
  // const [AllComments, setAllComments] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState("")
  const [openMyCase, setOpenMyCase] = useState(false)
  const [likedByUser, setlikedByUser] = useState([])
  let [multipleFile, setSingleFile] = useState([]);
  const [caseTitle, setCaseTitle] = useState("")
  const [caseDesc, setCaseDesc] = useState("")
  const [streamId, setStreamId] = useState("")
  const [specialityId, setSpecialityId] = useState("")
  const [openEditModal, SetopenEditModal] = useState(false)
  const [openDraftModal, setopenDraftModal] = useState(false)
  const [openSpecialityModal, setopenSpecialityModal] = useState(false)
  const [isSelected, setSelection] = useState(false);
  const [superSpeciality, setSuperSpeciality] = useState([])
  const [selected, setSelected] = useState(false)
  const [visibility, setvisibility] = useState([])
  const [isDraft, setisDraft] = useState(false)

  useEffect(() => {
    getDiscussions()
   getmyCasesData();
   getSpecialityList();
   getUserDetails()
  }, []);



  function getSpecialityList() {
    // api/specialities

    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/superspecialiity',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.log('response in getSpecialityList==========', response);
        // let business=[];
        let data = []
        if (response) {
          data = response.map((item) => {
            return {
              label: item.name, value: item.speciality_id, url: item.imagepath
            }
          })
        }
       // console.log("data===============================", data);
        setSuperSpeciality(data)

      })
      .catch((error) => {
        console.error(error);
      });
  }

  
  function getUserDetails() {
    let token = props.navigation.getParam('token', '');
    console.log(' token data???', token);

    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/profiles',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
      //  console.log('userDetails==========', response);
        // let business=[];
        setProfilePhoto(response.userbasicinfo.profile_photo_path);
        setStreamId(response.streams[0].stream_id)
        setSpecialityId(response.specialities[0].speciality_id)
        // fetch(
        //   'https://svcaapkadoctor.azurewebsites.net/api/consultants/'+response.guid,
        //   {
        //     method: 'GET',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //       Authorization: 'Bearer ' + token,
        //     },
        //   },
        // )
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log('consultant details==========', response);
        //     // let business=[];
        //     setProfilePhoto(response.profile_photo_path);


        //   })

        //   .catch((error) => {
        //     console.error(error);
        //   });

      })
      .catch((error) => {
        console.error(error);
      });
  }


  // function getUpdatedPost(item){
    
  // }


  function getDiscussions() {
    let token = props.navigation.getParam('token', '');
    setToken(token)

    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/cases',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.log('Discussions====@############################ ,,,@@@@@@', response);
        // let business=[];
        setDiscussion(response);
      })

      .catch((error) => {
        console.error(error);
      });
  }


  function getmyCasesData() {
    let token = props.navigation.getParam('token', '');
    console.log(' token data???', token);

    // getOnlineConsultsData()
    console.log(
      'Token>>>>>>>>>>>>>555555>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      props.navigation.getParam('token'),
    );
    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/cases/users',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
     //   console.log('my case@############################ ,,,@@@@@@', response);
        // let business=[];
        setMyCases(response);
      })

      .catch((error) => {
        console.error(error);
      });
  }

  const onLike = (e, item, index) => {
    let token = props.navigation.getParam('token', '');
    if (likedByUser.includes(index) && item.liked == false) {
      let i = likedByUser.indexOf(index);
      likedByUser.splice(i, 1);
      setlikedByUser(obj => [...obj])
    //  console.log("likedByUser===============", likedByUser);

    }
    else {
      setlikedByUser(obj => [...obj, index])
    }
    let data = {
      case_id: item.case_id
    }
    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/cases/togglelike',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
     //   console.log('liked status===========', response);
        if (response) {
          if (response.message == "Success") {
            // getUpdatedPost(item)
            getDiscussions()
          }
        }
        // let business=[];
        // setMyCases(response);
      })

      .catch((error) => {
        console.error(error);
      });


    // console.log("item onLike=====", e);
    // console.log("item=========", index)
    // discussions.map((discussion, i) => {
    //   if (i === index) {
    //     if (likeIcon === "thumb-up") {
    //       setlikeIcon("thumb-up-outline")
    //     }
    //     else {
    //       setlikeIcon("thumb-up")
    //     }
    //   }
    // })
  }

  const handleEditPost = (item) => {
   // console.log("item in handleEditPost=====", item);
    setCaseTitle(item.case_headings)
    setCaseDesc(item.case_desc)
    SetopenEditModal(true)
  }


       
  const handleOpenMyCase = () => {
    setOpenMyCase(true)
    setModalOpen(false)
}


  const handleDeletePost = (item) => {
//    console.log("item in handleDeletePost======", item);
    fetch(
      'https://svcaapkadoctor.azurewebsites.net//api/cases/' + item.case_id,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((response) => response.text())
      .then((response) => {
     //   console.log('handleShowComments@############################ ,,,@@@@@@', response);
        if (response) {
          // setAllComments(response)
          // setModalOpen(true)
          console.log("response=============", response);
          getmyCasesData()
        }
        // let business=[];
        // setMyCases(response);
      })

      .catch((error) => {
        console.error(error);
      });


  }





  function renderCaseItems(item) {
   // console.log("itemmmmm in cases====", item);
    let url = imagepath + item.item.user.profile_photo_path
    return (
      <Card style={{ borderRadius: 20 }}>
        <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
          <Left style={{ flexDirection: 'row' }}>

            <Image
              square
              style={{ height: 50, width: 50, borderRadius: 25 }}
              source={{ uri: url }}
            />
            <View style={{ marginLeft: '8%' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.item.case_headings} </Text>
              <Text style={{ fontSize: 13, color: '#03b38f' }}>Dr.{item.item.user.fullname} </Text>
              <Text style={{ fontSize: 12, color: '#999' }}>{item.item.created_at}</Text>

            </View>

          </Left>
          <Right>

          </Right>
        </CardItem>
        <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
          <Left style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: '3%' }}>
              <Text style={{ fontSize: 13, color: '#333' }}>{item.item.case_desc} </Text>
            </View>
          </Left>
        </CardItem>
      </Card>
    )


  }
  // function renderItems(item, index) {
  //   console.log("itemmmmm in discussion", item);
  //   console.log("index===============", index);
  //   let url = ""
  //   if (item.user != undefined) {
  //     url = imagepath + item.user.profile_photo_path
  //   }

  //   return (

  //     <Card style={{ borderRadius: 20 }}>
  //       <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
  //         <Left style={{ flexDirection: 'row' }}>

  //           <Image
  //             square
  //             style={{ height: 50, width: 50, borderRadius: 25 }}
  //             source={{ uri: url }}
  //           />
  //           {item.user != undefined ?
  //             <View style={{ marginLeft: '8%' }}>
  //               <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.case_headings} </Text>

  //               <Text style={{ fontSize: 13, color: '#03b38f' }}>Dr.{item.user.fullname} </Text>

  //               <Text style={{ fontSize: 12, color: '#999' }}>{item.created_at}</Text>

  //             </View>
  //             : null}

  //         </Left>
  //         <Right>

  //         </Right>
  //       </CardItem>
  //       <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
  //         <Left style={{ flexDirection: 'row' }}>

  //           <View style={{ marginLeft: '3%' }}>
  //             <Text style={{ fontSize: 13, color: '#333' }}>{item.case_desc} </Text>

  //           </View>

  //         </Left>

  //       </CardItem>
  //       <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
  //         <View style={{ flexDirection: 'row', marginLeft: '3%', justifyContent: "space-between" }}>
  //           <TouchableOpacity id={index} onPress={(e) => onLike(e, item, index)}>
  //             <Icon2 name={likeIcon} style={{ fontSize: 20, color: '#03b38f' }} >
  //             </Icon2>
  //           </TouchableOpacity>

  //           <Text style={{ fontSize: 12, color: "gray" }}> {item.like_count} Likes</Text>
  //           <Icon2 name="wechat" style={{ fontSize: 20, color: '#03b38f', marginLeft: "7%" }}>
  //           </Icon2>
  //           <Text style={{ fontSize: 12, color: "gray" }} onPress={() => handleShowComments(item)}> {item.comment_count} Comments</Text>
  //           <Icon2 name="heart" style={{ fontSize: 20, color: '#03b38f', marginLeft: "7%" }}>
  //           </Icon2>
  //           <Text style={{ fontSize: 12, color: "gray" }}> {item.comment_count} Favourited</Text>
  //         </View>

  //       </CardItem>
  //       <CardItem>
  //         <View style={{ width: '90%', flexDirection: 'row' }}>
  //           <Image
  //             square
  //             style={{ height: 40, width: 40, borderRadius: 25 }}
  //             source={{ uri: url }}
  //           />
  //           <Input
  //             containerStyle={{ height: 40, marginTop: 0, marginBottom: 20 }}
  //             placeholder='Add a comment'
  //             style={{ fontSize: 14 }}

  //             rightIcon={
  //               <Icon2
  //                 name='send'
  //                 size={20}
  //                 color='#03B38F'
  //                 type='material-community'
  //                 onPress={() => onSend(item)}
  //               />
  //             }
  //             inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
  //             leftIconContainerStyle={{ marginLeft: 2 }}
  //             value={comment}
  //             onChangeText={text => setcomment(text)}
  //           // errorMessage={this.state.userNameErrMsg}
  //           //  keyboardType='numeric'
  //           />
  //         </View>
  //       </CardItem>
  //     </Card>
  //   );
  // };

  // function DiscussiontScreen() {
  //   return (
  //     // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <FlatList
  //       // horizontal={true}
  //       // showsHorizontalScrollIndicator={false}
  //       style={{ marginVertical: '3%', marginHorizontal: '3%' }}
  //       data={discussions}
  //       renderItem={({ item, index }) => renderItems(item, index)}
  //       keyExtractor={(item, index) => index}></FlatList>
  //     // </View>

  //   )
  // }




  const renderLabel = (label, style) => {
    // console.log("urlllll",url);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Image style={{width: 42, height: 42}} source={{uri:url}} /> */}
        <View style={{ marginLeft: 10 }}>
          <Text style={style}>{label}</Text>
        </View>
      </View>
    )
  }

  const render_who_see_Label = (label, style) => {
    // console.log("urlllll",url);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        {/* <Image style={{width: 42, height: 42}} source={{uri:url}} /> */}
        <View style={{ marginLeft: 10 }}>
          {label == "Patients Can See" ?
            <>
              <Text style={style}>{label}</Text>
              <Text style={styles.subtext}>Note: All the Patients Registered to app can see your Case Discussion</Text>
            </>
            : label == "All Doctors Can See" ?
              <>
                <Text style={style}>{label}</Text>
                <Text style={styles.subtext}>Note: All the Doctors can see your Case Discussion</Text>
              </>
              : <>
                <Text style={style}>{label}</Text>
                <Text style={styles.subtext}>Note: Your Post will reach to only the ones you select.</Text>
              </>
          }
        </View>
      </View>
    )
  }




class DiscussiontScreen extends Component {
    constructor() {
      super();
        this.state={
                textInputs: [],
                AllComments:[],
                ModalOpen:false
          }
      }

      onSend = (item) => {
        console.log("comment========", this.state.textInputs);
         let data = {
           case_id: item.case_id,
           comment: this.state.textInputs[0]
         }
         fetch(
           'https://svcaapkadoctor.azurewebsites.net/api/cases/comment',
           {
             method: 'POST',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: 'Bearer ' + token,
             },
             body: JSON.stringify(data),
           },
         )
           .then((response) => response.json())
           .then((response) => {
            console.log('comment@############################ ,,,@@@@@@', response);
             if (response) {
               if (response.message === "Comment Created Successfully.")
              //   setcomment("")
                 this.setState({
                  AllComments:""
                 })
               Alert.alert("success", "comment added successfully")
             }
           })

           .catch((error) => {
             console.error(error);
           });
       }


     handleShowComments = (item) => {
        // console.log("handleShowCommentsdfsdfdsfs=========", item);
         fetch(
           'https://svcaapkadoctor.azurewebsites.net/api/cases/comments/' + item.case_id,
           {
             method: 'GET',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: 'Bearer ' + token,
             },
           },
         )
           .then((response) => response.json())
           .then((response) => {
           //  console.log('handleShowComments@############################ ,,,@@@@@@', response);
             if (response) {
             
              this.setState({
                AllComments:response,
                ModalOpen:true
              })

              //  setAllComments(response)
              //  setModalOpen(true)
             }
           })
     
           .catch((error) => {
             console.error(error);
           });
       }

     
       closeModal = () => {
          this.setState({
            ModalOpen:false
          })
       }
     
     


  
    
    render(){

    return (
      <ScrollView>
        <View style={{ padding: '2%' }}>
          {discussions !== [] ? discussions.map((item, index) => (

            <Card key={index} style={{ borderRadius: 20 }}>

              <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
                <Left style={{ flexDirection: 'row' }}>
                  {item.user !== null ?
                    <Image
                      square
                      style={{ height: 50, width: 50, borderRadius: 25 }}
                      source={{ uri: imagepath + item.user.profile_photo_path }}
                    />
                    : <View style={{ height: 50, width: 50, borderRadius: 25 }}></View>}
                  {item.user != undefined ?
                    <View style={{ marginLeft: '8%' }}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.case_headings} </Text>

                      <Text style={{ fontSize: 13, color: '#03b38f' }}>Dr.{item.user.fullname} </Text>

                      <Text style={{ fontSize: 12, color: '#999' }}>{item.created_at}</Text>

                    </View>
                    : null}

                </Left>
                <Right>

                </Right>
              </CardItem>
              <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
                <Left style={{ flexDirection: 'row' }}>

                  <View style={{ marginLeft: '3%' }}>
                    <Text style={{ fontSize: 13, color: '#333' }}>{item.case_desc} </Text>

                  </View>

                </Left>

              </CardItem>
              <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
                <View style={{ flexDirection: 'row', marginLeft: '3%', justifyContent: "space-between" }}>
                  {/* <TouchableOpacity name={index} > */}
                  {
                    likedByUser.includes(index) ? (
                      <Icon2 name={"thumb-up"} id={item.case_id} key={index} onPress={(e) => onLike(e, item, index)} style={{ fontSize: 20, color: '#03b38f' }} >
                      </Icon2>
                    ) : (<Icon2 name={"thumb-up-outline"} id={item.case_id} key={index} onPress={(e) => onLike(e, item, index)} style={{ fontSize: 20, color: '#03b38f' }} >
                    </Icon2>)
                  }
                  {/* </TouchableOpacity> */}

                  <Text style={{ fontSize: 12, color: "gray" }}> {item.like_count} Likes</Text>
                  <Icon2 name="wechat" style={{ fontSize: 20, color: '#03b38f', marginLeft: "7%" }}>
                  </Icon2>
                  <Text style={{ fontSize: 12, color: "gray" }} onPress={() => this.handleShowComments(item)}> {item.comment_count} Comments</Text>
                  <Icon2 name="heart" style={{ fontSize: 20, color: '#03b38f', marginLeft: "7%" }}>
                  </Icon2>
                  <Text style={{ fontSize: 12, color: "gray" }}> {item.comment_count} Favourited</Text>
                </View>

              </CardItem>
              <CardItem>
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  {profilePhoto !== null ?
                    <Image
                      square
                      style={{ height: 40, width: 40, borderRadius: 25 }}
                      source={{ uri: imagepath + profilePhoto }}
                    />
                    : <View style={{ height: 50, width: 50, borderRadius: 25 }}></View>}
                  <Input
                    placeholder='Add a comment'
                    style={{ fontSize: 15 }}

                    rightIcon={
                      <Icon2
                        name='send'
                        size={25}
                        color='#03B38F'
                        type='material-community'
                        onPress={() => this.onSend(item)}
                      />
                    }
                    inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10,height:40}}
                    leftIconContainerStyle={{ marginLeft: 2 }}
                    onChangeText={text => {
                      let { textInputs } = this.state;
                      textInputs[index] = text;
                      this.setState({
                        textInputs,
                      });
                      console.log(this.state.textInputs)
                      
                    }}
                    value={this.state.textInputs[index]}
                  />
                </View>
              </CardItem>
            </Card>
          ))

            : null}
        </View>


        <Modal
              transparent={true}
              animationType="slide"
              style={styles.centeredView}
              animationType={'slide'}
              visible={this.state.ModalOpen}
              // show={this.state.ModalOpen}
              onRequestClose={() => this.closeModal() }>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: "row", width: '100%', borderBottomColor: "#000", borderBottomWidth: 1 }}>
                    <View style={{ width: '95%' }}>
                      <Text>Comments</Text>
                    </View>
                    <View style={{ marginBottom: 10, alignSelf: "flex-end" }}>
                      <Icon name="md-close" style={{
                        color: '#03b38f',
                        fontSize: 35,
                        // position: 'absolute',
                        right: 0,
                        top: 1,
                      }}
                        onPress={() => 
                          this.closeModal()
                        } />
                    </View>
                  </View>

                  <View
                    style={{
                      borderBottomColor: 'black !important',
                      borderBottomWidth: 6,
                    }}
                  />
                  <ScrollView style={{ width: '100%' }}>
                    {this.state.AllComments !== [] && this.state.AllComments !==undefined ? this.state.AllComments.map(item =>

                      <Card style={{ borderRadius: 20, width: 'auto', alignSelf: "flex-start" }}>
                        <CardItem style={{ borderRadius: 20, backgroundColor: "#ececec", }}>
                          <View style={{ flexDirection: "column" }}>
                            {item.user !== null ?
                              <Text style={{ fontSize: 12, color: '#03b38f' }}>{item.user.fullname}</Text>
                              : null}
                            <Text>{item.comment}</Text>

                          </View>
                        </CardItem>
                      </Card>
                    )
                      : null}

                    <View>
                    </View>
                    <View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal> 

      </ScrollView>
       )
    }
    
  }




  function MycasesScreen() {

    return (
      <>
        <ScrollView>
          <View style={{ padding: '2%' }}>
            {myCases.length !== 0 ? myCases.map((item, index) =>
              <Card style={{ borderRadius: 20 }}>
                <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
                  <Left style={{ flexDirection: 'row' }}>

                    <Image
                      square
                      style={{ height: 50, width: 50, borderRadius: 25 }}
                      source={{ uri: imagepath + item.user.profile_photo_path }}
                    />
                    <View style={{ marginLeft: '8%' }}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.case_headings} </Text>
                      <Text style={{ fontSize: 13, color: '#03b38f' }}>Dr.{item.user.fullname} </Text>
                      <Text style={{ fontSize: 12, color: '#999' }}>{item.created_at}</Text>

                    </View>

                  </Left>
                  <Right>

                  </Right>
                </CardItem>
                <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
                  <Left style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: '3%' }}>
                      <Text style={{ fontSize: 13, color: '#333' }}>{item.case_desc} </Text>
                    </View>
                  </Left>
                </CardItem>
                <CardItem style={{ borderRadius: 40, marginHorizontal: '0%' }}>
                  <View style={{ flexDirection: 'row', marginLeft: '3%', justifyContent: "space-between" }}>
                    {/* <TouchableOpacity name={index} > */}
                    {
                      likedByUser.includes(index) ? (
                        <Icon2 name={"thumb-up"} id={item.case_id} key={index} onPress={(e) => onLike(e, item, index)} style={{ fontSize: 20, color: '#03b38f' }} >
                        </Icon2>
                      ) : (<Icon2 name={"thumb-up-outline"} id={item.case_id} key={index} onPress={(e) => onLike(e, item, index)} style={{ fontSize: 20, color: '#03b38f' }} >
                      </Icon2>)
                    }


                    {/* </TouchableOpacity> */}

                    <Text style={{ fontSize: 12, color: "gray" }}> {item.like_count} Likes</Text>
                    <Icon2 name="wechat" style={{ fontSize: 20, color: '#03b38f', marginLeft: "7%" }}>
                    </Icon2>
                    {/* <Text style={{ fontSize: 12, color: "gray" }} onPress={() => handleShowComments(item)}> {item.comment_count} Comments</Text> */}
                    <Icon2 name="heart" style={{ fontSize: 20, color: '#03b38f', marginLeft: "7%" }}>
                    </Icon2>
                    <Text style={{ fontSize: 12, color: "gray" }}> {item.comment_count} Favourited</Text>
                    {item.isdraft == true ?
                      <>
                        <Icon2 name="delete" style={{ fontSize: 20, color: '#F75E38', marginLeft: "7%" }} onPress={() => handleDeletePost(item)}>
                        </Icon2>
                        <Icon2 name="pencil" style={{ fontSize: 20, color: '#213A8B', marginLeft: "4%" }} onPress={() => handleEditPost(item)}>
                        </Icon2>
                      </>
                     : null} 
                  </View>

                </CardItem>
                <CardItem>
                  <View style={{ width: '90%', flexDirection: 'row' }}>
                    {profilePhoto !== null ?
                      <Image
                        square
                        style={{ height: 40, width: 40, borderRadius: 25 }}
                        source={{ uri: imagepath + profilePhoto }}
                      />
                      : <View style={{ height: 50, width: 50, borderRadius: 25 }}></View>}
                    <Input
                      containerStyle={{ height: 40, marginTop: 0, marginBottom: 20,}}
                      placeholder='Add a comment'
                      style={{ fontSize: 14 }}

                      rightIcon={
                        <Icon2
                          name='send'
                          size={20}
                          color='#03B38F'
                          type='material-community'
                          onPress={() => onSend(item)}
                        />
                      }
                      inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
                      leftIconContainerStyle={{ marginLeft: 2 }}
                      value={comment[index]}
                      onChangeText={text => {
                        // let { comment } = this.state;
                        // console.log("dzfs=============================================>",text);
                        // comment[index] = text;
                        // this.setState({
                        //   comment,
                        // });
                      }}
                      // onChangeText={text => setcomment(text)}
                    // errorMessage={this.state.userNameErrMsg}
                    //  keyboardType='numeric'
                    />
                  </View>
                </CardItem>
              </Card>
            ) : null}
          </View>
        </ScrollView>

        <FAB
          style={styles.fab}
          medium
          icon="plus"
          onPress={() => handleOpenMyCase()}
        />
      </>
    )
  }

  // function MycasesScreen() {
  //   return (
  //     <>
  //       <FlatList
  //         // horizontal={true}
  //         // showsHorizontalScrollIndicator={false}
  //         style={{ marginHorizontal: '3%', position: "relative" }}
  //         data={myCases}
  //         renderItem={renderCaseItems}
  //         keyExtractor={item => item.id}></FlatList>

  //       <FAB
  //         style={styles.fab}
  //         medium
  //         icon="plus"
  //         onPress={() => handleOpenMyCase()}
  //       />


  //     </>
  //   );
  // }



  const closeModal = () => {
    setModalOpen(false)
  }
  const closeEditModal = () => {
    SetopenEditModal(false)
  }
  const closeDraftModal = () => {
    setopenDraftModal(false)
  }
  const closeSpecialityModal = () => {
    setopenSpecialityModal(false)
  }
  const closeMyCaseModal = () => {
    setOpenMyCase(false)
  }

  const handleEditSave = () => {
    let speciality = []
    let visibilityData = []
    selected.map(i => {
      speciality.push(i.value)
    })
    visibility.map(i => {
      visibilityData.push(i.value)
    })


    console.log("speciality========visibilityData=============", speciality.toString(), visibilityData.toString());

    let data = {
      case_headings: caseTitle,
      case_desc: caseDesc,
      stream_id: streamId,
      speciality_id: speciality.toString(),
      visibility_type: visibilityData.toString(),
      isdraft: isDraft
    }
    console.log("data in handleSpecialitySubmit==================", data);
    let method = "PUT"
    onAddPost(data, method)
  }



  const onSelectSpeciality = (item) => {
    console.log("item===================", item);
    // setSelected(!selected)


    setSelected(item)
  }
  const onSelectVisibility = (item) => {
    console.log("visibility==================", item);

    setvisibility(item)
  }



  const onAddPost = (data, method) => {


    fetch(
      'https://svcaapkadoctor.azurewebsites.net/api/cases',
      {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.log('handleSave MyCase Response############################ ,,,@@@@@@', response);
        if (response) {
          if (response.message === "Case Created Successfully.")
            setCaseTitle("")
          setCaseDesc("")
          getDiscussions()
          getmyCasesData();
          setOpenMyCase(false)
          setopenSpecialityModal(false)
          setvisibility([])
          setSuperSpeciality([])
          setSelected([])
          setSingleFile([])

          console.log('multipleFile======', multipleFile.length);
          if (multipleFile.length !== 0) {
            let data = [
              { name: 'case_id', data: (response.case_id.toString()) },
            ]
            multipleFile.map(i => {
              data.push({ name: 'type', data: (i.type) },
                {
                  name: 'file', filename: (i.name),
                  data: RNFetchBlob.wrap(i.uri), type: i.type
                })
            })

            console.log("data in RNFetchBlob=====================", data);

            RNFetchBlob.fetch('POST', "https://svcaapkadoctor.azurewebsites.net/api/cases/uploadfile", {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }, data).then((response) => response.json())
              .then((response) => {
                console.log("selfieeee blob response....", response);

                if (response !== null) {
                  Alert.alert("Message", "Post Added successfully.")
                  setCaseTitle("")
                  setCaseDesc("")
                  getDiscussions()
                  getmyCasesData();
                  setOpenMyCase(false)
                  setopenSpecialityModal(false)
                  setvisibility([])
                  setSuperSpeciality([])
                  setSelected([])
                  setSingleFile([])
                }
                //  this.props.navigation.navigate('DocumentList');
                // ...
              }).catch((err) => {

                setCaseTitle("")
                setCaseDesc("")
                getDiscussions()
                getmyCasesData();
                setOpenMyCase(false)
                setopenSpecialityModal(false)
                setvisibility([])
                setSuperSpeciality([])
                setSelected([])
                setSingleFile([])
                console.log(" errorrr  Fectch blob response....", err);
              })
          }





        }

      })

      .catch((error) => {
        console.error(error);
      });



  }
  const handleSpecialitySubmit = () => {
    let speciality = []
    let visibilityData = []
    selected.map(i => {
      speciality.push(i.value)
    })
    visibility.map(i => {
      visibilityData.push(i.value)
    })


    console.log("speciality========visibilityData=============", speciality.toString(), visibilityData.toString());

    let data = {
      case_headings: caseTitle,
      case_desc: caseDesc,
      stream_id: streamId,
      speciality_id: speciality.toString(),
      visibility_type: visibilityData.toString(),
      isdraft: isDraft
    }
    console.log("data in handleSpecialitySubmit==================", data);
    let method = "POST"
    onAddPost(data, method)

  }

  const handleSave = () => {
    setOpenMyCase(false)
    setisDraft(false)
    setopenSpecialityModal(true)
  }

  const handleDraft = () => {
    setopenDraftModal(true)
  }
  const handleEditDraft = () => {
    setopenDraftModal(true)
  }
  const handleDiscard = () => {
    setopenDraftModal(false)
  }
  const handleSaveDraft = () => {
    getSpecialityList()
    setopenDraftModal(false)
    setOpenMyCase(false)
    setisDraft(true)
    setopenSpecialityModal(true)
  }
  let selectFile = async () => {
    //Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pickMultiple({
        //Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('res : ' + res[0].type);
      //Setting the state to show single file attributes
      if (res) {
        setSingleFile(res);
      }

    } catch (err) {
      setSingleFile([]);
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <Container>

      <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>

        <Left>
          <Title style={{ color: '#fff', marginLeft: '10%', fontSize: 16, width: '100%' }}>Aapka Doctor </Title>
        </Left>

        <Right style={{ flexDirection: 'row' }}>

          <Switch
            style={{ marginRight: '5%' }}
            trackColor={{ false: "#f2f2", true: "#333" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            ios_backgroundColor="#999"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

          <TouchableOpacity
          //  onPress={() => this.props.navigation.('NotificationTab')}
          >
            <Icon2 name='magnify' color='#fff' size={24} style={{ marginRight: '5%' }} />
          </TouchableOpacity>

          <TouchableOpacity
          //  onPress={() => this.props.navigation.('NotificationTab')}
          >
            <Icon1 name='notifications-outline' color='#fff' size={22} style={{ marginRight: '5%' }} />
          </TouchableOpacity>
          <TouchableOpacity
          //  onPress={() => this.props.navigation.('NotificationTab')}
          >
            <Icon2 name='dots-vertical' color='#fff' size={24} style={{ marginRight: '5%' }} />
          </TouchableOpacity>
        </Right>

      </Header>

      <NavigationContainer>
        <Tab.Navigator style={{ backgroundColor: 'green' }}>
          <Tab.Screen name="Discussion" component={DiscussiontScreen} />
          <Tab.Screen name="My Cases" component={MycasesScreen} />
        </Tab.Navigator>
      </NavigationContainer>




     






      {/* My Cases Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        style={styles.centeredView}

        // style={{ justifyContent: 'flex-end', margin: 0, width:"100%"}}
        // visible={this.state.modalVisible}
        animationType={'slide'}
        visible={openMyCase}
        onRequestClose={() => {
          closeMyCaseModal()
        }}
      >

        <View style={styles.centeredViewMyCases} >
          <View style={styles.modalViewmycase}>

            <View style={{ marginBottom: 10, alignSelf: "flex-end" }}>
              <Icon name="md-close" style={{
                color: '#03b38f',
                fontSize: 30,
                // position: 'absolute',
                right: 0,
                top: 1,
              }}
                onPress={() => {
                  closeMyCaseModal();
                }} />

            </View>
            <View style={{ paddingLeft: 10, width: '100%' }}>
              <View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={selectFile}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Icon name="images" style={{ fontSize: 40, padding: 10 }}></Icon>
                    </View>
                    <View>
                      <Text style={{ fontSize: 18 }}>Add Case IMAGES or VIDEOS</Text>
                      <Text>Maximum 5 Images can be uploaded</Text>
                      {multipleFile !== [] ?
                        <Text>{multipleFile.length + " Files Selected"}</Text>
                        : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ alignSelf: 'flex-start', marginTop: 10, width: '100%', paddingLeft: '2%' }}>
                <Text style={{ fontSize: 18, color: '#03b38f', }}>CASE DESCRIPTION</Text>
                <Input
                  containerStyle={{ height: 40, marginTop: 10, width: '100%' }}
                  placeholder='Case Title Here'
                  style={{ fontSize: 14 }}
                  // defaultValue={this.state.password}
                  inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
                  leftIconContainerStyle={{ marginLeft: 2 }}
                  onChangeText={pass => setCaseTitle(pass)}
                />
                <Textarea placeholderStyle={{ color: 'gray' }}
                  onChangeText={pass => setCaseDesc(pass)}
                  style={{ borderRadius: 10, borderColor: '#03B38F', marginTop: '5%' }} rowSpan={10} bordered placeholder={`Describe your case in a very apt and deatiled way. You can include points as follows:${'\n\n'}          - Past Medical History${'\n'}          - Current Symptoms${"\n"}          - Test Results${'\n'}          - Exam Findings${'\n'}          - Your Assessments & Current Plans${'\n\n'} Feel free to ask or teach the Community for their Feedback`} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={styles.button}
                    onPress={() => handleDraft()}>
                    <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '10%', alignSelf: 'center' }}>DRAFT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}
                    onPress={() => handleSave()}>
                    <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '10%', alignSelf: 'center' }}>POST</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>

        </View>

      </Modal>

      {/* speciality Modal */}

      <Modal
        transparent={true}
        animationType="slide"
        style={styles.centeredView}

        // style={{ justifyContent: 'flex-end', margin: 0, width:"100%"}}
        // visible={this.state.modalVisible}
        animationType={'slide'}
        visible={openSpecialityModal}
        onRequestClose={() => {
          closeSpecialityModal()
        }}
      >

        <View style={styles.centeredViewMyCases} >
          <View style={styles.modalViewmycase}>

            <View style={{ alignSelf: "flex-end" }}>
              <Icon name="md-close" style={{
                color: '#03b38f',
                fontSize: 30,
                // position: 'absolute',
                right: 0,
                top: 1,
              }}
                onPress={() => {
                  closeSpecialityModal();
                }} />

            </View>
            <View style={{ padding: 30, width: '100%' }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: '3%' }}>Doctors who can See Your Post</Text>
              </View>
              <View style={{ height: '50%' }}>
                <ScrollView>

                  <View style={{ marginTop: '3%' }}>
                    <SelectMultiple
                      items={superSpeciality}
                      renderLabel={renderLabel}
                      selectedItems={selected}
                      onSelectionsChange={(item) => onSelectSpeciality(item)} />
                  </View>

                </ScrollView>

              </View>

              {/* who_can_see */}
              <View >
                <SelectMultiple
                  items={who_can_see}
                  renderLabel={render_who_see_Label}
                  selectedItems={visibility}
                  onSelectionsChange={(item) => onSelectVisibility(item)} />
              </View>
              <View style={{ marginTop: '5%' }}>
                <TouchableOpacity style={styles.button2}
                  onPress={() => handleSpecialitySubmit()}>
                  <Text style={{ fontSize: 16, marginVertical: '3%', alignSelf: 'center', color: '#fff', marginHorizontal: '10%' }}>Submit</Text>
                </TouchableOpacity>
              </View>


            </View>

          </View>

        </View>

      </Modal>
      {/* Save Draft */}

      <Modal
        transparent={true}
        animationType="slide"
        style={styles.centeredView}

        // style={{ justifyContent: 'flex-end', margin: 0, width:"100%"}}
        // visible={this.state.modalVisible}
        animationType={'slide'}
        visible={openDraftModal}
        onRequestClose={() => {
          closeDraftModal()
        }}
      >

        <View style={styles.centeredViewMyCases} >
          <View style={styles.modalViewmycase}>

            <View style={{ marginBottom: 5, alignSelf: "flex-end" }}>
              <Icon name="md-close" style={{
                color: '#03b38f',
                fontSize: 30,
                // position: 'absolute',
                right: 0,
                top: 1,
              }}
                onPress={() => {
                  closeDraftModal();
                }} />

            </View>
            <View style={{ padding: 30, width: '100%' }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: '3%' }}>Do you want to Save the Case as Draft?</Text>
                <Text>Drafts let you see your case edits, you can come back later and post it whenever you want.</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                <TouchableOpacity style={styles.button1}
                  onPress={() => handleDiscard()}>
                  <Text style={{ fontSize: 16, marginVertical: '3%', alignSelf: 'center', color: '#fff', marginHorizontal: '10%' }}>DISCARD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}
                  onPress={() => handleSaveDraft()}>
                  <Text style={{ fontSize: 16, marginVertical: '3%', alignSelf: 'center', color: '#fff', marginHorizontal: '10%' }}>SAVE DRAFT</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </View>

      </Modal>

      {/* Edit Post */}
      <Modal
        transparent={true}
        animationType="slide"
        style={styles.centeredView}

        // style={{ justifyContent: 'flex-end', margin: 0, width:"100%"}}
        // visible={this.state.modalVisible}
        animationType={'slide'}
        visible={openEditModal}
        onRequestClose={() => {
          closeEditModal()
        }}
      >

        <View style={styles.centeredViewMyCases} >
          <View style={styles.modalViewmycase}>

            <View style={{ marginBottom: 10, alignSelf: "flex-end" }}>
              <Icon name="md-close" style={{
                color: '#03b38f',
                fontSize: 30,
                // position: 'absolute',
                right: 0,
                top: 1,
              }}
                onPress={() => {
                  closeEditModal();
                }} />

            </View>
            <View style={{ paddingLeft: 10, width: '100%' }}>
              {/* <View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={selectFile}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Icon name="images" style={{ fontSize: 40, padding: 10 }}></Icon>
                    </View>
                    <View>
                      <Text style={{ fontSize: 18 }}>Add Case IMAGES or VIDEOS</Text>
                      <Text>Maximum 5 Images can be uploaded</Text>
                      {multipleFile !== [] ?
                        <Text>{multipleFile.length + " Files Selected"}</Text>
                        : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View> */}

              <View style={{ alignSelf: 'flex-start', marginTop: 10, width: '100%', paddingLeft: '2%' }}>
                <Text style={{ fontSize: 18, color: '#03b38f', }}>CASE DESCRIPTION</Text>
                <Input
                  containerStyle={{ height: 40, marginTop: 10, width: '100%' }}
                  placeholder='Case Title Here'
                  style={{ fontSize: 14 }}
                  defaultValue={caseTitle}
                  inputContainerStyle={{ borderWidth: 1, paddingLeft: '2%', borderRadius: 10, borderColor: '#03B38F' }}
                  leftIconContainerStyle={{ marginLeft: 2 }}
                  onChangeText={pass => setCaseTitle(pass)}
                />
                <Textarea placeholderStyle={{ color: 'gray' }}
                  onChangeText={pass => setCaseDesc(pass)}
                  defaultValue={caseDesc}
                  style={{ borderRadius: 10, borderColor: '#03B38F', marginTop: '5%' }} rowSpan={10} bordered placeholder={`Describe your case in a very apt and deatiled way. You can include points as follows:${'\n\n'}          - Past Medical History${'\n'}          - Current Symptoms${"\n"}          - Test Results${'\n'}          - Exam Findings${'\n'}          - Your Assessments & Current Plans${'\n\n'} Feel free to ask or teach the Community for their Feedback`} />
                {/* <TouchableOpacity style={styles.button}
                  onPress={() => handleEditSave()}>
                  <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '20%' }}>SAVE</Text>
                </TouchableOpacity> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={styles.button}
                    onPress={() => handleEditDraft()}>
                    <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '10%', alignSelf: 'center' }}>DRAFT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}
                    onPress={() => handleEditSave()}>
                    <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '10%', alignSelf: 'center' }}>POST</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>

        </View>

      </Modal>


    </Container>


  );
}
const styles = StyleSheet.create({
  //Container:{  padding: 10},
  bimage: { padding: 10, marginTop: '10%', },
  ImageBackground: { position: 'relative' },
  bannerheader: { position: 'absolute', right: '-2%', top: '10%' },
  bannerheaderTitle: { fontSize: 20, color: '#fff', width: '100%', color: 'blue', fontWeight: 'bold', fontStyle: 'italic' },
  hurryup: { textAlign: 'left', color: '#000', fontWeight: 'bold', fontSize: 22, marginLeft: '15%', marginTop: '5%', fontStyle: 'italic' },
  finddoctorsliderpart: { marginBottom: '0%', padding: 10 },
  findtextdoctor: { fontSize: 20, paddingBottom: 10 },
  caption1: { fontSize: 12, textAlign: 'center', fontWeight: 'bold' },
  caption2: { textDecorationLine: 'underline', fontSize: 15, color: '#03b38f', textAlign: 'center', fontWeight: 'bold' },
  captionparttiile: { position: 'absolute', left: '5%', bottom: '3%' },
  captionTitle: { fontSize: 13, color: '#fff', width: '100%', color: '#fff', fontWeight: 'bold' },
  parts: {
    borderRadius: 10, shadowColor: "#000", shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, marginBottom: 20
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#03b38f',
  },
  finddoctor: { flexDirection: 'row', },
  findPart: { borderRadius: 20, shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, padding: 10 },
  blogtitlename: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', paddingBottom: '2%', paddingTop: '2%' },
  button: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: '2%',
    marginTop: '5%'
  },
  button1: {
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: '2%',
    marginTop: '5%'
  },
  button2: {
    backgroundColor: '#03b38f',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: '2%',
    marginTop: '5%'
  },
  lastsection: { padding: 10 },
  lastsectionpart: {
    borderRadius: 10, shadowColor: "#000", shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10
  },
  centeredViewMyCases: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: '100%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    width: '100%'
  },
  subtext: {
    fontSize: 11,
    color: 'gray'
  },
  lines: {
    borderColor: '#03B38F',
    borderBottomColor: "#03B38F",
    borderWidth: 0.3,
    width: "90%",
    marginTop: '3%',
    marginBottom: '3%',

  },
  modalViewmycase: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingLeft: 0,
    alignItems: "center",
    // alignItems: "flex-start",
    shadowColor: "#000",
    width: '96%',
    // height: '60%',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "flex-start",
    shadowColor: "#000",
    width: '96%',
    height: '60%',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

})