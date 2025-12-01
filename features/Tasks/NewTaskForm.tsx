import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import TimeLogger from "../../components/TimeLogger";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid"; // npm i uuid

/* ------------------------------------------------------------------ */
/* Types (optional – remove if you’re not using TS)                   */
type Category = "recipe" | "agar culture" | "liquid culture" | "spawn culture" | "task";

export type TimePair = {
  id: string;
  startTime: Date;
  endTime: Date;
  category: Category;
};

const STORAGE_KEY = "times";
/* ------------------------------------------------------------------ */

export default function RecipeTimerScreen() {
  /* ---------- State ------------------------------------------------- */
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [times, setTimes] = useState<TimePair[]>([]);

  const navigation = useNavigation<NavigationProp<any>>();



    /* ---------- Load persisted times --------------------------------- */
  useEffect(() => {
    const loadTimes = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsed: TimePair[] = JSON.parse(json).map((t: any) => ({
            ...t,
            startTime: new Date(t.startTime),
            endTime: new Date(t.endTime),
          }));
          setTimes(parsed);
        }
      } catch (e) {
        console.warn("Failed to load times:", e);
      }
    };

    const loadStartTime = async() => {
      try {
        const datestring = await AsyncStorage.getItem("start_time")
        console.log("JSON:", datestring)
        if (datestring) {
          const value: string = datestring
          console.log("VALUE: ", value)
          setStartTime(new Date(value))
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadTimes();
    loadStartTime();
  }, []);

  const persist = async () => {
    // if (!startTime) {
    //   // First click → Save start time
    //   const now = new Date();
    //   await AsyncStorage.setItem("start_time", now.toISOString());
    //   setStartTime(now);
    //   console.log("Start time saved:", now.toISOString());
    // } else {
    //   // Second click → Save end time and notify parent
    //   const end = new Date();
    //   setEndTime(end);
    // }
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(times.map((t) => ({
          ...t,
          startTime: t.startTime.toISOString(),
          endTime: t.endTime.toISOString(),
        })))
      );
      await AsyncStorage.removeItem("start_time");
    } catch (e) {
      console.warn("Failed to persist times:", e);
    }
  };

  /* ---------- Persist whenever the array changes ------------------- */
  useEffect(() => {
      
    persist();
  }, [times]);

  const persistTimes = async (newTimes: TimePair[]) => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newTimes.map((t) => ({
        ...t,
        startTime: t.startTime.toISOString(),
        endTime: t.endTime.toISOString(),
      })))
    );
  };


  /* ---------- Callback from TimeLogger ---------------------------- */
  const onTimesSet = ({ startTime, endTime, category }: { startTime: Date; endTime: Date, category: string }) => {
    setTimes((prev) => [
      ...prev,
      {
        id: uuidv4(),
        startTime,
        endTime,
        category: "recipe", // default – user can change it later
      },
    ]);
    setStartTime(null);
    setEndTime(null);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete entry",
      "Are you sure you want to remove this time record?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Remove the item from state
            setTimes((prev) => prev.filter((t) => t.id !== id));

            /* OPTIONAL: If you want to persist immediately (instead of waiting for the effect),
              uncomment the line below.  The effect will still run, but it’s harmless. */
            persistTimes(times.filter(t => t.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };


  /* ---------- Helper: navigate based on category ------------------- */
  const goToScreen = (pair: TimePair) => {
    switch (pair.category) {
      case "recipe":
        navigation.navigate("New Batch From Recipe", { id: pair.id, startTime: pair.startTime, endTime: pair.endTime });
        break;
      case "agar culture":
        navigation.navigate("New Agar Culture", { id: pair.id, startTime: pair.startTime, endTime: pair.endTime });
        break;
      case "liquid culture":
        navigation.navigate("New Liquid Culture", { id: pair.id });
        break;
      case "spawn culture":
        navigation.navigate("New Spawn Culture", { id: pair.id });
        break;
      case "task":
        navigation.navigate("New Maintenance Task", { parentId: pair.id }); // or whatever you need
        break;
    }
  };

  /* ---------- Render ------------------------------------------------ */
  return (
    <View style={styles.container}>
      {/* List of recorded pairs */}
      <FlatList
        data={times}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {/* Time display */}
            <Text style={styles.timeText}>
              {item.startTime.toLocaleTimeString()} –{" "}
              {item.endTime.toLocaleTimeString()}
            </Text>

            {/* Category picker */}
            <Picker
              selectedValue={item.category}
              style={styles.picker}
              onValueChange={(value: Category) => {
                // Update the specific pair in state
                setTimes((prev) =>
                  prev.map((p) =>
                    p.id === item.id ? { ...p, category: value } : p
                  )
                );
              }}
            >
              <Picker.Item label="Recipe" value="recipe" />
              <Picker.Item label="Agar Culture" value="agar culture" />
              <Picker.Item label="Liquid Culture" value="liquid culture" />
              <Picker.Item label="Spawn Culture" value="spawn culture" />
              <Picker.Item label="Task" value="task" />
            </Picker>
            <Button
              title="Delete"
              color="#d32f2f"          // red – feel free to change
              onPress={() => handleDelete(item.id)}
            />
            {/* Navigation button */}
            <Button
              title="Execute"
              onPress={() => goToScreen(item)}
              color="#4CAF50"
            />
          </View>
        )}
      />

      {/* The start/stop button */}
      <TimeLogger
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onTimesSet={onTimesSet}
      />
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Styles (feel free to tweak)                                       */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 12,
  },
  timeText: { flex: 2, fontSize: 14 },
  picker: { flex: 2, height: 70 },
});
