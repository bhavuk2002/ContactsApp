import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [], // Sorted contact list
    nextId: 1, // Next ID to be used
  },
  reducers: {
    addContact: (state, action) => {
      const newContact = action.payload;
      newContact.id = state.nextId;

      // Find the correct position to insert the new contact (keeping the array sorted)
      const index = state.contacts.findIndex(
        (contact) => contact.name.localeCompare(newContact.name) > 0
      );

      if (index === -1) {
        state.contacts.push(newContact); // Append to the end if no larger element is found
      } else {
        state.contacts.splice(index, 0, newContact); // Insert at the correct position
      }

      state.nextId += 1;
    },
    editContact: (state, action) => {
      const { id, name, phone, email, street, city, country, pincode } =
        action.payload;

      const index = state.contacts.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        // Update contact
        state.contacts[index] = {
          id,
          name,
          phone,
          email,
          street,
          city,
          country,
          pincode,
        };

        // Re-sort the array after editing to maintain order
        state.contacts.sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

// Memoized Selector: Get all contacts
const selectContacts = (state) => state.contacts.contacts;

// Memoized Selector: Filtered Contacts by Search Term
export const selectFilteredContacts = createSelector(
  [selectContacts, (_, searchTerm) => searchTerm],
  (contacts, searchTerm) => {
    if (!searchTerm) return []; // Return empty if no search term is provided

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    // Filter contacts based on name, email, or phone
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(lowercasedSearchTerm) ||
        contact.email.toLowerCase().includes(lowercasedSearchTerm) ||
        contact.phone.includes(lowercasedSearchTerm)
    );
  }
);

export const { addContact, editContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
