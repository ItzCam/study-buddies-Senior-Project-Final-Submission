import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View,Modal,Picker,TextInput,Button,Keyboard } from 'react-native';
import CustomButton from '../components/CustomButton.js';

const ModalInput = props =>{
    const [enteredCredit,setEnteredCredit] = useState();
    const [pickerValue,setPickerValue] = useState('');

    const creditInputHandler = credit =>{
        setEnteredCredit(credit)
    };
    const pickerInputHandler = grade =>{
        setPickerValue(grade)
    };
    const subjectInput = () =>{
        props.add(enteredCredit,pickerValue)
        setPickerValue('')
        setEnteredCredit();
    }

    return(
    <View>
        <Modal statusBarTranslucent={true}  visible={props.visible} animationType="fade">
            <View style={styles.inputContainer}>
                <TextInput placeholder="ENTER CREDIT"
                keyboardType='number-pad'
                style={styles.input}
                onChangeText={creditInputHandler}
                value={enteredCredit}
                />
                <Picker 
                    selectedValue = {pickerValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={pickerInputHandler}
                >
                        <Picker.Item label='- - -' value='-'/>
                        <Picker.Item label='S' value='S' />
                        <Picker.Item label='A' value='A' />
                        <Picker.Item label='B' value='B' />
                        <Picker.Item label='C' value='C' />
                        <Picker.Item label='D' value='D' />
                        <Picker.Item label='E' value='E' />
                        <Picker.Item label='F' value='F' />
                </Picker>
                <View style={styles.button}>
                    <View style={styles.buttonsize}>
                        <Button title="Cancel" color="red" onPress={props.onCancel} />
                    </View >
                    <View style={styles.buttonsize}>
                        <Button title="ADD" onPress={subjectInput} />
                    </View>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text1}>Can Enter Credit [1-9]</Text>
                    <Text style={styles.text2}>Grades Range from [A - F] U [S]</Text>
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
  
export default ModalInput;