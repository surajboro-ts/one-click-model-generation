import { systemColors } from '../../tokens/colors/system';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../tokens/typography';

const c = systemColors.light;

export const colors = {
  bg: c['background-base'],
  bgSunken: c['background-sunken'],
  bgSubtle: c['background-subtle'],
  bgBrand: c['background-brand'],
  bgGhostHover: c['background-ghost-hover'],
  bgGhostHighlight: c['background-ghost-highlight'],
  bgSuccess: c['background-success'],
  bgWarning: c['background-warning'],
  bgFailure: c['background-failure'],
  bgInfo: c['background-information'],
  textPrimary: c['content-primary'],
  textSecondary: c['content-secondary'],
  textTertiary: c['content-tertiary'],
  textBrand: c['content-brand'],
  textWhite: c['content-alternate'],
  textSuccess: c['content-success'],
  textWarning: c['content-warning'],
  textFailure: c['content-failure'],
  borderDefault: c['border-default'],
  borderDivider: c['border-divider'],
  borderBrand: c['border-brand'],
  borderHover: c['border-hover'],
  borderFocus: c['border-focus'],
};

export const font = {
  family: fontFamily.primary,
  mono: fontFamily.mono,
  weight: fontWeight,
  size: fontSize,
  line: lineHeight,
};

export const HEADER_HEIGHT = 60;
export const SUBHEADER_HEIGHT = 60;
export const SIDEBAR_WIDTH = 260;
export const PANEL_WIDTH = 340;
