import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#FFFF',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 8,
      height: 100,
    },
    title: {
      fontSize: 27,
    },
  });

export default styles;