import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View,Button,Modal,FlatList,Alert } from 'react-native';

import CustomButton from '../components/CustomButton.js';
import ModalInput2 from '../components/ModelInput2.js';
import Card2 from '../components/Card2.js';



const CgpaScreen = props =>{
    const [yearInfo,setYearInfo] = useState([]);
    const [isAddMode,setIsAddMode] = useState(false);
    const [isCalculate,setCalculate] = useState(false);

    const unique = useRef(0);

    const renderListItem = (itemData) =>(
        <View style={styles.Card}>
            <Card2 style={styles.inputcontainer} 
                value={itemData.item[2]}
                gpa={itemData.item[1]} 
                credit={itemData.item[0]}
                onDelete={deleteSubject}
                index={itemData.index} />
        </View>
    );

    const reset = () =>{
        setYearInfo([]);
        unique.current = 0;
    };

    const InputHandler = (credit,gpa) =>{
        if (credit==='' || gpa===''){
            return;
        }
        unique.current = unique.current + 1
        setYearInfo(currentYear => [[credit,gpa,unique.current],...currentYear]);
        console.log(unique.current);
        setIsAddMode(false);
    };

    const deleteSubject = (key) =>{
        setYearInfo(currentYear =>{
            return currentYear.filter((sub) => sub[2]!=key);
        });
        console.log(yearInfo);
    };

    const calculate = () =>{
        var numerator = 0;
        var denominator = 0;
        var i;
        if(yearInfo.length===0)
        {   
            Alert.alert("Oops!", 'No CGPA added' , [{text:'OK',style:'cancel'}]);
            return;
        }
        for(i=0;i<yearInfo.length;i++)
        {
            numerator = numerator + parseInt(yearInfo[i][0])*parseFloat(yearInfo[i][1]);
            denominator = denominator + parseInt(yearInfo[i][0]);
        }

        var answer = (numerator/denominator);
        var decimal_2 = (answer.toFixed(2)).toString();
        var string = 'Your Cgpa is '.concat(decimal_2);
        Alert.alert("Congrats !", string , [{text:'OK',style:'cancel'}]);
    }

    return(
        <View style={styles.container}>
            <ModalInput2 visible={isAddMode} onCancel={() => setIsAddMode(false)} add={InputHandler} />
            <View style={styles.buttonContainer}>
                <View style={styles.button1} >
                    <CustomButton onPress={() => props.onSelectBack()} >Back</CustomButton>
                </View>
                <CustomButton style={styles.button2} onPress={() => setIsAddMode(true)} >Add CGPA</CustomButton>
            </View>
            <FlatList keyExtractor={(item) => item} 
                    data={yearInfo} 
                    renderItem={renderListItem.bind(this)}
            />
            <View style={styles.buttonContainer2}>
                <View style={styles.button1} >
                    <CustomButton style={styles.b1} onPress={reset}>Reset</CustomButton>
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
        paddingHorizontal:55
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

export default CgpaScreen;