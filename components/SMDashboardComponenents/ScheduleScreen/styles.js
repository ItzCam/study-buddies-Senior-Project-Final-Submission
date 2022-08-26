import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: '2.5%',
    },
    shiftButtonView: {
        height: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    shiftButton: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedShiftButton: {
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#302f90',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#302f90',
    },
    selectedText: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
    },
    postTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    firstLine: {
        fontSize: 18,
        paddingBottom: '5%',
    },
    secondLine: {
        fontSize: 16,
        color: 'grey',
        paddingBottom: '5%',
    },
    thirdLine: {
        fontSize: 16,
        paddingBottom: '5%',
    },
});

export default styles;
