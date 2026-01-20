import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { ThemeColors } from '../styles/colors';
import { TEXT_STYLES } from '../styles/typography';
import { SPACING, COMPONENT_SPACING } from '../styles/spacing';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Dropdown } from 'react-native-element-dropdown';
import { scale } from '../utils/scaling';

const OPERATIONS = {
    SQUARE_ROOT: 'Square Root',
    POWER: 'Power',
    FACTORIAL: 'Factorial',
    PRIME_CHECK: 'Prime Check',
    LCM: 'LCM',
    GCD: 'GCD',
    BINARY_OPS: 'Binary Operations',
    BASE_CONVERTER: 'Base Converter'
} as const;

type MathOperation = keyof typeof OPERATIONS;

const MathUtilsScreen: React.FC = () => {
    const { colors } = useTheme() as { colors: ThemeColors };
    const [selectedOperation, setSelectedOperation] = useState<MathOperation>('SQUARE_ROOT');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [result, setResult] = useState('');
    const [binaryOp, setBinaryOp] = useState('AND');
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(2);

    const operationOptions = Object.entries(OPERATIONS).map(([key, value]) => ({
        label: value,
        value: key,
    }));

    const binaryOps = [
        { label: 'AND', value: 'AND' },
        { label: 'OR', value: 'OR' },
        { label: 'XOR', value: 'XOR' },
        { label: 'NOT', value: 'NOT' },
    ];

    const baseOptions = [
        { label: 'Binary (2)', value: 2 },
        { label: 'Octal (8)', value: 8 },
        { label: 'Decimal (10)', value: 10 },
        { label: 'Hexadecimal (16)', value: 16 },
    ];

    const calculate = () => {
        if (!input1) {
            setResult('Enter a number');
            return;
        }

        const num1 = parseFloat(input1);
        const num2 = input2 ? parseFloat(input2) : 0;

        if (isNaN(num1) || (input2 && isNaN(num2))) {
            setResult('Invalid input');
            return;
        }

        try {
            let calculatedResult: string | number = '';

            switch (selectedOperation) {
                case 'SQUARE_ROOT':
                    if (num1 < 0) throw new Error('Cannot calculate square root of negative number');
                    calculatedResult = Math.sqrt(num1).toString();
                    break;

                case 'POWER':
                    calculatedResult = Math.pow(num1, num2 || 2).toString();
                    break;

                case 'FACTORIAL':
                    if (num1 < 0) throw new Error('Factorial is not defined for negative numbers');
                    if (!Number.isInteger(num1)) throw new Error('Factorial is only defined for integers');
                    calculatedResult = factorial(num1).toString();
                    break;

                case 'PRIME_CHECK':
                    calculatedResult = isPrime(num1) ? 'Prime' : 'Not Prime';
                    break;

                case 'LCM':
                    if (!input2) throw new Error('Second number is required for LCM');
                    calculatedResult = lcm(num1, num2).toString();
                    break;

                case 'GCD':
                    if (!input2) throw new Error('Second number is required for GCD');
                    calculatedResult = gcd(num1, num2).toString();
                    break;

                case 'BINARY_OPS':
                    if (!input2 && binaryOp !== 'NOT') throw new Error('Second number is required for this operation');
                    calculatedResult = binaryOperation(num1, input2 ? num2 : 0, binaryOp);
                    break;

                case 'BASE_CONVERTER':
                    calculatedResult = convertBase(input1, fromBase, toBase);
                    break;
            }

            setResult(calculatedResult.toString());
        } catch (error) {
            setResult(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    // Helper functions
    const factorial = (n: number): number => {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    };

    const isPrime = (num: number): boolean => {
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;

        const sqrtNum = Math.sqrt(num);
        for (let i = 3; i <= sqrtNum; i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    };

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const lcm = (a: number, b: number): number => {
        return (a * b) / gcd(a, b);
    };

    const binaryOperation = (a: number, b: number, op: string): string => {
        const aInt = Math.floor(a);
        const bInt = Math.floor(b);

        switch (op) {
            case 'AND': return (aInt & bInt).toString();
            case 'OR': return (aInt | bInt).toString();
            case 'XOR': return (aInt ^ bInt).toString();
            case 'NOT': return (~aInt >>> 0).toString(2);
            default: throw new Error('Invalid operation');
        }
    };

    const convertBase = (numStr: string, fromBase: number, toBase: number): string => {
        // First convert from original base to decimal
        const decimal = parseInt(numStr, fromBase);
        if (isNaN(decimal)) throw new Error('Invalid number for the selected base');

        // Then convert from decimal to target base
        return decimal.toString(toBase).toUpperCase();
    };

    const reset = () => {
        setInput1('');
        setInput2('');
        setResult('');
    };

    const renderInputs = () => {
        switch (selectedOperation) {
            case 'SQUARE_ROOT':
            case 'FACTORIAL':
            case 'PRIME_CHECK':
                return (
                    <AppInput
                        label="Enter Number"
                        value={input1}
                        onChangeText={setInput1}
                        keyboardType="numeric"
                        placeholder="Enter a number"
                    />
                );

            case 'POWER':
            case 'LCM':
            case 'GCD':
                return (
                    <>
                        <AppInput
                            label="First Number"
                            value={input1}
                            onChangeText={setInput1}
                            keyboardType="numeric"
                            placeholder="Enter first number"
                        />
                        <AppInput
                            label={selectedOperation === 'POWER' ? 'Exponent' : 'Second Number'}
                            value={input2}
                            onChangeText={setInput2}
                            keyboardType="numeric"
                            placeholder={selectedOperation === 'POWER' ? 'Enter exponent' : 'Enter second number'}
                        />
                    </>
                );

            case 'BINARY_OPS':
                return (
                    <>
                        <AppInput
                            label="First Number"
                            value={input1}
                            onChangeText={setInput1}
                            keyboardType="numeric"
                            placeholder="Enter first number"
                        />
                        <View style={styles.dropdownContainer}>
                            <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
                                Operation
                            </Text>
                            <Dropdown
                                style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}
                                data={binaryOps}
                                labelField="label"
                                valueField="value"
                                value={binaryOp}
                                onChange={item => setBinaryOp(item.value)}
                                placeholder="Select operation"
                                itemTextStyle={{ color: colors.TEXT_PRIMARY }}
                                selectedTextStyle={{ color: colors.TEXT_PRIMARY }}
                                placeholderStyle={{ color: colors.TEXT_SECONDARY }}
                            />
                        </View>
                        {binaryOp !== 'NOT' && (
                            <AppInput
                                label="Second Number"
                                value={input2}
                                onChangeText={setInput2}
                                keyboardType="numeric"
                                placeholder="Enter second number"
                            />
                        )}
                    </>
                );

            case 'BASE_CONVERTER':
                return (
                    <>
                        <AppInput
                            label="Number to Convert"
                            value={input1}
                            onChangeText={setInput1}
                            placeholder="Enter number"
                        />
                        <View style={[styles.dropdownContainer, { marginTop: SPACING.XXS }]}>
                            <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
                                From Base
                            </Text>
                            <Dropdown
                                style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER, marginTop: SPACING.XXS }]}
                                data={baseOptions}
                                labelField="label"
                                valueField="value"
                                value={fromBase}
                                onChange={item => setFromBase(item.value)}
                                placeholder="Select base"
                                itemTextStyle={{ color: colors.TEXT_PRIMARY }}
                                selectedTextStyle={{ color: colors.TEXT_PRIMARY }}
                                placeholderStyle={{ color: colors.TEXT_SECONDARY }}
                            />
                        </View>
                        <View style={[styles.dropdownContainer, { marginTop: SPACING.MD }]}>
                            <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
                                To Base
                            </Text>
                            <Dropdown
                                style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER, marginTop: SPACING.XXS }]}
                                data={baseOptions}
                                labelField="label"
                                valueField="value"
                                value={toBase}
                                onChange={item => setToBase(item.value)}
                                placeholder="Select base"
                                itemTextStyle={{ color: colors.TEXT_PRIMARY }}
                                selectedTextStyle={{ color: colors.TEXT_PRIMARY }}
                                placeholderStyle={{ color: colors.TEXT_SECONDARY }}
                            />
                        </View>
                    </>
                );
        }
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
            <ScrollView
                style={[styles.scrollView, { backgroundColor: colors.BACKGROUND }]}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <View style={styles.dropdownContainer}>
                        <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
                            Select Operation
                        </Text>
                        <Dropdown
                            style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}
                            data={operationOptions}
                            labelField="label"
                            valueField="value"
                            value={selectedOperation}
                            onChange={item => {
                                setSelectedOperation(item.value);
                                reset();
                            }}
                            placeholder="Select operation"
                            itemTextStyle={{ color: colors.TEXT_PRIMARY }}
                            selectedTextStyle={{ color: colors.TEXT_PRIMARY }}
                            placeholderStyle={{ color: colors.TEXT_SECONDARY }}
                        />
                    </View>

                    <View style={styles.inputsContainer}>
                        {renderInputs()}
                    </View>

                    <View style={styles.buttonSection}>
                        <AppButton
                            title="Calculate"
                            onPress={calculate}
                            style={styles.calculateButton}
                        />
                        <AppButton
                            title="Reset"
                            onPress={reset}
                            variant="outline"
                        />
                    </View>

                    <View style={[styles.resultContainer, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}>
                        <Text style={[styles.resultLabel, { color: colors.TEXT_PRIMARY }]}>
                            Result:
                        </Text>
                        <Text style={[styles.result, { color: colors.PRIMARY }]}>
                            {result || '-'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: COMPONENT_SPACING.SCREEN_PADDING,
    },
    scrollContent: {
        paddingVertical: SPACING.LG,
        paddingBottom: SPACING.XXL,
    },
    section: {
        marginBottom: SPACING.XXS,
        flex: 1,
    },
    dropdownContainer: {
        marginBottom: 0,
    },
    label: {
        ...TEXT_STYLES.LABEL,
        marginBottom: SPACING.XXS,
    },
    dropdown: {
        height: scale(50),
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: SPACING.XS,
    },
    inputsContainer: {
        marginBottom: SPACING.XXS,
    },
    resultContainer: {
        padding: SPACING.LG,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    resultLabel: {
        ...TEXT_STYLES.LABEL,
        marginBottom: SPACING.XS,
    },
    result: {
        ...TEXT_STYLES.H3,
    },
    buttonSection: {
        marginTop: SPACING.XXS,
        gap: SPACING.XS,
        marginBottom: SPACING.LG,
    },
    calculateButton: {
        marginBottom: 0,
    },
});

export default MathUtilsScreen;
