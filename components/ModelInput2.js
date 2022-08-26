import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View,Modal,Picker,TextInput,Button,Keyboard } from 'react-native';
import CustomButton from '../components/CustomButton.js';

const ModalInput2 = props =>{
    const [enteredCredit,setEnteredCredit] = useState('');
    const [enteredGpa,setGpaValue] = useState('');

    const creditInputHandler = credit =>{
        setEnteredCredit(credit);
    };
    const gpaInputHandler = gpa =>{
        setGpaValue(gpa);
    };
    const infoHandler = () =>{
        props.add(enteredCredit,enteredGpa)
        setGpaValue('');
        setEnteredCredit('');
    };

    return(
    <View>
        <Modal statusBarTranslucent={true}  visible={props.visible} animationType="fade">

            <View style={styles.inputContainer}>
                <TextInput placeholder="ENTER Total CREDIT"
                keyboardType='number-pad'
                style={styles.input}
                onChangeText={creditInputHandler}
                value={enteredCredit}
                />
                <TextInput placeholder="ENTER GPA"
                keyboardType='number-pad'
                style={styles.input}
                onChangeText={gpaInputHandler}
                value={enteredGpa}
                />

                <View style={styles.button}>
                <View style={styles.buttonsize}>
                    <Button title="Cancel" color="red" onPress={props.onCancel} />
                </View >
                <View style={styles.buttonsize}>
                    <Button title="ADD" onPress={infoHandler} />
                </View>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text1}> Enter Total Credit</Text>
                    <Text style={styles.text2}> Enter Your final Gpa </Text>
                </View>
            </View>
        </Modal>
    </View>
    );
};

const styles = StyleSheet.create({
    inputContainer:{
        marginTop:'30%',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:'80%',
        borderColor:'black',
        borderWidth:1,
        padding:10,
        marginBottom: 10
      },
    button:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:'60%'
    },
    buttonsize:{
        width: '40%'
    },
    pickerContainer:{
        width:30
    },
    info:{
        marginTop:'40%',
        alignItems:'center',
    },
    text1:{
        fontSize:25,
        color:'indigo',
        fontWeight:'bold'
    },
    text2:{
        marginTop:10,
        fontSize:25,
        color:'green',
        fontWeight:'bold'
    }
  
});
  
export default ModalInput2;