import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: '2.5%',
        //backgroundColor: 'lightgreen',
    },
    containerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#21130d', 
        paddingTop: '5%',
        //flex: 1,
        paddingVertical: '5%',

    },
    header: {
        marginTop: '2.5%',
    },
    textInput: {
        height: 50,
        padding: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#f6a827',
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
    errorText: {
        color: '#A22629',
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').height / 7,
        resizeMode: 'contain',
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
});

export default styles;
