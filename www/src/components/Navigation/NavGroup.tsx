import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useUIProvider } from '@/context/UIProvider';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { Keyed, NavGroupType } from '@/types/sanity';
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
  navItem: Keyed<NavGroupType>;
  isMobile?: boolean;
};

export const NavGroup: FC<Props> = ({ navItem, isMobile }) => {
  const { toggleGlobalNav, currentNavItem, setCurrentNavItem } =
    useUIProvider();

  const isDropdownOpen = currentNavItem === navItem._key;

  const navItemHighlightState =
    currentNavItem === null
      ? 'text-black'
      : currentNavItem === navItem._key
        ? 'text-black'
        : 'text-black/60';

  const handleHeadingMouseEnter = () => {
    if (!isMobile) {
      setCurrentNavItem(navItem._key);
    }
  };
  const handleHeadingMouseLeave = () => {
    if (!isMobile) {
      setCurrentNavItem(null);
    }
  };
  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setCurrentNavItem(null);
    }
  };
  const handleDropdownButtonClick = () => {
    if (isMobile) {
      setCurrentNavItem(navItem._key);
    }
  };
  return (
    <div
      className={cn(NavLinkStyles, navItemHighlightState, `${navItem.label}`)}
    >
      {navItem._type === 'labelWithDropdown' ? (
        <div
          onMouseEnter={handleHeadingMouseEnter}
          onMouseLeave={handleHeadingMouseLeave}
          className={cn(NavLinkDropdownWrapper)}
        >
          <button
            className={cn(NavDropdownButton)}
            onClick={handleDropdownButtonClick}
          >
            <p>{navItem.label}</p>
            <SimpleIcon
              type="arrow-down"
              className={cn(
                isDropdownOpen ? 'rotate-90' : '',
                'transition ease-in-out w-3',
                navItemHighlightState,
              )}
            />
          </button>
          <div
            className={cn(DropdownOuter, isDropdownOpen ? 'block' : 'hidden')}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <div className={cn(DropdownInner, 'transition-all ease-in-out')}>
              {navItem.subpages.map((subPage) => (
                <Link
                  key={subPage._key}
                  href={`${subPage.link.slug}`}
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
