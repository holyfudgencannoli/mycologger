import { useState, useCallback } from "react"
import { useAuth } from "../../hooks/useAuthContext"
import { Surface,TextInput } from "react-native-paper";
import { StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePickerExample from "../../components/ImagePicker";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
import { FormInputAutocomplete } from "../../components/FormInputAutoComplete";
import CrossPlatformDateTimePicker from "../../components/CrossPlatformDateTimePicker";
import { MeasuringUnitAutocomplete } from "../../components/MeasuringUnitAutoComplete";
import newVendorCheck from "../../hooks/UseNewVendorCheck";
import { fetchVendorData } from "../../services/DataObjectFetchers/VendorNames";
import { uploadReceiptToCloudflare } from "../../services/UploadReceiptToCloudflare";
import { apiFetch } from "../../services/apiFetch";
import UploadReceipt from "../UploadReceipt";
import CreateVendor from "./CreateVendor";




export default function CreateRawMaterialPurchase() {
    const{ user, token } = useAuth();

    const navigation = useNavigation();    

    const [itemNames, setItemNames] = useState([])
    const [brandNames, setBrandNames] = useState([])
    const [pickedImageUri, setPickedImageUri] = useState("")
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [brand, setBrand] = useState("")
    const [purchaseQuantity, setPurchaseQuantity] = useState("")
    const [purchaseUnit, setPurchaseUnit] = useState("")
    const [inventoryQuantity, setInventoryQuantity] = useState("")
    const [inventoryUnit, setInventoryUnit] = useState("")
    const [cost, setCost] = useState("")
    const [receiptPath, setReceiptPath] = useState("")
    const [notes, setNotes] = useState("")

    const [vendor, setVendor] = useState("")

    const [vendorsNames, setVendorsNames] = useState([])
    const [newVendor, setNewVendor] = useState(false)
    const [vendorPhone, setVendorPhone] = useState("")
    const [vendorEmail, setVendorEmail] = useState("")
    const [vendorWebsite, setVendorWebsite] = useState("")

    const [image, setImage] = useState(null);
    const [contentType, setContentType] = useState("")
    
    const [receiptMemo, setReceiptMemo] = useState("")
    
    const [purchaseDatetime, setPurchaseDatetime] = useState(new Date())
  
    async function itemLookup(name: string) {
        const data: any = await apiFetch(`/raw-materials/${encodeURIComponent(name)}`, 'GET', token)
        console.log("DATA: ", data.raw_material)
        setCategory(data.raw_materials.category)
        setSubcategory(data.raw_materials.subcategory)
        const brandNames = (data.brand_names.map(name => {name}))
        setBrandNames(brandNames)
        const vendorNames = (data.vendor_names.map(name => name))
        setVendorsNames(vendorNames)
    }

    useEffect(() => {
        getItemNames()
        newVendorCheck({vendor, token, setVendorsNames, vendorsNames, setNewVendor})
        fetchVendorData(token, setVendorsNames)

    }, [token])

    const getItemNames = async() => {
        const data: any = await apiFetch('raw-materials', 'GET', token)
        const rm = data.raw_materials
        const names = rm.map((rm: any) => rm.name)
        setItemNames(names)
    }

    
    const handleSubmit = async () => {
        if (!image) {
            Alert.alert("Error", "Please select a receipt image");
            return;
        }
        const { fileKey, publicUrl } = await uploadReceiptToCloudflare({
            image,
            token,
            contentType
        })

        const payload = {
            name: name,
            category: category,
            subcategory: subcategory,
            brand: brand,
            purchaseDate: purchaseDatetime,
            purchaseQuantity: parseInt(purchaseQuantity),
            purchaseUnit: purchaseUnit,
            inventoryQuantity: parseInt(inventoryQuantity),
            inventoryUnit: inventoryUnit,
            cost: parseInt(cost),
            vendor: vendor,
            user: user,
            filename: fileKey,
            imageUrl: publicUrl,
            receiptMemo: receiptMemo,
            notes : notes,
            vendorPhone: vendorPhone,
            vendorEmail: vendorEmail,
            vendorWebsite: vendorWebsite,
        }
        
        const data = await apiFetch('/purchase-logs/raw-materials', 'POST', token, payload)
        console.log(data)
        console.log(payload)
        return data
    }


    return (
        <Surface style={styles.surfaceMetaContainer}>                        
            <Surface style={styles.surfaceContainer}>
                    <Text style={styles.title}>New Purchase Log</Text>        
                    <Text style={styles.subtitle}>(Raw Materials)</Text>        
            </Surface>
            
            <Surface style={styles.surfaceContainer}>
                <Surface style={styles.surface}>
                    <FormInputAutocomplete 
                        options={itemNames}
                        placeholder="Item Name"
                        onChangeText={setName}
                        inputValue={name}
                        onSelect={itemLookup}
                    />
                    <Button title="populate fields" onPress={() => itemLookup(name)} />
                </Surface>
                <Surface style={styles.surface}>
                    <TextInput
                        placeholder="Category"
                        label="category"
                        value={category}
                        onChangeText={setCategory}
                        mode="outlined"
                    />
                </Surface>
                <Surface style={styles.surface}>
                    <TextInput
                        placeholder="Subcategory"
                        label="subcategory"
                        value={subcategory}
                        onChangeText={setSubcategory}
                        mode="outlined"
                    />
                </Surface>
                <Surface style={styles.surface}>
                    <FormInputAutocomplete 
                        options={["Apple", "Banana", "Orange"]}
                        placeholder="Brand Name"
                        onChangeText={setBrand}
                        inputValue={brand}
                    />
                </Surface>  
                    
                <Surface style={[styles.measurementBox, styles.surface]}>
                    <Surface>
                        <TextInput
                            style={[styles.measurementFloatInput]}
                            placeholder="Quantity Purchasing"
                            label="purchaseQuantity"
                            value={purchaseQuantity}
                            onChangeText={setPurchaseQuantity}
                            mode="outlined"
                        />
                    </Surface>
                    <Surface>
                        <MeasuringUnitAutocomplete 
                            options={["Bag", "Case", "Box", "Package", "Unit"]}
                            placeholder="Unit Purchasing"
                            onChangeText={setPurchaseUnit}
                            inputValue={purchaseUnit}
                        />
                    </Surface>
                    </Surface>
                <Surface style={[styles.measurementBox, styles.surface]}>
                    <Surface>
                        <TextInput
                            style={[styles.measurementFloatInput]}
                            placeholder="Quantity Inventory"
                            label="inventoryQuantity"
                            value={inventoryQuantity}
                            onChangeText={setInventoryQuantity}
                            mode="outlined"
                        />
                    </Surface>
                    <Surface>
                        <MeasuringUnitAutocomplete
                            // contentContainerStyle={styles.measurementInput}
                            options={["Pounds", "Kilograms", "Gallons", "Liters", "Ounces", "Milligrams", "Millilitres", "Fluid Ounces"]}
                            placeholder="Unit Inventory"
                            onChangeText={setInventoryUnit}
                            inputValue={inventoryUnit}
                        />
                    </Surface>
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
                    <FormInputAutocomplete 
                        options={["Apple", "Banana", "Orange"]}
                        placeholder="Vendor Name"
                        onChangeText={setVendor}
                        inputValue={vendor}
                        // contentContainerStyle={styles.input}
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
            {newVendor ? (
                <CreateVendor />
            ) : (
                <></>
            )}
            <UploadReceipt
                setImage={setImage}
                setContentType={setContentType}
                setReceiptMemo={setReceiptMemo}
                setPurchaseDatetime={setPurchaseDatetime}
            />            
            <Button color={'#000000'} title="Submit" onPress={() => handleSubmit()} />
        </Surface>
    )
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", },
  text: { fontSize: 20, marginBottom: 20 },
  form: {
    backgroundColor: 'rgba(0, 17, 255, 0.3)',
    width:66    
  },
  backgroundImage:{
    paddingBottom: 300
  },
  input: {
    // margin: 8,
    // padding: 8,
    // gap: 16,
    fontSize: 16
  },
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
  title: {
    fontSize: 24,
    textAlign:  'center',
    fontWeight: 'bold',
    color: 'red',
    textShadowColor: 'blue',
    textShadowRadius: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign:  'center',
    fontWeight: 'bold',
    color: 'red',
    textShadowColor: 'blue',
    textShadowRadius: 16,
  },
measurementBox: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8, // space between inputs (RN 0.71+)
  paddingHorizontal: 8,
},

measurementInput: {
  flex: 1,          // take equal space
  minWidth: 120,    // never smaller than 120px
  maxWidth: 180,    // optional: never bigger than 180px
},

   measurementContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    width: "30%",        // 3 items per row
    aspectRatio: 1,      // makes it square
    marginBottom: 10,
    backgroundColor: "#4682B4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  measurementText: {
    color: "white",
    fontWeight: "bold",
  },
  measurementFloatInput: {
    width: 144
  }
});
