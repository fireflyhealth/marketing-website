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
  navItem: Types.NavGroup;
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

  const parentSlug = navItem.link?.slug;
  return (
    <div
      ref={navItemRef}
      className={cn(
        NavLinkStyles,
        `${navItem.label}`,
        currentNavItemRef === null
          ? 'text-black'
          : currentNavItemRef === navItemRef.current
            ? 'text-black'
            : 'text-black/60',
      )}
    >
      {navItem.subpages ? (
        <div className={cn(NavLinkDropdownWrapper)}>
          <button
            className={cn(NavDropdownButton)}
            onClick={() => {
              setCurrentNavItemRef(navItemRef.current);
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <p className={cn(NavLink)}>{navItem.label}</p>
            <SimpleIcon
              type="arrow-down"
              className={cn(
                dropdownOpen ? 'rotate-90' : '',
                'transition ease-in-out w-3',
                currentNavItemRef === null
                  ? 'text-black'
                  : currentNavItemRef === navItemRef.current
                    ? 'text-black'
                    : 'text-black/60',
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
            {navItem.subpages.map((subPage) => (
              <Link
                key={subPage._key}
                href={`${parentSlug}/${subPage.link.slug}`}
                className={cn(SubPageLink)}
                onClick={toggleGlobalNav}
              >
                {subPage.label}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Link href={navItem.link.slug} onClick={toggleGlobalNav}>
          {navItem.label}
        </Link>
      )}
    </div>
  );
};
