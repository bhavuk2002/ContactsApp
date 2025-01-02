import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Stack } from "expo-router";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/contactSlice";

export default function AddEditContact() {
  const router = useRouter();
  const { contact } = useLocalSearchParams();
  const isEditMode = !!contact;
  const contactDetails = isEditMode ? JSON.parse(contact) : {};

  const [name, setName] = useState(contactDetails.name || "");
  const [phone, setPhone] = useState(contactDetails.phone || "");
  const [email, setEmail] = useState(contactDetails.email || "");
  const [address, setAddress] = useState(contactDetails.address || "");
  const dispatch = useDispatch();

  const handleAddContact = () => {
    const newContact = {
      name: name,
      phone: phone,
      email: email,
      address: address,
    };
    dispatch(addContact(newContact)); // Add contact to Redux store
  };

  const handleSave = () => {
    // Logic
    handleAddContact();
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: isEditMode ? "Edit Contact" : "Add Contact",
        }}
      />
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditMode ? "Update" : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
