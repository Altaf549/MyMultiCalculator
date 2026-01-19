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
import { DISCOUNT_CALCULATOR, COMMON } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const DiscountScreen: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [savedAmount, setSavedAmount] = useState<number | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discountPercent = parseFloat(discount);

    if (price > 0 && discountPercent >= 0 && discountPercent <= 100) {
      const discountAmt = price * (discountPercent / 100);
      const final = price - discountAmt;

      setDiscountAmount(Math.round(discountAmt * 100) / 100);
      setFinalPrice(Math.round(final * 100) / 100);
      setSavedAmount(Math.round(discountAmt * 100) / 100);
    }
  };

  const reset = () => {
    setOriginalPrice('');
    setDiscount('');
    setDiscountAmount(null);
    setFinalPrice(null);
    setSavedAmount(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputSection}>
          <AppInput
            label={DISCOUNT_CALCULATOR.ORIGINAL_PRICE_LABEL}
            value={originalPrice}
            onChangeText={setOriginalPrice}
            placeholder={DISCOUNT_CALCULATOR.ORIGINAL_PRICE_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="currency-rupee"
          />
          <AppInput
            label={DISCOUNT_CALCULATOR.DISCOUNT_LABEL}
            value={discount}
            onChangeText={setDiscount}
            placeholder={DISCOUNT_CALCULATOR.DISCOUNT_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="percent"
          />
        </View>

        <View style={styles.buttonSection}>
          <AppButton
            title={COMMON.CALCULATE}
            onPress={calculateDiscount}
            disabled={!originalPrice || !discount}
          />
          <AppButton
            title={COMMON.RESET}
            onPress={reset}
            variant="outline"
          />
        </View>

        {discountAmount !== null && (
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>{COMMON.RESULT}</Text>
            
            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={styles.subLabel}>{DISCOUNT_CALCULATOR.ORIGINAL_PRICE_TEXT}</Text>
                <Text style={styles.originalPrice}>₹{parseFloat(originalPrice).toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={styles.subLabel}>{DISCOUNT_CALCULATOR.DISCOUNT_AMOUNT}</Text>
                <Text style={styles.discountValue}>-₹{discountAmount?.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={styles.subLabel}>{DISCOUNT_CALCULATOR.FINAL_PRICE}</Text>
                <Text style={styles.finalPrice}>₹{finalPrice?.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.savingsSection}>
              <Text style={styles.savingsLabel}>{DISCOUNT_CALCULATOR.YOU_SAVED}</Text>
              <Text style={styles.savingsValue}>₹{savedAmount?.toFixed(2)}</Text>
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
    shadowColor: COLORS.SHADOW,
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
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
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  originalPrice: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    textDecorationLine: 'line-through' as const,
  },
  discountValue: {
    ...TEXT_STYLES.H5,
    color: COLORS.ERROR,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  finalPrice: {
    ...TEXT_STYLES.RESULT,
    color: COLORS.SUCCESS,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  savingsSection: {
    marginTop: SPACING.MD,
    padding: SPACING.MD,
    backgroundColor: COLORS.SUCCESS_LIGHT,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    width: '100%' as const,
    alignItems: 'center' as const,
  },
  savingsLabel: {
    ...TEXT_STYLES.BODY,
    color: COLORS.SUCCESS_DARK,
    marginBottom: SPACING.XS,
  },
  savingsValue: {
    ...TEXT_STYLES.H4,
    color: COLORS.SUCCESS_DARK,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
};

export default DiscountScreen;
