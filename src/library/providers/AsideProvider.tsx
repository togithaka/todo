import { AsideContext } from '@library/contexts';
import { useTrigger } from '@library/hooks';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function AsideProvider({ children }: Props) {
  const { trigger, pullTrigger } = useTrigger();
  const [hidden, setHidden] = useState(false);

  return (
    <AsideContext.Provider value={{ trigger, pullTrigger, hidden, setHidden }}>
      {children}
    </AsideContext.Provider>
  );
}
