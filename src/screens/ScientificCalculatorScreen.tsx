import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { COLORS } from '../styles/colors';
import { TEXT_STYLES } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { SCIENTIFIC_CALCULATOR, COMMON } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScientificCalculatorScreen: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleScientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'x^y':
        setOperation('x^y');
        setPreviousValue(value);
        setWaitingForNewValue(true);
        return;
      case 'π':
        setDisplay(String(Math.PI));
        return;
      case 'e':
        setDisplay(String(Math.E));
        return;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue;
      let newValue = 0;

      if (operation === 'x^y') {
        newValue = Math.pow(currentValue, inputValue);
      } else {
        newValue = calculate(currentValue, inputValue, operation);
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ title, onPress, color = COLORS.CALCULATOR_BUTTON, textColor = COLORS.TEXT_PRIMARY, size = 'normal' }: any) => (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color },
        size === 'small' && styles.smallButton
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: textColor }, size === 'small' && styles.smallButtonText]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        {/* Scientific Functions Row */}
        <View style={styles.row}>
          <Button title="sin" onPress={() => handleScientificFunction('sin')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="cos" onPress={() => handleScientificFunction('cos')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="tan" onPress={() => handleScientificFunction('tan')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="log" onPress={() => handleScientificFunction('log')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="ln" onPress={() => handleScientificFunction('ln')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
        </View>
        
        {/* More Scientific Functions */}
        <View style={styles.row}>
          <Button title="√" onPress={() => handleScientificFunction('sqrt')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="x^y" onPress={() => handleScientificFunction('x^y')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="π" onPress={() => handleScientificFunction('π')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="e" onPress={() => handleScientificFunction('e')} color={COLORS.SECONDARY} textColor={COLORS.TEXT_WHITE} size="small" />
          <Button title="(" onPress={() => handleNumber('(')} color={COLORS.CALCULATOR_BUTTON} size="small" />
        </View>

        {/* Standard Calculator Operations */}
        <View style={styles.row}>
          <Button title="AC" onPress={handleClear} color={COLORS.CALCULATOR_CLEAR} textColor={COLORS.TEXT_WHITE} />
          <Button title="+/-" onPress={() => setDisplay(String(parseFloat(display) * -1))} />
          <Button title="%" onPress={() => setDisplay(String(parseFloat(display) / 100))} />
          <Button title="÷" onPress={() => handleOperation('÷')} color={COLORS.CALCULATOR_OPERATOR} textColor={COLORS.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="7" onPress={() => handleNumber('7')} />
          <Button title="8" onPress={() => handleNumber('8')} />
          <Button title="9" onPress={() => handleNumber('9')} />
          <Button title="×" onPress={() => handleOperation('×')} color={COLORS.CALCULATOR_OPERATOR} textColor={COLORS.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="4" onPress={() => handleNumber('4')} />
          <Button title="5" onPress={() => handleNumber('5')} />
          <Button title="6" onPress={() => handleNumber('6')} />
          <Button title="-" onPress={() => handleOperation('-')} color={COLORS.CALCULATOR_OPERATOR} textColor={COLORS.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="1" onPress={() => handleNumber('1')} />
          <Button title="2" onPress={() => handleNumber('2')} />
          <Button title="3" onPress={() => handleNumber('3')} />
          <Button title="+" onPress={() => handleOperation('+')} color={COLORS.CALCULATOR_OPERATOR} textColor={COLORS.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="0" onPress={() => handleNumber('0')} style={styles.zeroButton} />
          <Button title="." onPress={handleDecimal} />
          <Button title="=" onPress={handleEqual} color={COLORS.CALCULATOR_EQUALS} textColor={COLORS.TEXT_WHITE} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: COMPONENT_SPACING.CALCULATOR_DISPLAY_PADDING,
    backgroundColor: COLORS.BACKGROUND_DARK,
  },
  display: {
    ...TEXT_STYLES.CALCULATOR_DISPLAY,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'right',
  },
  buttonsContainer: {
    padding: SPACING.SM,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: COMPONENT_SPACING.CALCULATOR_BUTTON_SPACING,
  },
  button: {
    width: COMPONENT_SPACING.CALCULATOR_BUTTON_SIZE,
    height: COMPONENT_SPACING.CALCULATOR_BUTTON_SIZE,
    borderRadius: COMPONENT_SPACING.CALCULATOR_BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
  },
  buttonText: {
    ...TEXT_STYLES.CALCULATOR_BUTTON,
    fontWeight: '600',
  },
  smallButtonText: {
    fontSize: scale(14),
  },
  zeroButton: {
    flex: 1,
    maxWidth: COMPONENT_SPACING.CALCULATOR_BUTTON_SIZE * 2 + COMPONENT_SPACING.CALCULATOR_BUTTON_SPACING,
  },
});

export default ScientificCalculatorScreen;
