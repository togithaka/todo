import { HeaderStyles } from '@ui/styles/layout';
import { ReactNode } from 'react';

interface Props {
  className: string;
  children: ReactNode;
}

export default function Header({ className, children }: Props) {
  return (
    <header className={[HeaderStyles.Header, className].join(' ')}>
      {children}
    </header>
  );
}
