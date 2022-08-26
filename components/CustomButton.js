import React, { useState,useRef,useEffect } from 'react';
import { StyleSheet,View,Text,TouchableOpacity, Button,Alert } from 'react-native';


const CustomButton = props => {
    return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={{...styles.button,...props.style}}>
            <Text style={styles.buttontext}>{props.children}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor:'black',
        paddingVertical:15,
        paddingHorizontal:'12%',
        borderRadius:(20)
    },
    buttontext:{
        color:'white',
        fontSize:25,
        textAlign:'center'
    }
});

export default CustomButton;