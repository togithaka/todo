import { ThemeContext } from '@library/contexts';
import { useMode } from '@library/hooks';
import { ReactNode, useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme-preference') as Theme) || 'system';
    }
    return 'system';
  });
  const { mode } = useMode();

  useEffect(() => {
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const triggerTheme = () => {
    let newTheme: Theme;
    switch (theme) {
      case 'system':
        newTheme = 'light';
        break;
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'system';
        break;
      default:
        newTheme = 'system';
    }

    setTheme(newTheme);
  };

  // Sync data-theme attribute whenever theme or system mode changes
  useEffect(() => {
    const resolvedMode = theme === 'system' ? mode : theme;

    if (resolvedMode) {
      document.querySelector('html')?.setAttribute('data-theme', resolvedMode);
    }
  }, [theme, mode]);

  return (
    <ThemeContext.Provider value={{ theme, triggerTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
