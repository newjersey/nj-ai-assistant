// Export types
export * from './types';

// Export ThemeProvider, ThemeContext, useTheme hook, and the mode predicates
export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  isDark,
  isHighContrast,
  resolvesToHighContrast,
} from './context/ThemeProvider';

// Export utility functions
export {
  default as applyTheme,
  applyResolvedTheme,
  clearAppliedTheme,
<<<<<<< HEAD
  themeOwnedProperties,
} from './utils/applyTheme';
=======
  describeResolvedTheme,
  themeOwnedProperties,
  THEME_BOOT_ATTRIBUTE,
} from './utils/applyTheme';
export type { ResolvedThemeStyle } from './utils/applyTheme';
>>>>>>> upstream/main

export {
  HIGH_CONTRAST_THEME_NAME,
  THEME_VERSION,
<<<<<<< HEAD
  defaultAppearance,
=======
  collectThemeWarnings,
  darkAppearanceDefaults,
  defaultAppearance,
  defaultAppearanceFor,
>>>>>>> upstream/main
  defaultBrands,
  fromLegacyTheme,
  highContrastTheme,
  libreChatTheme,
  resolveTheme,
  themeAppearanceProperties,
  themeBrandTokens,
  themeColorTokens,
  validateThemeDefinition,
} from './registry';

// Export theme atoms for persistence
export { themeModeAtom, themeColorsAtom, themeNameAtom } from './atoms/themeAtoms';

<<<<<<< HEAD
=======
// Read a theme color role for code that paints outside the stylesheet
export { readThemeColor } from './utils/color';

>>>>>>> upstream/main
// Export predefined themes
export * from './themes';
