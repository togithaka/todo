'use client';

import { ModeProvider, ThemeProvider } from '@library/providers';
import { Header, Main, Nav } from '@ui/components/layout';
import { Brand } from '@ui/components/shared';
import { HeaderStyles, MainStyles } from '@ui/styles/layout';
import { PageStyles } from '@ui/styles/page';
import { ReactNode } from 'react';

interface Props {
  navItems: ReactNode;
  mainItems: ReactNode;
}

export default function Page({ navItems, mainItems }: Props) {
  return (
    <ModeProvider>
      <ThemeProvider>
        <div className={PageStyles.Page}>
          <Header className={HeaderStyles.Page}>
            <Brand />
            <Nav>{navItems}</Nav>
          </Header>
          <Main className={MainStyles.Page}>{mainItems}</Main>
        </div>
      </ThemeProvider>
    </ModeProvider>
  );
}
