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
import { SCIENTIFIC_CALCULATOR, COMMON } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScientificCalculatorScreen: React.FC = () => {
  const { colors } = useTheme();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<string>('');
  const [resultHistory, setResultHistory] = useState<string>('');
  const [currentExpression, setCurrentExpression] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Update display based on expression or result
  useEffect(() => {
    if (showResult) {
      // Show the calculated result
      setDisplay(calculationHistory);
    } else {
      // Show the current expression being built
      setDisplay(currentExpression || '0');
    }
  }, [currentExpression, showResult, calculationHistory]);

  const handleNumber = (num: string) => {
    if (showResult) {
      // Start new expression after showing result
      setCurrentExpression(num);
      setShowResult(false);
    } else {
      const newExpression = currentExpression === '0' ? num : currentExpression + num;
      setCurrentExpression(newExpression);
    }
  };

  const handleOperation = (nextOperation: string) => {
    if (showResult) {
      // Start new expression with previous result
      setCurrentExpression(calculationHistory + ' ' + nextOperation + ' ');
      setShowResult(false);
    } else {
      const newExpression = currentExpression + ' ' + nextOperation + ' ';
      setCurrentExpression(newExpression);
    }
  };

  // Evaluate the complete expression
  const evaluateExpression = (expression: string): number => {
    try {
      // Replace mathematical symbols and functions with JavaScript equivalents
      let evalExpression = expression
        // Handle implicit multiplication (e.g., "8(9+6)" -> "8*(9+6)")
        .replace(/(\d)\(/g, '$1*(')
        .replace(/\)(\d)/g, ')*$1')
        .replace(/\)\(/g, ')*(')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/x\^y/g, '**')
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString())
        // Replace scientific functions with Math equivalents
        .replace(/sin\(/g, 'Math.sin(Math.PI/180 * ')
        .replace(/cos\(/g, 'Math.cos(Math.PI/180 * ')
        .replace(/tan\(/g, 'Math.tan(Math.PI/180 * ')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(');
      
      // Use Function constructor for safer evaluation
      const result = new Function('return ' + evalExpression)();
      return isNaN(result) ? 0 : result;
    } catch (error) {
      return 0;
    }
  };

  const handleScientificFunction = (func: string) => {
    if (showResult) {
      // Start new expression with function
      setCurrentExpression(func + '(');
      setShowResult(false);
    } else {
      const newExpression = currentExpression + func + '(';
      setCurrentExpression(newExpression);
    }
  };

  const handleEqual = () => {
    if (currentExpression.trim()) {
      const result = evaluateExpression(currentExpression);
      
      // Create result history string
      const history = `${currentExpression} = ${result}`;
      setResultHistory(history);
      setCalculationHistory(String(result));
      
      setShowResult(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setCalculationHistory('');
    setResultHistory('');
    setCurrentExpression('');
    setShowResult(false);
  };

  const handleDecimal = () => {
    if (showResult) {
      setCurrentExpression('0.');
      setShowResult(false);
    } else {
      // Add decimal point if last character is a number or we're at start
      const lastChar = currentExpression.slice(-1);
      if (currentExpression === '0' || /[0-9]/.test(lastChar)) {
        setCurrentExpression(currentExpression + '.');
      } else if (currentExpression === '' || /[-+×÷*\/(]/.test(lastChar)) {
        setCurrentExpression(currentExpression + '0.');
      }
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
          <Button title="(" onPress={() => handleNumber('(')} />
        </View>

        {/* Standard Calculator Operations */}
        <View style={styles.row}>
          <Button title=")" onPress={() => handleNumber(')')} size="small" />
          <Button title="+/-" onPress={() => {
            if (showResult) {
              setCurrentExpression('-' + calculationHistory);
              setShowResult(false);
            } else if (currentExpression && currentExpression !== '0') {
              if (currentExpression.startsWith('-')) {
                setCurrentExpression(currentExpression.slice(1));
              } else {
                setCurrentExpression('-' + currentExpression);
              }
            }
          }} />
          <Button title="%" onPress={() => {
            if (showResult) {
              const result = parseFloat(calculationHistory) / 100;
              setCurrentExpression(String(result));
              setShowResult(false);
            } else {
              // Add % operator
              setCurrentExpression(currentExpression + '%');
            }
          }} />
          <Button title="÷" onPress={() => handleOperation('÷')} color={colors.CALCULATOR_OPERATOR} textColor={colors.TEXT_WHITE} />
          <Button title="AC" onPress={handleClear} color={colors.CALCULATOR_CLEAR} textColor={colors.TEXT_WHITE} />
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
    flex: 2,
    justifyContent: 'flex-end',
    padding: COMPONENT_SPACING.CALCULATOR_DISPLAY_PADDING,
  },
  display: {
    ...TEXT_STYLES.CALCULATOR_DISPLAY,
    textAlign: 'right',
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
