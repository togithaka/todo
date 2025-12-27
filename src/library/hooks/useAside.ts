import { AsideContext, AsideContextProps } from '@library/contexts';
import { useContext } from 'react';

export default function useAside(): AsideContextProps {
  const context = useContext(AsideContext);

  if (!context) {
    throw new Error('`useAside` must be used within an `AsideProvider`.');
  }

  return context;
}
