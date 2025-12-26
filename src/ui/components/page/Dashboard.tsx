'use client';

import { useAside } from '@library/hooks';
import { AsideProvider, ModeProvider, ThemeProvider } from '@library/providers';
import { Aside, Header, Main } from '@ui/components/layout';
import { Modal } from '@ui/components/page';
import { Icon } from '@ui/components/shared';
import { HeaderStyles, MainStyles } from '@ui/styles/layout';
import { DashboardStyles, PageStyles } from '@ui/styles/page';
import { ReactNode } from 'react';

interface Props {
  navItems?: ReactNode;
  asideItems?: ReactNode;
  mainItems?: ReactNode;
  modalItems?: ReactNode;
}

function Content({ navItems, asideItems, mainItems, modalItems }: Props) {
  const { trigger, pullTrigger, hidden } = useAside();

  return (
    <div className={trigger ? DashboardStyles.Dashboard : PageStyles.Page}>
      <Header className={trigger ? HeaderStyles.Dashboard : HeaderStyles.Page}>
        {!trigger && (
          <div
            className={DashboardStyles.Nav}
            onClick={pullTrigger}
          >
            <Icon
              name='aside'
              alt='Aside Icon'
              size={16}
            />
          </div>
        )}
        <Modal>{modalItems}</Modal>
      </Header>
      <Main className={trigger ? MainStyles.Dashboard : MainStyles.Page}>
        {mainItems}
      </Main>
      {trigger && !hidden && <Aside></Aside>}
    </div>
  );
}

export default function Panel({ navItems, asideItems, mainItems }: Props) {
  return (
    <ModeProvider>
      <ThemeProvider>
        <AsideProvider>
          <Content
            navItems={navItems}
            asideItems={asideItems}
            mainItems={mainItems}
          />
        </AsideProvider>
      </ThemeProvider>
    </ModeProvider>
  );
}
