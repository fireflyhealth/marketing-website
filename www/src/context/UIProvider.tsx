import { FC, createContext, PropsWithChildren, useState } from 'react';

type UIProviderProps = {
  globalNavOpen: boolean;
  setGlobalNavOpen: (open: boolean) => void;
  globalNavDropdownOpen: boolean;
  setGlobalNavDropdownOpen: (open: boolean) => void;
  toggleGlobalNav: () => void;
  toggleGlobalNavDropdown: () => void;
};

export const UIContext = createContext<UIProviderProps | undefined>(undefined);

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  // Global Nav
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  const [globalNavDropdownOpen, setGlobalNavDropdownOpen] = useState(false);

  const toggleGlobalNav = () => {
    setGlobalNavOpen(!globalNavOpen);
  };

  const toggleGlobalNavDropdown = () => {
    setGlobalNavDropdownOpen(!globalNavDropdownOpen);
  };

  return (
    <UIContext.Provider
      value={{
        globalNavOpen,
        setGlobalNavOpen,
        globalNavDropdownOpen,
        setGlobalNavDropdownOpen,
        toggleGlobalNav,
        toggleGlobalNavDropdown,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
