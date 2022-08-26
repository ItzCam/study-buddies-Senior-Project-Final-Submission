import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

const StartScreen = props =>{
    return (
        <View style={styles.container}>
          <View style={styles.B1}>
              <CustomButton style={styles.button1} onPress={() => props.onSelectGpa()}>Calculate GPA</CustomButton>
          </View>
          <View style={styles.B2}>
              <CustomButton style={styles.button2}  onPress={() => props.onSelectCgpa()}>Calculate CGPA</CustomButton>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container:{
      flexDirection:'column',
      alignItems:'center'
    },
    B1: {
      width:450,
      marginTop:250,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    B2:{
      width:'93%',
      marginTop:10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button1:{
        backgroundColor:'blue',
    },
    button2:{
        backgroundColor:'green',
    }
  });

  export default StartScreen;