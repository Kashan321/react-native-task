import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../../Redux/userSlice';
import uuid from 'react-native-uuid';

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });
  const [editUser, setEditUser] = useState(null);


  const handleChange = (name, value, isEdit = false) => {
    if (isEdit) {
      setEditUser({ ...editUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.age) {
      dispatch(addUser({ ...newUser, id: uuid.v4() }));
      setNewUser({ name: '', email: '', age: '' });
    }
  };

  
  const handleUpdateUser = () => {
    if (editUser && editUser.name && editUser.email && editUser.age) {
      dispatch(updateUser({ id: editUser.id, data: editUser }));
      setEditUser(null);
    }
  };


  const startEditing = (user) => {
    setEditUser(user);
  };

  
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>{item.name} - {item.email} - {item.age} years old</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => startEditing(item)} style={styles.button}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.button}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Management</Text>
      
     
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newUser.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newUser.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={newUser.age}
        onChangeText={(text) => handleChange('age', text)}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleAddUser} style={styles.addButton}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>

      
      {editUser && (
        <View>
          <Text style={styles.editHeader}>Edit User</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={editUser.name}
            onChangeText={(text) => handleChange('name', text, true)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={editUser.email}
            onChangeText={(text) => handleChange('email', text, true)}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={editUser.age}
            onChangeText={(text) => handleChange('age', text, true)}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleUpdateUser} style={styles.updateButton}>
            <Text style={styles.buttonText}>Update User</Text>
          </TouchableOpacity>
        </View>
      )}

      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userText: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
    padding: 5,
  },
});

export default UserManagement;
