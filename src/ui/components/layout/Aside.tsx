'use client';

import { useAside } from '@library/hooks';
import { Icon } from '@ui/components/shared';
import { AsideStyles } from '@ui/styles/layout';

export default function Aside() {
  const { pullTrigger } = useAside();

  return (
    <aside className={AsideStyles.Aside}>
      <div className={AsideStyles.Container}>
        <div className={AsideStyles.Head}>
          <div
            className={AsideStyles.Nav}
            onClick={pullTrigger}
          >
            <Icon
              name='aside'
              alt='Aside Icon'
              size={16}
            />
          </div>
        </div>
        <div className={AsideStyles.Body}></div>
      </div>
      <div className={AsideStyles.Cover}></div>
    </aside>
  );
}
