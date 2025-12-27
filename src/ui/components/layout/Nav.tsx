'use client';

import { useTrigger } from '@library/hooks';
import { Icon, Theme } from '@ui/components/shared';
import { NavStyles } from '@ui/styles/layout';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Nav({ children }: Props) {
  const { trigger, pullTrigger } = useTrigger();

  if (!children) return <nav />;

  return (
    <nav className={NavStyles.Nav}>
      <Theme hidden />
      <div className={NavStyles.Large}>{children}</div>
      <div className={NavStyles.Small}>
        <div
          className={NavStyles.Head}
          onClick={pullTrigger}
        >
          <Icon
            className={trigger ? NavStyles.Before : NavStyles.After}
            name='chevron'
            alt='Chevron Icon'
            size={14}
          />
        </div>
        {trigger && <div className={NavStyles.Body}>{children}</div>}
      </div>
    </nav>
  );
}
