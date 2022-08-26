import React, {useEffect} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import StyledButton from '../StyledButton';
import styles from './styles';
import {auth} from '../../../db/firestore';
import getIsAdmin from '../../Admin/getIsAdmin';

const TitleScreen = ({navigation}) => {

    useEffect(() => {
        return auth.onAuthStateChanged(async user => {
            if (user && navigation.getState().index === 0) {
                const isAdmin = await getIsAdmin();
                if (!isAdmin)
                    navigation.replace('Volunteer Dashboard');
                else
                    navigation.replace('SM Dashboard');
            }
        });
    });

    return (
        <View style={styles.titleContainer}>
            <ImageBackground
                source={require('../../../assets/images/pyramiduse.jpg')}
                style={styles.image}
            />

            {/*Title message*/}
            <View style={styles.titleView}>
                <Text style={styles.title}>Welcome to Study Buddies</Text>
            </View>
            <View style={styles.subtitleView}>
                <Text style={styles.subtitle}>Login or Sign Up</Text>
            </View>
            <View style={styles.buttonView}>
                <StyledButton
                    style={styles.button}
                    text={'Sign Up'}
                    onPress={() => navigation.navigate('Sign Up')}
                />
                <StyledButton
                    style={styles.button}
                    text={'Login'}
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
};

export default TitleScreen;
