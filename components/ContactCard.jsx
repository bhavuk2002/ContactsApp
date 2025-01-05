import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

const ContactCard = ({ item, handleViewDetails, isFirst, isLast }) => {
  const borderRadiusStyle = {
    borderTopLeftRadius: isFirst ? 32 : 0,
    borderTopRightRadius: isFirst ? 32 : 0,
    borderBottomLeftRadius: isLast ? 32 : 0,
    borderBottomRightRadius: isLast ? 32 : 0,
  };

  const cardStyle = {
    borderBottomWidth: isLast ? 0 : 2, // Remove border for last card
  };
  const avatarColor = {
    backgroundColor: item.avatarColor,
  };

  return (
    <TouchableOpacity onPress={() => handleViewDetails(item)}>
      <View style={[styles.contactCard, borderRadiusStyle]}>
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, avatarColor]}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={[styles.detailsContainer, cardStyle]}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    flexDirection: "row",
    // paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fdfefe",
  },
  avatarContainer: {
    marginRight: 16,
    justifyContent: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fdfefe",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
    borderBottomColor: "#e3e3e3",
  },
  contactName: {
    fontSize: 18,
    fontWeight: "400",
  },
  contactPhone: {
    fontSize: 16,
    color: "gray",
  },
});

export default ContactCard;
