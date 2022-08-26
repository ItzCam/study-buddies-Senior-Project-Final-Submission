import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View,Button,Modal,FlatList,Alert } from 'react-native';

import CustomButton from '../components/CustomButton.js';
import ModalInput from '../components/ModelInput.js';
import Card from '../components/Card.js';



const GpaScreen = props =>{
    const [subject,setSubject] = useState([]);
    const [isAddMode,setIsAddMode] = useState(false);
    const [isCalculate,setCalculate] = useState(false);

    const unique = useRef(0);

    const reset = () =>{
        setSubject([]);
        unique.current = 0;
    };

    const renderListItem = (itemData) =>(
        <View style={styles.Card}>
            <Card style={styles.inputcontainer} 
                grade={itemData.item[1]} 
                credit={itemData.item[0]}
                value={itemData.item[2]}
                onDelete={deleteSubject}
                index={itemData.index} />
        </View>
    );

    const InputHandler = (credit,grade) =>{
        if (credit==='' || grade===''){
            return;
        }
        unique.current = unique.current + 1
        setSubject(currentSubject => [[credit,grade,unique.current],...currentSubject]);
        console.log(credit);
        console.log(grade);
        setIsAddMode(false);
    };

    const deleteSubject = (value) =>{
        setSubject(currentSubject =>{
            return currentSubject.filter((sub) => sub[2]!=value);
        });
        console.log(subject);
    };

    const calculate = () =>{
        var numerator = 0;
        var denominator = 0;
        var i;
        if(subject.length===0)
        {
            Alert.alert("Oops!", 'No Subject Added' , [{text:'OK',style:'cancel'}]);
            return;
        }
        for(i=0;i<subject.length;i++)
        {
            denominator = denominator + parseInt(subject[i][0]);
            if(subject[i][1]==='S')
            {
                numerator = numerator + parseInt(subject[i][0])*10;
            }
            if(subject[i][1]==='A')
            {
                numerator = numerator + parseInt(subject[i][0])*4;
            }
            if(subject[i][1]==='B')
            {
                numerator = numerator + parseInt(subject[i][0])*3;
            }
            if(subject[i][1]==='C')
            {
                numerator = numerator + parseInt(subject[i][0])*2;
            }
            if(subject[i][1]==='D')
            {
                numerator = numerator + parseInt(subject[i][0])*1;
            }
            if(subject[i][1]==='E')
            {
                numerator =numerator + parseInt(subject[i][0])*0;
            }
            if(subject[i][1]==='F')
            {
                numerator = numerator + parseInt(subject[i][0])*0;
            }
        }
        var answer = (numerator/denominator)
        var decimal_2 = (answer.toFixed(2)).toString()
        var string = "Your GPA is ".concat(decimal_2)
        Alert.alert("Congrats !", string , [{text:'OK',style:'cancel'}]);
    }

    return(
        <View style={styles.container}>
            <ModalInput visible={isAddMode} onCancel={() => setIsAddMode(false)} add={InputHandler} />
            <View style={styles.buttonContainer}>
                <View style={styles.button1} >
                    <CustomButton onPress={() => props.onSelectBack()} >Back</CustomButton>
                </View>
                <CustomButton style={styles.button2} onPress={() => setIsAddMode(true)} >Add GPA</CustomButton>
            </View>
            <FlatList keyExtractor={(item) => item} 
                    data={subject} 
                    renderItem={renderListItem.bind(this)}
            />
            <View style={styles.buttonContainer2}>
                <View style={styles.button1} >
                    <CustomButton style={styles.b1} onPress={reset} >Reset</CustomButton>
                </View>
                <CustomButton style={styles.b2} onPress={calculate} >Calculate</CustomButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        marginTop:20,
    },
    button1:{
        marginRight:20,
    },
    button2:{
        paddingHorizontal:72
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        paddingHorizontal:10
    },
    inputcontainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center'  
    },
    Card:{
        marginTop:20,
        marginBottom:14,
        alignItems:'center'
    },
    buttonContainer2:{
        flexDirection:'row',
        width:'100%',
        paddingHorizontal:10,
        marginBottom:'1%'
    },
    b1:{
        backgroundColor:'blue'
    },
    b2:{
        backgroundColor:'indigo',
        paddingHorizontal:65
    }
});

export default GpaScreen;