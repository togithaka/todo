import { MainStyles } from '@ui/styles/layout';

interface Props {
  className: string;
}

export default function Main({ className }: Props) {
  return <main className={[MainStyles.Main, className].join(' ')}></main>;
}
