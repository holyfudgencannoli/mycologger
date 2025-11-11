import 'react-native-reanimated';
import Navigation from './features/Navigation/RootNavigation.js';
import { AuthProvider } from './hooks/useAuthContext';
import * as React from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from './hooks/useTheme';


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

