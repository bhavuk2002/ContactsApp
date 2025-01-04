import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ContactCard from "../components/ContactCard";

export default function Index() {
  const router = useRouter();

  const contacts = useSelector((state) => state.contacts.contacts);

  const handleAddContact = () => {
    router.push("add-edit");
  };

  const handleSearchToggle = () => {
    router.push("search");
  };

  const handleViewDetails = (contact) => {
    router.push({
      pathname: "details",
      params: { contact: JSON.stringify(contact) },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Contacts",
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", columnGap: 12 }}>
                <View style>
                  <TouchableOpacity onPress={handleAddContact}>
                    <Ionicons name="add" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={handleSearchToggle}>
                    <Ionicons name={"search"} size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard item={item} handleViewDetails={handleViewDetails} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No contacts yet</Text>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});
