import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';

const StyledButton = (props) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={props.onPress}
                disabled={props.disabled}
            >
                <Text style={styles.text}>{props.text}</Text>
            </Pressable>
        </View>
    );
};

export default StyledButton;
