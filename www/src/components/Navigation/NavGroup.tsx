import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { useUIProvider } from '@/context/UIProvider';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { Keyed, NavGroupType } from '@/types/sanity';
import { Link } from '@/atoms/Link';
import {
  NavLinkDropdownWrapper,
  NavDropdownButton,
  DropdownOuter,
  DropdownInner,
  SubPageLink,
  NavLinkStyles,
} from './styles';

type Props = {
  navItem: Keyed<NavGroupType>;
  isMobile?: boolean;
};

export const NavGroup: FC<Props> = ({ navItem, isMobile }) => {
  const { currentNavItem, setCurrentNavItem } = useUIProvider();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      if (currentNavItem === navItem._key && dropdownOpen) {
        setDropdownOpen(false);
        setCurrentNavItem(null);
      }
    }
  };

  useEffect(() => {
    if (currentNavItem === navItem._key) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [currentNavItem]);
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
                dropdownOpen ? 'rotate-90' : '',
                'transition ease-in-out w-3',
                navItemHighlightState,
              )}
            />
          </button>
          <div
            className={cn(DropdownOuter, dropdownOpen ? 'block' : 'hidden')}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <div className={cn(DropdownInner, 'transition-all ease-in-out')}>
              {navItem.subpages.map((subPage) => (
                <div key={subPage._key} className={cn(SubPageLink)}>
                  <Link
                    link={subPage.link}
                    onClick={() => setCurrentNavItem(null)}
                  >
                    {subPage.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Link
          link={navItem.link}
          onClick={() => setCurrentNavItem(null)}
          onMouseEnter={handleHeadingMouseEnter}
          onMouseLeave={handleHeadingMouseLeave}
        >
          {navItem.label}
        </Link>
      )}
    </div>
  );
};
