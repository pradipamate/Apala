import React, { Component, Fragment } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text, ImageBackground, Switch, StyleSheet, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Card, CardItem, Body, Container, Header, Left, Right, Icon, Title } from 'native-base';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
// import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
// import ToggleSwitch from 'toggle-switch-react-native'
import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import SearchableDropdown from 'react-native-searchable-dropdown';
// import \{Hr}  from 'react-native-hr'
import RegistrationServices from '../../Services/RegistrationService/RegistrationServices'
import Loader from '../../Components/Loader'
import DoctorOnlineConsultService from '../../Services/DoctorOnlineConsultServices/DoctorOnlineConsultServices'
import { set, times } from "lodash";
import DatePicker from 'react-native-datepicker'
import SelectMultiple from 'react-native-select-multiple'



export default class AddPrescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
       


            //Prescription
            token: "",
            symptomsData: [],
            selectedSymptoms: [],
            patientDetails: {},
            confirmedDiagnosisData: [],
            selectedConfirmDign: [],
            selectedProvisionalDiag: [],
            DiagnosisTestRefData: [],
            selectedDiagnosisTestRef: [],
            ProvisionalDiagnosisData: [],
            carePlansData: [],
            selectedcarePlans: [],
            selectedDiagnosisTestSugg: [],
            selectedcarePlansSuggested: [],
            procedureSuggestedData: [],
            selectedprocedureSuggested: [],
            selectedprocedureDone: [],
            DrugsData: [],
            selectedDrugs: [],
            drugsQuantity: '',
            dosageQuantity: '',
            dosageForm: '',
            duration: '',
            daysType: '',
            advice: '',
            followUpDate: "",
            selectedslot: [],
            slots: ["Morning", "Afternoon", "Night"]


        }
    }

    componentDidMount() {
        let patientDetails = this.props.navigation.getParam("patientDetails", "")

        let token = this.props.navigation.getParam("token", "")
        console.log("token======", token);
        this.setState({
            token: token,
            patientDetails: patientDetails,
            // loading:true
        })
      //  console.log("patientDetails===============", patientDetails);
        // this.setState({
        //     token:token
        // })
        DoctorOnlineConsultService.getAllSymptoms(token).then(response => {
            console.log("response in getAllSymptoms================", response);
            if (response) {
                if (response.status == 200) {
                    // this.setState({
                    //     symptomsData:response.data
                    // })
                    let arr = []
                    response.data.map(i => {
                        arr.push({
                            id: i.symptom_id,
                            name: i.symptom_name,
                        })

                    })
                    this.setState({
                        symptomsData: arr,

                    })
                }
            }
        })

        DoctorOnlineConsultService.getDiagnosisTestref(token).then(response => {
         //   console.log("response getDiagnosisTestref=====", response);

            if (response) {
                if (response.status == 200) {
                    let arr = []
                    response.data.map(i => {
                        arr.push({
                            id: i.diagnostic_test_id,
                            name: i.name,
                        })

                    })
                    this.setState({
                        DiagnosisTestRefData: arr,
                        loading: false
                    })
                    console.log("arr================================", arr);
                }


            }
        })

        DoctorOnlineConsultService.getAllCarePalns(token).then(response => {
            //console.log("response getAllCarePalns===================", response);
            if (response) {
                if (response.status == 200) {
                    let arr = []
                    response.data.map(i => {
                        arr.push({
                            id: i.diagnostic_test_id,
                            name: i.name,
                        })

                    })
                    this.setState({
                        carePlansData: arr,
                        loading: false
                    })
                    console.log("arr================================", arr);
                }


            }
        })

        DoctorOnlineConsultService.getProcedureSuggested(token).then(response => {
            console.log("response in getProcedureSuggested=====================", response);


            if (response) {
                if (response.status == 200) {
                    let arr = []
                    response.data.map(i => {
                        arr.push({
                            id: i.procedure_id,
                            name: i.name,
                        })

                    })
                    this.setState({
                        procedureSuggestedData: arr,
                        loading: false
                    })
                    console.log("arr getProcedureSuggested================================", arr);
                }


            }
        })




    }


    handleConfirmedDiagnosis = (text) => {
        console.log("text============", text);
        // this.setState({
        //     loading:true
        // })
        DoctorOnlineConsultService.getAllConfirmedDiagnosis(this.state.token, text).then(response => {
            console.log("response in getAllConfirmedDiagnosis================", response);

            if (response) {
                if (response.status == 200) {

                    let arr = []
                    response.data.map(i => {
                        arr.push({
                            id: i.icd10_code,
                            name: i.name,
                        })

                    })
                    this.setState({
                        confirmedDiagnosisData: arr,
                        // loading:false
                    })

                    // console.log("arr=======================",arr);
                }
            }
        })


    }

    onSelectionsChange = (selectedFruits) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedslot: selectedFruits })
    }
    handleSymptoms = (text) => {
        console.log("text=======handleSymptoms====", text);
    }
    handleCarePlans = (text) => {
        console.log("text=======handleCarePlans====", text);
    }
    handleCarePlansSuggested = (text) => {
        console.log("text=======handleCarePlansSuggested====", text);
    }
    handleDiagnosisTestRef = (text) => {
        console.log("text=======handleDiagnosisTestRef====", text);
    }
    handleDiagnosisTestSuggestion = (text) => {
        console.log("text=======handleDiagnosisTestSuggestion====", text);
    }
    handleProcedureSuggested = (text) => {
        console.log("text=======handleProcedureSuggested====", text);
    }
    handleProcedureDone = (text) => {
        console.log("text=======handleProcedureDone====", text);
    }
    handleDrugs = (text) => {
        console.log("text=======handleDrugs====", text);


        DoctorOnlineConsultService.getDrugList(text, this.state.token).then(response => {
            console.log("response in getDrugList======", response);

            if (response) {
                if (response.status == 200) {

                    let arr = []
                    response.data.map(i => {
                        arr.push({
                            id: i.drugs_id,
                            name: i.name,
                        })

                    })
                    this.setState({
                        DrugsData: arr,
                        // loading:false
                    })

                    console.log("arr=======================", arr);
                }
            }

        })
    }


    handleProvisionalDiagnosis = (text) => {
        console.log("text=======handleProvisionalDiagnosis====", text);


        // this.setState({
        //     loading:true
        // })
        DoctorOnlineConsultService.getAllConfirmedDiagnosis(this.state.token, text).then(response => {
            console.log("response in getAllProvisionalDiagnosis================", response);

            if (response) {
                if (response.status == 200) {

                    let arr = []
                    response.data.map(i => {
                        arr.push({
                            id: i.icd10_code,
                            name: i.name,
                        })

                    })
                    this.setState({
                        ProvisionalDiagnosisData: arr,
                        // loading:false
                    })

                    // console.log("arr=======================",arr);
                }
            }
        })



    }
    handleSubmit = () => {

        let arr = []
        let frequency={}
        if(this.state.selectedslot!==[]){
            this.state.selectedslot.map(i=>{
                frequency[i.label]=true
            })
        }
        console.log("frequency=============================", frequency);
        if (this.state.selectedDrugs !== []) {
            this.state.selectedDrugs.map(i => {
                arr.push({
                    drug_name: i.name,
                    drug_id: i.id,
                    dosage_form: this.state.dosageForm,
                    dosage: [
                        {
                            unit: this.state.dosageQuantity,
                            frequency: {
                                ...frequency,
                                duration: this.state.duration,
                                advice: this.state.advice,
                                daystype: this.state.daysType
                            }
                        },

                    ]
                })
            })

        }




        let data = {
            patient_guid: this.state.patientDetails.item.to_guid,
            sevice_booking_id: this.state.patientDetails.item.sevice_booking_id,
            followup_date: this.state.followUpDate,
            symptoms: this.state.selectedSymptoms,
            confirmed_Diagnosis: this.state.selectedConfirmDign,
            provisional_Diagnosis: this.state.selectedProvisionalDiag,
            diagnostic_Tests_Ref: this.state.selectedDiagnosisTestRef,
            care_Plans_Suggested: this.state.selectedcarePlansSuggested,
            diagnostic_Tests_Suggested: this.state.selectedDiagnosisTestSugg,
            procedures_suggested: this.state.selectedprocedureSuggested,
            procedures_done: this.state.selectedprocedureDone,
            drugs_prescribed: arr,
        }


        console.log("data in handleSubmit==============", data);


        DoctorOnlineConsultService.submitPrescription(data, this.state.token).then(response => {
            console.log("response in submitPrescription========================", response);

            if (response) {
                if (response.status == 200) {
                    Alert.alert("Success", "Prescription Submitted successfully.")
                    this.props.navigation.navigate("HomeScreen", { token: this.state.token })
                }
            }


        }).catch(err => {
            Alert.alert("Failure", "Failed To Submit...Try again!!")
        })


    }
    render() {
        console.log("state================================", this.state);

        return (
            <Container>

                <Loader loading={this.state.loading} />
                <Header style={{ borderBottomWidth: 0.4, backgroundColor: '#03b38f' }}>
                    <Left style={{ }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('HomeScreen', { token: this.state.token })}>
                            <Icon name='arrow-back' size={18} style={{ padding: 0, color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{ color: '#fff', fontSize: 20 }}>Add Prescription</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Icon3 name='star-outline' color='#fff' size={24} style={{ marginRight: '8%' }} />
                            <Icon3 name='share-variant' color='#fff' size={22} style={{ marginRight: '8%' }} />
                            <Icon3 name='bell' color='#fff' size={22} style={{ marginRight: '8%' }} />
                            <Icon3 name='dots-vertical' color='#fff' size={24} style={{ marginRight: '3%' }} />
                        </TouchableOpacity>
                    </Right>

                </Header>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ marginHorixzontal: '0%' }}>
                        <View style={styles.backgroundimage}>

                            <View style={styles.Viewcardpart}>
                                <Card style={styles.Card}>
                                    <CardItem style={styles.carditem}>
                                        <Body style={styles.Body}>
                                            <Text style={styles.cardtitle} >Prescription</Text>
                                            {/* <Input
                                                containerStyle={{ height: 40, marginTop: 10 }}
                                                placeholder='First Name*'
                                                placeholderTextColor="gray"
                                                style={{ fontSize: 14 }}
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                                                leftIconContainerStyle={{ marginLeft: 2 }}
                                                onChangeText={(fName) => this.setState({ fName: fName })}

                                            // value={mobile}
                                            // onChangeText={text => this.handleNameChange(text)}

                                            /> */}
                                            {/* {this.state.userFullNameErrMsg !== "" ?
                                                <Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{this.state.fNameErr}</Text>
                                                : null} */}

                                            {/* <Dropdown
                                                label='Select Symptoms'
                                                data={this.state.bloodGroupData}
                                                // data={}
                                                containerStyle={{ width: '100%', }}
                                                onChangeText={(item) => this.setState({ blood_group: item })}
                                            /> */}
                                            {/* Multi */}
                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedSymptoms}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedSymptoms;
                                                        items.push(item)
                                                        this.setState({ selectedSymptoms: items });

                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedSymptoms.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedSymptoms: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.symptomsData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Symptoms",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleSymptoms(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>


                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedConfirmDign}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedConfirmDign;
                                                        items.push(item)
                                                        this.setState({ selectedConfirmDign: items });

                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedConfirmDign.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedConfirmDign: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.confirmedDiagnosisData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Confirmed Diagnosis",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleConfirmedDiagnosis(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>
                                            {/* <Dropdown
                                                label='Select Provisional Diagnosis'
                                                data={this.state.bloodGroupData}
                                                // data={}
                                                containerStyle={{ width: '100%', }}
                                                onChangeText={(item) => this.setState({ blood_group: item })}
                                            /> */}

                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedProvisionalDiag}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedProvisionalDiag;
                                                        items.push(item)
                                                        this.setState({ selectedProvisionalDiag: items });

                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedProvisionalDiag.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedProvisionalDiag: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.ProvisionalDiagnosisData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Provisional Diagnosis",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleProvisionalDiagnosis(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>


                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedDiagnosisTestSugg}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedDiagnosisTestSugg;
                                                        items.push(item)
                                                        this.setState({ selectedDiagnosisTestSugg: items });
                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedDiagnosisTestSugg.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedDiagnosisTestSugg: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.DiagnosisTestRefData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Dignosis Tests Reference",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleDiagnosisTestRef(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>

                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedcarePlansSuggested}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedcarePlansSuggested;
                                                        items.push(item)
                                                        this.setState({ selectedcarePlansSuggested: items });
                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedcarePlansSuggested.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedcarePlansSuggested: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.carePlansData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Care Plans Suggested",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleCarePlansSuggested(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>
                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedcarePlans}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedcarePlans;
                                                        items.push(item)
                                                        this.setState({ selectedcarePlans: items });
                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedcarePlans.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedcarePlans: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.carePlansData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Care Plans",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleCarePlans(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>

                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedDiagnosisTestRef}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedDiagnosisTestRef;
                                                        items.push(item)
                                                        this.setState({ selectedDiagnosisTestRef: items });
                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedDiagnosisTestRef.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedDiagnosisTestRef: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.DiagnosisTestRefData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Dignosis Tests Suggested",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleDiagnosisTestSuggestion(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>

                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedprocedureSuggested}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedprocedureSuggested;
                                                        items.push(item)
                                                        this.setState({ selectedprocedureSuggested: items });
                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedprocedureSuggested.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedprocedureSuggested: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.procedureSuggestedData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Procedures Suggested",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleProcedureSuggested(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>

                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedprocedureDone}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedprocedureDone;
                                                        items.push(item)
                                                        this.setState({ selectedprocedureDone: items });
                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedprocedureDone.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedprocedureDone: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.procedureSuggestedData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Procedures Done",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleProcedureDone(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>
                                            <Fragment>
                                                <SearchableDropdown
                                                    multi={true}
                                                    selectedItems={this.state.selectedDrugs}
                                                    onItemSelect={(item) => {
                                                        const items = this.state.selectedDrugs;
                                                        items.push(item)
                                                        this.setState({ selectedDrugs: items });
                                                    }}
                                                    containerStyle={{ padding: 5, width: '100%' }}
                                                    onRemoveItem={(item, index) => {
                                                        const items = this.state.selectedDrugs.filter((sitem) => sitem.id !== item.id);
                                                        this.setState({ selectedDrugs: items });
                                                        // console.log("item------------",item);
                                                    }}
                                                    itemStyle={{
                                                        padding: 10,
                                                        marginTop: 2,
                                                        backgroundColor: '#ddd',
                                                        borderColor: '#bbb',
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    itemTextStyle={{ color: '#222' }}
                                                    itemsContainerStyle={{ maxHeight: 140, width: '100%' }}
                                                    items={this.state.DrugsData}
                                                    defaultIndex={2}
                                                    chip={true}
                                                    resetValue={false}
                                                    textInputProps={
                                                        {
                                                            placeholder: "Select Medicine",
                                                            underlineColorAndroid: "transparent",
                                                            style: {
                                                                padding: 12,
                                                                borderWidth: 1,
                                                                borderColor: '#ccc',
                                                                borderRadius: 5,

                                                            },
                                                            onTextChange: text => this.handleDrugs(text)
                                                        }
                                                    }
                                                    listProps={
                                                        {
                                                            nestedScrollEnabled: true,
                                                        }
                                                    }
                                                />
                                            </Fragment>
                                            {/* <Dropdown
                                                label='Select Dignosis Tests Reference'
                                                data={this.state.bloodGroupData}
                                                // data={}
                                                containerStyle={{ width: '100%', }}
                                                onChangeText={(item) => this.setState({ blood_group: item })}
                                            /> */}




                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10 }}
                                                placeholder="Drugs Quantity*"
                                                style={{ fontSize: 14 }}
                                                placeholderTextColor="gray"
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}
                                                onChangeText={(qua) => this.setState({ drugsQuantity: qua })}
                                                keyboardType='numeric'
                                            // onChangeText={(text) => this.handleDrugsQuantity(text)}

                                            />


                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10 }}
                                                placeholder="Dosage Form (ex. Tab, Syrup)*"
                                                style={{ fontSize: 14 }}
                                                placeholderTextColor="gray"
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}
                                                onChangeText={(l_name) => this.setState({ dosageForm: l_name })}

                                            // onChangeText={(text) => this.handleMobileChange(text)}

                                            />
                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10 }}
                                                placeholder="Dosage Quantity*"
                                                style={{ fontSize: 14 }}
                                                placeholderTextColor="gray"
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}
                                                keyboardType='numeric'
                                                onChangeText={(qua) => this.setState({ dosageQuantity: qua })}

                                            // onChangeText={(text) => this.handleMobileChange(text)}

                                            />
    
                                            <DatePicker
                                                style={{ width: '95%', height: 50, marginHorizontal: '5%', marginVertical: '1%', marginTop: '8%', borderRadius: 40 }}
                                                date={this.state.followUpDate}
                                                mode="date"
                                                placeholder="Follow Up Data"
                                                format="YYYY-MM-DD"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                maxDate={new Date()}
                                                customStyles={{
                                                    dateIcon: {
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: 4,
                                                        marginLeft: 0,
                                                        borderRadius: 30,
                                                        color: '#333'
                                                    },
                                                }}
                                                onDateChange={(date) => { this.setState({ followUpDate: date }) }}
                                            />
                                            <View style={{width:'95%'}}>
                                                <Text>Select Dosage Time</Text>
                                                <SelectMultiple
                                                    items={this.state.slots}
                                                    selectedItems={this.state.selectedslot}
                                                    onSelectionsChange={this.onSelectionsChange} />
                                            </View>
                                            {/* <Dropdown
                                                label='Select Slots'
                                                data={this.state.bloodGroupData}
                                                // data={}
                                                containerStyle={{ width: '100%', }}
                                                onChangeText={(item) => this.setState({ blood_group: item })}
                                            /> */}

                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10 }}
                                                placeholder="Duration (days)*"
                                                style={{ fontSize: 14 }}
                                                keyboardType="numeric"
                                                placeholderTextColor="gray"
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}
                                                onChangeText={(duration) => this.setState({ duration: duration })}

                                            // onChangeText={(email) => this.handleEmailChange(email)}

                                            />



                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10, }}
                                                placeholder="Day Type (Ex. Daily)*"
                                                placeholderTextColor="gray"
                                                style={{ fontSize: 14 }}

                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}

                                                onChangeText={(dt) => this.setState({ daysType: dt })}
                                            // onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}

                                            />


                                            <Input
                                                containerStyle={{ height: 40, marginTop: 10, }}
                                                placeholder="Advice*"
                                                placeholderTextColor="gray"
                                                style={{ fontSize: 14 }}
                                                onChangeText={(advice) => this.setState({ advice: advice })}
                                                inputContainerStyle={{ borderWidth: 1, paddingLeft: '8%', fontSize: 9, borderRadius: 10, borderColor: '#03b38f' }}
                                                inputStyle={{ color: 'black' }}


                                            // onChangeText={(c_pass) => this.handleConfirmPassword(c_pass)}

                                            />



                                            <View style={styles.note}>
                                                <Text style={styles.noteText}> </Text>
                                            </View>
                                            <TouchableOpacity style={styles.button}
                                                onPress={(e) => this.handleSubmit(e)}>
                                                <Text style={{ fontSize: 16, marginVertical: '3%', color: '#fff', marginHorizontal: '35%' }}>Submit</Text>
                                            </TouchableOpacity>


                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                            {/* </ImageBackground> */}
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}


const styles = StyleSheet.create({

    image1: {
        height: hp('11%'),
        width: wp('45%'),
        marginLeft: '0%',
        resizeMode: 'cover',
    },
    logo: {
        textAlign: 'center',
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '8%'
    },
    Titleview: {
        marginTop: hp('3%'),
        marginBottom: hp('4%'),
    },

    Card: {
        textAlign: 'center',
        textAlign: 'center',
        borderRadius: 20,
    },
    Viewcardpart: {
        marginTop: '0%',
        padding: '5%',
        // marginBottom:'200%'
    },
    Body: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bground: {
        height: hp('100%'),
        width: wp('100%'),
        //marginTop:'10%'
    },
    cardtitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16,
        paddingBottom: '2%',
        paddingTop: '2%'
    },
    button: {
        backgroundColor: '#03b38f',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: '5%'
    },
    carditem: {
        textAlign: 'center', borderRadius: 5
    },
    help: {
        alignItems: 'flex-end',

    },
    helptext: {
        marginRight: '5%',
        marginTop: '3%',
        color: '#03b38f',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    fpasswordpart: {
        alignItems: 'center'
    },
    fpassword: {
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        color: 'red'
    },
    extraoption: {
        //flex:1,
        flexDirection: "row",
        // alignContent:'space-between',
        justifyContent: 'space-between',
        //padding: 10,

    },
    extraemailregistration: {
        //flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal: '2%'

    },
    noteText: {
        fontSize: 10
    },
    note: {
        paddingTop: '3%',
        paddingRight: '5%',
        paddingLeft: '5%',
        paddingBottom: '5%'
    },
    extraemailregistrationpart: {
        alignItems: 'flex-end',
        textAlign: 'right'
    },
    extraoptionfooter: {
        marginRight: '5%',
        marginTop: '3%',
        color: '#03b38f',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    lines: {
        borderColor: '#03b38f',
        borderWidth: 0.3,
        width: "90%",
        marginTop: '7%',
        marginBottom: '2%'
    }
})