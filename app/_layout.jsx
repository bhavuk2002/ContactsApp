import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <>
      {/* // Wrapping the Stack with Redux and PersistGate for state management and
      persistence */}
      <Provider store={store}>
        <PersistGate
          loading={null} // Can replace with a loading indicator if needed
          persistor={persistor} // The persistor that manages persisted state
        >
          <Stack
            screenOptions={{
              // headerTransparent: true, // Makes the header transparent
              headerStyle: {
                backgroundColor: "#f2f2f2", // Ensures background is transparent
                elevation: 0, // Removes shadow on Android
                shadowOpacity: 0, // Removes shadow on iOS
              },
              headerTitleStyle: {
                fontWeight: "700",
              },
              headerShadowVisible: false,
              statusBarBackgroundColor: "#f2f2f2",
              statusBarStyle: "dark",
              statusBarTranslucent: true, // For transparent status bar on Android
            }}
          />
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
}
