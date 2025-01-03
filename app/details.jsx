import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteContact } from "../redux/contactSlice";

export default function DetailView() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { contact } = useLocalSearchParams();
  const contactDetails = JSON.parse(contact);

  const [showModal, setShowModal] = useState(false);

  const handleDeleteContact = () => {
    dispatch(deleteContact(contactDetails.id));
    setShowModal(false);
    router.back();
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleEditContact = () => {
    router.push({
      pathname: "add-edit",
      params: { contact: JSON.stringify(contactDetails) },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Contact Details",
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row" }}>
                <View style={{ paddingRight: 8 }}>
                  <TouchableOpacity onPress={handleEditContact}>
                    <Ionicons name="pencil" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
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
        <Text style={styles.detailText}>Phone: {contactDetails.phone}</Text>
        <Text style={styles.detailText}>Email: {contactDetails.email}</Text>
        {/* <Text style={styles.detailText}>Address: {contactDetails.address}</Text> */}

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{contactDetails.address}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Contact</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this contact?
            </Text>
            <View style={styles.modalActions}>
              <Button title="No" onPress={handleCancelDelete} color="gray" />
              <Button
                title="Proceed"
                onPress={handleDeleteContact}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
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
    margin: 18,
  },
  avatarText: {
    fontSize: 32,
    color: "lightgray",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
