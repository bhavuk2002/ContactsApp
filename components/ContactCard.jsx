// components/ContactCard.js
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ContactCard = ({ item, handleViewDetails }) => {
  return (
    <TouchableOpacity
      style={styles.contactCard}
      onPress={() => handleViewDetails(item)}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 16,
    color: "gray",
  },
});

export default ContactCard;
