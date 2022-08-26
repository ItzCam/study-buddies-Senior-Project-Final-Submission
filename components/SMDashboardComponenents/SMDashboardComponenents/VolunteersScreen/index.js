import React, {useEffect, useState} from "react";
import styles from './styles';
import {View, ScrollView, Text, FlatList, TouchableOpacity} from "react-native";
import { Modal } from "react-native-paper";
import StyledButton from "../../TitleComponents/StyledButton";
import {db} from "../../../db/firestore";

const VolunteersScreen = () => {
    const [userList, setUserList] = useState([]);
    const [show, setShow] = useState(false);

    async function getUser() {
        const docRef = db.collection('users')
        const snapshot = await docRef.get()
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;        
        }
        snapshot.forEach(doc => {
            setUserList(userList => [...userList, doc.data()])
        });
    }

    function displayModal(show, item) {
      setShow(show);
      displayInfo(item)
    }

    function displayInfo(item) {
      console.log(item);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (  
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.containerStyle}
            keyboardShouldPersistTaps={'always'}>
        <FlatList
            data={userList}
            renderItem={({item}) => (
              <View style={styles.item}>
                <TouchableOpacity onPress={() => displayModal(true, item)}>
                  <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}  
        />    
        <Modal
          transparent={true}
          visible={show}>
          <View style={styles.modal}>
              <View style={{height: '90%'}}>
                <View>{displayInfo()}</View>
              </View>
              <StyledButton
                text="Close Profile Info"
                  onPress={() => {setShow(false)}}/>
          </View>
        </Modal>
        </ScrollView>
    );
}

export default VolunteersScreen;