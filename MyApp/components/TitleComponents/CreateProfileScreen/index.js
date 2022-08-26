import React, {Component} from 'react';
import {ImageBackground, View, Text, TextInput, ScrollView, Alert} from 'react-native';
import styles from './styles';
import StyledButton from "../StyledButton";
import {db, auth} from '../../../db/firestore';
import RNPickerSelect from "react-native-picker-select";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const CreateProfileScreen = ({navigation}) => {

    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [dob, setDOB] = React.useState('');
    const [eName, setEName] = React.useState('');
    const [ePhone, setEPhone] = React.useState('');
    const [role, setRole] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);

    function pushUserToDatabase() {
        let userID = auth.currentUser.uid;
        let email = auth.currentUser.email;

        // console.log(user.uid);
        const data = {
            name: name,
            address: address,
            email: email,
            dob: dob,
            emergContact: eName,
            emergContactPhone: ePhone,
            role: role,
            phone: phone,
            isAdmin: false,
        }
        const docRef = db.collection('users').doc(userID).set(data);
        console.log('User signed up successfully')
        // console.log(docRef)

        // console.log(docRef)
        // .then((result) => {
        //     console.log(result)
        //     console.log('User signed up successfully')
        //     })
        //     .catch((error) => {
        //    console.log(error)
        //     });
        navigation.goBack();
        navigation.replace("Volunteer Dashboard");
    }

    function checkInfo() {
        if (name && address && phone && dob && eName && ePhone && role) {
            pushUserToDatabase();
        } else {
            Alert.alert('Missing Info!', 'Please complete all fields!');
        }
    }

    function onChangePhone(newPhone) {
        if (newPhone.length > phone.length) {
            let char = newPhone.charAt(newPhone.length - 1);
            if (newPhone.length === 3 && !isNaN(char)) {
                setPhone('(' + newPhone + ') ')
            } else if (newPhone.length === 5 && char !== ')') {
                setPhone(phone + ') ' + char);
            } else if (newPhone.length === 6 && char !== ' ') {
                setPhone(phone + ' ' + char);
            } else if (newPhone.length === 9) {
                setPhone(newPhone + '-');
            } else if (newPhone.length === 10 && char !== '-') {
                setPhone(phone + '-' + char);
            } else if(newPhone.length === 15) {
                setPhone(phone);
            }
        }
    }
    function onChangeEPhone(newEPhone) {
        if (newEPhone.length > ePhone.length) {
            let char = newEPhone.charAt(newEPhone.length - 1);
            if (newEPhone.length === 3 && !isNaN(char)) {
                setEPhone('(' + newEPhone + ') ')
            } else if (newEPhone.length === 5 && char !== ')') {
                setEPhone(ePhone + ') ' + char);
            } else if (newEPhone.length === 6 && char !== ' ') {
                setEPhone(ePhone + ' ' + char);
            } else if (newEPhone.length === 9) {
                setEPhone(newEPhone + '-');
            } else if (newEPhone.length === 10 && char !== '-') {
                setEPhone(ePhone + '-' + char);
            } else if(newEPhone.length === 15) {
                setEPhone(ePhone);
            }
        }
    }

    function onChangeDOB(newDOB) {
        if (newDOB.length > dob.length) {
            let char = newDOB.charAt(newDOB.length - 1);
            if (newDOB.length === 2 || newDOB.length === 5) {
                setDOB(newDOB + '/');
            } else if ((newDOB.length === 3 || newDOB.length === 6) && char !== '/') {
                setDOB(dob + '/' + char);
            } else if (newDOB.length === 11) {
                setDOB(dob);
            }
        }
    }

        return (
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.containerStyle}
                keyboardShouldPersistTaps={'always'}>

                <View style={styles.textInputView}>
                    <Text style={styles.title}>Tell us about yourself!</Text>
                    <Text>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        placeholder='John Doe'
                        textContentType={'name'}
                    />

                    <Text>Address</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        placeholder='123 Spooner St, Long Beach, CA 90803'
                        textContentType={'fullStreetAddress'}
                    />


                    <Text>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={function(phone) {
                            setPhone(phone);
                            onChangePhone(phone);
                        }}
                        value={phone}
                        placeholder='(999) 999-9999'
                        textContentType={'telephoneNumber'}
                        keyboardType='phone-pad'
                    />

                    <Text>Date of Birth</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={function(DOB) {
                            setDOB(DOB);
                            onChangeDOB(DOB);
                        }}
                        value={dob}
                        placeholder='01/23/1972'
                        textContentType={'none'}
                        keyboardType='phone-pad'
                    />

                    <Text>Emergency Contact (Full Name)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEName}
                        placeholder='Parent/Guardian, Friend, Boss, etc.'
                        textContentType={'none'}
                    />

                    <Text>Emergency Contact (Phone Number)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={function(ePhone) {
                            setEPhone(ePhone);
                            onChangeEPhone(ePhone);
                        }}
                        value={ePhone}
                        placeholder='(999) 999-9999'
                        textContentType={'telephoneNumber'}
                        keyboardType='phone-pad'
                    />

                    <Text>Major</Text>
                    <RNPickerSelect
                        style={styles}
                        onValueChange={setRole}
                        items={[
                            {label: 'Computer Science', value: 'Computer Science'},
                            {label: 'Computer Engineering', value: 'Computer Engineering'},
                            {label: 'Aerospace Engineering', value: 'Aerospace Engineering'},
                        ]}
                        selectedValue={role}
                        placeholder={{label: 'Select your major...'}}
                    />
                </View>

                <View style={styles.footerView}>
                    <StyledButton
                        style={styles.button}
                        text={'Submit'}
                        onPress={checkInfo}
                    />
                </View>
            </KeyboardAwareScrollView>
        );
}

export default CreateProfileScreen;
