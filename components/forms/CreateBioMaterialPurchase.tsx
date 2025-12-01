import { useState, useCallback } from "react"
import { useAuth } from "../../hooks/useAuthContext"
import { Surface,TextInput } from "react-native-paper";
import { StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
import { FormInputAutocomplete } from "../FormInputAutoComplete";
import { uploadReceiptToCloudflare } from "../../services/UploadReceiptToCloudflare";
import UploadReceipt from "../UploadReceipt";
import CreateVendor from "./CreateVendor";
import * as InvItem from './../../data/db/inventory-items'
import * as BioMat from './../../data/db/bio-materials'
import * as PurchLog from './../../data/db/purchase-logs'
import * as InvLog from './../../data/db/inventory-logs'
import * as Brand from './../../data/db/brands'
import * as Vendor from './../../data/db/vendors'
import { useSQLiteContext } from "expo-sqlite";
import { Picker } from "@react-native-picker/picker";
import * as cnv from '../../../mycologger-0.0.1/src/utils/unitConversion'



export default function CreateBioMaterialPurchase({
    name,
    category,
    speciesLatin,
    setName,
    setCategory,
    setSpeciesLatin
} : {
    name?: string,
    category?: string,
    speciesLatin?: string,
    setName?: (name: string) => void,
    setCategory?: (category: string) => void,
    setSpeciesLatin?: (specieslatin: string) => void
}) {
    const{ user, token } = useAuth();
    const db = useSQLiteContext();
    const navigation = useNavigation();    

    const [formVisible, setFormVisible] = useState(false)
    const [pickedImageUri, setPickedImageUri] = useState("")
    const [brand, setBrand] = useState("")
    const [purchaseQuantity, setPurchaseQuantity] = useState("")
    const [purchaseUnit, setPurchaseUnit] = useState("")
    const [inventoryQuantity, setInventoryQuantity] = useState("")
    const [inventoryUnit, setInventoryUnit] = useState("")
    const [cost, setCost] = useState("")
    const [receiptPath, setReceiptPath] = useState("")
    const [notes, setNotes] = useState("")

    const [vendor, setVendor] = useState("")

    const [vendors, setVendors] = useState([])
    const [brands, setBrands] = useState([])
    const [newVendor, setNewVendor] = useState(false)
    const [vendorPhone, setVendorPhone] = useState("")
    const [vendorEmail, setVendorEmail] = useState("")
    const [vendorWebsite, setVendorWebsite] = useState("")

    const [image, setImage] = useState(null);
    const [contentType, setContentType] = useState("")
    
    const [receiptMemo, setReceiptMemo] = useState("")
    
    const [purchaseDatetime, setPurchaseDatetime] = useState(new Date())
  
    async function getVendors() {
        const vendor_rows = await Vendor.readAll(db)
        setVendors([...vendor_rows, {id: 999999, name: 'New Vendor'}])
        return vendor_rows
    }

    async function getBrands() {
        const brand_rows = await Brand.readAll(db)
        setBrands([...brand_rows, {id: 999999, name: 'New Brand'}])
        return brand_rows
    }

    useEffect(() => {
        getVendors()
        getBrands()

    }, [])



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
            speciesLatin: speciesLatin,
            brand: brand,
            purchaseDate: purchaseDatetime.getTime(),
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
        const created_at = new Date().getTime();
        const invItemId = await InvItem.create(db, 'bio_materials', created_at)
        const bioMatId = await BioMat.create(db, invItemId, name, category, speciesLatin)
        await PurchLog.create(db, 'bio_materials', bioMatId, created_at, purchaseDatetime.getTime(), purchaseUnit, cnv.convertFromBase({value: parseFloat(purchaseQuantity), to: purchaseUnit}), inventoryUnit, cnv.convertFromBase({value: parseFloat(inventoryQuantity), to: inventoryUnit}), vendor, brand, parseFloat(cost))
        await InvLog.create(db, 'bio_materials', bioMatId, (cnv.convertToBase({value: parseFloat(purchaseQuantity) * parseFloat(inventoryQuantity), from: inventoryUnit})), inventoryUnit, created_at)
        return {invItemId, bioMatId}
    }


    return (
        <Surface style={styles.surfaceMetaContainer}>                        
            <Surface style={styles.surfaceContainer}>
                    <Text style={styles.title}>New Purchase Log</Text>        
                    <Text style={styles.subtitle}>(Bio Materials)</Text>        
            </Surface>
            
            <Surface style={styles.surfaceContainer}>
                <Surface style={styles.surface}>
                    {name === '' || name === null || name === undefined ? 
                        <TextInput 
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            mode="outlined"
                        /> :
                        <TextInput 
                            label="Name"
                            value={name}
                            mode="outlined"
                        />
                    }
                    
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
                        placeholder="SpeciesLatin"
                        label="Species Latin"
                        value={speciesLatin}
                        onChangeText={setSpeciesLatin}
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
                    <TextInput
                        style={[styles.measurementFloatInput]}
                        placeholder="Quantity Purchasing"
                        label="purchaseQuantity"
                        value={purchaseQuantity}
                        onChangeText={setPurchaseQuantity}
                        mode="outlined"
                    />
                    <Surface style={{ flex: 1}}>
                        <Picker
                            placeholder="Unit"
                            onValueChange={(value: 'string') => {
                                setPurchaseUnit(value)
                            }}
                        >
                            <Picker.Item label="Unit" value={'unit'} />
                            <Picker.Item label="Bag" value={'bag'} />
                            <Picker.Item label="Case" value={'case'} />
                            <Picker.Item label="Box" value={'box'} />
                            <Picker.Item label="Package" value={'package'} />
                        </Picker>
                    </Surface>
                </Surface>
                <Surface style={[styles.measurementBox, styles.surface]}>
                    {/* <Text>Inventory Amount</Text> */}
                        <TextInput
                            style={[styles.measurementFloatInput]}
                            placeholder="Amount"
                            label="Amount"
                            value={inventoryQuantity}
                            onChangeText={setInventoryQuantity}
                            mode="outlined"
                        />
                    <Surface style={{ flex: 1}}>
                        <Picker
                            placeholder="Unit"
                            onValueChange={(value: 'string') => {
                                setInventoryUnit(value)
                            }}
                        >
                            <Picker.Item label="Unit" value={'unit'} />
                            <Picker.Item label="Grams" value={'gram'} />
                            <Picker.Item label="Kilograms" value={'kilogram'} />
                            <Picker.Item label="milliLiters" value={'milliliter'} />
                            <Picker.Item label="Liters" value={'liter'} />
                            <Picker.Item label="Pounds" value={'pound'} />
                            <Picker.Item label="Ounces" value={'ounce'} />
                            <Picker.Item label="Cups" value={'cup'} />
                            <Picker.Item label="Teaspoons" value={'teaspoon'} />
                            <Picker.Item label="Tablespoons" value={'tablespoon'} />
                        </Picker>
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
                    <Picker
                        style={{ color: 'rgba(255, 0, 155, 1)' }}
                        onValueChange={async(value: number) => {
                            if (value === 999999) {
                                setNewVendor(true)
                                setVendor('')
                                setVendorEmail('')
                                setVendorPhone('')
                                setVendorWebsite('')

                            } else {
                                setNewVendor(false)
                                const vendorObj = await Vendor.getById(db, value)   
                                setVendor(vendorObj.name)
                                setVendorEmail(vendorObj.email)
                                setVendorPhone(vendorObj.phone)
                                setVendorWebsite(vendorObj.website)

                            }
                        }}    
                    >
                        {vendors && vendors.length >= 1 ? 
                            vendors.map((item) => {
                                return(
                                    <Picker.Item label={item.name} value={item.id} />
                                )
                            }) :
                                    <Picker.Item label={'None registered'} value={-1} />
                        }
                    </Picker>
                </Surface>
                <CreateVendor phone={vendorPhone} email={vendorEmail} website={vendorWebsite} />
                
            {/* {newVendor ? (
                <CreateVendor />
            ) : (
                <></>
            )} */}
            <UploadReceipt
                setImage={setImage}
                setContentType={setContentType}
                setReceiptMemo={setReceiptMemo}
                setPurchaseDatetime={setPurchaseDatetime}
            />           
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
