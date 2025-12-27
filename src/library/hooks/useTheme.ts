import { ThemeContext, ThemeContextProps } from '@library/contexts';
import { useContext } from 'react';

export default function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('`useTheme` must be used within a `ThemeProvider`.');
  }

  return context;
}
