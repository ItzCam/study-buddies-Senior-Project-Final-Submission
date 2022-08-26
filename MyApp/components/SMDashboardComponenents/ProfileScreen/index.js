import React, {useEffect, useContext, useState} from 'react';
import styles from "../EditProfileScreen/styles";
import {Image, View, ScrollView, Pressable, Text, Title} from "react-native";
import StyledButton from "../../TitleComponents/StyledButton";
import {auth} from "../../../db/firestore";
import {db} from '../../../db/firestore';

const ProfileScreen = ({navigation}) => {
    const userID = auth.currentUser.uid;
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState(null);
    const [userRole, setUserRole] = useState(null);

    async function getUserData() {
        const docRef = db.collection('users').doc(userID)
        const userData = await docRef.get();
        let userName = userData.data().name;
        setUserName(userName);
        let userEmail = userData.data().email;
        setUserEmail(userEmail);
        let userRole = userData.data().role;
        setUserRole(userRole);
    }

    useEffect(() => {
        getUserData();
    }, []);

    function logout() {
        auth.signOut()
            .then((result) => {
                console.log(result)
                console.log('User signed out sucecssfully')
            })
            .catch((error) => {
                console.log(error)
            });

        navigation.replace('Title')
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.containerStyle}
            keyboardShouldPersistTaps={'always'}>
            <View style={styles.imageView}>
                <Image
                    source={require('../../../assets/images/profile3.png')}
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={styles.title}>{userName}</Text>
                <Text style={styles.title2}>{userEmail}</Text>
                <Text style={styles.title3}>Major: {userRole}</Text>

            </View>

            <View style={styles.buttonView}>
                <StyledButton
                    style={styles.button}
                    text={'Edit Profile Screen'}
                    onPress={() => navigation.navigate('Edit Profile')}
                />
                <StyledButton
                    style={styles.button}
                    text={'Calculator'}
                    onPress={() => navigation.navigate('Calculator')}
                />
                <Pressable onPress={logout}>
                    <Text style={styles.footer}>Log off</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default ProfileScreen;
