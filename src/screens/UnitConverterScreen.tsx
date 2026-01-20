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
import { TEXT_STYLES } from '../styles/typography';
import { SPACING, COMPONENT_SPACING } from '../styles/spacing';
import { UNIT_CONVERTER } from '../utils/constants';
import Icon from '@react-native-vector-icons/material-icons';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { Dropdown } from 'react-native-element-dropdown';
import { CONVERSION_FACTORS } from '../mockData/ConversionFactors';
import CategorySelector from '../components/CategorySelector';

const UnitConverterScreen: React.FC = () => {
    const { colors } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof UNIT_CONVERTER.UNITS>('LENGTH');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    const categories = Object.keys(UNIT_CONVERTER.UNITS) as Array<keyof typeof UNIT_CONVERTER.UNITS>;
    const units = Object.keys(UNIT_CONVERTER.UNITS[selectedCategory]);

    // Prepare dropdown data
    const unitOptions = units.map(unit => ({
        label: UNIT_CONVERTER.UNITS[selectedCategory][unit as keyof typeof UNIT_CONVERTER.UNITS[typeof selectedCategory]],
        value: unit,
    }));

    // Conversion factors from mock data
    const conversionFactors = CONVERSION_FACTORS;

    const convert = () => {
        if (!inputValue || !fromUnit || !toUnit) {
            return;
        }

        const value = parseFloat(inputValue);
        if (isNaN(value)) {
            setResult('Invalid input');
            return;
        }

        // Special handling for temperature
        if (selectedCategory === 'TEMPERATURE') {
            let celsiusValue: number;

            // Convert from source to Celsius
            switch (fromUnit) {
                case 'CELSIUS':
                    celsiusValue = value;
                    break;
                case 'FAHRENHEIT':
                    celsiusValue = (value - 32) * 5 / 9;
                    break;
                case 'KELVIN':
                    celsiusValue = value - 273.15;
                    break;
                default:
                    celsiusValue = value;
            }

            // Convert from Celsius to target
            let resultValue: number;
            switch (toUnit) {
                case 'CELSIUS':
                    resultValue = celsiusValue;
                    break;
                case 'FAHRENHEIT':
                    resultValue = (celsiusValue * 9 / 5) + 32;
                    break;
                case 'KELVIN':
                    resultValue = celsiusValue + 273.15;
                    break;
                default:
                    resultValue = celsiusValue;
            }

            setResult(resultValue.toFixed(6));
        } else {
            // Regular unit conversion
            const factors = conversionFactors[selectedCategory] as Record<string, number>;
            const fromFactor = factors[fromUnit];
            const toFactor = factors[toUnit];

            if (fromFactor && toFactor) {
                const baseValue = value / fromFactor;
                const convertedValue = baseValue * toFactor;
                setResult(convertedValue.toFixed(6));
            }
        }
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setInputValue(result);
        setResult(inputValue);
    };

    const clearAll = () => {
        setInputValue('');
        setResult('');
    };

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
            {/* Category Selection */}
            <View style={styles.categorySection}>
                <CategorySelector
                    selectedCategory={selectedCategory}
                    onCategoryChange={(category: keyof typeof UNIT_CONVERTER.UNITS) => {
                        setSelectedCategory(category);
                        setFromUnit('');
                        setToUnit('');
                        setInputValue('');
                        setResult('');
                    }}
                />
            </View>
            
            {/* Scrollable Content */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Unit Selection */}
                <View style={styles.section}>
                    <View style={styles.unitRow}>
                        <View style={styles.unitContainer}>
                            <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
                                {UNIT_CONVERTER.FROM_LABEL}
                            </Text>
                            <Dropdown
                                data={unitOptions}
                                labelField="label"
                                valueField="value"
                                value={fromUnit}
                                onChange={item => setFromUnit(item.value)}
                                style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}
                                placeholderStyle={[styles.placeholderStyle, { color: colors.TEXT_SECONDARY }]}
                                selectedTextStyle={[styles.selectedTextStyle, { color: colors.TEXT_PRIMARY }]}
                                inputSearchStyle={[styles.inputSearchStyle, { color: colors.TEXT_PRIMARY }]}
                                iconStyle={styles.iconStyle}
                                search
                                maxHeight={300}
                                placeholder="Select unit"
                            />
                        </View>

                        <TouchableOpacity style={styles.swapButton} onPress={swapUnits}>
                            <Icon name="swap-vert" size={24} color={colors.PRIMARY} />
                        </TouchableOpacity>

                        <View style={styles.unitContainer}>
                            <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
                                {UNIT_CONVERTER.TO_LABEL}
                            </Text>
                            <Dropdown
                                data={unitOptions}
                                labelField="label"
                                valueField="value"
                                value={toUnit}
                                onChange={item => setToUnit(item.value)}
                                style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}
                                placeholderStyle={[styles.placeholderStyle, { color: colors.TEXT_SECONDARY }]}
                                selectedTextStyle={[styles.selectedTextStyle, { color: colors.TEXT_PRIMARY }]}
                                inputSearchStyle={[styles.inputSearchStyle, { color: colors.TEXT_PRIMARY }]}
                                iconStyle={styles.iconStyle}
                                search
                                maxHeight={300}
                                placeholder="Select unit"
                            />
                        </View>
                    </View>
                </View>

                {/* Input and Result */}
                <View style={styles.section}>
                    <Text style={[styles.label, { color: colors.TEXT_PRIMARY }]}>
                        {UNIT_CONVERTER.VALUE_PLACEHOLDER}
                    </Text>
                    <AppInput
                        value={inputValue}
                        onChangeText={setInputValue}
                        placeholder="Enter value to convert"
                        keyboardType="numeric"
                    />

                    <View style={styles.buttonSection}>
                        <AppButton
                            title={UNIT_CONVERTER.CONVERT}
                            onPress={convert}
                            disabled={!inputValue || !fromUnit || !toUnit}
                        />
                        <AppButton
                            title="Clear"
                            onPress={clearAll}
                            variant="outline"
                        />
                    </View>

                    {result && (
                        <View style={[styles.resultContainer, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}>
                            <Text style={[styles.resultLabel, { color: colors.TEXT_SECONDARY }]}>
                                {UNIT_CONVERTER.RESULT}
                            </Text>
                            <Text style={[styles.resultValue, { color: colors.TEXT_PRIMARY }]}>
                                {result}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categorySection: {
        paddingBottom: SPACING.SM,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: COMPONENT_SPACING.SCREEN_PADDING,
    },
    title: {
        ...TEXT_STYLES.H2,
        textAlign: 'center',
        marginVertical: SPACING.SM,
    },
    section: {
        marginBottom: SPACING.XXS,
        flex: 1,
    },
    unitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.SM,
    },
    unitContainer: {
        flex: 1,
    },
    label: {
        ...TEXT_STYLES.BODY,
        marginBottom: SPACING.XXS,
    },
    unitSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.XXS,
        borderRadius: 8,
        borderWidth: 1,
    },
    unitSelectorText: {
        ...TEXT_STYLES.BODY,
    },
    dropdown: {
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: SPACING.MD,
    },
    placeholderStyle: {
        ...TEXT_STYLES.BODY,
    },
    selectedTextStyle: {
        ...TEXT_STYLES.BODY,
    },
    inputSearchStyle: {
        ...TEXT_STYLES.BODY,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    swapButton: {
        padding: SPACING.SM,
        marginHorizontal: SPACING.SM,
    },
    buttonSection: {
        marginBottom: SPACING.MD,
        marginTop: SPACING.XS,
    },
    resultContainer: {
        padding: SPACING.SM,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    resultLabel: {
        ...TEXT_STYLES.CAPTION,
        marginBottom: SPACING.XXS,
    },
    resultValue: {
        ...TEXT_STYLES.RESULT,
    },
});

export default UnitConverterScreen;
