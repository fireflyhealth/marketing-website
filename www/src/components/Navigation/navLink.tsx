import { FC, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useUIProvider } from '@/context/UIProvider';
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
  isMobile?: boolean;
};

export const NavLink: FC<Props> = ({ navItem, isMobile }) => {
  const {
    mobileNavOpen,
    toggleGlobalNav,
    currentNavItemRef,
    setCurrentNavItemRef,
  } = useUIProvider();

  const navItemRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!navItemRef?.current) return;

    // toggle dropdown open and close based on current nav item
    if (currentNavItemRef === navItemRef.current) {
      setDropdownOpen(true);
    } else setDropdownOpen(false);

    if (currentNavItemRef === navItemRef.current && !dropdownOpen) {
      setCurrentNavItemRef(null);
    }

    // close dropdown if global nav is closed
    if (isMobile && !mobileNavOpen) {
      setDropdownOpen(false);
    }
  }, [currentNavItemRef, mobileNavOpen, dropdownOpen]);

  const parentSlug = navItem.page.slug;
  return (
    <div
      ref={navItemRef}
      className={cn(
        NavLinkStyles,
        `${navItem.page.title}`,
        currentNavItemRef === null
          ? 'text-black'
          : currentNavItemRef === navItemRef.current
            ? 'text-black'
            : 'text-black/60',
      )}
    >
      {navItem.page.subPages ? (
        <div className={cn(NavLinkDropdownWrapper)}>
          <button
            className={cn(NavDropdownButton)}
            onClick={() => {
              setCurrentNavItemRef(navItemRef.current);
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <p className={cn(NavLink)}>{navItem.page.title}</p>
            <SimpleIcon
              type="arrow-down"
              width={12}
              color={
                currentNavItemRef === null
                  ? '#131D2B'
                  : currentNavItemRef === navItemRef.current
                    ? '#131D2B'
                    : 'rgb(19 29 43 / 0.6)'
              }
              className={cn(
                dropdownOpen ? 'rotate-180' : '',
                'transition ease-in-out',
              )}
            />
          </button>
          <div
            className={cn(
              NavLinkDropdown,
              dropdownOpen ? 'block' : 'hidden',
              'transition-all ease-in-out',
            )}
          >
            {navItem.page.subPages.map((subPage) => (
              <Link
                key={subPage._id}
                href={`${parentSlug}/${subPage.slug}`}
                className={cn(SubPageLink)}
                onClick={toggleGlobalNav}
              >
                {subPage.title}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link href={navItem.page.slug} onClick={toggleGlobalNav}>
          {navItem.page.title}
        </Link>
      )}
    </div>
  );
};
