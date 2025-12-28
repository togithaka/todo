import NavItem from '@/ui/components/shared/NavItem';
import Theme from '@/ui/components/shared/Theme';
import Authentication from '@/ui/components/view/Authentication';
import { Page } from '@ui/components/page';

export default function Register() {
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
            active
          />
          <NavItem
            name='Reset'
            href='/site/public/authentication/reset'
          />
          <NavItem
            button={true}
            name='Landing'
            href='/'
          />
        </>
      }
      mainItems={<Authentication type='register' />}
      modalItems={<Theme />}
    />
  );
}
