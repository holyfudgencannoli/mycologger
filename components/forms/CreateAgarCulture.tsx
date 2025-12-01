import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import { useTheme } from "../../hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuthContext";
import { apiFetch } from "../../services/apiFetch";
import { RouteProp, useFocusEffect, useNavigation, usePreventRemove } from "@react-navigation/native";
import { FormInputAutocomplete } from "../FormInputAutoComplete";
import { PaperSelect } from "react-native-paper-select";
import { Alert } from "react-native";
import * as RecipeBatch from '../../data/db/recipe-batches'
import * as Recipe from '../../data/db/recipes'
import { useSQLiteContext } from "expo-sqlite";
import { Picker } from "@react-native-picker/picker";
import * as conversion from '../../../mycologger-0.0.1/src/utils/unitConversion'
import * as Usage from './../../data/db/usage_logs'
import * as RawMat from './../../data/db/raw-materials'
import * as Task from './../../data/db/tasks'
import * as InvLog from './../../data/db/inventory-logs'
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as cnv from '../../../mycologger-0.0.1/src/utils/unitConversion'




type recipeBatchProps = {
    id: number;
    recipe_id: number;
    quantity: number;
    real_amount: number;
    real_unit: string;
    loss: number;
    name: string;
    notes: string;
    created_at: number;
}

export type RootStackParamList = {
  CreateRecipeBatch: { id: number; startTime?: string; endTime?: string };
  // … other screens …
};

export default function CreateAgarCulture({ setUnsaved }: { setUnsaved: (value: boolean) => void }) {
    const db = useSQLiteContext();
    const { theme } = useTheme()
    const navigation = useNavigation();
    type RouteParams = RouteProp<RootStackParamList, 'CreateRecipeBatch'>
    const route = useRoute<RouteParams>()
    const { id, startTime, endTime } = route.params
 
    const [recipeBatch, setRecipeBatch] = useState<recipeBatchProps>() 
    const [recipeBatches, setRecipeBatches] = useState<recipeBatchProps[]>([{ 
        id: 0,
        name: '',
        type: '', 
        ingredients: '', 
        yield_amount: 0 , 
        yield_unit: '',
        nute_concentration: 0.0, 
        created_at: 0 
    }])
    const [recipeId, setRecipeId] = useState(0)
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [loss, setLoss] = useState('')
    const [realAmount, setRealAmount] = useState("")
    const [realUnit, setRealUnit] = useState("")
    const [amount, setAmount] = useState("")
    const [unit, setUnit] = useState("")
    const [notes, setNotes] = useState('')


    const getRecipeBatchData = async() => {
        const recipes: any = await RecipeBatch.readAll(db);
        setRecipeBatches(recipes)
    }


    useFocusEffect(
        useCallback(() => {
            getRecipeBatchData()
            return () => {
                setName('');
                // setType('');
                // setIngredientName('');
                setAmount('');
                setUnit('');
            };
        }, [])
    );

    useEffect(() => {
        const loss_ans = recipeBatch ? ((parseFloat(quantity) * recipeBatch.real_amount) - parseFloat(realAmount)).toString() : '0'
        let parsed = parseFloat(loss_ans)
        console.log(loss)
        if (parsed < 0) {
            setLoss('0')
        } else {
            setLoss(parsed.toFixed(4).toString())
        }
    }, [recipeBatch, realUnit])

    
    const handleSubmit = async () => {
        
        const created_at = new Date().getTime()
        
        const recipeBatchId = await RecipeBatch.create(db, recipeId, parseFloat(quantity), parseFloat(realAmount), realUnit, parseFloat(loss), name, notes, created_at)
        
        const recipeBatch: recipeBatchProps = await RecipeBatch.getById(db, recipeId)
        console.log("Recipe: ", recipeBatch)
        
        // const ingredients: ingredientProps[] = JSON.parse(recipe.ingredients)
        // console.log("Ingredients: ", ingredients)
        
        
        const taskName = `Execute ${parseFloat(quantity) * recipeBatch.real_amount} ${recipeBatch.real_unit} of ${recipeBatch.name}`
        console.log('Task Name: ', taskName)
        
        const taskId = await Task.create(db, taskName, new Date(startTime).getTime(), new Date(endTime).getTime(), notes)
        console.log('Task ID: ', taskId)

        for (let i = 0; i < ingredients.length; i++) {

            const ingredient: ingredientProps = ingredients[i];
            console.log("Ingredient: ", ingredient)

            const RM = await RawMat.getById(db, ingredient.ingredientId)
            console.log("Raw Material Data: ", RM)

            const usageLogId = await Usage.create(db, 'bio_material', RM.id, taskId, cnv.convertFromBase({value: ingredient.amount, to: ingredient.unit}), ingredient.unit, notes, created_at ) 
            console.log("Usage Log ID: ", usageLogId)

            const inventoryLog = await InvLog.getByItemId(db, 'raw_material', RM.id)
            console.log(inventoryLog)

            const baseUsage = (conversion.convertToBase({
                value: inventoryLog.amount_on_hand,
                from: inventoryLog.inventory_unit
            }) 
            - conversion.convertToBase({
                value: ingredient.amount,
                from: ingredient.unit
            }))
            console.log(baseUsage)

            const use = await InvLog.update(
                db,
                'raw_material',
                inventoryLog.id,
                null,
                baseUsage,
                inventoryLog.inventory_unit,
                created_at
            )


            console.log(use)
            continue
        }   
        // console.log(data)
        // console.log(payload)
        navigation.navigate("Dashboard")
        return recipeBatchId
    }


    return(
        <Surface style={styles.surfaceMetaContainer}>                        
            <Surface style={styles.surfaceContainer}>
                    <Text style={theme.formTitle}>New Batch From Recipe</Text>        
                    <Text style={theme.formTitle}>(Agar Cultures)</Text>        
            </Surface>
            <Surface style={styles.surfaceContainer}>
                <Picker
                    /// selectedValue={item.category}
                    // style={styles.picker}
                    onValueChange={async(value: number) => {
                        // Update the specific pair in state
                        setRecipeId(value);
                        console.log(value)
                        const recipebatchData: any = await RecipeBatch.getById(db, value)
                        setRecipeBatch(recipebatchData)
                    }}
                
                >
                    {recipeBatches.map((batch) => {
                        return(
                            <Picker.Item label={`${batch.name}, ${conversion.convertFromBase({value: batch.real_amount, to:batch.real_unit})} ${batch.real_unit}`} value={batch.id} />
                        )
                    })}
                </Picker>
                <Surface style={styles.surface}>
                    <TextInput
                        label="Batch Name"
                        value={`${recipeBatch.name} Batch ${
                                    quantity ?
                                        parseFloat(quantity) * recipeBatch.real_amount :
                                        recipeBatch.real_amount
                                } ${recipeBatch.real_unit}`}
                        onChangeText={(value) => setName(value)}
                        mode="outlined"
                    />
                </Surface>
                <Surface style={styles.surface}>
                    <TextInput
                        label="Quantity of Recipe"
                        value={quantity}
                        onChangeText={setQuantity}
                        mode="outlined"
                    />
                </Surface>
                <Surface style={styles.surfaceContainer}>
                    <Surface style={styles.surface}>
                        <Text style={styles.subtitle}>
                            Real Yield
                        </Text>
                    </Surface>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TextInput
                            label="Amount"
                            value={realAmount}
                            onChangeText={setRealAmount}
                            mode="outlined"
                            style={{ flex: 1 }}
                        />
                        <TextInput
                            label="Unit"
                            value={realUnit}
                            onChangeText={setRealUnit}
                            mode="outlined"
                            style={{ flex: 1 }}
                        />
                    </View>
                </Surface>
                <Surface style={styles.surface}>
                    <TextInput
                        label="Loss"
                        value={loss}
                        // onChangeText={setLoss}
                        mode="outlined"
                        style={{ flex: 1 }}
                    />
                </Surface>
                <Surface style={styles.surface}>
                    <TextInput
                        label="Batch Notes"
                        value={notes}
                        onChangeText={setNotes}
                        mode="outlined"
                        style={{ flex: 1 }}
                    />
                </Surface>
                <Button  color={'#000000'} title="Submit" onPress={() => handleSubmit()} />

            </Surface>    
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
    paddingBottom: 32,
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