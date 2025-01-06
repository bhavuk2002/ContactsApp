import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../redux/contactSlice";
import { debounce } from "lodash";
import ContactCard from "../components/ContactCard";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounced update of search term
  const updateSearchTerm = useMemo(
    () =>
      debounce((text) => {
        setDebouncedSearchTerm(text);
      }, 200), // 200ms debounce delay
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

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    const isLast = index === filteredContacts.length - 1;

    return (
      <ContactCard
        item={item}
        handleViewDetails={handleViewDetails}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  };

  const filteredContacts = useSelector((state) =>
    selectFilteredContacts(state, debouncedSearchTerm)
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
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
      <View
        style={{
          marginTop: 48,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 32,
          paddingLeft: 14,
          paddingBottom: 12,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchTerm}
          onChangeText={handleSearch}
          autoFocus={true}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderItem(item)}
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
    // flex: 1,
    paddingHorizontal: 10,
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
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    color: "gray",
  },
});
