import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../redux/contactSlice";
import FormInput from "../components/add-edit/FormInput";

export default function AddEditContact() {
  const router = useRouter();
  const { contact } = useLocalSearchParams();

  const isEditMode = !!contact;
  const contactDetails = isEditMode ? JSON.parse(contact) : {};

  const [name, setName] = useState(contactDetails.name || "");
  const [phone, setPhone] = useState(contactDetails.phone || "");
  const [email, setEmail] = useState(contactDetails.email || "");
  const [street, setStreet] = useState(contactDetails.street || "");
  const [city, setCity] = useState(contactDetails.city || "");
  const [country, setCountry] = useState(contactDetails.country || "");
  const [pincode, setPincode] = useState(contactDetails.pincode || "");

  const [errors, setErrors] = useState({}); // State for validation errors
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (pincode.trim() && !/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    Toast.show({
      type: "info",
      position: "bottom",
      text1: "Contact Saved",
      visibilityTime: 1200,
      autoHide: true,
    });
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
      avatarColor: contactDetails.avatarColor,
    };
    dispatch(editContact(updatedContact)); // Update contact in Redux store
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Contact Updated",
      visibilityTime: 1200,
      autoHide: true,
    });
    router.back();
    router.replace({
      pathname: "details",
      params: { contact: JSON.stringify(updatedContact) },
    });
  };

  const handleSave = () => {
    if (!validateForm()) return; // Stop if validation fails
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
        <FormInput
          placeholder={"Name"}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors((prev) => ({ ...prev, name: "" })); // Clear error on change
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <FormInput
          placeholder={"Phone"}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setErrors((prev) => ({ ...prev, phone: "" })); // Clear error on change
          }}
          // keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <FormInput
          placeholder={"Email"}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, email: "" })); // Clear error on change
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

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
          onChangeText={(text) => {
            setPincode(text);
            setErrors((prev) => ({ ...prev, pincode: "" })); // Clear error on change
          }}
        />
        {errors.pincode && (
          <Text style={styles.errorText}>{errors.pincode}</Text>
        )}

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
    backgroundColor: "#0072de",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fafafa",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
});
