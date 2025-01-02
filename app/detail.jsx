import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetailView() {
  const router = useRouter();
  const { contact } = useLocalSearchParams();
  const contactDetails = JSON.parse(contact);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{contactDetails.name}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{contactDetails.phone}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{contactDetails.email}</Text>

      <Text style={styles.label}>Address:</Text>
      <Text style={styles.value}>{contactDetails.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  backButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
