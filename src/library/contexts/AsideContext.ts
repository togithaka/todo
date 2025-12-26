import { createContext } from 'react';

export interface Props {
  trigger: boolean;
  pullTrigger: () => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

export const AsideContext = createContext<Props | undefined>(undefined);
