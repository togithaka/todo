import { useMode, useTheme } from '@library/hooks';

export default function useIcon() {
  const { theme } = useTheme();
  const { mode } = useMode();

  // effectiveMode is the visual theme of the app
  const effectiveMode = theme === 'system' ? mode : theme;

  // Icon color is the inverse of the effective mode
  // dark background -> light icon
  // light background -> dark icon
  const icon = effectiveMode === 'dark' ? 'light' : 'dark';

  return { icon };
}
