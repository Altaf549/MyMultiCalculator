import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING } from '../styles/spacing';
import { UNIT_CONVERTER } from '../utils/constants';

interface CategorySelectorProps {
  selectedCategory: keyof typeof UNIT_CONVERTER.UNITS;
  onCategoryChange: (category: keyof typeof UNIT_CONVERTER.UNITS) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { colors } = useTheme();
  
  const categories = Object.keys(UNIT_CONVERTER.UNITS) as Array<keyof typeof UNIT_CONVERTER.UNITS>;

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { backgroundColor: colors.PRIMARY }
      ]}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            index === 0 && styles.firstButton,
            index === categories.length - 1 && styles.lastButton,
          ]}
          onPress={() => onCategoryChange(category)}
        >
          <Text
            style={[
              styles.categoryText,
              { 
                color: selectedCategory === category 
                  ? colors.TEXT_WHITE 
                  : colors.TEXT_WHITE_OP_8 
              },
            ]}
          >
            {UNIT_CONVERTER.CATEGORIES[category]}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: COMPONENT_SPACING.INPUT_MARGIN,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
  },
  categoryButton: {
    flex: 1,
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: scale(4),
    borderRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
  },
  categoryText: {
    ...TEXT_STYLES.BUTTON,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
  firstButton: {
    borderTopLeftRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    borderBottomLeftRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
  },
  lastButton: {
    borderTopRightRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    borderBottomRightRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
  },
});

export default CategorySelector;
