import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
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
  toggleNav: () => void;
  toggleDropdown: () => void;
  dropdownOpen: boolean;
};

export const NavLink: FC<Props> = ({
  navItem,
  toggleNav,
  toggleDropdown,
  dropdownOpen,
}) => {
  return (
    <div className={cn(NavLinkStyles)}>
      {navItem.page.subPages ? (
        <div className={cn(NavLinkDropdownWrapper)}>
          <button className={cn(NavDropdownButton)} onClick={toggleDropdown}>
            <p className={cn(NavLink)}>{navItem.page.title}</p>
            <SimpleIcon
              type="arrow-down"
              width={12}
              color="#131D2B"
              className={cn(dropdownOpen ? 'rotate-180' : '')}
            />
          </button>
          {dropdownOpen && (
            <div className={cn(NavLinkDropdown)}>
              {navItem.page.subPages.map((subPage) => (
                <Link
                  key={subPage._id}
                  href={subPage.slug}
                  className={cn(SubPageLink)}
                  onClick={toggleNav}
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
          onClick={toggleNav}
        >
          {navItem.page.title}
        </Link>
      )}
    </div>
  );
};
