import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const contacts = [
  {
    id: "1",
    name: "Bhavuk Mittal",
    phone: "+91 78348 77626",
    email: "vvbnmittal@gmail.com",
    address: "Delhi, India",
  },
  {
    id: "2",
    name: "Bhavuk Mittal",
    phone: "+91 78348 77626",
    email: "vvbnmittal@gmail.com",
    address: "Delhi, India",
  },
  {
    id: "3",
    name: "Bhavuk Mittal",
    phone: "+91 78348 77626",
    email: "vvbnmittal@gmail.com",
    address: "Delhi, India",
  },
  {
    id: "4",
    name: "Bhavuk Mittal",
    phone: "+91 78348 77626",
    email: "vvbnmittal@gmail.com",
    address: "Delhi, India",
  },
];

export default function Index() {
  const router = useRouter();

  const handleAddContact = () => {
    router.push("add-edit");
  };

  const handleViewDetails = (contact) => {
    router.push({
      pathname: "details",
      params: { contact: JSON.stringify(contact) },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => handleViewDetails(item)}
          >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts yet</Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 14,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
