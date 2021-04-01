import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ThemeProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider as StoreProvider } from "react-redux";
import { buildStore } from "./store/redux";

import { DefaultTheme, DarkTheme } from "./constants/Colors";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
// @ts-ignore
import { LogBox } from "react-native";

let initialState = {};
let store = buildStore(initialState);
let persistor = persistStore(store);

// Note: We may (probably should) use the components and set up styling with react-native-elements
// instead of how the project template does things.

export default function App() {
  // Timer issues with Socket.io -- https://github.com/facebook/react-native/issues/12981
  LogBox.ignoreLogs(["Setting a timer"]);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <SafeAreaProvider>
              <Navigation />
              <StatusBar />
            </SafeAreaProvider>
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
