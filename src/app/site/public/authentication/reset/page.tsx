import NavItem from '@/ui/components/shared/NavItem';
import Theme from '@/ui/components/shared/Theme';
import Authentication from '@/ui/components/view/Authentication';
import { Page } from '@ui/components/page';

export default function Reset() {
  return (
    <Page
      navItems={
        <>
          <NavItem
            name='Login'
            href='/site/public/authentication/login'
          />
          <NavItem
            name='Register'
            href='/site/public/authentication/register'
          />
          <NavItem
            name='Reset'
            href='/site/public/authentication/reset'
            active
          />
          <NavItem
            button={true}
            name='Landing'
            href='/'
          />
        </>
      }
      mainItems={<Authentication type='reset' />}
      modalItems={<Theme />}
    />
  );
}
