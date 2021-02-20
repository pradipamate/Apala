import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList, Switch } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Footer, FooterTab, Button, Left, Right, Body, Text } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import ImagePath from '../../Services/ImagePath'
import FindDoctorApi from '../../Services/FindDoctors/FindDoctorServices'
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            isModalVisible: false,
            sObj: {},
            studid: '',
            sectionid: '',
            allSymptoms:[],
            data:[
                {
                    "symptom_id": 1,
                    "symptom_name": "Abnormalities of heart beat"
                },
                {
                    "symptom_id": 2,
                    "symptom_name": "Abnormalities originating in the perinatal period"
                }]
        }
    }

    // getSymptoms=async()=>{
        
    //     fetch("https://svcaapkadoctor.azurewebsites.net/api/symptoms?symptomtype=all", {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Token '+token

    //             },
                
    //             })
    //             .then(response => response.json())
    //             .then((response) => {
    //                 this.setState({
    //                     loading:false,
    //                     allSymptoms:response

    //                 })
               
    //                 console.log('Find symptom_id...',response);
                
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             })
    // }
    
    
    componentDidMount(){

        FindDoctorApi.getAllSymptoms().then(res=>{
            // console.log("ressss>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.s",res);
            if(res){
                if(res.status==200){
                    this.setState({
                        loading:false,
                        allSymptoms:res.data
        
                    })
                }
            }
            else{
                this.setState({
                    loading:false,
                })
            }
          
           
        })
    }

    handleSearch=(text)=>{
        this.setState({
            loading:true
        })
        if(text!==""||text!==null){
        //     if(this.state.allSymptoms!==[]){
        //         let arr=[]
        //         this.state.allSymptoms.map((item,index)=>{
        //             if(item.symptom_name.includes(text)){
        //                 arr.push(item)
        //             }
        //         })
        //         this.setState({
        //             allSymptoms:arr
        //         })
        //     }
        // }
        // else{
        //     this.setState({
        //         allSymptoms:this.state.allSymptoms
        //     })
        // }
        FindDoctorApi.getAllSymptoms().then(res=>{
            console.log("ressss>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.s",res);
            if(res){
                if(res.status==200){
                    // this.setState({
                    //     loading:false,
                    //     allSymptoms:res.data
        
                    // })
                    const newData = res.data.filter(item => {      
                        const itemData = `${item.symptom_name.toUpperCase()}`;
                        
                         const textData = text.toUpperCase();
                          console.log("itemData.indexOf(textData) > -1========================",itemData.indexOf(textData) > -1);
                         return itemData.indexOf(textData) > -1;    
                      });
                      console.log("newData==========================",newData);
                      this.setState({ 
                        allSymptoms: newData,
                        loading:false,
                    });   
                }

               
            }
            else{
                this.setState({
                    loading:false,
                })
            }
          
           
        })
       
         
        
    }
}

    onclickSymptoms=(item)=>{
        console.log("item=============================", item);

        this.props.navigation.navigate("DoctorListing", {symptomId:item.symptom_id})
    }
    handleMenu = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
    clickSymptom=(item)=>{
        console.log("item=====================",item);
        this.props.navigation.navigate("DoctorListing", {symptomId:item.symptom_id})
    }
    renderItem = ({ item }) => {
        let url = ImagePath + item.imagepath
        // const urlpath = require(uri : url);
        console.log("url========================================",url);
        return (
            <>
            <TouchableOpacity onPress={()=>this.clickSymptom(item)}>
            <View style={{ flexDirection: 'column',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                                     <Image resizeMode='contain'
                    style={{ width: 60, height: 60,justifyContent:'center',flexDirection:'row'}}
                    // source={require('../../Images/Brethingissues.png')}
                    source={{ uri: url }}
                     />
                      {/* <SvgUri
                       style={{ width: 70, height: 70,justifyContent:'center',flexDirection:'row'}}
                       uri={url}
                    /> */}
                     {/* <SVGImage
                                style={{ width: 80, height: 80 }}
                                source={{uri:url}}
                            /> */}
                </View>
                <View style={{justifyContent:'center',flexDirection:'row', }}>
                           <Text  style={{width:150,height: 70,justifyContent:'center',flexDirection:'row'}}>{item.symptom_name}</Text>
                </View>
            </View>
            </TouchableOpacity>
            </>
        );

    };


    render() {
        return (
            <Container >
                {/* <Loader loading={this.state.loading} /> */}
                <ScrollView>
                    <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                        <Left style={{}}>
                            <TouchableOpacity
                                onPress={this.handleMenu}>
                                <Icon1 name='menu' style={{ color: '#fff', fontSize: 30 }} />
                            </TouchableOpacity>
                        </Left>
                        <Right>
                            <TouchableOpacity
                            //  onPress={() => this.props.navigation.('NotificationTab')}
                            >
                                <Icon1 name='notifications-outline' color='#fff' size={25} style={{}} />
                            </TouchableOpacity>
                        </Right>

                    </Header>

                    <View style={styles.mainView}>

                        <View style={{ marginBottom: 10, marginTop: 10 }}>
                            <Input
                                containerStyle={{ height: 30, }}
                                placeholder='SEARCH'
                                style={{ fontSize: 14 }}
                                rightIcon={
                                    <Icon
                                        name='search'
                                        size={20}
                                        color='#03b38f'
                                        type='material-community'
                                    />}
                                //leftIconContainerStyle={{ marginLeft: -1 }}
                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '5%', borderRadius: 10, borderColor: '#03b38f' }}
                                rightIconContainerStyle={{ marginRight: '2%' }}
                            // value={mobile}
                            onChangeText={text => this.handleSearch(text)}
                            //errorMessage={mobileErrorMessage}
                            //keyboardType='phone-pad'
                            />
                        </View>

                        <View style={{ marginBottom: 10, marginTop: 20, padding: 10 }}>
                            <View style={{ marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.viewAll}>Find Doctor By Symptoms</Text>
                                <Text style={styles.viewAll} onPress={() => this.props.navigation.navigate('DoctorListing')}> View All</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1, flexWrap: 'wrap' }}>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ flex: 1, marginHorizontal: '3%', marginTop: '1%' }}
                                    data={this.state.allSymptoms}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.id}></FlatList>


                                {/* <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                     <Image resizeMode='contain'
                                        style={{width:70,height:70}}
                                        source={require('../../Images/SkinProblem.png')} /> 
                                    <Text>Skin Problem</Text>
                                </View>
                                <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                  <Image resizeMode='contain'
                                        style={{width:70,height:70}}
                                        source={require('../../Images/KindyIssues.png')} /> 
                                    <Text>Kindy Issues</Text>
                                </View>
                                <View style={{flexDirection:'column',justifyContent:'space-between'}}>
                                  <Image resizeMode='contain'
                                        style={{width:70,height:70}}
                                        source={require('../../Images/Brethingissues.png')} /> 
                                    <Text>Kindy Issues</Text>
                                </View> */}
                            </View>
                        </View>

                        <View style={{ marginBottom: 20, marginTop: 0, padding: 10 }}>
                            <View style={{ marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Recent Health Check</Text>
                                <Text style={styles.colortext}>View All Records </Text>
                            </View>

                            <View style={{
                                flex: 1, backgroundColor: '#fff',
                                borderRadius: 10, padding: 10, shadowColor: "#000", shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5, marginBottom: 10
                            }}>
                                <View style={styles.recent}>
                                    <Text>Diagonsed by</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#03b38f' }}>DR .Jhon Doe </Text>
                                </View>
                                <View style={styles.recent}>
                                    <Text>Hospital Visited</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#03b38f' }}>XYZ Hospital </Text>
                                </View>
                                <View style={styles.recent}>
                                    <Text>Time</Text>
                                    <Text>2.0</Text>
                                </View>
                                <View style={{ flexWrap: 'wrap', flex: 1 }}>
                                    <Text>Health Issues Diagonsed</Text>
                                    <Text>Gastric infiammation & Acidity Issues</Text>
                                </View>
                                <View style={styles.recent}>
                                    <Text>Charges</Text>
                                    <Text>1500/-</Text>
                                </View>
                                <View style={styles.recent}>
                                    <Text>Medicines Prescribed</Text>
                                    <Text>XYZ</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.weightsection}>
                                        <View style={styles.box}>
                                            <Text style={styles.boxlebel}>Weight  Kg</Text>
                                            {/* <Text style={styles.boxlebel}>Kg</Text> */}
                                        </View>
                                        <Text style={styles.number}> 60</Text>
                                    </View>
                                    <View style={styles.weightsection}>
                                        <View style={styles.box}>
                                            <Text style={styles.boxlebel}>Height cm</Text>
                                            {/* <Text style={styles.boxlebel}>cm</Text> */}
                                        </View>
                                        <Text style={styles.number}> 156</Text>
                                    </View>
                                    <View style={styles.weightsection}>
                                        <View style={styles.box}>
                                            <Text style={styles.boxlebel}>Pluses</Text>
                                        </View>
                                        <Text style={styles.number}> 100</Text>
                                    </View>
                                    <View style={styles.weightsection}>
                                        <View style={styles.box}>
                                            <Text style={styles.boxlebel}>BP</Text>
                                        </View>
                                        <Text style={styles.number}> 60/100</Text>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }


}
const styles = StyleSheet.create({
    mainView: { backgroundColor: '#f9f9f9' },
    recent: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3%'
    },
    colortext: {
        color: '#03b38f'
    },
    weightsection: {
        backgroundColor: '#03b38f', padding: 10, borderRadius: 10,
    },
    number: { color: 'red', fontWeight: 'bold', textAlign: 'center', color: '#fff' },
    box: { color: '#fff', flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
    boxlebel: { color: '#fff', fontSize: 12 },
    viewAll: { fontSize: 17, fontWeight: 'bold', color: '#03b38f' }
})