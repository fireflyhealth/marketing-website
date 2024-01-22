import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useUIProvider } from '@/hooks';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as Types from '@/types/sanity';
import {
  NavLinkDropdownWrapper,
  NavDropdownButton,
  NavLinkDropdown,
  SubPageLink,
  NavLinkStyles,
} from './styles';

type Props = {
  navItem: Types.NavLinkObject;
};

export const NavLink: FC<Props> = ({ navItem }) => {
  const { globalNavDropdownOpen, toggleGlobalNav, toggleGlobalNavDropdown } =
    useUIProvider();
  return (
    <div className={cn(NavLinkStyles)}>
      {navItem.page.subPages ? (
        <div className={cn(NavLinkDropdownWrapper)}>
          <button
            className={cn(NavDropdownButton)}
            onClick={toggleGlobalNavDropdown}
          >
            <p className={cn(NavLink)}>{navItem.page.title}</p>
            <SimpleIcon
              type="arrow-down"
              width={12}
              color="#131D2B"
              className={cn(globalNavDropdownOpen ? 'rotate-180' : '')}
            />
          </button>
          {globalNavDropdownOpen && (
            <div className={cn(NavLinkDropdown)}>
              {navItem.page.subPages.map((subPage) => (
                <Link
                  key={subPage._id}
                  href={subPage.slug}
                  className={cn(SubPageLink)}
                  onClick={toggleGlobalNav}
                >
                  {subPage.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href={navItem.page.slug}
          className={cn(NavLink)}
          onClick={toggleGlobalNav}
        >
          {navItem.page.title}
        </Link>
      )}
    </div>
  );
};
