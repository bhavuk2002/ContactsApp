import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    nextId: 1, // Keep track of the next ID to be used
  },
  reducers: {
    addContact: (state, action) => {
      const newContact = action.payload;
      newContact.id = state.nextId;

      // Find the correct position to insert the new contact
      let index = state.contacts.findIndex(
        (contact) => contact.name.localeCompare(newContact.name) > 0
      );

      if (index === -1) {
        // If no larger element is found, append to the end
        state.contacts.push(newContact);
      } else {
        // Insert at the found position
        state.contacts.splice(index, 0, newContact);
      }

      state.nextId += 1;
    },
    editContact: (state, action) => {
      const { id, name, phone, email, street, city, country, pincode } =
        action.payload;
      const index = state.contacts.findIndex((contact) => contact.id === id);
      if (index !== -1) {
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
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
