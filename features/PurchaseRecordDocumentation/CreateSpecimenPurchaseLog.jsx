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



export default function CreateSpecimenPurchaseLog() {
    // const [formState, setFormState] = useState({
    //     name: "",
    //     category: "",
    //     subcategory: "", 
    //     brand: "",
    //     vendor: ""
    // });

    // const handleChange = (key, value) => {
    //     try{
    //         console.log('changing formState...')
    //         setFormState((prev) => ({ ...prev, [key]: value }));
    //         console.log(`formState changed, added ${key}: ${value}`)
    //     } catch(err){
    //         console.log("Error changing formState: ", err)
    //     }
    // };
    const{ user, token } = useAuth();

    const [contentType, setContentType] = useState("")
    const [itemNames, setItemNames] = useState([])
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [vendorsNames, setVendorsNames] = useState([])
    const [brandNames, setBrandNames] = useState([])

    async function uploadReceiptToCloudflare({
        image,
        token,
        contentType
    }) {
            if (!image) {
                throw new Error("No image selected");
            }

            let  uploadUrl, fileKey, publicUrl, error 
        try {
            // 1️⃣ Ask backend for signed URL
            console.log("Asking backend for signed upload URL...")
            const metadataRes = await fetch("http://10.0.0.45:5000/api/receipts/get-signed-upload-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    filename: image.split("/").pop(),
                    content_type: contentType,
                }),
            });
            const metadataData = await metadataRes.json();
            console.log("Backend Response:", metadataData);
            ({ uploadUrl, fileKey, publicUrl, error } = metadataData);
            console.log("Items received from backend: ", uploadUrl, fileKey, publicUrl)
        } catch(err) {
            console.error("Error fatchin signed URL: ", err)
            throw err
        }
            if (!uploadUrl) {
                throw new Error(error || "Failed to get signed URL");
            }
            let blob;
        try{
            console.log("Converting local file URI → blob")
            const response = await fetch(image);
            blob = await response.blob();
            console.log("Blob ready for upload:", blob);
        } catch (err) {
            console.error("Failed to create blob:", err);
            throw err;
        }

        try{
            console.log(" Uploading to Cloudflare...")
            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                body: blob,
                headers: {
                    "Content-Type": contentType,
                },
            });

            if (!uploadRes.ok) {
              throw new Error("Upload to Cloudflare failed");
            }
            console.log("Upload successful!");

            return {fileKey, publicUrl};

        } catch (err) {
            console.error("Upload error:", err);
            throw err;
        }
    }



    useEffect(() => {
        const newVendorCheck = () => {
            if (vendorsNames.includes(vendor)) {
                setNewVendor(false)
            } else {
                setNewVendor(true)
            }
        }

        const fetchItemData = async() => {
            const res = await fetch('http://10.0.0.45:5000/api/specimen', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            })
            const data = await res.json()
            
            const rm = Array.isArray(data.raw_materials) ? data.raw_materials : [];
            if (rm.length === 0) return;
            const itemNamesList = rm.map((m) => m.name).filter(Boolean).map((n) => ({label: n, value: n}))
            const categoriesList = rm.map((m) => m.category).filter(Boolean).map((c) => ({label: c, value: c}))
            const subcategoriesList = rm.map((m) => m.subcategory).filter(Boolean).map((s) => ({label: s, value: s}))
            setItemNames(itemNamesList)
            setCategories(categoriesList)
            setSubcategories(subcategoriesList)
        
        }

        const fetchVendorData = async() => {
            const res = await fetch('http://10.0.0.45:5000/api/vendors', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            })
            const data = await res.json()
            const vendorsObjs = Array.isArray(data.vendors) ? data.vendors : [];
            if (vendorsObjs.length === 0) return;
            const vendorsNamesList = vendorsObjs.map((obj) => obj.name).filter(Boolean).map((n) => ({label: n, value: n}))
            setVendorsNames(vendorsNamesList)
        }

        const fetchBrandNameData = async() => {
            const res = await fetch('http://10.0.0.45:5000/api/purchase-logs/specimen', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            })
            const data = await res.json()
            const rm_logs = Array.isArray(data.rm_logs) ? data.rm_logs : [];
            if (rm_logs.length === 0) return;
            const brandNamesList = rm_logs.map((log) => log.brand).filter(Boolean)
            setBrandNames(brandNamesList)
            
        }
        
        fetchItemData()
        fetchVendorData()
        fetchBrandNameData()
        newVendorCheck()

    }, [token])
    
    const navigation = useNavigation();
    const [pickedImageUri, setPickedImageUri] = useState("")
    const [species, setSpecies] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [brand, setBrand] = useState("")
    const [purchaseDatetime, setPurchaseDatetime] = useState(new Date())
    const [purchaseQuantity, setPurchaseQuantity] = useState(0)
    const [purchaseUnit, setPurchaseUnit] = useState("")
    const [inventoryQuantity, setInventoryQuantity] = useState(0)
    const [inventoryUnit, setInventoryUnit] = useState("")
    const [cost, setCost] = useState(0)
    const [receiptPath, setReceiptPath] = useState("")
    const [vendor, setVendor] = useState("")
    const [notes, setNotes] = useState("")
    const [receiptMemo, setReceiptMemo] = useState("")
    const [image, setImage] = useState(null);



    const [newVendor, setNewVendor] = useState(false)
    const [vendorPhone, setVendorPhone] = useState("")
    const [vendorEmail, setVendorEmail] = useState("")
    const [vendorWebsite, setVendorWebsite] = useState("")

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) setPurchaseDatetime(selectedDate);
    };
    
    
    useFocusEffect(
        useCallback(() => {
            return () => {
                setImage("")
            };
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            return () => {
                setPickedImageUri("")
                setSpecies("")
                setCategory("")
                setSubcategory("")
                setBrand("")
                setPurchaseDatetime("")
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
                if (species !== "" ||
                    category !== "" ||
                    subcategory !== "" ||
                    brand !== "" ||
                    purchaseDatetime !== "" ||
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
        }, [species, category, subcategory, brand, purchaseDatetime, purchaseQuantity, purchaseUnit, inventoryQuantity, inventoryUnit, cost, vendor, user, receiptPath, navigation])
    );

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
            species: species,
            category: category,
            subcategory: subcategory,
            brand: brand,
            purchaseDate: purchaseDatetime,
            purchaseQuantity: purchaseQuantity,
            purchaseUnit: purchaseUnit,
            inventoryQuantity: inventoryQuantity,
            inventoryUnit: inventoryUnit,
            cost: cost,
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
        const res = await fetch("http://10.0.0.45:5000/api/purchase-logs/specimen", {
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
        console.log(payload)
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
                                <Text style={styles.title}>New Purchase Log</Text>        
                                <Text style={styles.subtitle}>(Specimen)</Text>        
                        </Surface>
                        
                        <Surface style={styles.surfaceContainer}>
                            <Surface style={styles.surface}>
                                <FormInputAutocomplete 
                                    options={["Apple", "Banana", "Orange"]}
                                    placeholder="Specimen Species"
                                    onChangeText={setSpecies}
                                    inputValue={species}
                                />
                            </Surface>
                            <Surface style={styles.surface}>
                                <FormInputAutocomplete 
                                    options={["Apple", "Banana", "Orange"]}
                                    placeholder="Category"
                                    onChangeText={setCategory}
                                    inputValue={category}
                                />
                            </Surface>
                            <Surface style={styles.surface}>
                                <FormInputAutocomplete 
                                    options={["Apple", "Banana", "Orange"]}
                                    placeholder="Subcategory"
                                    onChangeText={setSubcategory}
                                    inputValue={subcategory}
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
                                        contentContainerStyle={[styles.measurementInput]}
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
                                    contentContainerStyle={styles.input}
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
                            <Surface style={styles.surfaceContainer}>
                                <Text style={styles.title}>New Vendor Info</Text>        
                                <Surface style={styles.surface}>
                                    <TextInput
                                        placeholder="Vendor Phone Number"
                                        label="vendorPhone"
                                        value={vendorPhone}
                                        onChangeText={setVendorPhone}
                                        mode="outlined"
                                        style={styles.input}
                                    />
                                    <TextInput
                                        placeholder="Vendor Email"
                                        label="vendorEmail"
                                        value={vendorEmail}
                                        onChangeText={setVendorEmail}
                                        mode="outlined"
                                        style={styles.input}
                                    />
                                    <TextInput
                                        placeholder="Vendor Website"
                                        label="vendorWebstie"
                                        value={vendorWebsite}
                                        onChangeText={setVendorWebsite}
                                        mode="outlined"
                                        style={styles.input}
                                    />
                                </Surface>
                            </Surface>
                        ) : (
                            <></>
                        )}
                        <Surface style={styles.surfaceContainer}>
                                <Text style={styles.title}>Upload Receipt</Text>        
                            <Surface style={styles.surface}>
                                <ImagePickerExample
                                    image={image}
                                    setImage={setImage}
                                    contentType={contentType}
                                    setContentType={setContentType}
                                />
                                <TextInput
                                    multiline
                                    placeholder="Receipt Memo"
                                    label="receiptMemo"
                                    value={receiptMemo}
                                    onChangeText={setReceiptMemo}
                                    mode="outlined"
                                    style={styles.input}
                                />
                            </Surface>
                                <Text style={styles.title}>Receipt Date & Time</Text>        
                            <Surface style={styles.surface}>
                                <CrossPlatformDateTimePicker
                                    purchaseDatetime={purchaseDatetime? purchaseDatetime: new Date()}
                                    onChangeDate={onChangeDate}
                                />
                            </Surface>
                        </Surface>
                        <Button color={'#000000'} title="Submit" onPress={() => handleSubmit()} />
                    </Surface>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </ImageBackground>
        // 
        // subcategory
        // 
        // purchaseDatetime
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
    width:66    
  },
  input: {
    // margin: 8,
    // padding: 8,
    // gap: 16,
    fontSize: 16
  },
  
  surface: {
    padding: 8,
    backgroundColor: 'white',
    // margin: 8
  },
  surfaceContainer: {
    padding: 16,
    backgroundColor: 'rgba(56,185,255,0.3)'
  },
  surfaceMetaContainer: {
    backgroundColor: 'rgba(55,255,55,0.4)',
    width:350
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