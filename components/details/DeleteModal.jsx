// components/DeleteModal.js
import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DeleteModal = ({
  showModal,
  handleCancelDelete,
  handleDeleteContact,
}) => {
  return (
    <Modal
      animationType="none"
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
            <TouchableOpacity onPress={handleCancelDelete}>
              <Text
                style={{ color: "#505050", fontSize: 18, fontWeight: "500" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteContact}>
              {/* <View style={[styles.button, { backgroundColor }]}> */}
              <Text style={{ color: "red", fontSize: 18, fontWeight: "500" }}>
                Delete
              </Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default DeleteModal;
