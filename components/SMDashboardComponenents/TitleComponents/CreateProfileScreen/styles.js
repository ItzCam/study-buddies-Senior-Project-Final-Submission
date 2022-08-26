import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: '5%',
        //backgroundColor: 'lightgreen',
    },
    containerStyle: {
        //height: '100%',
        //flexBasis: Dimensions.get('window').height,
        flexGrow: 1,
        justifyContent: 'space-evenly',
        //backgroundColor: 'green',
    },
    input: {
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#f6a827',
        backgroundColor: '#ffffff',
        color: '#a81d20',
        padding: 10,
        marginVertical: '2%',
        //marginBottom: '5%',
    },
    textInputView: {
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#f6a827',
        padding: '2.5%',
        marginTop: '10%',
        //marginBottom: '15%',
        justifyContent: 'space-evenly',
    },
    footerView: {
        //backgroundColor: 'pink',
        flex: 1,
        //height: 25,
        //paddingTop: '35%',
        justifyContent: 'flex-end',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        color: '#21130d',
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingVertical: '2.5%',
    },
    inputIOS: {
        color: 'black',
        paddingHorizontal: 10
    },
    inputAndroid: {
        color: 'black',
    },
    viewContainer: {
        borderWidth: 2,
        borderColor: '#f6a827',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginVertical: '2%',
    },
});

export default styles;
