import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactInfoItem = ({ label, value, iconName, onPress }) => {
  if (!value) return null; // Don't render if value is empty

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={styles.icon}>
          <Ionicons name={iconName} size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: "#fdfefe",
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "gray",
    fontSize: 12,
  },
  value: {
    fontWeight: "400",
    fontSize: 16,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactInfoItem;
