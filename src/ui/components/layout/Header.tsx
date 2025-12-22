import { HeaderStyles } from '@ui/styles/layout';

interface Props {
  className: string;
}

export default function Header({ className }: Props) {
  return (
    <header className={[HeaderStyles.Header, className].join(' ')}></header>
  );
}
