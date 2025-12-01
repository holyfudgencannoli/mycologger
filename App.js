import 'react-native-reanimated';
import Navigation from './features/Navigation/index.jsx';
import { AuthProvider } from './hooks/useAuthContext';
import * as React from 'react'
import { Provider as PaperProvider, Portal } from 'react-native-paper';
import { ThemeProvider } from './hooks/useTheme';
import { migrateDbIfNeeded } from './data/db/migrations';
import { UnitConversionProvider } from '../mycologger-0.0.1/src/utils/unitConversion.js';
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import Layout from '@features/Layout/index.tsx';
import { View } from 'react-native';


export default function App() {
    
	// React.useEffect(() => {
	// 	getDb()
	// 		.then(() => console.log('Database initialized and ready!'))
	// 		.catch(err => console.error('Failed to initialize database...: ', err))
	// }, [])

	const handleInit = async (db) => {
		try {
			await migrateDbIfNeeded(db);
			console.log("✅ Migration complete!");
		} catch (err) {
			console.error("❌ Migration failed:", err);
		}
	};

	return (
		<SQLiteProvider databaseName='mycologger.db' onInit={handleInit}>
			{/* // <UnitConversionProvider> */}
				<AuthProvider>
					<PaperProvider>
						<ThemeProvider>
                                <Navigation />                
						</ThemeProvider>
					</PaperProvider>
				</AuthProvider>
			{/* // </UnitConversionProvider> */}
		// </SQLiteProvider>
	);
}

