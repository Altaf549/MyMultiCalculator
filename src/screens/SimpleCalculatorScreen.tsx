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
import { SIMPLE_CALCULATOR, COMMON } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const SimpleCalculatorScreen: React.FC = () => {
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

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue;
      const newValue = calculate(currentValue, inputValue, operation);

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

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const Button = ({ title, onPress, color = COLORS.CALCULATOR_BUTTON, textColor = COLORS.TEXT_PRIMARY }: any) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button title="AC" onPress={handleClear} color={COLORS.CALCULATOR_CLEAR} textColor={COLORS.TEXT_WHITE} />
          <Button title="+/-" onPress={handlePlusMinus} color={COLORS.CALCULATOR_BUTTON} />
          <Button title="%" onPress={handlePercentage} color={COLORS.CALCULATOR_BUTTON} />
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
