export const APP_NAME = 'Multi Calculator';

// Navigation
export const NAVIGATION = {
  HOME: 'Home',
  SIMPLE_CALCULATOR: 'SimpleCalculator',
  SCIENTIFIC_CALCULATOR: 'ScientificCalculator',
  BMI_CALCULATOR: 'BMI',
  EMI_CALCULATOR: 'EMI',
  AGE_CALCULATOR: 'Age',
  GST_CALCULATOR: 'GST',
  DISCOUNT_CALCULATOR: 'Discount',
  CURRENCY_CONVERTER: 'CurrencyConverter',
  UNIT_CONVERTER: 'UnitConverter',
} as const;

// Home Screen
export const HOME_SCREEN = {
  TITLE: 'All-in-One Calculator',
  SUBTITLE: 'Choose a calculator type',
} as const;

// Calculator Types
export const CALCULATORS = {
  SIMPLE: {
    NAME: 'Simple Calculator',
    DESCRIPTION: 'Basic arithmetic operations',
    ICON: 'calculate',
    ROUTE: 'SimpleCalculator',
    COLOR_KEY: 'SIMPLE_CALCULATOR',
  },
  SCIENTIFIC: {
    NAME: 'Scientific Calculator',
    DESCRIPTION: 'Advanced mathematical functions',
    ICON: 'calculate',
    ROUTE: 'ScientificCalculator',
    COLOR_KEY: 'SCIENTIFIC_CALCULATOR',
  },
  BMI: {
    NAME: 'BMI Calculator',
    DESCRIPTION: 'Body Mass Index calculator',
    ICON: 'person',
    ROUTE: 'BMI',
    COLOR_KEY: 'BMI_CALCULATOR',
  },
  EMI: {
    NAME: 'EMI Calculator',
    DESCRIPTION: 'Loan installment calculator',
    ICON: 'attach-money',
    ROUTE: 'EMI',
    COLOR_KEY: 'EMI_CALCULATOR',
  },
  AGE: {
    NAME: 'Age Calculator',
    DESCRIPTION: 'Calculate age from birth date',
    ICON: 'cake',
    ROUTE: 'Age',
    COLOR_KEY: 'AGE_CALCULATOR',
  },
  GST: {
    NAME: 'GST Calculator',
    DESCRIPTION: 'Goods and Services Tax calculator',
    ICON: 'receipt',
    ROUTE: 'GST',
    COLOR_KEY: 'GST_CALCULATOR',
  },
  DISCOUNT: {
    NAME: 'Discount Calculator',
    DESCRIPTION: 'Calculate discounts and savings',
    ICON: 'local-offer',
    ROUTE: 'Discount',
    COLOR_KEY: 'DISCOUNT_CALCULATOR',
  },
  CURRENCY: {
    NAME: 'Currency Converter',
    DESCRIPTION: 'Real-time exchange rates',
    ICON: 'currency-exchange',
    ROUTE: 'CurrencyConverter',
    COLOR_KEY: 'CURRENCY_CALCULATOR',
  },
  UNIT_CONVERTER: {
    NAME: 'Unit Converter',
    DESCRIPTION: 'Convert between different units',
    ICON: 'swap-horiz',
    ROUTE: 'UnitConverter',
    COLOR_KEY: 'UNIT_CONVERTER',
  },
  MATH_UTILS: {
    NAME: 'Math Utilities',
    DESCRIPTION: 'Advanced mathematical calculations',
    ICON: 'functions',
    ROUTE: 'MathUtils',
    COLOR_KEY: 'MATH_UTILS',
  },
} as const;

// Common UI Text
export const COMMON = {
  CALCULATE: 'Calculate',
  CLEAR: 'Clear',
  RESET: 'Reset',
  RESULT: 'Result',
  ERROR: 'Error',
  INVALID_INPUT: 'Invalid input',
  REQUIRED: 'This field is required',
  BACK: 'Back',
  HOME: 'Home',
} as const;

// Simple Calculator
export const SIMPLE_CALCULATOR = {
  TITLE: 'Simple Calculator',
  PLACEHOLDER: 'Enter number',
} as const;

// Scientific Calculator
export const SCIENTIFIC_CALCULATOR = {
  TITLE: 'Scientific Calculator',
  FUNCTIONS: {
    SIN: 'sin',
    COS: 'cos',
    TAN: 'tan',
    LOG: 'log',
    LN: 'ln',
    SQRT: '√',
    POWER: 'x^y',
    PI: 'π',
    E: 'e',
  },
} as const;

// BMI Calculator
export const BMI_CALCULATOR = {
  TITLE: 'BMI Calculator',
  WEIGHT_LABEL: 'Weight (kg)',
  HEIGHT_LABEL: 'Height',
  WEIGHT_PLACEHOLDER: 'Enter weight',
  HEIGHT_PLACEHOLDER: 'Enter height',
  HEIGHT_UNITS: {
    CM: 'cm',
    FEET_INCHES: 'ft/in'
  },
  FEET_LABEL: 'Feet',
  INCHES_LABEL: 'Inches',
  FEET_PLACEHOLDER: 'Enter feet',
  INCHES_PLACEHOLDER: 'Enter inches',
  CATEGORIES: {
    UNDERWEIGHT: 'Underweight',
    NORMAL: 'Normal weight',
    OVERWEIGHT: 'Overweight',
    OBESE: 'Obese',
  },
} as const;

// EMI Calculator
export const EMI_CALCULATOR = {
  TITLE: 'EMI Calculator',
  PRINCIPAL_LABEL: 'Principal Amount',
  RATE_LABEL: 'Interest Rate (%)',
  TENURE_LABEL: 'Loan Tenure (months)',
  PRINCIPAL_PLACEHOLDER: 'Enter principal amount',
  RATE_PLACEHOLDER: 'Enter interest rate',
  TENURE_PLACEHOLDER: 'Enter tenure in months',
  MONTHLY_EMI: 'Monthly EMI',
  TOTAL_AMOUNT: 'Total Amount',
  TOTAL_INTEREST: 'Total Interest',
} as const;

// Age Calculator
export const AGE_CALCULATOR = {
  TITLE: 'Age Calculator',
  BIRTH_DATE_LABEL: 'Birth Date',
  SELECT_DATE: 'Select Date',
  YEARS: 'Years',
  MONTHS: 'Months',
  DAYS: 'Days',
  TOTAL_DAYS: 'Total Days',
} as const;

// GST Calculator
export const GST_CALCULATOR = {
  TITLE: 'GST Calculator',
  AMOUNT_LABEL: 'Amount',
  GST_RATE_LABEL: 'GST Rate (%)',
  AMOUNT_PLACEHOLDER: 'Enter amount',
  GST_RATE_PLACEHOLDER: 'Enter GST rate',
  GST_AMOUNT: 'GST Amount',
  TOTAL_WITH_GST: 'Total with GST',
  ORIGINAL_AMOUNT: 'Original Amount',
} as const;

// Discount Calculator
export const DISCOUNT_CALCULATOR = {
  TITLE: 'Discount Calculator',
  ORIGINAL_PRICE_LABEL: 'Original Price',
  DISCOUNT_LABEL: 'Discount (%)',
  ORIGINAL_PRICE_PLACEHOLDER: 'Enter original price',
  DISCOUNT_PLACEHOLDER: 'Enter discount percentage',
  DISCOUNT_AMOUNT: 'Discount Amount',
  FINAL_PRICE: 'Final Price',
  ORIGINAL_PRICE_TEXT: 'Original Price',
  YOU_SAVED: 'You Saved',
} as const;

// Currency Converter
export const CURRENCY_CONVERTER = {
  TITLE: 'Currency Converter',
  AMOUNT_LABEL: 'Amount',
  FROM_LABEL: 'From',
  TO_LABEL: 'To',
  AMOUNT_PLACEHOLDER: 'Enter amount',
  CONVERT: 'Convert',
  EXCHANGE_RATE: 'Exchange Rate',
  LOADING_RATES: 'Loading exchange rates...',
  ERROR_FETCHING: 'Error fetching exchange rates',
} as const;

// Unit Converter
export const UNIT_CONVERTER = {
  TITLE: 'Unit Converter',
  FROM_LABEL: 'From',
  TO_LABEL: 'To',
  VALUE_PLACEHOLDER: 'Enter value',
  CONVERT: 'Convert',
  RESULT: 'Result',
  CATEGORIES: {
    LENGTH: 'Length',
    WEIGHT: 'Weight',
    TEMPERATURE: 'Temperature',
    VOLUME: 'Volume',
    AREA: 'Area',
    SPEED: 'Speed',
  },
  UNITS: {
    LENGTH: {
      METER: 'Meter',
      KILOMETER: 'Kilometer',
      CENTIMETER: 'Centimeter',
      MILLIMETER: 'Millimeter',
      MILE: 'Mile',
      YARD: 'Yard',
      FOOT: 'Foot',
      INCH: 'Inch',
    },
    WEIGHT: {
      KILOGRAM: 'Kilogram',
      GRAM: 'Gram',
      MILLIGRAM: 'Milligram',
      POUND: 'Pound',
      OUNCE: 'Ounce',
      TON: 'Ton',
    },
    TEMPERATURE: {
      CELSIUS: 'Celsius',
      FAHRENHEIT: 'Fahrenheit',
      KELVIN: 'Kelvin',
    },
    VOLUME: {
      LITER: 'Liter',
      MILLILITER: 'Milliliter',
      GALLON: 'Gallon',
      QUART: 'Quart',
      PINT: 'Pint',
      CUP: 'Cup',
      FLUID_OUNCE: 'Fluid Ounce',
    },
    AREA: {
      SQUARE_METER: 'Square Meter',
      SQUARE_KILOMETER: 'Square Kilometer',
      SQUARE_CENTIMETER: 'Square Centimeter',
      SQUARE_MILE: 'Square Mile',
      ACRE: 'Acre',
      HECTARE: 'Hectare',
    },
    SPEED: {
      METER_PER_SECOND: 'Meter/Second',
      KILOMETER_PER_HOUR: 'Kilometer/Hour',
      MILE_PER_HOUR: 'Mile/Hour',
      KNOT: 'Knot',
    },
  },
} as const;

// API Configuration
export const API = {
  CURRENCY_API_BASE_URL: 'https://api.exchangerate-api.com/v4/latest/',
  DEFAULT_CURRENCY: 'USD',
} as const;

// Error Messages
export const ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_NUMBER: 'Please enter a valid number.',
  INVALID_DATE: 'Please select a valid date.',
  FUTURE_DATE: 'Birth date cannot be in the future.',
  POSITIVE_NUMBER: 'Please enter a positive number.',
  ZERO_VALUE: 'Value cannot be zero.',
} as const;

// Validation Patterns
export const VALIDATION = {
  NUMBER: /^[0-9]*\.?[0-9]+$/,
  POSITIVE_NUMBER: /^[1-9][0-9]*\.?[0-9]*$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
