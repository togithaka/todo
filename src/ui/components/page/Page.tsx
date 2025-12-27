'use client';

import { AsideProvider, ModeProvider, ThemeProvider } from '@library/providers';
import { Header, Main, Nav } from '@ui/components/layout';
import { Modal } from '@ui/components/page';
import { Brand } from '@ui/components/shared';
import { HeaderStyles, MainStyles } from '@ui/styles/layout';
import { PageStyles } from '@ui/styles/page';
import { ReactNode } from 'react';

interface Props {
  navItems: ReactNode;
  mainItems: ReactNode;
  modalItems: ReactNode;
}

export default function Page({ navItems, mainItems, modalItems }: Props) {
  return (
    <ModeProvider>
      <AsideProvider>
        <ThemeProvider>
          <div className={PageStyles.Page}>
            <Header className={HeaderStyles.Page}>
              <Brand />
              <Nav>{navItems}</Nav>
              <Modal>{modalItems}</Modal>
            </Header>
            <Main className={MainStyles.Page}>{mainItems}</Main>
          </div>
        </ThemeProvider>
      </AsideProvider>
    </ModeProvider>
  );
}
