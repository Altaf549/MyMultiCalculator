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
import { GST_CALCULATOR, COMMON } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const GstScreen: React.FC = () => {
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [gstAmount, setGstAmount] = useState<number | null>(null);
  const [totalWithGst, setTotalWithGst] = useState<number | null>(null);
  const [originalAmount, setOriginalAmount] = useState<number | null>(null);

  const calculateGST = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (amt > 0 && rate > 0) {
      const gst = amt * (rate / 100);
      const total = amt + gst;

      setGstAmount(Math.round(gst * 100) / 100);
      setTotalWithGst(Math.round(total * 100) / 100);
      setOriginalAmount(amt);
    }
  };

  const reset = () => {
    setAmount('');
    setGstRate('');
    setGstAmount(null);
    setTotalWithGst(null);
    setOriginalAmount(null);
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputSection}>
          <AppInput
            label={GST_CALCULATOR.AMOUNT_LABEL}
            value={amount}
            onChangeText={setAmount}
            placeholder={GST_CALCULATOR.AMOUNT_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="currency-rupee"
          />
          <AppInput
            label={GST_CALCULATOR.GST_RATE_LABEL}
            value={gstRate}
            onChangeText={setGstRate}
            placeholder={GST_CALCULATOR.GST_RATE_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="percent"
          />
        </View>

        <View style={styles.buttonSection}>
          <AppButton
            title={COMMON.CALCULATE}
            onPress={calculateGST}
            disabled={!amount || !gstRate}
          />
          <AppButton
            title={COMMON.RESET}
            onPress={reset}
            variant="outline"
          />
        </View>

        {gstAmount !== null && (
          <View style={[styles.resultSection, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Text style={[styles.resultLabel, { color: colors.TEXT_SECONDARY }]}>{COMMON.RESULT}</Text>
            
            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={[styles.subLabel, { color: colors.TEXT_SECONDARY }]}>{GST_CALCULATOR.ORIGINAL_AMOUNT}</Text>
                <Text style={[styles.resultValue, { color: colors.TEXT_PRIMARY }]}>₹{originalAmount?.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={[styles.subLabel, { color: colors.TEXT_SECONDARY }]}>{GST_CALCULATOR.GST_AMOUNT}</Text>
                <Text style={[styles.gstValue, { color: colors.WARNING }]}>₹{gstAmount?.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={[styles.subLabel, { color: colors.TEXT_SECONDARY }]}>{GST_CALCULATOR.TOTAL_WITH_GST}</Text>
                <Text style={[styles.totalValue, { color: colors.SUCCESS }]}>₹{totalWithGst?.toFixed(2)}</Text>
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
    marginBottom: SPACING.LG,
  },
  buttonSection: {
    marginBottom: SPACING.LG,
  },
  resultSection: {
    padding: SPACING.LG,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'center' as const,
    shadowColor: '#000000',
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    marginBottom: SPACING.LG,
  },
  resultRow: {
    width: '100%' as const,
    marginBottom: SPACING.MD,
  },
  resultItem: {
    alignItems: 'center' as const,
  },
  subLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    marginBottom: SPACING.XS,
  },
  resultValue: {
    ...TEXT_STYLES.H5,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  gstValue: {
    ...TEXT_STYLES.H5,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  totalValue: {
    ...TEXT_STYLES.RESULT,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
};

export default GstScreen;
