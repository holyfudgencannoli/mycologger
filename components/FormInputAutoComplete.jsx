
import React from "react";
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useCallback } from "react"
import { StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
import { TextInput } from "react-native-paper";





export const FormInputAutocomplete = ({inputValue, onChangeText, options, placeholder}) => {
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleInputChange = (text) => {
        onChangeText(text);

        const filtered = options.filter((opt) =>
        opt.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);

        setDropdownOpen(true); // open dropdown whenever user types
        onChangeText(text);
    };

    const handleSelect = (value) => {
        onChangeText(value);
        setFilteredOptions([]);
        setDropdownOpen(false); // close dropdown
        onChangeText(value);
    };

    // Build dropdown data only if dropdown is open
    const dropdownData = dropdownOpen
        ? filteredOptions.length > 0
        ? filteredOptions
        : inputValue.length > 0
        ? [`Create "${inputValue}"`]
        : []
        : [];

    return (
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            mode="outlined"
            placeholder={placeholder || "Search or add new..."}
            value={inputValue}
            onChangeText={handleInputChange}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
        />

        {dropdownData.length > 0 && (
            <FlatList
            
            style={styles.dropdown}
            keyboardShouldPersistTaps="handled"
            data={dropdownData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                const value = item.startsWith('Create "') ? item.slice(8, -1) : item;
                return (
                <TouchableOpacity onPress={() => handleSelect(value)}>
                    <Text style={styles.option}>{item}</Text>
                </TouchableOpacity>
                );
            }}
            />
        )}
        </View>
    );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,          // 👈 fixed width
    alignSelf: "flex-start",
    position: "relative", // so dropdown stays attached
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    // padding: 8,
    fontSize: 16,
  },
  dropdown: {
    // position: "absolute", // 👈 makes it overlay beneath the input
    // top: 50,              // just below TextInput
    // left: 0,
    // right: 0,
    maxHeight: 150,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    zIndex: 1000,         // make sure it floats on top
  },
  option: {
    padding: 10,
    fontSize: 16,
  },
});
