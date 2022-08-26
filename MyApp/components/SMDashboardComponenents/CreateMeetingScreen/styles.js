import {Platform, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        //backgroundColor: 'lightgreen',
        paddingHorizontal: '5%',
        //backgroundColor: '#fafafa',
    },
    containerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    inputView: {
        marginTop: '5%',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#f6a827',
        padding: '2.5%',
    },
    miniView: {
        paddingBottom: '2.5%'
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        //margin: '2.5%',
    },
    viewContainer: {
        borderWidth: 2,
        borderColor: '#f6a827',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginTop: '2.5%',
    },
    inputIOS: {
        color: 'black',
        padding: 10
    },
    inputAndroid: {
        color: 'black',
    },
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
        textAlign: 'center',
        alignItems: 'center',
        paddingBottom: '2.5%'
    },
    image: {
        resizeMode: 'center',
        flex: 1 / 2,
    },
    modal: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                paddingTop: '5%'
            }
        })
    },
});

export default styles;
