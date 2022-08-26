import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';

const features = [
  { 
    id: '1234',
    title: 'Friend Finder',
  },
  { 
    id: '2567',
    title: 'Chat',
  },
  { 
    id: '7777',
    title: 'Cloud',
  },
  {
    id: '8888',
    title: 'Be My Buddy (demo)',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const ResrcCenterScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = "#f6a827";
    const color = 'white';

    return(
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  
  if(selectedId === '1234'){
    navigation.navigate('Friend Finder');
  } else if(selectedId === '2567'){
    navigation.navigate('Chat Room');
  } else if(selectedId === '7777'){
    navigation.navigate('Buddy Cloud')
  } else if(selectedId === '8888'){
    Alert.alert('You have a new friend request from User: Alpha Notes 331');
  }
  
  // note: bug still exists when wanting to access same resource. Ex: Resrc -> Friend Finder -> Resrc -> Friend Finder cannot be reaccessed. Possible selectedId issues and different intermediate resrc works fine

  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

export default ResrcCenterScreen;