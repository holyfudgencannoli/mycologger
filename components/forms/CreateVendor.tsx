import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Surface, TextInput } from "react-native-paper";

export default function CreateVendor({phone, email, website}: {phone?: string, email?: string, website?: string}) {
    const [vendorPhone, setVendorPhone] = useState('')
    const [vendorEmail, setVendorEmail] = useState(email? email: '')
    const [vendorWebsite, setVendorWebsite] = useState(website? website: '')

    useFocusEffect(
        useCallback(() => {
            setVendorPhone(phone)
        }, [])
    )

    
    return (
        <Surface style={styles.surfaceContainer}>
            <Text style={styles.title}>New Vendor Info</Text>        
            <Surface style={styles.surface}>
                <TextInput
                    placeholder="Vendor Phone Number"
                    label="vendorPhone"
                    value={phone}
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