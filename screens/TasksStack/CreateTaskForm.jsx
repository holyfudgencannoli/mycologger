import { TextInput } from "react-native-paper";
import TaskDataTable from "../../components/TaskDataTable";
import { ThemedView } from "../../components/ThemedView";
import TimeLogger from "../../components/TimeLogger";
import { StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../scripts/AuthContext";
import { ThemedText } from "../../components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";



export default function CreateTaskForm() {
    const [timesSet, setTimesSet] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [memo, setMemo] = useState(null);

    const { user, token } = useAuth();

    const handleStartOver = async() =>{
        await AsyncStorage.setItem("start_time", '');
        await AsyncStorage.setItem("end_time", '');
        setStartTime(null)
        setEndTime(null)
        setName(null)
        setDescription(null)
        setMemo(null)
        setTimesSet(false)
        console.log("Timer cleared!")
        return 'Timer Cleared'
    }   
    
    
    useEffect(() => {
        const loadStartTime = async () => {
            const saved = await AsyncStorage.getItem("start_time");
            if (saved) setStartTime(new Date(saved));
        };
        loadStartTime();
    }, []);
    
    const handleSubmit = async () => {
        const payload = {
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            name: name,
            description: description,
            memo: memo,


        };
        

        console.log("Sending to backend:", payload);

        try {
            await fetch("http://10.0.0.45:5000/api/tasks", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            console.log("Time logged successfully!");
        } catch (err) {
            console.error("Error logging time:", err);
        }

        await AsyncStorage.removeItem("start_time");
        setStartTime(null);
        setTimesSet(false)
    };


    return(
        <SafeAreaView style={timesSet===false ? styles.formContainer : styles.container}>
        {timesSet === false
            ? 
            <>
                <TimeLogger
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    onTimesSet={({ startTime: childStart, endTime: childEnd }) => {
                        setStartTime(childStart);
                        setEndTime(childEnd);
                        setTimesSet(true);
                    }}
                />
    
                <TaskDataTable />
            </>
            :
            <>
                <ThemedView style={styles.form}>
                    
                    <TextInput
                        label="Name"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Memo"
                        value={memo}
                        onChangeText={setMemo}
                        mode="outlined"
                        style={styles.input}
                    />
                    
                    <Button onPress={handleSubmit} color="#000000" style={styles.button} title='Log Task' />
                    <Button onPress={handleStartOver} color="#000000" style={styles.button} title='Start Over' />

                </ThemedView>
                <TaskDataTable />

            </>
            
    
    }
            
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 20 },
  formContainer: {
    flex:1
  },
  form: {
    backgroundColor: 'rgba(0, 17, 255, 0.3)',
  },
  input: {
    margin: 24,
    gap: 16,
  }
});