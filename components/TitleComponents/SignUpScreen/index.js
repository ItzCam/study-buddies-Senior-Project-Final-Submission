import React from 'react';
import styles from './styles';
import {Image, View, ScrollView, Text, TextInput, Pressable, Alert} from 'react-native';
import StyledButton from '../StyledButton';
import {auth} from '../../../db/firestore';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

/**
 * User sign up screen to enter and verify credentials
 * @param {*} param0 navigation parameter from main application stack navigator
 * @returns New User Sign Up Screen
 */
const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    /**
     * Input verification function with user warning if credentials do not match
     * @returns True if email and passwords entered are valid. False otherwise
     */
    function verifyInput() {
        let flag = true;
        if (!email.includes('@') || !email.includes('.')) {
            console.warn('Email invalid!');
            flag = false;
        }
        if (password !== confirmPassword) {
            console.warn('Passwords don\'t match!');
            flag = false;
        }
        return flag;
    }

    /**
     * Valid email verification from existing database information
     * @returns valid email address prompt, null otherwise
     */
    function verifyEmail() {
        if (email === '' || email === undefined) {
            return;
        } else if (!email.includes('@') || !email.includes('.')) {
            return 'Please input a valid email address.';
        }
    }

    /**
     * Password verification based on length and existing status in database
     * @returns Password requirement prompt if invalid. Null otherwise
     */
    function verifyPassword() {
        if (password === '' || password === undefined) {
            return;
        } else if (password.length < 6) {
            return 'Password must be at least 6 characters.';
        }
    }

    /**
     * Password second entry verification
     * @returns prompt for user to enter matching password for validation. Null otherwise
     */
    function verifyConfirmPassword() {
        if (confirmPassword === '' || confirmPassword === undefined) {
            return;
        }
        if (password !== confirmPassword) {
            return 'Passwords must match.';
        }
    }

    /**
     * Register user to FireStore database
     * @returns Sign up screen elements and console log outputs for verification
     */
    function registerUser() {
        if (!verifyInput()) {
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
                console.log('User signed up successfully')

                //navigation.goBack()
                navigation.navigate("Create Profile")
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Email in Use!', 'Email address is already in use!');
                } else if (error.code === 'auth/invalid-email') {
                    Alert.alert('Invalid Email!', 'Email address is invalid!');
                } else if (error.code === 'auth/weak-password') {
                    Alert.alert('Weak password!', 'Password is too weak!');
                }
            });
    }

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.containerStyle}
            keyboardShouldPersistTaps={'always'}>
            <View style={styles.imageView}>
                <Image
                    source={require('../../../assets/images/csulbBanner.jpg')}
                    style={styles.image}
                />
            </View>
            <Text style={styles.title}>Create your Study Buddy account!</Text>

            <View style={styles.textInputView}>
                <Text style={styles.header}>Email Address</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setEmail}
                    placeholder="Email Address"
                    textContentType={'emailAddress'}
                    keyboard-type='email-address'
                    autoCapitalize={'none'}
                />
                <Text style={styles.errorText}>{verifyEmail()}</Text>
                <Text style={styles.header}>Create Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setPassword}
                    placeholder="Password"
                    textContentType={'password'}
                    secureTextEntry={true}
                />
                <Text style={styles.errorText}>{verifyPassword()}</Text>
                <Text style={styles.header}>Confirm Password</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    textContentType={'password'}
                    secureTextEntry={true}
                />
                <Text style={styles.errorText}>{verifyConfirmPassword()}</Text>
            </View>

            <View style={styles.footerView}>
                <StyledButton
                    style={styles.button}
                    text={'Continue'}
                    onPress={registerUser}
                    //onPress={() => navigation.replace('Create Profile')}
                />
                <Pressable onPress={() => navigation.replace('Login')}>
                    <Text>Already have an account? Login here</Text>
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default SignUpScreen;
