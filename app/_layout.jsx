import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
export default function RootLayout() {
  return (
    // Wrapping the Stack with Redux and PersistGate for state management and persistence
    <Provider store={store}>
      <PersistGate
        loading={null} // Can replace with a loading indicator if needed
        persistor={persistor} // The persistor that manages persisted state
      >
        <Stack />
      </PersistGate>
    </Provider>
  );
}
