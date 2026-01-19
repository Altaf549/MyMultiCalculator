import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { scale } from '../utils/scaling';
import { COLORS } from '../styles/colors';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { EMI_CALCULATOR, COMMON } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmiScreen: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly rate
    const n = parseFloat(tenure); // Months

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
    <SafeAreaView style={styles.container}>
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
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>{EMI_CALCULATOR.MONTHLY_EMI}</Text>
            <Text style={styles.resultValue}>₹{emi.toLocaleString()}</Text>
            
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.subLabel}>{EMI_CALCULATOR.TOTAL_AMOUNT}</Text>
                <Text style={styles.subValue}>₹{totalAmount?.toLocaleString()}</Text>
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.subLabel}>{EMI_CALCULATOR.TOTAL_INTEREST}</Text>
                <Text style={styles.subValue}>₹{totalInterest?.toLocaleString()}</Text>
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
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    padding: COMPONENT_SPACING.SCREEN_PADDING,
  },
  inputSection: {
    marginBottom: SPACING.LG,
  },
  buttonSection: {
    marginBottom: SPACING.LG,
  },
  resultSection: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    padding: SPACING.LG,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'center' as const,
    marginBottom: SPACING.LG,
    shadowColor: COLORS.SHADOW,
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  resultValue: {
    ...TEXT_STYLES.RESULT,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.LG,
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
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  subValue: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
};

export default EmiScreen;
