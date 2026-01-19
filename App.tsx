/**
 * Multi Calculator App
 * A comprehensive calculator app with multiple calculator types
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
