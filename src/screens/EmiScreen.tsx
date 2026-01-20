import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { scale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { EMI_CALCULATOR, COMMON } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmiScreen: React.FC = () => {
  const { colors } = useTheme();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly rate
    const n = parseFloat(tenure) * 12; // Convert years to months

    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmountValue = emiValue * n;
      const totalInterestValue = totalAmountValue - p;

      setEmi(Math.round(emiValue));
      setTotalAmount(Math.round(totalAmountValue));
      setTotalInterest(Math.round(totalInterestValue));
    }
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTenure('');
    setEmi(null);
    setTotalAmount(null);
    setTotalInterest(null);
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputSection}>
          <AppInput
            label={EMI_CALCULATOR.PRINCIPAL_LABEL}
            value={principal}
            onChangeText={setPrincipal}
            placeholder={EMI_CALCULATOR.PRINCIPAL_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="account-balance"
          />
          <AppInput
            label={EMI_CALCULATOR.RATE_LABEL}
            value={rate}
            onChangeText={setRate}
            placeholder={EMI_CALCULATOR.RATE_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="percent"
          />
          <AppInput
            label={EMI_CALCULATOR.TENURE_LABEL}
            value={tenure}
            onChangeText={setTenure}
            placeholder={EMI_CALCULATOR.TENURE_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="date-range"
          />
        </View>

        <View style={styles.buttonSection}>
          <AppButton
            title={COMMON.CALCULATE}
            onPress={calculateEMI}
            disabled={!principal || !rate || !tenure}
          />
          <AppButton
            title={COMMON.RESET}
            onPress={reset}
            variant="outline"
          />
        </View>

        {emi !== null && (
          <View style={[styles.resultSection, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}>
            <Text style={[styles.resultLabel, { color: colors.TEXT_SECONDARY }]}>{COMMON.RESULT}</Text>
            
            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={[styles.subLabel, { color: colors.TEXT_PRIMARY }]}>{EMI_CALCULATOR.MONTHLY_EMI}</Text>
                <Text style={[styles.resultValue, { color: colors.PRIMARY }]}>₹{emi.toLocaleString()}</Text>
              </View>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={[styles.subLabel, { color: colors.TEXT_PRIMARY }]}>{EMI_CALCULATOR.TOTAL_AMOUNT}</Text>
                <Text style={[styles.subValue, { color: colors.TEXT_PRIMARY }]}>₹{totalAmount?.toLocaleString()}</Text>
              </View>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={[styles.subLabel, { color: colors.TEXT_PRIMARY }]}>{EMI_CALCULATOR.TOTAL_INTEREST}</Text>
                <Text style={[styles.subValue, { color: colors.TEXT_PRIMARY }]}>₹{totalInterest?.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  content: {
    padding: COMPONENT_SPACING.SCREEN_PADDING,
  },
  inputSection: {
    marginBottom: SPACING.XXS,
  },
  buttonSection: {
    marginBottom: SPACING.SM,
  },
  resultSection: {
    padding: SPACING.SM,
    paddingBottom: SPACING.XS,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'stretch' as const,
    marginBottom: SPACING.XS,
    borderWidth: 1
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    marginBottom: SPACING.XS,
    textAlign: 'center' as const,
  },
  resultValue: {
    ...TEXT_STYLES.RESULT,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  resultRow: {
    width: '100%' as const,
    marginBottom: SPACING.XXS,
  },
  resultItem: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  row: {
    flexDirection: 'row' as const,
    width: '100%' as const,
    justifyContent: 'space-between' as const,
  },
  halfWidth: {
    width: '48%' as const,
    alignItems: 'center' as const,
  },
  subLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.XS,
  },
  subValue: {
    ...TEXT_STYLES.H6,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
};

export default EmiScreen;
