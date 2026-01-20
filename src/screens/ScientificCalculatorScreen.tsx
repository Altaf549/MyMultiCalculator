import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { SCIENTIFIC_CALCULATOR, COMMON } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScientificCalculatorScreen: React.FC = () => {
  const { colors } = useTheme();
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

  const Button = ({ title, onPress, color, textColor, size = 'normal' }: any) => (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color || colors.CALCULATOR_BUTTON },
        size === 'small' && styles.smallButton
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: textColor || colors.TEXT_PRIMARY }, size === 'small' && styles.smallButtonText]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <View style={[styles.displayContainer, { backgroundColor: colors.BACKGROUND_DARK }]}>
        <Text style={[styles.display, { color: colors.TEXT_PRIMARY }]}>{display}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        {/* Scientific Functions Row */}
        <View style={styles.row}>
          <Button title="sin" onPress={() => handleScientificFunction('sin')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="cos" onPress={() => handleScientificFunction('cos')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="tan" onPress={() => handleScientificFunction('tan')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="log" onPress={() => handleScientificFunction('log')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="ln" onPress={() => handleScientificFunction('ln')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
        </View>
        
        {/* More Scientific Functions */}
        <View style={styles.row}>
          <Button title="√" onPress={() => handleScientificFunction('sqrt')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="x^y" onPress={() => handleScientificFunction('x^y')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="π" onPress={() => handleScientificFunction('π')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="e" onPress={() => handleScientificFunction('e')} color={colors.SECONDARY} textColor={colors.TEXT_WHITE} size="small" />
          <Button title="(" onPress={() => handleNumber('(')} size="small" />
        </View>

        {/* Standard Calculator Operations */}
        <View style={styles.row}>
          <Button title="AC" onPress={handleClear} color={colors.CALCULATOR_CLEAR} textColor={colors.TEXT_WHITE} />
          <Button title="+/-" onPress={() => setDisplay(String(parseFloat(display) * -1))} />
          <Button title="%" onPress={() => setDisplay(String(parseFloat(display) / 100))} />
          <Button title="÷" onPress={() => handleOperation('÷')} color={colors.CALCULATOR_OPERATOR} textColor={colors.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="7" onPress={() => handleNumber('7')} />
          <Button title="8" onPress={() => handleNumber('8')} />
          <Button title="9" onPress={() => handleNumber('9')} />
          <Button title="×" onPress={() => handleOperation('×')} color={colors.CALCULATOR_OPERATOR} textColor={colors.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="4" onPress={() => handleNumber('4')} />
          <Button title="5" onPress={() => handleNumber('5')} />
          <Button title="6" onPress={() => handleNumber('6')} />
          <Button title="-" onPress={() => handleOperation('-')} color={colors.CALCULATOR_OPERATOR} textColor={colors.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="1" onPress={() => handleNumber('1')} />
          <Button title="2" onPress={() => handleNumber('2')} />
          <Button title="3" onPress={() => handleNumber('3')} />
          <Button title="+" onPress={() => handleOperation('+')} color={colors.CALCULATOR_OPERATOR} textColor={colors.TEXT_WHITE} />
        </View>
        <View style={styles.row}>
          <Button title="0" onPress={() => handleNumber('0')} style={styles.zeroButton} />
          <Button title="." onPress={handleDecimal} />
          <Button title="=" onPress={handleEqual} color={colors.CALCULATOR_EQUALS} textColor={colors.TEXT_WHITE} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: COMPONENT_SPACING.CALCULATOR_DISPLAY_PADDING,
  },
  display: {
    ...TEXT_STYLES.CALCULATOR_DISPLAY,
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
