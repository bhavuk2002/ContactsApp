import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Avatar = ({ name }) => (
  <View style={styles.avatarContainer}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{name[0]}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  avatarContainer: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  avatarText: {
    fontSize: 32,
    color: "white",
  },
});

export default Avatar;
