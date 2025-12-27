import NavItem from '@/ui/components/shared/NavItem';
import Theme from '@/ui/components/shared/Theme';
import { Page } from '@ui/components/page';

export default function Landing() {
  return (
    <Page
      navItems={
        <>
          <NavItem
            name='Landing'
            href='/'
            active
          />
          <NavItem
            name='Info'
            href='/'
          />
          <NavItem
            button={true}
            name='Account'
            href='/'
          />
        </>
      }
      mainItems={null}
      modalItems={<Theme />}
    />
  );
}
