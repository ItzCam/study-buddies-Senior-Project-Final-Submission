import React from 'react';
import styles from './styles';
import {Image, View, ScrollView, Text, TextInput, Pressable, Alert, KeyboardAvoidingView} from 'react-native';
import StyledButton from '../StyledButton';
import {auth} from '../../../db/firestore';
import getIsAdmin from "../../Admin/getIsAdmin";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function userLogin() {
        //const login = await auth.signInWithEmailAndPassword(email, password);
        await auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.goBack();

                const isAdmin = getIsAdmin();
                if (!isAdmin)
                    navigation.navigate('Volunteer Dashboard');
                else
                    navigation.navigate('SM Dashboard');

                console.log('User signed in successfully!');
            })
            .catch(error => {
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Invalid Email!', 'Email address is invalid!');
                } else if (error.code === 'auth/user-not-found') {
                    Alert.alert('User not found!', 'User not found!');
                } else if (error.code === 'auth/wrong-password') {
                    Alert.alert('Incorrect password!', 'Password is incorrect!');
                }
            })
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.containerStyle}
            keyboardShouldPersistTaps={'always'}>
            <View style={styles.imageView}>
                <Image
                    source={require('../../../assets/images/csulb-transparent.jpg')}
                    style={styles.image}
                />
            </View>
            <Text style={styles.title}>Login to your Study Buddy account</Text>

            <View style={styles.textInputView}>
                <Text>Email Address</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setEmail}
                    placeholder="Email Address"
                    textContentType={'emailAddress'}
                    autoCapitalize={'none'}
                />
                <Text>Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setPassword}
                    placeholder="Password"
                    textContentType={'password'}
                    secureTextEntry={true}
                />
                <Pressable style={styles.forgotPassword} onPress={() => navigation.navigate('Forgot Password')}>
                    <Text>Forgot your password? Reset here</Text>
                </Pressable>
            </View>
            <View style={styles.footerView}>
                <StyledButton
                    style={styles.button}
                    text={'Login'}
                    onPress={() => userLogin()}
                />

                <Pressable onPress={() => navigation.replace('Sign Up')}>
                    <Text>Don't have an account? Sign up here</Text>
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default LoginScreen;
