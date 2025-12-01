// @components/Outlet.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

// No props at all! This is the trick.
export default function Outlet() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Optional: add global screen padding here
    // paddingHorizontal: 16,
  },
});