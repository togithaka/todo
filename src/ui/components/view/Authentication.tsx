import { Login, Otp, Recover, Register, Reset } from '@ui/components/handler';
import { Section } from '@ui/components/layout';
import { Loading } from '@ui/components/shared';
import { AuthenticationStyles } from '@ui/styles/view';
import { Suspense } from 'react';

interface Props {
  type: 'login' | 'register' | 'reset' | 'recover' | 'otp';
}

export default function Authentication({ type }: Props) {
  return (
    <Section
      id='authentication'
      className={AuthenticationStyles.Authentication}
    >
      <Suspense fallback={<Loading />}>
        {type === 'login' && <Login />}
        {type === 'register' && <Register />}
        {type === 'reset' && <Reset />}
        {type === 'recover' && <Recover />}
        {type === 'otp' && <Otp />}
      </Suspense>
    </Section>
  );
}
