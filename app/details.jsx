import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteContact } from "../redux/contactSlice";
import DeleteModal from "../components/DeleteModal";
import RightHeaderButton from "../components/RightHeaderButton";

export default function DetailView() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { contact } = useLocalSearchParams();
  const contactDetails = JSON.parse(contact);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteContact = () => {
    dispatch(deleteContact(contactDetails.id));
    setShowDeleteModal(false);
    router.back();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEditContact = () => {
    router.push({
      pathname: "add-edit",
      params: { contact: contact },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Contact Details",
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", columnGap: 8 }}>
                <RightHeaderButton
                  onPress={handleEditContact}
                  name="pencil"
                  size={24}
                  color="black"
                />
                <RightHeaderButton
                  onPress={() => setShowDeleteModal(true)}
                  name="trash-outline"
                  size={24}
                  color="red"
                />
              </View>
            );
          },
        }}
      />

      <View style={styles.container}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contactDetails.name[0]}</Text>
        </View>
        <Text style={styles.title}>{contactDetails.name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.phoneLabel}>Phone </Text>
          <Text style={styles.phoneText}>{contactDetails.phone}</Text>
        </View>
        {contactDetails.email != "" ? (
          <Text style={styles.detailText}>{contactDetails.email}</Text>
        ) : (
          <View></View>
        )}

        <View style={styles.addressContainer}>
          <Text style={styles.addressValue}>{contactDetails.street}</Text>
          <Text style={styles.addressValue}>
            {`${contactDetails.city || ""} ${contactDetails.country || ""} ${
              contactDetails.pincode || ""
            }`}
          </Text>
        </View>
      </View>

      <DeleteModal
        showModal={showDeleteModal}
        handleCancelDelete={handleCancelDelete}
        handleDeleteContact={handleDeleteContact}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderColor: "lightgray",
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    margin: 14,
  },
  avatarText: {
    fontSize: 32,
    color: "lightgray",
  },
  phoneLabel: {
    color: "gray",
    fontWeight: "400",
    fontSize: 16,
  },
  phoneText: {
    color: "black",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    textAlign: "center",
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  addressContainer: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  addressValue: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});
