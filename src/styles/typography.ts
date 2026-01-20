// Typography System - Font Sizes, Families, and Text Styles

import { Platform } from 'react-native';

// Font Families
export const FONT_FAMILY = {
  PRIMARY: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto',
    default: 'System',
  }),
  MONOSPACED: Platform.select({
    ios: 'Menlo',
    android: 'Courier New',
    default: 'monospace',
  }),
  BOLD: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto',
    default: 'System',
  }),
} as const;

// Font Sizes
export const FONT_SIZES = {
  XXXS: 8,   // 8px
  XXS: 10,   // 10px
  XS: 12,    // 12px
  SM: 14,    // 14px
  BASE: 16,  // 16px
  LG: 18,    // 18px
  XL: 20,    // 20px
  XXL: 24,   // 24px
  XXXL: 32,  // 32px
  HUGE: 40,  // 40px
  MASSIVE: 48, // 48px
} as const;

// Font Weights
export const FONT_WEIGHTS = {
  THIN: '100',
  LIGHT: '300',
  NORMAL: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
  EXTRABOLD: '800',
  BLACK: '900',
} as const;

// Line Heights
export const LINE_HEIGHTS = {
  TIGHT: 1.2,
  NORMAL: 1.4,
  RELAXED: 1.6,
  LOOSE: 1.8,
} as const;

// Letter Spacing
export const LETTER_SPACING = {
  TIGHT: -0.5,
  NORMAL: 0,
  WIDE: 0.5,
  WIDER: 1,
  WIDEST: 2,
} as const;

// Text Styles
export const TEXT_STYLES = {
  // Heading Styles
  H1: {
    fontSize: FONT_SIZES.MASSIVE,
    fontWeight: FONT_WEIGHTS.BOLD,
    lineHeight: FONT_SIZES.MASSIVE * LINE_HEIGHTS.TIGHT,
    fontFamily: FONT_FAMILY.BOLD,
  },
  H2: {
    fontSize: FONT_SIZES.HUGE,
    fontWeight: FONT_WEIGHTS.BOLD,
    lineHeight: FONT_SIZES.HUGE * LINE_HEIGHTS.TIGHT,
    fontFamily: FONT_FAMILY.BOLD,
  },
  H3: {
    fontSize: FONT_SIZES.XXXL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: FONT_SIZES.XXXL * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.BOLD,
  },
  H4: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: FONT_SIZES.XXL * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.BOLD,
  },
  H5: {
    fontSize: FONT_SIZES.XL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: FONT_SIZES.XL * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  H6: {
    fontSize: FONT_SIZES.LG,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  
  // Body Text Styles
  BODY_LARGE: {
    fontSize: FONT_SIZES.LG,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.RELAXED,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  BODY: {
    fontSize: FONT_SIZES.BASE,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.RELAXED,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  BODY_SMALL: {
    fontSize: FONT_SIZES.SM,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.RELAXED,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  
  // Caption and Label Styles
  CAPTION: {
    fontSize: FONT_SIZES.XS,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.XS * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  LABEL: {
    fontSize: FONT_SIZES.SM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  
  // Button Styles
  BUTTON_LARGE: {
    fontSize: FONT_SIZES.LG,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.BOLD,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  BUTTON: {
    fontSize: FONT_SIZES.BASE,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.BOLD,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  BUTTON_SMALL: {
    fontSize: FONT_SIZES.SM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  
  // Input Styles
  INPUT_LARGE: {
    fontSize: FONT_SIZES.LG,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  INPUT: {
    fontSize: FONT_SIZES.BASE,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  INPUT_SMALL: {
    fontSize: FONT_SIZES.SM,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  
  // Specialized Styles
  CALCULATOR_DISPLAY: {
    fontSize: FONT_SIZES.XXXL,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.XXXL * LINE_HEIGHTS.TIGHT,
    fontFamily: FONT_FAMILY.MONOSPACED,
  },
  CALCULATOR_HISTORY: {
    fontSize: FONT_SIZES.LG,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.MONOSPACED,
  },
  CALCULATOR_BUTTON: {
    fontSize: FONT_SIZES.XL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    lineHeight: FONT_SIZES.XL * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
  RESULT: {
    fontSize: FONT_SIZES.XXL,
    fontWeight: FONT_WEIGHTS.BOLD,
    lineHeight: FONT_SIZES.XXL * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.BOLD,
  },
  ERROR: {
    fontSize: FONT_SIZES.SM,
    fontWeight: FONT_WEIGHTS.NORMAL,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY,
  },
} as const;

// Type Definitions
export type TextStyle = keyof typeof TEXT_STYLES;
export type FontSize = keyof typeof FONT_SIZES;
export type FontWeight = keyof typeof FONT_WEIGHTS;
