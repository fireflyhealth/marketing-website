import { FC, useRef, useEffect } from 'react';
import cn from 'classnames';
import { useUIProvider } from '@/context/UIProvider';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { Keyed, NavGroupType } from '@/types/sanity';
import { Link, MaybeLink } from '@/atoms/Link';
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

  const labelWithDropdownRef = useRef<HTMLButtonElement>(null);

  const isCurrentNavItem = currentNavItem === navItem._key;

  const navItemHighlightState =
    currentNavItem === null
      ? 'text-black'
      : isCurrentNavItem
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
      if (currentNavItem === navItem._key) {
        setCurrentNavItem(null);
      }
    }
  };

  useEffect(() => {
    if (!labelWithDropdownRef.current) return;

    // Handle keyboard events (open/close dropdown, select option)
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Escape') {
        setCurrentNavItem(null);
      }

      if (key === 'Enter') {
        const focusedElement = document.activeElement as HTMLElement;
        if (focusedElement && focusedElement === labelWithDropdownRef.current) {
          setCurrentNavItem(navItem._key);
        }
      }
    };

    labelWithDropdownRef.current.addEventListener('keydown', handleKeyDown);

    return () => {
      if (!labelWithDropdownRef.current) return;

      labelWithDropdownRef.current.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [navItem._key, setCurrentNavItem]);

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
          <div className={cn(NavDropdownButton)}>
            <MaybeLink
              link={navItem.link}
              onClick={() => setCurrentNavItem(null)}
            >
              {navItem.link ? (
                <p>{navItem.label}</p>
              ) : (
                <button onClick={handleDropdownButtonClick}>
                  {navItem.label}
                </button>
              )}
            </MaybeLink>
            <button onClick={handleDropdownButtonClick}>
              <SimpleIcon
                type="arrow-down"
                wrapperStyles={cn(
                  'transition-all ease-in-out w-3',
                  navItemHighlightState,
                  {
                    'rotate-180': isCurrentNavItem,
                  },
                )}
              />
            </button>
          </div>

          <div
            className={cn(DropdownOuter, {
              'h-[0px] opacity-0': !isCurrentNavItem,
              'h-auto opacity-1': isCurrentNavItem,
            })}
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
