import { useState, useCallback } from "react"
import { useAuth } from "../../scripts/AuthContext"
import { ThemedView } from "../../components/ThemedView";
import { Surface } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import { TextInput, StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import ImagePickerExample from "../../components/ImagePicker";
import { useFocusEffect, useNavigation } from '@react-navigation/native';





export default function CreateSpecimenPurchaseLog() {
    const navigation = useNavigation();

    const{ user, token } = useAuth();
    const [pickedImageUri, setPickedImageUri] = useState("")

    const [speciesName, setSpeciesName] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [brand, setBrand] = useState("")
    const [logDatetime, setLogDatetime] = useState("")
    const [purchaseDate, setPurchaseDate] = useState("")
    const [purchaseQuantity, setPurchaseQuantity] = useState(0)
    const [purchaseUnit, setPurchaseUnit] = useState("")
    const [inventoryQuantity, setInventoryQuantity] = useState(0)
    const [inventoryUnit, setInventoryUnit] = useState("")
    const [cost, setCost] = useState(0)
    const [receiptPath, setReceiptPath] = useState("")
    const [vendor, setVendor] = useState("")
    const [notes, setNotes] = useState("")

    useFocusEffect(
        useCallback(() => {
            return () => {
                setPickedImageUri("")
                setSpeciesName("")
                setCategory("")
                setSubcategory("")
                setBrand("")
                setLogDatetime("")
                setPurchaseDate("")
                setPurchaseQuantity(null)
                setPurchaseUnit("")
                setInventoryQuantity(null)
                setInventoryUnit("")
                setCost(null)
                setVendor("")
                setReceiptPath("")
                setNotes("")
            };
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            const onBeforeRemove = (e) => {
                // Only alert if form has data
                if (speciesName !== "" ||
                    category !== "" ||
                    subcategory !== "" ||
                    brand !== "" ||
                    logDatetime !== "" ||
                    purchaseDate !== "" ||
                    purchaseQuantity !== 0 ||
                    purchaseUnit !== "" ||
                    inventoryQuantity !== 0 ||
                    inventoryUnit !== "" ||
                    cost !== 0 ||
                    vendor !== "" ||
                    user !== "" ||
                    receiptPath !== "" ||
                    notes !== "") {
                e.preventDefault(); // prevent default behavior
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Are you sure you want to leave?',
                    [
                    { text: "Don't leave", style: 'cancel', onPress: () => {} },
                    {
                        text: 'Leave',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                    ]
                );
                }
            };

            navigation.addListener('beforeRemove', onBeforeRemove);

            return () => {
                navigation.removeListener('beforeRemove', onBeforeRemove);
            };
        }, [speciesName, category, subcategory, brand, logDatetime, purchaseDate, purchaseQuantity, purchaseUnit, inventoryQuantity, inventoryUnit, cost, vendor, user, receiptPath, navigation])
    );

    const handleSubmit = async () => {
        const payload = {
            speciesName: speciesName,
            category: category,
            subcategory: subcategory,
            brand: brand,
            logDatetime: logDatetime,
            purchaseDate: purchaseDate,
            purchaseQuantity: purchaseQuantity,
            purchaseUnit: purchaseUnit,
            inventoryQuantity: inventoryQuantity,
            inventoryUnit: inventoryUnit,
            cost: cost,
            vendor: vendor,
            user: user,
            receiptPath: receiptPath,
            notes : notes
        }
        const res = await fetch("http://10.0.0.45:5000/api/specimen/purchase-logs", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        })
        
        const data = await res.json()
        console.log(data)
        return data
    }


    return(
        <ImageBackground
            source={require('../../assets/bg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, padding: 0 }}
                enableOnAndroid={true}
                extraScrollHeight={180}
                keyboardOpeningTime={0}
                enableAutomaticScroll={true}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView  style={styles.container}>
                    <Surface style={styles.surfaceMetaContainer}>
                        <Surface style={styles.surfaceContainer}>
                            <Surface style={styles.surface}>
                                <Text style={styles.title}>New Purchase Log</Text>        
                                <Text style={styles.subtitle}>(Biological Specimen)</Text>         
                            </Surface>
                        </Surface>
                        <Surface style={styles.surfaceContainer}>
                            <Surface style={styles.surface}>
                                <Text style={styles.title}>Upload Receipt</Text>        
                                <ImagePickerExample />
                            </Surface>
                        </Surface>
                        <Surface style={styles.surfaceContainer}>
                            <Surface style={styles.surface}>
                                <TextInput
                                    placeholder="Species Name"
                                    label="speciesName"
                                    value={speciesName}
                                    onChangeText={setSpeciesName}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>
                            <Surface style={styles.surface}>
                                <TextInput
                                    placeholder="Category"
                                    label="category"
                                    value={category}
                                    onChangeText={setCategory}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>
                            <Surface style={styles.surface}>
                                <TextInput
                                    placeholder="Subcategory"
                                    label="Subcategory"
                                    value={subcategory}
                                    onChangeText={setSubcategory}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>
                            <Surface style={styles.surface}>
                                <TextInput
                                    placeholder="Brand Name"
                                    label="brand"
                                    value={brand}
                                    onChangeText={setBrand}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>    
                            <Surface style={styles.surface}>
                                <TextInput
                                    placeholder="Cost"
                                    label="cost"
                                    value={cost}
                                    onChangeText={setCost}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>
                            <Surface style={styles.surface}>
                                <TextInput
                                    placeholder="Vendor"
                                    label="vendor"
                                    value={vendor}
                                    onChangeText={setVendor}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>
                            <Surface style={styles.surface}>
                                <TextInput
                                    placeholder="Notes"
                                    label="notes"
                                    value={notes}
                                    onChangeText={setNotes}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>
                        </Surface>
                        <Button title="Submit" onPress={handleSubmit} />
                    </Surface>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </ImageBackground>
        // 
        // subcategory
        // 
        // logDatetime
        // purchaseDate
        // purchaseQuantity
        // purchaseUnit
        // inventoryQuantity
        // inventoryUnit
        // 
        // 
        // user
        // receiptPath
        // 
    )

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 20 },
  form: {
    backgroundColor: 'rgba(0, 17, 255, 0.3)',
  },
  input: {
    // margin: 24,
    // gap: 16,
  },
  surface: {
    padding: 8,
    backgroundColor: 'white',
    margin: 8
  },
  surfaceContainer: {
    padding: 16,
    backgroundColor: 'rgba(56,185,255,0.3)'
  },
  surfaceMetaContainer: {
    backgroundColor: 'rgba(55,55,55,0.4)'
  },
  title: {
    fontSize: 24,
    textAlign:  'center'
  },
  subtitle: {
    fontSize: 18,
    textAlign:  'center'
  }
});