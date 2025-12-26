'use client';

import { useAside, useTrigger } from '@library/hooks';
import { Header, Main } from '@ui/components/layout';
import { Icon } from '@ui/components/shared';
import { HeaderStyles, MainStyles } from '@ui/styles/layout';
import { DialogStyles, PageStyles } from '@ui/styles/page';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export default function Dialog({ children }: Props) {
  const { trigger, pullTrigger } = useTrigger();

  const { setHidden } = useAside();

  useEffect(() => {
    setHidden(trigger);
    return () => setHidden(false);
  }, [trigger, setHidden]);

  return (
    <div className={DialogStyles.Dialog}>
      <div
        className={DialogStyles.TriggerOff}
        onClick={() => pullTrigger()}
      >
        <Icon
          name='dialog'
          alt='Dialog Icon'
          size={16}
          inverted
        />
      </div>
      {trigger && (
        <div className={DialogStyles.DialogItself}>
          <div className={PageStyles.Page}>
            <Header className={HeaderStyles.Page}>
              <div className={DialogStyles.Nav}></div>
              <div
                className={DialogStyles.TriggerOn}
                onClick={() => pullTrigger()}
              >
                <Icon
                  name='dialog'
                  alt='Dialog Icon'
                  size={16}
                />
              </div>
            </Header>
            <Main className={MainStyles.Page}>{children}</Main>
          </div>
        </div>
      )}
    </div>
  );
}
