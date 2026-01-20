// Color Palette and Theme Definitions

import { EMI_CALCULATOR, SCIENTIFIC_CALCULATOR } from "../utils/constants";

export const COLORS = {
  // Primary Colors
  PRIMARY: '#009688',
  PRIMARY_LIGHT: '#4DB6AC',
  PRIMARY_DARK: '#00695C',
  
  // Secondary Colors
  SECONDARY: '#5856D6',
  SECONDARY_LIGHT: '#AF52DE',
  SECONDARY_DARK: '#4140A3',
  
  // Background Colors
  BACKGROUND: '#FFFFFF',
  BACKGROUND_DARK: '#F2F2F7',
  CARD_BACKGROUND: '#FFFFFF',
  MODAL_BACKGROUND: 'rgba(0, 0, 0, 0.5)',
  
  // Text Colors
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#8E8E93',
  TEXT_TERTIARY: '#C7C7CC',
  TEXT_WHITE: '#FFFFFF',
  TEXT_DISABLED: '#D1D1D6',
  
  // Border Colors
  BORDER: '#C6C6C8',
  BORDER_LIGHT: '#E5E5EA',
  BORDER_DARK: '#8E8E93',
  
  // Status Colors
  SUCCESS: '#34C759',
  SUCCESS_LIGHT: '#63D86E',
  SUCCESS_DARK: '#28A745',
  
  WARNING: '#FF9500',
  WARNING_LIGHT: '#FFB143',
  WARNING_DARK: '#E67E00',
  
  ERROR: '#FF3B30',
  ERROR_LIGHT: '#FF6B60',
  ERROR_DARK: '#D70015',
  
  INFO: '#5AC8FA',
  INFO_LIGHT: '#8EDDFA',
  INFO_DARK: '#339AF0',
  
  // Calculator Specific Colors
  CALCULATOR_BUTTON: '#F2F2F7',
  CALCULATOR_BUTTON_PRESSED: '#E5E5EA',
  CALCULATOR_OPERATOR: '#FF9500',
  CALCULATOR_EQUALS: '#007AFF',
  CALCULATOR_CLEAR: '#FF3B30',
  
  // BMI Category Colors
  BMI_UNDERWEIGHT: '#5AC8FA',
  BMI_NORMAL: '#34C759',
  BMI_OVERWEIGHT: '#FF9500',
  BMI_OBESE: '#FF3B30',
  
  // Semantic Colors
  POSITIVE: '#34C759',
  NEGATIVE: '#FF3B30',
  NEUTRAL: '#8E8E93',
  
  // Gradient Colors
  GRADIENT_START: '#009688',
  GRADIENT_END: '#5856D6',
  
  // Shadow Colors
  SHADOW: 'rgba(0, 0, 0, 0.1)',
  SHADOW_DARK: 'rgba(0, 0, 0, 0.2)',

  SIMPLE_CALCULATOR: '#4CAF50',
  SCIENTIFIC_CALCULATOR: '#2196F3',
  EMI_CALCULATOR: '#FF9800',
  AGE_CALCULATOR: '#9C27B0',
  GST_CALCULATOR: '#009688',
  DISCOUNT_CALCULATOR: '#3F51B5',
  CURRENCY_CALCULATOR: '#F44336',
  BMI_CALCULATOR: '#440606ff',
  
} as const;

// Theme Types
export type ThemeColors = typeof COLORS;

// Dark Mode Colors
export const DARK_COLORS = {
  ...COLORS,
  BACKGROUND: '#000000' as const,
  BACKGROUND_DARK: '#121212' as const,  // Better dark background
  CARD_BACKGROUND: '#1C1C1E' as const,
  TEXT_PRIMARY: '#FFFFFF' as const,
  TEXT_SECONDARY: '#AEAEB2' as const,
  TEXT_TERTIARY: '#8E8E93' as const,
  BORDER: '#38383A' as const,
  BORDER_LIGHT: '#48484A' as const,
  CALCULATOR_BUTTON: '#2C2C2E' as const,
  CALCULATOR_BUTTON_PRESSED: '#48484A' as const,
  
  // Enhanced Calculator Colors for Dark Mode
  SIMPLE_CALCULATOR: '#66BB6A' as const,      // Brighter green
  SCIENTIFIC_CALCULATOR: '#42A5F5' as const,  // Brighter blue  
  EMI_CALCULATOR: '#FFA726' as const,         // Brighter orange
  AGE_CALCULATOR: '#AB47BC' as const,         // Brighter purple
  GST_CALCULATOR: '#26A69A' as const,         // Brighter teal
  DISCOUNT_CALCULATOR: '#5C6BC0' as const,    // Brighter indigo
  CURRENCY_CALCULATOR: '#EF5350' as const,    // Brighter red
  BMI_CALCULATOR: '#FF7043' as const,         // Deep orange (unique)
} as const;
