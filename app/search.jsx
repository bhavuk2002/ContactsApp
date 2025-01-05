import React, { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../redux/contactSlice";
import { debounce } from "lodash";
import ContactCard from "../components/ContactCard";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounced update of search term
  const updateSearchTerm = useMemo(
    () =>
      debounce((text) => {
        setDebouncedSearchTerm(text);
      }, 300), // 300ms debounce delay
    []
  );

  const handleSearch = (text) => {
    setSearchTerm(text);
    updateSearchTerm(text); // Trigger the debounced update
  };

  const handleViewDetails = (contact) => {
    router.push({
      pathname: "details",
      params: { contact: JSON.stringify(contact) },
    });
  };

  const filteredContacts = useSelector((state) =>
    selectFilteredContacts(state, debouncedSearchTerm)
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
              onChangeText={handleSearch}
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
            <ContactCard item={item} handleViewDetails={handleViewDetails} />
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
    justifyContent: "center",
    paddingTop: 24,
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});
