import React from 'react';
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';



const Card2 = props =>{
    if(props.credit===null || props.grade===null){
        return(
            <View>
                <Text>Tap Add Subject</Text>
            </View>
        );
    }
    else{
        return(
            <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={props.onDelete.bind(this,props.value)} >
                <View style={{...styles.card,...props.style}}>
                    <Text style={styles.text1}>Credit - {props.credit}</Text>
                    <Text style={styles.text1}>GPA - {props.gpa}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    
};

const styles = StyleSheet.create({
    card:{
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:30,
        shadowOpacity:0.25,
        backgroundColor:'white',
        elevation:15,
        borderRadius:10,
      },
      text1:{
          color:'green',
          fontSize:20
      },
      container:{
          width:220,
          height:70
      }
});

  export default Card2;