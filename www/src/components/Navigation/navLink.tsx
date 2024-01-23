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

  const toggleDropDown = () => {
    setCurrentNavItemRef(navItemRef.current);
    // toggle dropdown open and close based on current nav item
    if (currentNavItemRef === navItemRef.current) {
      setDropdownOpen(true);
    } else setDropdownOpen(false);

    if (currentNavItemRef === navItemRef.current && !dropdownOpen) {
      setCurrentNavItemRef(null);
    }
  };

  useEffect(() => {
    if (!navItemRef.current) return;

    // close dropdown if global nav is closed
    if (isMobile) {
      toggleDropDown();

      if (!mobileNavOpen) {
        setDropdownOpen(false);
      }
    }

    navItemRef.current.addEventListener('mouseover', () => {
      toggleDropDown();
    });

    return navItemRef.current.removeEventListener('mouseenter', () => {
      toggleDropDown();
    });
  }, [currentNavItemRef, mobileNavOpen, dropdownOpen]);

  useEffect(() => {
    if (!navItemRef.current) return;
  }, []);

  const parentSlug = navItem.link?.slug;
  const navItemHighlightState =
    currentNavItemRef === null
      ? 'text-black'
      : currentNavItemRef === navItemRef.current
        ? 'text-black'
        : 'text-black/60';
  return (
    <div
      ref={navItemRef}
      className={cn(NavLinkStyles, `${navItem.label}`, navItemHighlightState)}
    >
      {navItem.subpages ? (
        <div className={cn(NavLinkDropdownWrapper)}>
          <button
            className={cn(NavDropdownButton)}
            onClick={() => {
              if (isMobile) {
                setCurrentNavItemRef(navItemRef.current);
                setDropdownOpen(!dropdownOpen);
              }
            }}
          >
            <p className={cn(NavLink)}>{navItem.label}</p>
            <SimpleIcon
              type="arrow-down"
              className={cn(
                dropdownOpen ? 'rotate-90' : '',
                'transition ease-in-out w-3',
                navItemHighlightState,
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
