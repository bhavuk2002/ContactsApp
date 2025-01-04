import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../redux/contactSlice";
import ContactCard from "../components/ContactCard";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = useSelector((state) =>
    selectFilteredContacts(state, searchTerm)
  );

  console.log(filteredContacts);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchTerm}
              onChangeText={setSearchTerm}
              autoFocus={true}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactCard item={item} handleViewDetails />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchTerm
                ? "No contacts match your search."
                : "Start typing to search for contacts."}
            </Text>
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
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactDetails: {
    fontSize: 14,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});
