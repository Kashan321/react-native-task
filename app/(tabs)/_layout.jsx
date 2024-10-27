import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs screenOptions={{
        headerShown: false,
      }}>
        <Tabs.Screen
          name='index'
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='task2'
          options={{
            title: "User",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='task3'
          options={{
            title: "Images",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="image-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='task4'
          options={{
            title: "TopTab",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='task5'
          options={{
            title: "MediaPlayer",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="play-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
});
