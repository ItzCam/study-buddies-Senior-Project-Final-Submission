import React,{useState,useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GpaScreen from '../../../screens/GpaScreen.js';
import CgpaScreen from '../../../screens/CgpaScreen.js';
import StartScreen from '../../../screens/StartScreen.js';
import styles from './styles';

const GPACalculatorScreen = ({navigation}) => {
  const [calculate_gpa,setCalculate_gpa] = useState(false);
  const [calculate_cgpa,setCalculate_cgpa] = useState(false);

  const set_gpa = () =>{
    setCalculate_gpa(true);
    setCalculate_cgpa(false);
  };

  const set_cgpa = () =>{
    setCalculate_cgpa(true);
    setCalculate_gpa(false);
  };

  const set_home = () =>{
    setCalculate_cgpa(false);
    setCalculate_gpa(false);
  };

  let content = <StartScreen onSelectGpa={set_gpa} onSelectCgpa={set_cgpa} onSelectBack={set_home} />

  if(calculate_gpa)
  {
    content = <GpaScreen onSelectBack={set_home}/>
    console.log("GPA")
  }
  if(calculate_cgpa)
  {
    content = <CgpaScreen onSelectBack={set_home}/>
    console.log("CGPA")
  }

  return (
    <View style={styles.container}>
        {content}
    </View>
  );
};


export default GPACalculatorScreen;
