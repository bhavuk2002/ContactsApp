import React from "react";
import { TextInput, StyleSheet } from "react-native";

const FormInput = ({ placeholder, value, onChangeText, keyboardType }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || "default"}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
});

export default FormInput;
