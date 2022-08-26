require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.lib.display.numericDisplay.js");
require("./../lib/swisscalc.lib.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js"); 

import React, {Component, component} from 'react';
import {View, ScrollView, Text, FlatList,Button, TouchableOpacity} from "react-native";
import  CalcButton  from './CalcButton';

export default class CalculatorScreen extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={}
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();
    }
    render(){
      return(
          <View style={{paddingTop:50}}>
              <Text>Calculator Screen</Text>
            </View>
      )
    }
}

