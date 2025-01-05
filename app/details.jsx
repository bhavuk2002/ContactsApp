import { View, Text, StyleSheet, Alert, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteContact } from "../redux/contactSlice";
import DeleteModal from "../components/DeleteModal";
import RightHeaderButton from "../components/RightHeaderButton";
import ActionButton from "../components/details/ActionButton";
import ContactInfoItem from "../components/details/ContactInfoItem";
import Avatar from "../components/details/Avatar";

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

  const handleCall = () => {
    if (!contactDetails.phone) {
      Alert.alert("Error", "No phone number available for this contact.");
      return;
    }
    const phoneNumber = `tel:${contactDetails.phone}`;
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert("Error", "Failed to initiate call.")
    );
  };

  const handleVideoCall = () => {
    if (!contactDetails.phone) {
      Alert.alert("Error", "No phone number available for this contact.");
      return;
    }
    const phoneNumber = `duo://${contactDetails.phone}`;
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert("Error", "Failed to initiate video call.")
    );
  };

  const handleSMS = () => {
    if (!contactDetails.phone) {
      Alert.alert("Error", "No phone number available for this contact.");
      return;
    }
    const smsLink = `sms:${contactDetails.phone}`;
    Linking.openURL(smsLink).catch(() =>
      Alert.alert("Error", "Failed to send SMS.")
    );
  };

  const handleEmail = () => {
    if (!contactDetails.email) {
      Alert.alert("Error", "No email address available for this contact.");
      return;
    }
    MailComposer.composeAsync({
      recipients: [contactDetails.email],
    }).catch(() => Alert.alert("Error", "Failed to compose email."));
  };

  const address = [
    contactDetails.street && `${contactDetails.street},`,
    contactDetails.city && `${contactDetails.city}`,
    contactDetails.country && `${contactDetails.country}`,
    contactDetails.pincode && `${contactDetails.pincode}`,
  ]
    .filter(Boolean) // Remove falsy values
    .join(" "); // Join the non-empty parts with a space

  const handleLocation = () => {
    if (!address) {
      Alert.alert("Error", "No phone number available for this contact.");
      return;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    // Open the URL
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Failed to initiate call.")
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
            <View style={{ flexDirection: "row", columnGap: 18 }}>
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
                color="black"
              />
            </View>
          ),
        }}
      />

      <View style={styles.container}>
        <View style={styles.detailBox}>
          {/* Avatar Positioned Half Out */}
          <Avatar name={contactDetails.name} />

          {/* Contact Name */}
          <Text style={styles.title}>{contactDetails.name}</Text>

          {/* Phone Number */}
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneLabel}>Phone </Text>
            <Text style={styles.phoneText}>{contactDetails.phone}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <ActionButton
              onPress={handleCall}
              iconName={"call"}
              backgroundColor={"gray"}
            />
            <ActionButton
              onPress={handleSMS}
              iconName={"chatbubble"}
              backgroundColor={"gray"}
            />
            {/* <ActionButton
              onPress={() => handleVideoCall}
              iconName={"videocam"}
              backgroundColor={"gray"}
            /> */}
          </View>
        </View>

        <ContactInfoItem
          label={"Email"}
          value={contactDetails.email}
          onPress={handleEmail}
          iconName={"mail"}
        />

        <ContactInfoItem
          label={"Address"}
          value={address}
          onPress={handleLocation}
          iconName={"location"}
        />
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
    padding: 10,
    paddingTop: 24,
  },
  detailBox: {
    borderRadius: 36,
    backgroundColor: "#fdfefe",
    paddingBottom: 8,
    alignItems: "center",
    position: "relative",
    marginTop: 50,
    overflow: "visible",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
});
