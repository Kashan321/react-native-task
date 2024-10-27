import React from 'react';
import { Provider } from 'react-redux';
import store from "../Redux/store"
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}
