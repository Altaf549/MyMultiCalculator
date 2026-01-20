// Spacing System - Consistent Spacing and Margin Values

import { scale } from "../utils/scaling";

// Base Spacing Unit (4px)
export const SPACING_BASE = scale(4);

// Spacing Scale
export const SPACING = {
  XXXS: SPACING_BASE * 0.5,  // 2px
  XXS: SPACING_BASE * 1,      // 4px
  XS: SPACING_BASE * 2,       // 8px
  SM: SPACING_BASE * 3,       // 12px
  MD: SPACING_BASE * 4,       // 16px
  LG: SPACING_BASE * 6,       // 24px
  XL: SPACING_BASE * 8,       // 32px
  XXL: SPACING_BASE * 12,     // 48px
  XXXL: SPACING_BASE * 16,    // 64px
  HUGE: SPACING_BASE * 20,    // 80px
  MASSIVE: SPACING_BASE * 24, // 96px
} as const;

// Component Specific Spacing
export const COMPONENT_SPACING = {
  // Card Spacing
  CARD_PADDING: SPACING.MD,
  CARD_MARGIN: SPACING.SM,
  CARD_BORDER_RADIUS: SPACING.SM,
  CARD_SHADOW_OFFSET: {
    width: 0,
    height: 2,
  },
  CARD_SHADOW_RADIUS: SPACING.XS,
  
  // Button Spacing
  BUTTON_PADDING_HORIZONTAL: SPACING.LG,
  BUTTON_PADDING_VERTICAL: SPACING.SM,
  BUTTON_MARGIN: SPACING.SM,
  BUTTON_BORDER_RADIUS: SPACING.XS,
  BUTTON_MIN_HEIGHT: scale(48),
  
  // Input Spacing
  INPUT_PADDING_HORIZONTAL: SPACING.MD,
  INPUT_PADDING_VERTICAL: SPACING.XS,
  INPUT_MARGIN: SPACING.XS,
  INPUT_BORDER_RADIUS: SPACING.XS,
  INPUT_MIN_HEIGHT: scale(48),
  
  // Screen Spacing
  SCREEN_PADDING: SPACING.MD,
  SCREEN_MARGIN: SPACING.MD,
  SCREEN_HEADER_HEIGHT: scale(60),
  SCREEN_TAB_BAR_HEIGHT: scale(80),
  
  // List Spacing
  LIST_ITEM_PADDING: SPACING.MD,
  LIST_ITEM_MARGIN: SPACING.XS,
  LIST_SEPARATOR_HEIGHT: scale(1),
  
  // Calculator Spacing
  CALCULATOR_BUTTON_SIZE: scale(70),
  CALCULATOR_BUTTON_SPACING: SPACING.XS,
  CALCULATOR_DISPLAY_PADDING: SPACING.LG,
  CALCULATOR_DISPLAY_MARGIN: SPACING.MD,
  
  // Modal Spacing
  MODAL_PADDING: SPACING.LG,
  MODAL_MARGIN: SPACING.LG,
  MODAL_BORDER_RADIUS: SPACING.MD,
  
  // Icon Spacing
  ICON_SIZE_SM: scale(16),
  ICON_SIZE_MD: scale(24),
  ICON_SIZE_LG: scale(32),
  ICON_SIZE_XL: scale(48),
  ICON_MARGIN: SPACING.XS,
} as const;

// Layout Spacing
export const LAYOUT_SPACING = {
  // Container Spacing
  CONTAINER_PADDING: SPACING.MD,
  CONTAINER_MARGIN: SPACING.SM,
  CONTAINER_MAX_WIDTH: 1200,
  
  // Grid Spacing
  GRID_GAP: SPACING.MD,
  GRID_COLUMNS: 2,
  
  // Flex Spacing
  FLEX_GAP: SPACING.SM,
  FLEX_ROW_SPACING: SPACING.MD,
  FLEX_COLUMN_SPACING: SPACING.SM,
  
  // Header/Footer Spacing
  HEADER_HEIGHT: 60,
  HEADER_PADDING: SPACING.MD,
  FOOTER_HEIGHT: 60,
  FOOTER_PADDING: SPACING.MD,
  
  // Navigation Spacing
  NAV_TAB_HEIGHT: 60,
  NAV_TAB_PADDING: SPACING.SM,
  NAV_HEADER_HEIGHT: 56,
  NAV_HEADER_PADDING: SPACING.MD,
} as const;

// Responsive Spacing
export const RESPONSIVE_SPACING = {
  // Mobile Spacing
  MOBILE: {
    SCREEN_PADDING: SPACING.SM,
    CARD_MARGIN: SPACING.XS,
    BUTTON_PADDING_HORIZONTAL: SPACING.MD,
    INPUT_PADDING_HORIZONTAL: SPACING.SM,
  },
  
  // Tablet Spacing
  TABLET: {
    SCREEN_PADDING: SPACING.LG,
    CARD_MARGIN: SPACING.MD,
    BUTTON_PADDING_HORIZONTAL: SPACING.XL,
    INPUT_PADDING_HORIZONTAL: SPACING.MD,
  },
  
  // Desktop Spacing
  DESKTOP: {
    SCREEN_PADDING: SPACING.XL,
    CARD_MARGIN: SPACING.LG,
    BUTTON_PADDING_HORIZONTAL: SPACING.XXL,
    INPUT_PADDING_HORIZONTAL: SPACING.LG,
  },
} as const;

// Utility Functions for Spacing
export const getSpacing = (multiplier: number): number => SPACING_BASE * multiplier;

export const getResponsiveSpacing = (
  breakpoint: 'mobile' | 'tablet' | 'desktop',
  spacingKey: keyof typeof RESPONSIVE_SPACING.MOBILE
): number => {
  return RESPONSIVE_SPACING[breakpoint.toUpperCase() as keyof typeof RESPONSIVE_SPACING][spacingKey];
};

// Type Definitions
export type SpacingKey = keyof typeof SPACING;
export type ComponentSpacingKey = keyof typeof COMPONENT_SPACING;
export type LayoutSpacingKey = keyof typeof LAYOUT_SPACING;
