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
import { addContact, editContact } from "../redux/contactSlice";
import FormInput from "../components/FormInput";

export default function AddEditContact() {
  const router = useRouter();
  const { contact } = useLocalSearchParams();

  const isEditMode = !!contact;
  const contactDetails = isEditMode ? JSON.parse(contact) : {};

  const [name, setName] = useState(contactDetails.name || "");
  const [phone, setPhone] = useState(contactDetails.phone || "");
  const [email, setEmail] = useState(contactDetails.email || "");
  const [street, setStreet] = useState(contactDetails.address || "");
  const [city, setCity] = useState(contactDetails.address || "");
  const [country, setCountry] = useState(contactDetails.address || "");
  const [pincode, setPincode] = useState(contactDetails.address || "");
  const dispatch = useDispatch();

  const handleAddContact = () => {
    const newContact = {
      name: name,
      phone: phone,
      email: email ? email : "",
      street: street ? street : "",
      city: city ? city : "",
      country: country ? country : "",
      pincode: pincode ? pincode : "",
    };
    dispatch(addContact(newContact)); // Add contact to Redux store
  };

  const handleEditContact = () => {
    const updatedContact = {
      id: contactDetails.id,
      name: name,
      phone: phone,
      email: email,
      street: street,
      city: city,
      country: country,
      pincode: pincode,
    };
    dispatch(editContact(updatedContact));
    router.back();
    router.replace({
      pathname: "details",
      params: { contact: JSON.stringify(updatedContact) },
    });
  };

  const handleSave = () => {
    if (isEditMode) {
      handleEditContact();
    } else {
      handleAddContact();
      router.back();
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: isEditMode ? "Edit Contact" : "Add Contact",
        }}
      />
      <View style={styles.container}>
        <FormInput placeholder={"Name"} value={name} onChangeText={setName} />
        <FormInput
          placeholder={"Phone"}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <FormInput
          placeholder={"Email"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={{ padding: 4, fontWeight: "semibold", fontSize: 14 }}>
          Address
        </Text>
        <FormInput
          placeholder={"Street"}
          value={street}
          onChangeText={setStreet}
        />
        <FormInput placeholder={"City"} value={city} onChangeText={setCity} />
        <FormInput
          placeholder={"Country"}
          value={country}
          onChangeText={setCountry}
        />
        <FormInput
          placeholder={"Pincode"}
          value={pincode}
          onChangeText={setPincode}
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
