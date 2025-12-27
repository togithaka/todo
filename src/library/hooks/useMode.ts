import { ModeContext, ModeContextProps } from '@library/contexts';
import { useContext } from 'react';

export default function useMode(): ModeContextProps {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error('`useMode` must be used within a `ModeProvider`.');
  }

  return context;
}
