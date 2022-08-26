import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#302f90',
        //#302f90 (Blue) -- #a81d20 (Red)
        width: '100%',
        height: '100%',
        //borderRadius: 10,
        //borderWidth: 2,
        padding: '5%',
        flex: 1,
        //flexDirection: 'column',
    },
    containerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    volunteerView: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        textAlign: 'justify',
        textAlignVertical: 'top',
    },
    volunteerInfo: {
        textAlign: 'justify',
        textAlignVertical: 'center',
        justifyContent: 'space-evenly',
        paddingTop: '5%',
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
    item: {
        backgroundColor: '#FFFF',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default styles;
