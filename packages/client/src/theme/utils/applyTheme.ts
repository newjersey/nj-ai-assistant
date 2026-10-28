<<<<<<< HEAD
import type { IThemeAppearance, IThemeBrands, IThemeRGB, ResolvedThemeDefinition } from '../types';
import {
  MARK_NEIGHBOURHOOD,
  themeAppearanceProperties,
  themeBrandTokens,
  themeColorTokens,
} from '../registry';

const colorProperty = (token: keyof IThemeRGB): `--${string}` => `--${token.slice(4)}`;
const brandProperty = (token: keyof IThemeBrands): `--${string}` => `--${token}`;

export const themeOwnedProperties: readonly string[] = Object.freeze([
  ...themeColorTokens.map(colorProperty),
  ...Object.values(themeAppearanceProperties),
  ...themeBrandTokens.map(brandProperty),
]);
=======
import {
  describeThemeColors,
  describeResolvedTheme,
  THEME_DISABLED_ATTRIBUTE,
  THEME_FIELD_FOCUS_ATTRIBUTE,
  themeOwnedProperties,
} from 'librechat-data-provider';
import type { IThemeRGB, ResolvedThemeDefinition } from 'librechat-data-provider';

export {
  describeResolvedTheme,
  themeOwnedProperties,
  THEME_DISABLED_ATTRIBUTE,
  THEME_FIELD_FOCUS_ATTRIBUTE,
} from 'librechat-data-provider';
export type { ResolvedThemeStyle } from 'librechat-data-provider';
>>>>>>> upstream/main

const rgbPattern = /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/;

function validateRGB(rgb: string): boolean {
  const match = rgb.match(rgbPattern);
  return match !== null && match.slice(1).every((channel) => Number(channel) <= 255);
}

<<<<<<< HEAD
/** `base` is the bundled palette for the mode being applied. The adapter writes
 *  only the keys a theme names, so a derivation whose source the theme inherits
 *  rather than restates has nothing to read without it. */
function mapColors(colors: IThemeRGB, base?: IThemeRGB): Array<[string, string]> {
  const variables = themeColorTokens.reduce<Array<[string, string]>>((result, token) => {
    const value = colors[token];
    if (value !== undefined) {
      result.push([colorProperty(token), value]);
    }
    return result;
  }, []);

  if (
    colors['rgb-surface-composer-hover'] === undefined &&
    colors['rgb-surface-hover'] !== undefined
  ) {
    variables.push(['--surface-composer-hover', colors['rgb-surface-hover']]);
  }

  /**
   * Stored and environment themes predate the shimmer stops, and this adapter
   * applies only the keys a theme names — so without this they would keep the
   * stock sweep while every other color moved, and in dark mode the CSS cannot
   * recover: `.dark` declares a base outright, so the `--text-primary` fallback
   * never runs. The bright stop follows the theme's primary text color, which
   * is what it already resolves to in light. The dip has no legacy counterpart
   * and stays at its default: it is the faded half of the sweep, carried at low
   * alpha, so it reads as dimmed against any base.
   */
  if (colors['rgb-shimmer-base'] === undefined && colors['rgb-text-primary'] !== undefined) {
    variables.push(['--shimmer-base', colors['rgb-text-primary']]);
  }

  if (colors['rgb-text-muted'] === undefined && colors['rgb-text-tertiary'] !== undefined) {
    variables.push(['--text-muted', colors['rgb-text-tertiary']]);
  }

  if (
    colors['rgb-chart-widget-surface'] === undefined &&
    colors['rgb-surface-primary'] !== undefined
  ) {
    variables.push(['--chart-widget-surface', colors['rgb-surface-primary']]);
  }

  if (colors['rgb-chart-widget-stroke'] === undefined && colors['rgb-border-light'] !== undefined) {
    variables.push(['--chart-widget-stroke', colors['rgb-border-light']]);
  }

  /**
   * Same rule as `resolveTheme`: a theme that paints what the mark is measured
   * against coordinated the `status-success-strong` the mark wore before it had
   * a token, so it keeps that fill rather than taking LibreChat's stock blue.
   * This adapter writes only the keys a theme names, so the inherited value
   * arrives through `base`, the bundled palette for the mode being applied.
   */
  const ownsMarkSurroundings = MARK_NEIGHBOURHOOD.some((token) => colors[token] !== undefined);
  const inheritedSuccess =
    colors['rgb-status-success-strong'] ?? base?.['rgb-status-success-strong'];
  if (
    ownsMarkSurroundings &&
    colors['rgb-status-verified'] === undefined &&
    inheritedSuccess !== undefined
  ) {
    variables.push(['--status-verified', inheritedSuccess]);
  }

  return variables;
}

function mapAppearance(appearance: IThemeAppearance): Array<[string, string]> {
  return Object.entries(themeAppearanceProperties).map(([key, property]) => [
    property,
    appearance[key as keyof IThemeAppearance],
  ]);
}
=======
/**
 * Marks a root other than the document one that a legacy palette themes. The stylesheet points
 * the avatar backdrop at that root's own secondary surface, or its tertiary one under a `.dark`
 * ancestor, as the document root's alias does, so the backdrop follows a later mode change.
 */
export const THEME_SCOPE_ATTRIBUTE = 'data-theme-scope';

/**
 * Marks a root that `client/index.html` painted from the cached deployment theme before the
 * bundle ran. The provider drops that copy before it snapshots the root, so a later restore
 * returns to the stylesheet rather than to a theme the server may since have withdrawn.
 */
export const THEME_BOOT_ATTRIBUTE = 'data-theme-boot';
>>>>>>> upstream/main

export function clearAppliedTheme(root: HTMLElement = document.documentElement): void {
  themeOwnedProperties.forEach((property) => root.style.removeProperty(property));
  root.removeAttribute('data-theme');
<<<<<<< HEAD
=======
  root.removeAttribute(THEME_DISABLED_ATTRIBUTE);
  root.removeAttribute(THEME_SCOPE_ATTRIBUTE);
  root.removeAttribute(THEME_FIELD_FOCUS_ATTRIBUTE);
  root.removeAttribute(THEME_BOOT_ATTRIBUTE);
>>>>>>> upstream/main
}

export function applyResolvedTheme(
  theme: ResolvedThemeDefinition,
  root: HTMLElement = document.documentElement,
): void {
<<<<<<< HEAD
  const variables = [
    ...mapColors(theme.colors),
    ...mapAppearance(theme.appearance),
    ...themeBrandTokens.map(
      (token) => [brandProperty(token), theme.brands[token]] as [string, string],
    ),
  ];

  variables.forEach(([property, value]) => root.style.setProperty(property, value));
  root.dataset.theme = theme.name;
=======
  const { properties, attributes } = describeResolvedTheme(theme);
  properties.forEach(([property, value]) => root.style.setProperty(property, value));
  root.removeAttribute(THEME_DISABLED_ATTRIBUTE);
  root.removeAttribute(THEME_FIELD_FOCUS_ATTRIBUTE);
  Object.entries(attributes).forEach(([name, value]) => root.setAttribute(name, value));
>>>>>>> upstream/main
}

/**
 * Backward-compatible adapter for the original partial RGB theme interface.
 * New theme implementations should resolve a ThemeDefinition and use applyResolvedTheme.
 */
export default function applyTheme(
  themeRGB?: IThemeRGB,
  root: HTMLElement = document.documentElement,
  base?: IThemeRGB,
): void {
  if (!themeRGB) {
    return;
  }

<<<<<<< HEAD
  mapColors(themeRGB, base).forEach(([property, value]) => {
=======
  if (root !== root.ownerDocument.documentElement) {
    root.setAttribute(THEME_SCOPE_ATTRIBUTE, '');
  }
  describeThemeColors(themeRGB, base).forEach(([property, value]) => {
>>>>>>> upstream/main
    if (!validateRGB(value)) {
      console.error(`Invalid RGB value for ${property}: ${value}`);
      return;
    }
    root.style.setProperty(property, value);
  });
}
