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
  const iconWithDropdownRef = useRef<HTMLButtonElement>(null);
  const dropdownLinkRef = useRef<HTMLAnchorElement>(null);

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
    if (!isMobile) return;

    if (currentNavItem === navItem._key) {
      setCurrentNavItem(null);
    } else {
      setCurrentNavItem(navItem._key);
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setCurrentNavItem(null);
    }
  };

  // Handle keyboard events (open/close dropdown, select option)
  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    handleEscape(event);

    if (key === 'Enter') {
      const focusedElement = document.activeElement as HTMLElement;
      if (
        (focusedElement && focusedElement === labelWithDropdownRef.current) ||
        (focusedElement && focusedElement === iconWithDropdownRef.current)
      ) {
        setCurrentNavItem(navItem._key);
      }
    }
  };

  useEffect(() => {
    if (labelWithDropdownRef.current) {
      labelWithDropdownRef.current.addEventListener('keydown', handleKeyDown);
    }

    if (iconWithDropdownRef.current) {
      iconWithDropdownRef.current.addEventListener('keydown', handleKeyDown);
    }

    if (dropdownLinkRef.current) {
      dropdownLinkRef.current.addEventListener('keydown', handleEscape);
    }

    return () => {
      if (labelWithDropdownRef.current) {
        labelWithDropdownRef.current.removeEventListener(
          'keydown',
          handleKeyDown,
        );
      }

      if (iconWithDropdownRef.current) {
        iconWithDropdownRef.current.removeEventListener(
          'keydown',
          handleKeyDown,
        );
      }

      if (dropdownLinkRef.current) {
        dropdownLinkRef.current.removeEventListener('keydown', handleEscape);
      }
    };
  }, [navItem._key, setCurrentNavItem]);

  const dropwdownButtonAriaLabel = isCurrentNavItem
    ? 'Close dropdown menu'
    : 'Open dropdown menu';

  return (
    <div className={cn(NavLinkStyles, navItemHighlightState)}>
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
              className="simple-text-link"
              ariaLabel={`Navigate to ${navItem.label}`}
            >
              {navItem.link ? (
                <p>{navItem.label}</p>
              ) : (
                <button
                  ref={labelWithDropdownRef}
                  onClick={handleDropdownButtonClick}
                  aria-label={dropwdownButtonAriaLabel}
                  className="simple-text-link"
                >
                  {navItem.label}
                </button>
              )}
            </MaybeLink>
            <button
              ref={iconWithDropdownRef}
              onClick={handleDropdownButtonClick}
              aria-label={dropwdownButtonAriaLabel}
              className="icon-link"
            >
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
                    tabindex={isCurrentNavItem ? 0 : -1}
                    linkRef={dropdownLinkRef}
                    className="simple-text-link"
                    ariaLabel={`Navigate to ${subPage.label}`}
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
          className="simple-text-link"
          ariaLabel={`Navigate to ${navItem.label}`}
        >
          {navItem.label}
        </Link>
      )}
    </div>
  );
};
