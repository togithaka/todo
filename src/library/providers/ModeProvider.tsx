import { ModeContext } from '@library/contexts';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function ModeProvider({ children }: Props) {
  const [mode, setMode] = useState<'light' | 'dark' | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      setMode(matchMedia.matches ? 'dark' : 'light');
    };

    // Initial check
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, []);

  if (!mode) return null;

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}
