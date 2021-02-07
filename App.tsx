import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider as StoreProvider } from 'react-redux';
import { buildStore } from './store/redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

let initialState = {};
let store = buildStore(initialState);
let persistor = persistStore(store);

// Note: We may (probably should) use the components and set up styling with react-native-elements
// instead of how the project template does things.

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}
