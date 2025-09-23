import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { Surface, TextInput } from 'react-native-paper';
import Navigation from './Navigation.js';
import { useColorScheme } from './hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AuthProvider } from './scripts/AuthContext.tsx';
import * as React from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemedText } from './components/ThemedText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from './scripts/AuthContext';


export default function App() {


  return (
    <AuthProvider>
            <PaperProvider>
                <ThemeProvider>
                    <Navigation />                 
                </ThemeProvider>
            </PaperProvider>
        </AuthProvider>
    
  );
}

