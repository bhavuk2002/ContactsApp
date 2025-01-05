import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSelector } from "react-redux";
import ContactCard from "../components/ContactCard";
import RightHeaderButton from "../components/RightHeaderButton";

export default function Index() {
  const router = useRouter();

  const contacts = useSelector((state) => state.contacts.contacts);

  const handleAddContact = () => {
    router.push("add-edit");
  };

  const handleSearchContact = () => {
    router.push("search");
  };

  const handleViewDetails = (contact) => {
    router.push({
      pathname: "details",
      params: { contact: JSON.stringify(contact) },
    });
  };

  const renderItem = ({ item, index }) => {
    const isFirst = index === 0;
    const isLast = index === contacts.length - 1;

    return (
      <ContactCard
        item={item}
        handleViewDetails={handleViewDetails}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Contacts",
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", columnGap: 12 }}>
                <RightHeaderButton
                  name="add"
                  size={24}
                  colour={"black"}
                  onPress={handleAddContact}
                />
                <RightHeaderButton
                  name="search"
                  size={24}
                  colour={"black"}
                  onPress={handleSearchContact}
                />
              </View>
            );
          },
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderItem(item)}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No contacts yet</Text>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    marginTop: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});
