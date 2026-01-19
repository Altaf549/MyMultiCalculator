🧮 All-in-One Calculator App (React Native) use type scrtipt₹

A scalable React Native calculator app that provides multiple types of calculators (BMI, EMI, Age, Currency, GST, Discount, etc.) in one application.
The home screen displays all calculator types as cards, and each calculator opens in a separate screen using reusable components. use scalling.ts for scaling and Console.ts for console logging and any static text use string constants

✨ Features

📱 Home screen with calculator cards

♻️ Reusable Card & Input components

🧩 Clean folder structure

🧭 React Navigation (Stack)

⚡ Fast & lightweight

🎨 Easy UI customization

🧪 Interview-ready architecture

📸 App Flow
Home Screen
 ├── Simple Calculator
 ├── Scientific Calculator
 ├── BMI Calculator
 ├── EMI Calculator
 ├── Age Calculator
 ├── GST Calculator
 ├── Discount Calculator
 └── Currency Converter (use any free api)


Each card → opens its own calculator screen

🛠 Tech Stack

React Native

JavaScript

React Navigation

Functional Components

Reusable UI Components

📂 Folder Structure
src/
│
├── components/
│   ├── CalculatorCard.js
│   ├── AppButton.js
│   └── AppInput.js
│
├── screens/
│   ├── HomeScreen.js
│   ├── SimpleCalculatorScreen.js
│   ├── ScientificCalculatorScreen.js
│   ├── BmiScreen.js
│   ├── EmiScreen.js
│   ├── AgeScreen.js
│   ├── GstScreen.js
│   ├── DiscountScreen.js
│   └── CurrencyConverterScreen.js
│
├── navigation/
│   └── AppNavigator.js
│
├── utils/
│   ├── scaling.ts
│   ├── Console.ts
│   ├── constants.js
│   └── calculatorList.js
│
├── styles/
│   ├── colors.js
│   ├── typography.js
│   └── spacing.js
│
├── config/
│   └── apiConfig.js
│
└── App.js

📋 Component Details

🔧 Core Utilities
- **scaling.ts**: Handles responsive scaling for different screen sizes
- **Console.ts**: Centralized logging utility with debug levels
- **constants.js**: All static text strings and app constants

🎨 Style System
- **colors.js**: App color palette and theme definitions
- **typography.js**: Font sizes, families, and text styles
- **spacing.js**: Consistent spacing and margin values

⚙️ Configuration
- **apiConfig.js**: API endpoints and configuration for currency converter

🧩 Reusable Components
- **CalculatorCard**: Standardized card for calculator selection
- **AppButton**: Consistent button styling across app
- **AppInput**: Standardized input field with validation

🚀 Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. For iOS: `npx pod-install ios`
4. Start development server: `npx react-native start`
5. Run on simulator/device: `npx react-native run-ios` or `npx react-native run-android`

📱 Development Guidelines

- Use functional components with hooks
- Follow the existing folder structure
- Implement proper error handling
- Use scaling.ts for responsive design
- Log with Console.ts for debugging
- Store static text in constants.js
- Test on both iOS and Android platforms

🎯 Key Features Implementation

- **Simple Calculator**: Basic arithmetic operations
- **Scientific Calculator**: Advanced mathematical functions
- **BMI Calculator**: Body Mass Index with health indicators
- **EMI Calculator**: Loan installment calculations
- **Age Calculator**: Calculate age from birth date
- **GST Calculator**: Goods and Services Tax calculations
- **Discount Calculator**: Percentage and amount discounts
- **Currency Converter**: Real-time exchange rates using free API

🔗 Dependencies

- React Navigation: Screen navigation
- React Native Vector Icons: Icon library
- Axios: API calls for currency converter
- React Native Paper: UI components (optional)
