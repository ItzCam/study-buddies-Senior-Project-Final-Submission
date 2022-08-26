import React from "react";
import {Pressable, View, Text, Button} from "react-native";
import {Agenda} from 'react-native-calendars';
import styles from "../ScheduleScreen/styles";
import {auth, db} from "../../db/firestore";
import getIsAdmin from "../Admin/getIsAdmin";
import firebase from "firebase/app";

let isAdmin;
let userID, userName, userRole;
let locationsCollection = {};
let schedulesCollection = {};
let markedItems = {};

//TODO: Add view map above accept/reject buttons
const ScheduleScreen = () => {
    const [items, setItems] = React.useState({});
    const [selectedButton, setSelectedButton] = React.useState('All');

    let today = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 10);

    async function getData() {
        isAdmin = await getIsAdmin();
        await getUserData();
        await getLocations();
        await getSchedules();
    }

    async function getUserData() {
        userID = auth.currentUser.uid;
        const userData = await db.collection('users').doc(userID).get();
        userName = userData.data().name;
        userRole = userData.data().role;
    }

    async function getLocations() {
        locationsCollection = {};
        await db.collection('locations').get().then((snapshot) => {
            snapshot.docs.map(doc => {
                if (doc !== undefined) {
                    locationsCollection[doc.id] = doc.data();
                }
            })
        })
    }

    async function getSchedules() {
        schedulesCollection = {};
        await db.collection('schedules').get().then((snapshot) => {
            snapshot.docs.map(doc => {
                if (doc !== undefined) {
                    schedulesCollection[doc.id] = doc.data();
                }
            })
        })
      
        generateItems(selectedButton);
    }

    function generateItems(scheduleButton) {
        // key = shiftID, value = shift
        let scheduleItem = {};
        for (const [key, value] of Object.entries(schedulesCollection)) {
            let addItem = false;
            if (scheduleButton === 'My') {
                if (userID === value.computerscienceID || userID === value.computerengineeringID) {
                    addItem = true;
                }
            } else if (scheduleButton === 'All') {
                addItem = true;
            } else if (scheduleButton === 'Open') {
                if (((value.position === 'Computer Science') && (userRole === 'Computer Science')) ||
                    ((value.position === 'Computer Engineering') && (userRole === 'Computer Engineering'))) {
                    if (userID !== value.computerscienceID && userID !== value.computerengineeringID) {
                        addItem = true;
                    }
                }
            }
            if (addItem) {
                if (scheduleItem[value['date']] === undefined)
                    scheduleItem[value['date']] = [];
                let scheduleObject = Object.assign(schedulesCollection[key], {marked: true, id: key});
                scheduleItem[value['date']].push(scheduleObject);
            }
        }

        markedItems = {};
        for (const key of Object.keys(scheduleItem)) {
            markedItems[key] = scheduleItem[key][0];
        }

        setItems(scheduleItem);
    }

    function acceptMeeting(meeting, assignedRole) {
        db.collection('schedules').doc(meeting.id).update({[assignedRole]: userName});
        db.collection('schedules').doc(meeting.id).update({[assignedRole + 'ID']: userID});
        getData();
    }

    async function dropMeeting(meeting, assignedRole) {
        await db.collection('schedules').doc(meeting.id).update({[assignedRole]: firebase.firestore.FieldValue.delete()});
        await db.collection('schedules').doc(meeting.id).update({[assignedRole + 'ID']: firebase.firestore.FieldValue.delete()});
        getData();
    }

    async function deleteMeeting(meeting) {
        await db.collection('schedules').doc(meeting.id).delete();
        getData();
    }

    function renderItem(meeting) {
        if (Object.keys(locationsCollection).length === 0)
            return;

        let futureDate = true;
        if (new Date(meeting.time).getTime() < new Date(today).getTime()) {
            futureDate = false;
        }

        let acceptView = false;
        let potentialRole;
        if (meeting.position === 'Computer Science') {
            if (userRole === 'Computer Science') {
                if (meeting.computerScience === undefined) {
                    acceptView = true;
                    potentialRole = 'computerScience';
                }
            }
        }

        if (meeting.position === 'Computer Engineering') {
            if (userRole === 'Computer Engineering') {
                if (meeting.computerEngineering === undefined) {
                    if (potentialRole === undefined) {
                        acceptView = true;
                        potentialRole = 'computerEngineering';
                    }
                }
            }
        }

        let assignedRole;
        let dropView = false;
        if (userID === meeting.computerscienceID) {
            assignedRole = 'computerScience';
            acceptView = false;
            dropView = true;
        } else if (userID === meeting.computerengineeringID) {
            assignedRole = 'computerEngineering';
            acceptView = false;
            dropView = true;
        }

        let locationInfo = locationsCollection[meeting.location];

            return (
            <View style={{
                marginRight: '5%',
                marginVertical: '2.5%',
                backgroundColor: 'white',
                flex: 1,
                borderRadius: 5,
                borderColor: '#302f90',
                padding: '5%'
            }}>
                <View style={styles.postTextView}>
                    <Text style={styles.firstLine}>Location {meeting.location}</Text>
                    <Text style={styles.firstLine}>{locationInfo.time}</Text>  
                </View>
                <View style={styles.postTextView}>
                    <Text style={styles.secondLine}>Info: {locationInfo.buildingDescription}</Text>
                    <Text style={styles.secondLine}>Amenities: {locationInfo.parkingAmenities}</Text>
                </View>
                <View style={styles.postTextView}>
                    <Text style={styles.thirdLine}>Major: {meeting.position === 'Both' ? 'Computer Science & Computer Engineering' : meeting.position}</Text>
                </View>
                <View style={styles.postTextView}>
                    {(meeting.position === 'Computer Science') && <Text style={styles.secondLine}>Computer Science: {meeting.computerScience}</Text>}
                    {(meeting.position === 'Computer Engineering') && <Text style={styles.secondLine}>Computer Engineering: {meeting.computerEngineering}</Text>}
                </View>
                {futureDate && <View style={styles.buttonView}>
                    {acceptView && <Button title={'Accept'} color={'#018704'} onPress={function () {
                        acceptMeeting(meeting, potentialRole);
                    }}/>}
                    {dropView && <Button title={'Drop'} color={'#a22629'} onPress={function () {
                        dropMeeting(meeting, assignedRole);
                    }}/>}
                    <Button title={'More Info'} color={'#302f90'}/>
                    {isAdmin && <Button title={'Delete'} color={'#a22629'} onPress={function () {
                        deleteMeeting(meeting);
                    }}/>}
                </View>}
            </View>
        );
    }

    if (isAdmin === undefined)
        getData();

    return (
        <View style={{flex: 1}}>
            <View style={styles.shiftButtonView}>
                <Pressable style={(selectedButton === 'My' ? styles.selectedShiftButton : styles.shiftButton)} onPress={function() {
                    setSelectedButton('My');
                    generateItems('My');
                }}>
                    <Text style={(selectedButton === 'My' ? styles.selectedText : styles.text)}>My</Text>
                </Pressable>
                <Pressable style={(selectedButton === 'All' ? styles.selectedShiftButton : styles.shiftButton)} onPress={function() {
                    setSelectedButton('All');
                    generateItems('All');
                }}>
                    <Text style={(selectedButton === 'All' ? styles.selectedText : styles.text)}>All</Text>
                </Pressable>
                <Pressable style={(selectedButton === 'Open' ? styles.selectedShiftButton : styles.shiftButton)} onPress={function() {
                    setSelectedButton('Open');
                    generateItems('Open');
                }}>
                    <Text style={(selectedButton === 'Open' ? styles.selectedText : styles.text)}>Open</Text>
                </Pressable>
            </View>
            <Agenda
                items={items}
                renderItem={renderItem}
                selected={today}
                showClosingKnob={true}
                markedDates={markedItems}
                onRefresh={getData}
                onCalendarToggled={getSchedules}
                style={styles}
                theme={{
                    agendaKnobColor: '#302f90',
                    agendaTodayColor: '#302f90',
                    dotColor: '#302f90',
                    selectedDayBackgroundColor: '#E1EDFE',
                    selectedDayTextColor: '#302f90',
                    selectedDotColor: '#302f90',
                    todayTextColor: '#A22629',
                }}
            />
        </View>
    );
};

export default ScheduleScreen;