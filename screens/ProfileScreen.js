import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, { useEffect, useState, Component } from 'react';

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileScreen = () =>{
    return(
        <SafeAreaView style = {styles.container}>
            <View style={styles.userInfoSection}>
                <View style = {{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                    source = {{uri:'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'}}
                    size = {80}
                    />
                        <View style = {{marginLeft:20}}>
                            <Title style = {styles.title, {marginTop:15, marginBottom:5}}>Khang Dao</Title>
                            <Caption style = {styles.caption}>@K_Dao</Caption>
                        </View>
                </View>
            </View>
            <View style = {styles.userInfoSection}>
                <View style = {styles.row}>
                    <Icon name = "map-marker-radius" color = "#777777" size = {20}/>
                    <Text style = {{color: "#777777", marginLeft: 20}}>Garden Grove, California</Text>
                </View>
                <View style = {styles.row}>
                    <Icon name = "phone"  color = "#777777" size = {20} />
                    <Text style = {{color: "#777777", marginLeft: 20}}>7134358355</Text>
                </View>
                <View style = {styles.row}>
                    <Icon name = "email"  color = "#777777" size = {20} />
                    <Text style = {{color: "#777777", marginLeft: 20}}>zero7679@gmail.com</Text>
                </View>
            </View>
        
       </SafeAreaView>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });