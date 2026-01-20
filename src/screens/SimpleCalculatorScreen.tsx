import React, { useState, useEffect } from 'react';
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
import { SIMPLE_CALCULATOR, COMMON } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const SimpleCalculatorScreen: React.FC = () => {
  const { colors } = useTheme();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<string>('');
  const [resultHistory, setResultHistory] = useState<string>('');

  // Update calculation history in real-time based on current state
  useEffect(() => {
    if (previousValue !== null && operation && !waitingForNewValue) {
      const history = `${previousValue} ${operation} ${display}`;
      setCalculationHistory(history);
    } else if (previousValue !== null && operation && waitingForNewValue) {
      const history = `${previousValue} ${operation}`;
      setCalculationHistory(history);
    } else {
      setCalculationHistory('');
    }
  }, [previousValue, operation, display, waitingForNewValue]);

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

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue;
      const newValue = calculate(currentValue, inputValue, operation);
      
      // Create result history string with result
      const result = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setResultHistory(result);

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
    setCalculationHistory('');
    setResultHistory('');
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const Button = ({ title, onPress, color, textColor }: any) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color || colors.CALCULATOR_BUTTON }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: textColor || colors.TEXT_PRIMARY }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <View style={[styles.displayContainer, { backgroundColor: colors.BACKGROUND_DARK }]}>
        {resultHistory ? (
          <Text style={[styles.resultHistory, { color: colors.TEXT_SECONDARY }]}>
            {resultHistory}
          </Text>
        ) : null}
        {calculationHistory ? (
          <Text style={[styles.calculationHistory, { color: colors.TEXT_SECONDARY }]}>
            {calculationHistory}
          </Text>
        ) : null}
        <Text style={[styles.display, { color: colors.TEXT_PRIMARY }]}>{display}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button title="AC" onPress={handleClear} color={colors.CALCULATOR_CLEAR} textColor={colors.TEXT_WHITE} />
          <Button title="+/-" onPress={handlePlusMinus} />
          <Button title="%" onPress={handlePercentage} />
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
    flex: 1.2,
    justifyContent: 'flex-end',
    padding: COMPONENT_SPACING.CALCULATOR_DISPLAY_PADDING,
  },
  resultHistory: {
    ...TEXT_STYLES.CALCULATOR_HISTORY,
    textAlign: 'right',
    marginBottom: SPACING.XS,
    opacity: 0.7,
  },
  calculationHistory: {
    ...TEXT_STYLES.CALCULATOR_HISTORY,
    textAlign: 'right',
    marginBottom: SPACING.XS,
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
  buttonText: {
    ...TEXT_STYLES.CALCULATOR_BUTTON,
    fontWeight: '600',
  },
  zeroButton: {
    flex: 1,
    maxWidth: COMPONENT_SPACING.CALCULATOR_BUTTON_SIZE * 2 + COMPONENT_SPACING.CALCULATOR_BUTTON_SPACING,
  },
});

export default SimpleCalculatorScreen;
