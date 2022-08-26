import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        height: '100%',
    },
    titleView: {
        //paddingTop: '10%',
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center',
        //backgroundColor: 'green'
        //backgroundColor: '#302f90',
    },
    title: {
        fontSize: 72,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',

        //backgroundColor: '#a81d20',

    },
    subtitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontStyle: "italic",
        textAlign: 'center',
    },
    subtitleView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    buttonView: {
        paddingHorizontal: '5%',
        paddingBottom: '5%',
    }
});

export default styles;
