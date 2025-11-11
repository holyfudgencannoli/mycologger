import { useState } from "react"
import { useAuth } from "../../hooks/useAuthContext"
import { Surface,TextInput } from "react-native-paper";
import { StyleSheet, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from "../../hooks/useTheme";
import { apiFetch } from "../../services/apiFetch";
import { View } from "react-native-reanimated/lib/typescript/Animated";


export default function CreateRawMaterial() {
    const{ token } = useAuth();
    const navigation = useNavigation();
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const { theme } = useTheme()

    const handleSubmit = async () => {
        const payload = {
            name: name,
            category: category,
            subcategory: subcategory,
        }        
        const data = await apiFetch('raw-materials', 'POST', token, payload)
        // console.log(data)
        // console.log(payload)
        navigation.navigate("Raw Materials List")
        return data
    }


    return(
            <Surface style={styles.surfaceMetaContainer}>                        
                <Surface style={styles.surfaceContainer}>
                        <Text style={theme.formTitle}>New Raw Material Item</Text>        
                        <Text style={styles.subtitle}>(Raw Materials)</Text>        
                </Surface>
                <Surface style={styles.surfaceContainer}>
                    <Surface style={styles.surface}>
                        <TextInput
                            placeholder="Item Name"
                            label="itemName"
                            value={name}
                            onChangeText={setName}
                            mode="outlined"
                        />
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
                    <Surface style={styles.surfaceBottom}>
                        <TextInput
                            placeholder="Subcategory"
                            label="subcategory"
                            value={subcategory}
                            onChangeText={setSubcategory}
                            mode="outlined"
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