# Contact Management App

A simple contact management application built with React Native and Expo. The app allows users to add, edit, view, and delete contacts, and supports persistence using Redux and Redux Persist for state management. The application has been completely redesigned with a modern and intuitive user interface for a better user experience.

## 🎥 Demonstration Videos

- **New Redesigned Version**: [Contacts App Demonstration (New)](https://drive.google.com/file/d/1k41_pR2S8mWZA8VrLe3Cngz6ED0_nvuY/view?usp=sharing)
- **Old Version**: [Contacts App Demonstration (Old)](https://drive.google.com/file/d/1oPF2FJwJubyHdgUIjNG74O_LrrnF9dMm/view?usp=sharing)

## 🛠️ Tech Stack

- **React Native**: Framework for building mobile applications using JavaScript and React.
- **Expo**: Open-source platform to build and run React Native applications.
- **Expo Router**: Used for routing and navigation in the app.
- **Redux**: State management tool for managing global state.
- **JavaScript**: The primary language used for development.

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Install Node.js](https://nodejs.org/)
- **Expo CLI**: [Install Expo CLI](https://docs.expo.dev/get-started/installation/)

  You can install it globally with the following command:

  ```bash
  npm install -g expo-cli
  ```

## 🌐 How to Run Locally

1. **Clone the Repository**
   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/bhavuk2002/ContactsApp.git
   cd ContactsApp
   ```

2. **Install Dependencies**
   Install the required dependencies:

   ```bash
   npm install
   ```

3. **Start the Expo Project**
   Start the project with Expo:

   ```bash
   npm expo start
   ```

   From here, you can run your app on a simulator (Android or iOS), or on a physical target device.

## 🔄 Workflow

### Main Screens:

1. **Contact List**: Displays a list of all contacts stored in the app. Each contact can be selected to view or edit details.
2. **Contact Details**: Shows detailed information about a selected contact with options to edit or delete it.
3. **Add/Edit Contact**: Allows users to add new contacts or edit existing ones.
4. **Search**: Users can search for specific contacts using a search bar with real-time debouncing.

### Navigation:

- The app uses Expo Router for screen transitions. The main navigation flow includes the contact list, individual contact detail views, and the search screen.

### State Management:

- Redux is used for state management to hold the list of contacts.
- Redux Persist is integrated to persist Redux state across app restarts. The state, including the list of contacts, is saved locally using AsyncStorage to ensure that data remains after the app is closed and reopened.

### Modals:

- A Modal component is used to confirm contact deletion, providing users with the option to proceed or cancel the action.

### User Actions:

- **Add**: Users can add new contacts through a form.
- **Edit**: Users can edit an existing contact by updating their details.
- **Delete**: Users can delete contacts with a confirmation modal.
- **Search**: Users can search contacts with a debounced search bar for improved performance.

## 🔍 Functionalities

1. **Contact List**:

   - View a list of all contacts.
   - Each contact displays the name and phone number.
   - Select a contact to view or edit details.

2. **Add/Edit Contact**:

   - Add new contact with name, phone, email, and address.
   - Edit details of an existing contact.

3. **Delete Contact**:

   - Delete a contact with a confirmation prompt.

4. **Search Contacts**:

   - Real-time search functionality with debouncing for smooth performance.
   - Display filtered contacts matching the search term (`name`, `email`, `phone`).

5. **Modal Confirmation**:
   - A modal window appears for delete confirmation with options to cancel or proceed.

## 📂 Storage Used

- **Redux**: Used for in-memory state management, storing the contact list and contact details.
- **Redux Persist**: To persist the Redux state locally (using `AsyncStorage` by default), ensuring contacts remain available even after restarting the app.

## 🚀 Future Improvements

- Integration with a backend for storing contacts remotely.
- Adding support for contact groups or categories.
