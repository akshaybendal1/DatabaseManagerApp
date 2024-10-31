import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TextInput } from 'react-native';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function App() {
  const [taskInput, enterTask] = useState('');
  const [toDoList, setTask] = useState([]);

  const inputHandler = (enteredText) => {
    enterTask(enteredText);
  };
  const addTask = newTask => {
    setTask(currentTask => [...currentTask, newTask]);
    enterTask('');
  };

  return (
    <View style={styles.container}>
       <Button title="Add" onPress={() => {addTask(taskInput)}}  color="#2986cc"   
                icon={{
                  name: 'user',
                  type: 'font-awesome',
                  size: 15,
                  color: 'white',
                }}
                iconRight
                iconContainerStyle={{ marginLeft: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                  backgroundColor: 'rgba(64,155,238,1)',
                  borderColor: 'transparent',
                  borderWidth: 4,
                  borderRadius: 100,
                }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}/>
      <View style={styles.inputContainer}>
     
        <TextInput placeholder='Enter Task' style={styles.input} value={taskInput} onChangeText={inputHandler} />
        

      </View>
     
      <ScrollView>
        {
          toDoList.map(task => (
            <View key={task} style={styles.ListContainer}> 
            <Text>{task}</Text>
            </View>
          ))
        }
      </ScrollView>
      <StatusBar style="dark"  />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal:20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
    justifyContent: 'center',
    fontFamily:'Magneto'
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical:20
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#20232a",
    backgroundColor: '#fff',
    borderRadius: 3,
    flex:1,
    marginRight:5
    
  },
  button1:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    flex:1,
    backgroundColor: 'black',
  }
  ,
  ListContainer:{
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 3,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
