import { useContext } from 'react';
import { UIContext } from '../context/UIProvider';

export const useUIProvider = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUIProvider must be used within a UIProvider');
  }

  return context;
};
