import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RightHeaderButton = ({ name, size, color, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default RightHeaderButton;
