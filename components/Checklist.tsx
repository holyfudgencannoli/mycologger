import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

/**
 * Props:
 * - options: array of strings or objects { label, value }
 * - selectedValues: optional array of preselected values
 * - onChange: callback(selectedValues) when selection changes
 */
export default function Checklist({ options = [], selectedValues = [], onChange }) {
  const [checkedItems, setCheckedItems] = useState(selectedValues);

  const toggleItem = (value) => {
    let updated;
    if (checkedItems.includes(value)) {
      updated = checkedItems.filter((v) => v !== value);
    } else {
      updated = [...checkedItems, value];
    }
    setCheckedItems(updated);
    if (onChange) onChange(updated);
  };

  return (
    <ScrollView style={styles.container}>
      {options.map((item, index) => {
        // Support string or object option
        const label = typeof item === "string" ? item : item.label;
        const value = typeof item === "string" ? item : item.value;

        return (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => toggleItem(value)}
          >
            <Checkbox
              status={checkedItems.includes(value) ? "checked" : "unchecked"}
              onPress={() => toggleItem(value)}
            />
            <Text style={styles.optionLabel}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300, // optional scrollable area
    marginVertical: 8,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  optionLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});
