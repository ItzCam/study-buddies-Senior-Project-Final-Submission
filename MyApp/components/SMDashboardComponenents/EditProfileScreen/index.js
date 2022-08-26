import React, {useEffect, useContext, useState} from 'react';
import styles from './styles';
import {Text} from 'react-native';
import StyledButton from '../../TitleComponents/StyledButton';
import RNPickerSelect from "react-native-picker-select";
import {db} from "../../../db/firestore";
import {auth} from '../../../db/firestore';

import {View, TextInput, Alert, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const EditProfileScreen = ({navigation}) => {
    const userID = auth.currentUser.uid;
    const [userName, setUserName] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userDOB, setUserDOB] = useState();
    const [userAddress, setUserAddress] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userEmergContact, setUserEmergContact] = useState();
    const [userEmergContactPhone, setUserEmergContactPhone] = useState();
    const [userRole, setUserRole] = useState();


    async function getUserData() {
        const docRef = db.collection('users').doc(userID)
        const userData = await docRef.get();
        let userName = userData.data().name;
        setUserName(userName);
        let userPhone = userData.data().phone;
        setUserPhone(userPhone);
        let userDOB = userData.data().dob;
        setUserDOB(userDOB);
        let userAddress = userData.data().address;
        setUserAddress(userAddress);
        let userEmail = userData.data().email;
        setUserEmail(userEmail);
        let userEmergContact = userData.data().emergContact;
        setUserEmergContact(userEmergContact);
        let userEmergContactPhone = userData.data().emergContactPhone;
        setUserEmergContactPhone(userEmergContactPhone);
        let userRole = userData.data().role;
        setUserRole(userRole);
    }

    useEffect(() => {
        getUserData();
    }, []);


    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const handleUpdate = async () => {
        // let imgUrl = await uploadImage();

        // if( imgUrl == null && userData.userImg ) {
        //   imgUrl = userData.userImg;
        // }
        db.collection('users').doc(userID).update({
            'name': userName,
            'email': userEmail,
            'dob': userDOB,
            'address': userAddress,
            'phone': userPhone,
            'emergContact': userEmergContact,
            'emergContactPhone': userEmergContactPhone,
            'role': userRole,
        })
            .then(() => {
                console.log('User Updated!');
                Alert.alert(
                    'Profile Updated!',
                    'Your profile has been updated successfully.'
                );
            })
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.containerStyle}
            keyboardShouldPersistTaps={'always'}>
            <View style={styles.action}>
                <Text style={styles.title4}> Full Name</Text>
                <FontAwesome name="user-o" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                <TextInput
                    value={userName}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={setUserName}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Text style={styles.title5}> Email Address</Text>
                <FontAwesome name="envelope" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                <TextInput
                    value={userEmail}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={setUserEmail}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Text style={styles.title5}>Address</Text>
                <FontAwesome name="address-card" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                <TextInput
                    value={userAddress}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={setUserAddress}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Text style={styles.title5}>Phone Number</Text>
                <FontAwesome name="phone" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                <TextInput
                    value={userPhone}
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    onChangeText={setUserPhone}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Text style={styles.title5}>Birthday</Text>
                <FontAwesome name="birthday-cake" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                <TextInput
                    value={userDOB}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={setUserDOB}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Text style={styles.title5}>Emergency Contact</Text>
                <FontAwesome name="user-o" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                <TextInput
                    value={userEmergContact}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={setUserEmergContact}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Text style={styles.title5}>Emergency Phone #</Text>
                <FontAwesome name="phone" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                <TextInput
                    value={userEmergContactPhone}
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    onChangeText={setUserEmergContactPhone}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <Text style={styles.title5}>Major</Text>
                <FontAwesome name="book" color="#333333" size={20} style={{position: 'absolute', zIndex: 99}}/>
                {/*Android Bug*/}
            </View>
            <RNPickerSelect
                style={styles}
                onValueChange={setUserRole}
                selectedValue={userRole}
                items={[
                    {label: 'Computer Science', value: 'Computer Science'},
                    {label: 'Computer Engineering', value: 'Computer Engineering'},
                    {label: 'Aerospace Engineering', value: 'Aerospace Engineering'},
                ]}
                placeholder={{}}
                value={userRole}
            />
            <View style={styles.buttonView}>
                <StyledButton
                    style={styles.button}
                    text={'Update'}
                    onPress={handleUpdate}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}

export default EditProfileScreen;
