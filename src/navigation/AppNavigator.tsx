import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

// Import screens (will be created next)
import HomeScreen from '../screens/HomeScreen';
import SimpleCalculatorScreen from '../screens/SimpleCalculatorScreen';
import ScientificCalculatorScreen from '../screens/ScientificCalculatorScreen';
import BmiScreen from '../screens/BmiScreen';
import EmiScreen from '../screens/EmiScreen';
import AgeScreen from '../screens/AgeScreen';
import GstScreen from '../screens/GstScreen';
import DiscountScreen from '../screens/DiscountScreen';
import CurrencyConverterScreen from '../screens/CurrencyConverterScreen';
// Import types
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.PRIMARY,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: colors.TEXT_WHITE,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerRight: () => <ThemeToggle />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Multi Calculator',
          }}
        />
        <Stack.Screen
          name="SimpleCalculator"
          component={SimpleCalculatorScreen}
          options={{
            title: 'Simple Calculator',
          }}
        />
        <Stack.Screen
          name="ScientificCalculator"
          component={ScientificCalculatorScreen}
          options={{
            title: 'Scientific Calculator',
          }}
        />
        <Stack.Screen
          name="BMI"
          component={BmiScreen}
          options={{
            title: 'BMI Calculator',
          }}
        />
        <Stack.Screen
          name="EMI"
          component={EmiScreen}
          options={{
            title: 'EMI Calculator',
          }}
        />
        <Stack.Screen
          name="Age"
          component={AgeScreen}
          options={{
            title: 'Age Calculator',
          }}
        />
        <Stack.Screen
          name="GST"
          component={GstScreen}
          options={{
            title: 'GST Calculator',
          }}
        />
        <Stack.Screen
          name="Discount"
          component={DiscountScreen}
          options={{
            title: 'Discount Calculator',
          }}
        />
        <Stack.Screen
          name="CurrencyConverter"
          component={CurrencyConverterScreen}
          options={{
            title: 'Currency Converter',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
