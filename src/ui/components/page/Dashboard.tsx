'use client';

import { useAside } from '@library/hooks';
import { AsideProvider } from '@library/providers';
import { Aside, Header, Main } from '@ui/components/layout';
import { HeaderStyles, MainStyles } from '@ui/styles/layout';
import { DashboardStyles, PageStyles } from '@ui/styles/page';
import { ReactNode } from 'react';

interface Props {
  navItems?: ReactNode;
  asideItems?: ReactNode;
  mainItems?: ReactNode;
  screenItems?: ReactNode;
}

function Content({ navItems, asideItems, mainItems, screenItems }: Props) {
  const { trigger, pullTrigger } = useAside();

  return (
    <div className={trigger ? DashboardStyles.Dashboard : PageStyles.Page}>
      <Header className={trigger ? HeaderStyles.Dashboard : HeaderStyles.Page}>
        {!trigger && (
          <div
            className={DashboardStyles.Nav}
            onClick={pullTrigger}
          >
            1234
          </div>
        )}
      </Header>
      <Main className={trigger ? MainStyles.Dashboard : MainStyles.Page}></Main>
      {trigger && <Aside></Aside>}
    </div>
  );
}

export default function Panel({ navItems, asideItems, mainItems }: Props) {
  return (
    <AsideProvider>
      <Content
        navItems={navItems}
        asideItems={asideItems}
        mainItems={mainItems}
      />
    </AsideProvider>
  );
}
