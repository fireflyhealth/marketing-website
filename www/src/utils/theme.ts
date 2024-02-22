import { ColorTheme } from '@/components/Theme';

export const getColorTheme = (colorTheme: string) => {
  switch (colorTheme) {
    case 'white':
      return ColorTheme.White;
    case 'grey':
      return ColorTheme.Grey;
    case 'sienna':
      return ColorTheme.Sienna;
    case 'midnight':
      return ColorTheme.Midnight;
    case 'sky':
      return ColorTheme.Sky;
    default:
      return ColorTheme.White;
  }
};
