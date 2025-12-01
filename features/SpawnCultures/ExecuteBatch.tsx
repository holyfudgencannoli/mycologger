import { Surface, TextInput } from "react-native-paper";
import { ImageBG } from "../../components/ImageBG";
import { ScreenPrimative } from "../../components/ScreenPrimative";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { PaperSelect } from "react-native-paper-select";
import * as Recipe from './../../data/db/recipes'
import * as Culture from './../../data/db/culture-media'
import * as Spawn from './../../data/db/spawn-cultures'


export default function ExecuteSpawnBatch({id}: {id?: number}) {  
    const db =  useSQLiteContext()
    const navigation = useNavigation();
    const [volume, setVolume] = useState("")
    const [volumeUnit, setVolumeUnit] = useState("")
    const [quantity, setQuantity] = useState("")
    const [recipes, setRecipes] = useState([])
    const [selectedRecipeId, setSelectedRecipeId] = useState(0)
    const [selectedRecipeName, setSelectedRecipeName] = useState('')
    const [loading, setLoading] = useState(true)
    const { theme } = useTheme()

    const getRecipeData = async () => {
        const items = await Recipe.readAll(db)
        const formatted = items.map((item, index) => ({
            _id: String(index),
            id: item.id,
            value: item.name,
        }));
        console.log("Formatted: ", formatted)
        setRecipes(formatted);
    };

    const units = ["Pounds", "Ounces", "Kilograms", "Grams", "Milligrams", "Gallons", "Quarts", "Pints", "Fluid Ounces", 'Liters', 'Milliliters']

    const formattedUnits = units.map((unit, index) => ({
        _id: String(index),
        value: unit
    }));
    const handleExecute = async () => {
        const qty = parseInt(quantity);
        // const name = 
        if (isNaN(qty) || qty <= 0) {
            Alert.alert('Invalid Quantity', 'Please enter a valid positive number.');
            return;
        }

        setLoading(true); // Optional: add loading state

        try {
            const creations = Array.from({ length: qty }, async () => {
                const cultureId = await Culture.create(db, 'spawn_cultures', new Date().getTime());
                console.log('Using recipe ID:', selectedRecipeId);

                await Spawn.create(
                    db,
                    cultureId,
                    selectedRecipeId,
                    parseInt(volume),
                    volumeUnit,
                    new Date().getTime(),
                    null, null, null, null, null, null
                );
            });

            // Execute all creations in parallel (faster) or sequentially
            await Promise.all(creations); // Use this for parallel
            // OR use a for...of loop for sequential: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

            navigation.navigate('Dashboard');
        } catch (error) {
            console.error('Failed to create cultures:', error);
            Alert.alert('Error', 'Failed to create one or more cultures. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    useFocusEffect(
        useCallback(() => {
            getRecipeData()
            console.log(recipes)
            return () => {
                // setSelectedRecipeId(null);
                setVolume('');
                setVolumeUnit('');
            };
        }, [])
    );

    
    return(
        <ImageBG image={require('../../assets/bg.jpg')}>
            <ScreenPrimative contentContainerStyle={styles.container} edges={[]}>
                <Surface style={styles.surfaceMetaContainer}>                        
                    <Surface style={styles.surfaceContainer}>
                        <Text style={theme.formTitle}>New Batch</Text>        
                        <Text style={styles.subtitle}>(Spawn Culture)</Text>        
                    </Surface>
                    <Surface style={styles.surfaceContainer}>
                        <Surface style={styles.surface}>
                            <PaperSelect
                                label="Select Recipe To Execute"
                                value={selectedRecipeName}
                                onSelection={(value: any) => {
                                    const selected = value.selectedList[0];
                                    if (selected) {
                                        setSelectedRecipeId(selected.id);
                                        console.log(selected)
                                        setSelectedRecipeName(selected.value)
                                    }
                                }}

                                arrayList={recipes}
                                selectedArrayList={[]}
                                multiEnable={false}
                                hideSearchBox={false}
                                textInputMode="outlined"
                            />
                        </Surface>
                        <Surface style={styles.surfaceContainer}>
                            <Surface style={styles.surface}>
                                <Text style={styles.subtitle}>
                                    Volume Per Container
                                </Text>
                            </Surface>
                            <View style={{ justifyContent: 'space-around' }}>
                                <TextInput
                                    label="Volume"
                                    value={volume}
                                    onChangeText={setVolume}
                                    mode="outlined"
                                />
                                <PaperSelect
                                    label="Select Volume Unit"
                                    value={volumeUnit}
                                    onSelection={(value: any) => {
                                        const selected = value.selectedList[0];
                                        if (selected) {
                                            setVolumeUnit(selected.value);
                                        }
                                    }}

                                    arrayList={formattedUnits}
                                    selectedArrayList={[]}
                                    multiEnable={false}
                                    hideSearchBox={false}
                                    textInputMode="outlined"
                                />
                            </View>
                        </Surface>
                        <Surface style={styles.surface}>
                            <TextInput
                                label="Quantity"
                                value={quantity}
                                onChangeText={setQuantity}
                                mode="outlined"
                            />
                        </Surface>
                        <Button title="Execute" onPress={handleExecute}/>
                    </Surface>
                </Surface>
            </ScreenPrimative>
        </ImageBG>
    )
}



const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", },
  text: { fontSize: 20, marginBottom: 20 },
  surface: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // marginBottom: 8
  },
  surfaceBottom: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 24
  },
  surfaceContainer: {
    padding: 16,
    backgroundColor: 'rgba(56,185,255,0.3)'
  },
  surfaceMetaContainer: {
    backgroundColor: 'rgba(55,255,55,0.4)',
    width:350,
    margin: 'auto',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign:  'center',
    fontWeight: 'bold',
    color: 'red',
    textShadowColor: 'blue',
    textShadowRadius: 16,
  },
});