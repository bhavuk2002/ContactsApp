import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function DetailView() {
  const router = useRouter();
  const { contact } = useLocalSearchParams();
  const contactDetails = JSON.parse(contact);

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
              <TouchableOpacity onPress={handleEditContact}>
                <Ionicons name="pencil" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />

      <View style={styles.container}>
        <View
          style={{
            width: 100,
            height: 100,
            borderColor: "lightgray",
            borderWidth: 1,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            margin: 18,
          }}
        >
          {/* <Ionicons name="camera-outline" size={32} color={"lightgray"} /> */}
          <Text style={{ fontSize: 32, color: "lightgray" }}>
            {contactDetails.name[0]}
          </Text>
        </View>
        <Text style={styles.title}>{contactDetails.name}</Text>
        <Text style={styles.detailText}>Phone: {contactDetails.phone}</Text>
        <Text style={styles.detailText}>Email: {contactDetails.email}</Text>
        {/* <Text style={styles.detailText}>Address: {contactDetails.address}</Text> */}

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{contactDetails.address}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});
