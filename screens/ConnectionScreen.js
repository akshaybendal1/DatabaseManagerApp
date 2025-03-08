import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { createTable, saveConnection, getConnections, deleteConnection } from '../services/SQLiteService';
import { Picker } from '@react-native-picker/picker';
const ConnectionScreen = () => {
  const [connections, setConnections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newConnection, setNewConnection] = useState({
    name: '',
    type: 'MSSQL',
    host: '',
    port: '',
    username: '',
    password: '',
    database: '',
  });

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    await createTable();
    const storedConnections = await getConnections();
    setConnections(storedConnections);
  };

  const handleAddConnection = async () => {
    try{
    console.log("Inside Save function")
    if (!newConnection.name || !newConnection.host || !newConnection.database) return;
    console.log("Inside newConnection")
    await saveConnection(newConnection);
    console.log("after saveConnection")
    const updatedConnections = await getConnections();
    console.log("after getConnections")
    setConnections(updatedConnections);
    console.log("after setConnections")
    setNewConnection({ name: '', type: 'MSSQL', host: '', port: '', username: '', password: '', database: '' });
    setModalVisible(false);
    }
    catch (error) {
      console.error("handleAddConnection Error :", error);

    }
  };

  const handleDeleteConnection = async (id) => {
    await deleteConnection(id);
    const updatedConnections = await getConnections();
    setConnections(updatedConnections);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={connections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.connectionItem}>
            <Text style={styles.connectionText}>{item.name} ({item.type})</Text>
            <TouchableOpacity onPress={() => handleDeleteConnection(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Connection</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Connection</Text>

            <TextInput
              style={styles.input}
              placeholder="Connection Name"
              value={newConnection.name}
              onChangeText={(text) => setNewConnection({ ...newConnection, name: text })}
            />

            <Picker
              selectedValue={newConnection.type}
              onValueChange={(itemValue) => setNewConnection({ ...newConnection, type: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="MSSQL" value="MSSQL" />
              <Picker.Item label="MySQL" value="MySQL" />
              <Picker.Item label="Oracle" value="Oracle" />
              <Picker.Item label="SQLite" value="SQLite" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Host"
              value={newConnection.host}
              onChangeText={(text) => setNewConnection({ ...newConnection, host: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Port"
              value={newConnection.port}
              keyboardType="numeric"
              onChangeText={(text) => setNewConnection({ ...newConnection, port: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={newConnection.username}
              onChangeText={(text) => setNewConnection({ ...newConnection, username: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={newConnection.password}
              onChangeText={(text) => setNewConnection({ ...newConnection, password: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Database Name"
              value={newConnection.database}
              onChangeText={(text) => setNewConnection({ ...newConnection, database: text })}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleAddConnection}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Reuse existing styles

export default ConnectionScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    connectionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    connectionText: {
      fontSize: 16,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    addButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      margin: 30,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      padding: 10,
      marginVertical: 5,
    },
    picker: {
      height: 50,
    },
    saveButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      marginTop: 10,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
  });
  
  //export default ConnectionScreen;
  

