import React from "react";
import {Button, Modal, Pressable, ScrollView, Text, Alert, View} from "react-native";
import styles from "./styles";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import StyledButton from "../../TitleComponents/StyledButton";
import {db} from "../../../db/firestore";
import Gallery from "react-native-image-gallery";

let locationsCollection = {};

const CreateMeetingScreen = ({navigation}) => {
    const [locationItems, setLocationItems] = React.useState([]); 

    const [selectedLocation, setSelectedLocation] = React.useState();
    const [selectedMajor, setSelectedMajor] = React.useState();

    const [disabled, setDisabled] = React.useState(true);

    const [selectedDate, setSelectedDate] = React.useState(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)));
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const [show, setShow] = React.useState(false);

    const [locationPhotoURL, setLocationPhotoURL] = React.useState();
    const [locationDescription, setLocationDescription] = React.useState();
    const [locationAmenities, setLocationAmenities] = React.useState();
    const [locationTime, setLocationTime] = React.useState();

    async function getLocations() {
        await db.collection('locations').get().then((snapshot) => {
            snapshot.docs.map(doc => {
                if (doc !== undefined) {
                    locationsCollection[doc.id] = doc.data();
                }
            })
        })

        generateLocationItems();
    }

    function generateLocationItems() {
        let locations = [];
        for (const key of Object.keys(locationsCollection)) {
            locations.push(key);
        }

        /*let lowRoutes = [];
        for (const route of routes) {
            if (route.charAt(0) === '0' || (route.length === 2 && isNaN(route))) {
                lowRoutes.push(route);
            }
        }*/

        locations.sort();

        let newLocationItems = [];
        for (const location of locations) {
            newLocationItems.push({label: location, value: location})
        }

        setLocationItems(newLocationItems);
    }

    function setLocationProperties(location) {
        if (locationsCollection[location] !== undefined) {
            setLocationPhotoURL(locationsCollection[location]['photoURL']);
            setLocationDescription(locationsCollection[location]['buildingDescription']);
            setLocationAmenities(locationsCollection[location]['parkingAmenities']);
            setLocationTime(locationsCollection[location]['time']);
        }
    }

    function handleConfirm(date) {
        setSelectedDate(new Date(date.getTime() - (date.getTimezoneOffset() * 60000)));
        setDatePickerVisibility(false);
    }

    function post() {
        console.log(selectedLocation);
        console.log('SELECTED DATE')
        console.log(selectedDate);
        console.log(selectedMajor);
        if (selectedLocation === undefined || selectedMajor === undefined) {
            Alert.alert('Missing information!');
        } else {
            let dateFormat = selectedDate.toISOString().slice(0, 10);
            db.collection('schedules').add({date: dateFormat, major: selectedMajor, location: selectedLocation});
            Alert.alert('Meeting has been posted!');
        }
    }

    if (locationItems.length === 0)
        getLocations();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.containerStyle}>
            <View style={styles.inputView}>
                <View style={styles.miniView}>
                    <Text>Meeting Location:</Text>
                    <RNPickerSelect
                        style={styles}
                        onValueChange={function (location) {
                            setSelectedLocation(location);
                            console.log(location);
                            if (location !== undefined) {
                                setDisabled(false);
                                setLocationProperties(location);
                            } else {
                                setDisabled(true);
                            }
                        }}
                        selectedValue={selectedLocation}
                        items={locationItems}
                        placeholder={{label: 'Select a meeting location...'}}
                    />
                </View>

                {/* View Map Button */}
                <View style={styles.miniView}>
                    <Text>View Meeting Location:</Text>
                    <StyledButton
                        onPress={() => {
                            setShow(true)
                        }}
                        text="View Map"
                        disabled={disabled}/>
                    <Modal
                        transparent={true}
                        visible={show}>
                        <View style={styles.modal}>
                            <View style={{height: '90%'}}>
                                <Gallery
                                    images={[{source: {uri: locationPhotoURL}}]}/>
                            </View>
                            <StyledButton
                                text="Close Map"
                                onPress={() => {
                                    setShow(false)
                                }}/>
                        </View>
                    </Modal>
                </View>

                <View style={styles.miniView}>
                    <Text>Description:</Text>
                    <Text>{locationDescription}</Text>
                </View>

                <View style={styles.miniView}>
                    <Text>Amenities:</Text>
                    <Text>{locationAmenities}</Text>
                </View>

                <View style={styles.miniView}>
                    <Text>Hours:</Text>
                    <Text>{locationTime}</Text>
                </View>

                <View style={styles.miniView}>
                    <Text>Select Meeting Date:</Text>
                    <StyledButton
                        onPress={() => setDatePickerVisibility(true)}
                        text={selectedDate.toDateString()}>
                    </StyledButton>
                    <DateTimePickerModal
                        mode="date"
                        isVisible={isDatePickerVisible}
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>

                <View style={styles.miniView}>
                    <Text>Majors:</Text>
                    <RNPickerSelect
                        style={styles}
                        onValueChange={(value) => setSelectedMajor(value)}
                        selectedValue={selectedMajor}
                        placeholder={{label: 'Select a major for your meeting...'}}
                        items={[
                            {label: 'Computer Science', value: 'Computer Science'},
                            {label: 'Friendly Visitor', value: 'Friendly Visitor'},
                            {label: 'Driver & Friendly Visitor', value: 'Both'},
                        ]}
                    />
                </View>
            </View>

            <View style={styles.buttonView}>
                <StyledButton
                    style={styles.button}
                    text={'Schedule Meeting'}
                    onPress={post}
                />
            </View>
        </ScrollView>
    );
}

export default CreateMeetingScreen;
