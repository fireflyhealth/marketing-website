import {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';

type UIProviderProps = {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  getStartedOpen: boolean;
  setGetStartedOpen: (open: boolean) => void;
  toggleGlobalNav: () => void;
  currentNavItem: string | null;
  setCurrentNavItem: (newNavItem: string | null) => void;
  sequenceLinePosition: number;
  setSequenceLinePosition: (position: number) => void;
};

export const UIContext = createContext<UIProviderProps | undefined>(undefined);

export const useUIProvider = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUIProvider must be used within a UIProvider');
  }

  return context;
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  // Global Nav
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);

  const toggleGlobalNav = () => {
    setMobileNavOpen(!mobileNavOpen);
    setCurrentNavItem(null);
  };

  /* Uses the nav item's '_key' prop as an identifier */
  const [currentNavItem, setCurrentNavItem] = useState<string | null>(null);

  const [sequenceLinePosition, setSequenceLinePosition] = useState<number>(0);

  return (
    <UIContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
        getStartedOpen,
        setGetStartedOpen,
        toggleGlobalNav,
        currentNavItem,
        setCurrentNavItem,
        sequenceLinePosition,
        setSequenceLinePosition,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
