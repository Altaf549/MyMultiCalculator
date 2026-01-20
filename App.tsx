/**
 * Multi Calculator App
 * A comprehensive calculator app with multiple calculator types
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const { resolvedTheme } = useTheme();
  
  return (
    <>
      <StatusBar 
        barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={resolvedTheme === 'dark' ? '#000000' : '#007AFF'} 
      />
      <AppNavigator />
    </>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
