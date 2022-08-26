import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { KeyboardAvoidingView, Content, StyleSheet, Text, TextInput, TouchableOpacity, View, Icon, Dimensions, ScrollView, ImageBackground, ListItem, Pressable} from 'react-native';
import { auth } from '../firebase'

const ConfirmScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
  <ImageBackground style = {{flex: 1}} source={{uri:'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg'}}>
    <View style={styles.container}>
      <Text>Your account has been created!</Text>
      <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
    <Text style={styles.buttonText}>Continue to home screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign in to a different account</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
  )
}

export default ConfirmScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})