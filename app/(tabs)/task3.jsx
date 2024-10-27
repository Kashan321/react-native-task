import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ImageUploader = () => {
  const [imageUri, setImageUri] = useState(null);


  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant permission to access the camera roll.');
    }
  };

  const handleImagePicker = async () => {
   
    await requestPermission();

    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (result.cancelled) {
      console.log('User cancelled image picker');
      return;
    }

    const source = result.uri;
    setImageUri(source);
    uploadImage(source);
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('photo', {
      uri,
      type: 'image/jpeg', 
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Image upload failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Uploader</Text>
      <Button title="Select Image" onPress={handleImagePicker} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ImageUploader;
