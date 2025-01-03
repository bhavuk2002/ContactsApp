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
      state.contacts.push(newContact);
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
