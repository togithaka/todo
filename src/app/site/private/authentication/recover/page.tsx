import NavItem from '@/ui/components/shared/NavItem';
import Theme from '@/ui/components/shared/Theme';
import Authentication from '@/ui/components/view/Authentication';
import { Page } from '@ui/components/page';

export default function Recover() {
  return (
    <Page
      navItems={
        <>
          <NavItem
            name='Recover'
            href='/site/private/authentication/recover'
            active
          />
          <NavItem
            button={true}
            name='Landing'
            href='/'
          />
        </>
      }
      mainItems={<Authentication type='recover' />}
      modalItems={<Theme />}
    />
  );
}
