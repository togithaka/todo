import { Icon, IconProps } from '@ui/components/shared';
import { NavItemStyles } from '@ui/styles/shared';
import Link from 'next/link';

interface Props {
  href: string;
  name: string;
  active?: boolean;
  button?: boolean;
  icon?: IconProps;
}

export default function NavItem({ href, name, active, button, icon }: Props) {
  return icon ? (
    <div
      className={
        active ? NavItemStyles.IconContainerActive : NavItemStyles.IconContainer
      }
    >
      {!button && (
        <Icon
          name={icon.name}
          alt={icon.alt}
          size={16}
          className={active ? NavItemStyles.IconActive : NavItemStyles.Icon}
        />
      )}
      <Link
        className={
          active && !button
            ? NavItemStyles.Active
            : active && button
            ? NavItemStyles.Button
            : button && !active
            ? NavItemStyles.Button
            : NavItemStyles.NavItem
        }
        href={href}
      >
        {button && (
          <Icon
            inverted
            name={icon.name}
            alt={icon.alt}
            size={16}
            className={
              active ? NavItemStyles.IconActive : NavItemStyles.IconActive
            }
          />
        )}
        {name}
      </Link>
    </div>
  ) : (
    <Link
      className={
        active
          ? NavItemStyles.Active
          : button
          ? NavItemStyles.Button
          : NavItemStyles.NavItem
      }
      href={href}
    >
      {name}
    </Link>
  );
}
