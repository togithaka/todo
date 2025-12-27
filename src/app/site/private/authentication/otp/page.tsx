import NavItem from '@/ui/components/shared/NavItem';
import Theme from '@/ui/components/shared/Theme';
import Authentication from '@/ui/components/view/Authentication';
import { Page } from '@ui/components/page';

export default function Otp() {
  return (
    <Page
      navItems={
        <>
          <NavItem
            name='OTP'
            href='/site/private/authentication/otp'
            active
          />
          <NavItem
            button={true}
            name='Landing'
            href='/'
          />
        </>
      }
      mainItems={<Authentication type='otp' />}
      modalItems={<Theme />}
    />
  );
}
