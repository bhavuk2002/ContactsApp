import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ActionButton = ({ onPress, iconName, backgroundColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, { backgroundColor }]}>
      <Ionicons name={iconName} size={26} color={"white"} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
});

export default ActionButton;
