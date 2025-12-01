import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";

export default function TaskCalendar({ token, setTaskRecords }) {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // Trigger fetching when screen focused
  useFocusEffect(
    React.useCallback(() => {
      fetchTaskDates();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={{
          ...markedDates,
          ...(selectedDate
            ? {
                [selectedDate]: {
                  selected: true,
                  selectedColor: "green",
                  marked: true,
                  dotColor: "blue",
                },
              }
            : {}),
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString); // YYYY-MM-DD
          fetchTasksForDay(day.dateString);
        }}
      />
    </View>
  );
}
