import {
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: () => (
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
          ),
        }}
      />

      <View style={styles.container}>
        <View style={styles.detailBox}>
          {/* Avatar Positioned Half Out */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{contactDetails.name[0]}</Text>
            </View>
          </View>

          {/* Contact Name */}
          <Text style={styles.title}>{contactDetails.name}</Text>

          {/* Phone Number */}
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneLabel}>Phone </Text>
            <Text style={styles.phoneText}>{contactDetails.phone}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={handleCall}>
              <View style={styles.actionButton}>
                <Ionicons name="call" size={26} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSMS}>
              <View style={styles.actionButton}>
                <Ionicons name="chatbubble" size={26} color={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVideoCall}>
              <View style={styles.actionButton}>
                <Ionicons name="videocam" size={26} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Email (if present) */}
        {contactDetails.email ? (
          <View
            style={{
              marginTop: 16,
              borderRadius: 24,
              // height: 52,
              backgroundColor: "#fdfefe",
              paddingHorizontal: 24,
              paddingVertical: 12,
              flexDirection: "row",
              alignContent: "center",
              // paddingRight: 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ color: "gray", fontSize: 12 }}>Email</Text>
              <Text style={{ fontWeight: "400", fontSize: 16 }}>
                {contactDetails.email}
              </Text>
            </View>
            <View style={{ alignContent: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={handleEmail}>
                <Ionicons name="mail" size={24} color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Address */}
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
    padding: 2,
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
  avatarContainer: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderColor: "lightgray",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  avatarText: {
    fontSize: 32,
    color: "white",
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
  actionButton: {
    backgroundColor: "gray",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  detailText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
  },
  addressContainer: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addressValue: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});
