import { useAuth } from "../../hooks/useAuthContext"
import { StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native';
import { ScreenPrimative } from "../../components/ScreenPrimative";
import CreateBioMaterialPurchase from "../../components/forms/CreateBioMaterialPurchase";
import { ImageBG } from "../../components/ImageBG";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { apiFetch } from "../../services/apiFetch";
import { Surface } from "react-native-paper";
import { FormInputAutocomplete } from "../../components/FormInputAutoComplete";
import { Picker } from "@react-native-picker/picker";
import * as Consumable from './../../data/db/consumable-items'
import { useSQLiteContext } from "expo-sqlite";
import CreateConsumableItemPurchase from "../../components/forms/CreateConsumableItemPurchase";



export default function NewConsumablePurchaseLogScreen() {
    const{ user, token } = useAuth();

    const [purchaseLogs, setPurchaseLogs] = useState([])
    const [formVisible, setFormVisible] = useState(false)
    const [items, setItems] = useState([])
    const [vendorsNames, setVendorsNames] = useState([])
    const [brandNames, setBrandNames] = useState([])
    const db = useSQLiteContext();
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")

    const [isNewItem, setIsNewItem] = useState(true)


    const getItemNames = async() => {
        const items = await Consumable.readAll(db)
        setItems([...items, { id: 999999, name: 'New Item' }])
    }

    useFocusEffect(
        useCallback(() => {
            getItemNames()
        }, [])
    )

    return(
        <ImageBG image={require('../../assets/bg.jpg')}>
            <ScreenPrimative scroll edges={[]}>
                <Surface style={styles.surface}>
                    <Picker
                       dropdownIconColor={'blanchedalmond'}
                        style={{ color: 'blanchedalmond' }}
                        onValueChange={(value: {id: number, name: string, category: string, subcategory: string}) => {
                            if (value.id === 999999) {
                                setFormVisible(true)
                                setIsNewItem(true)
                                setName('')
                                setCategory('')
                                setSubcategory('')
                            } else {
                                setFormVisible(true)
                                setIsNewItem(false)
                                setName(value.name)
                                setCategory(value.category)
                                setSubcategory(value.subcategory)
                            }

                        }}    
                    >
                        {items.map((item) => {
                            return(
                                <Picker.Item label={item.name} value={{...item}} />
                            )
                        })}
                    </Picker>
                    {/* <FormInputAutocomplete 
                        options={itemNames}
                        placeholder="Item Name"
                        onChangeText={setName}
                        inputValue={name}
                        onSelect={itemLookup}
                    /> */}
                </Surface>
                {formVisible ? 
                    <CreateConsumableItemPurchase
                        name={name}
                        category={category}
                        subcategory={subcategory}
                        setName={setName}
                        setCategory={setCategory}
                        setSubcategory={setSubcategory}
                    /> : <></>}
            </ScreenPrimative>
        </ImageBG>
    )

}


const styles = StyleSheet.create({
  surface: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // marginBottom: 8
  },
});