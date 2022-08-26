import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'lightgreen',
        width: '100%',
        height: '100%',
        paddingHorizontal: '5%',
    },
    containerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        color: '#21130d', //CSULB Black Color
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingVertical: '5%',
    },
    textInput: {
        height: 50,
        padding: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#f6a827', // CSULB Yellow Color
        color: '#a81d20',
        backgroundColor: '#ffffff',
        marginVertical: '2.5%',
    },
    textInputView: {
        //backgroundColor: 'green',
        justifyContent: 'center',
        padding: '2.5%',
        //flex: 1,
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#f6a827',
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').height / 3,
        resizeMode: 'cover',
        //flex: 10,
    },
    imageView: {
        paddingTop: '5%',
    },
    footerView: {
        //backgroundColor: 'pink',
        flex: 1,
        justifyContent: 'flex-end',

        textAlign: 'center',
        alignItems: 'center',
        paddingBottom: '5%'

    },
    forgotPassword: {
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: '2.5%'
    },
});

export default styles;
