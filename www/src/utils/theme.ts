import { ColorTheme } from '@/components/Theme';

export const getColorTheme = (colorTheme: string) => {
  switch (colorTheme) {
    case 'White':
      return ColorTheme.White;
    case 'Grey':
      return ColorTheme.Grey;
    case 'Sienna':
      return ColorTheme.Sienna;
    case 'Midnight':
      return ColorTheme.Midnight;
    case 'Sky':
      return ColorTheme.Sky;
    default:
      return ColorTheme.White;
  }
};
