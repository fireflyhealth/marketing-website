import { FC, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useUIProvider } from '@/context/UIProvider';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as Types from '@/types/sanity';
import {
  NavLinkDropdownWrapper,
  NavDropdownButton,
  DropdownOuter,
  DropdownInner,
  SubPageLink,
  NavLinkStyles,
} from './styles';

// TODO: replace subpage next/link with custom Link component

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const parentSlug = navItem.link?.slug;
  const navItemHighlightState =
    currentNavItemRef === null
      ? 'text-black'
      : currentNavItemRef === navItemRef.current
        ? 'text-black'
        : 'text-black/60';

  const hoverToggleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const hoverToggleDropdownClose = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (!navItemRef.current) return;
    if (!dropdownRef.current) return;

    if (isMobile) {
      if (currentNavItemRef === navItemRef.current && !dropdownOpen) {
        setCurrentNavItemRef(null);
      }
      // close dropdown if mobile nav is closed
      if (!mobileNavOpen) {
        setDropdownOpen(false);
      }
    }

    // hover events for desktop nav
    navItemRef.current.addEventListener('mouseover', () => {
      setCurrentNavItemRef(navItemRef.current);
    });

    dropdownRef.current.addEventListener('mouseover', () => {
      hoverToggleDropdownOpen();
    });

    dropdownRef.current.addEventListener('mouseleave', () => {
      hoverToggleDropdownClose();
    });
  }, [currentNavItemRef, dropdownRef, mobileNavOpen, dropdownOpen]);
  return (
    <div ref={navItemRef} className={cn(NavLinkStyles, `${navItem.label}`)}>
      {navItem.subpages ? (
        <div ref={dropdownRef} className={cn(NavLinkDropdownWrapper)}>
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
          <div className={cn(DropdownOuter, dropdownOpen ? 'block' : 'hidden')}>
            <div className={cn(DropdownInner, 'transition-all ease-in-out')}>
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
        </div>
      ) : (
        <Link href={navItem.link.slug} onClick={toggleGlobalNav}>
          {navItem.label}
        </Link>
      )}
    </div>
  );
};
