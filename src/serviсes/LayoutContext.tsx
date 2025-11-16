import { createContext, useContext, useState, ReactNode } from 'react';

type LayoutContextType = {
  pageTitle: string;
  setTitle: (title: string) => void;
  activeMenuTitle: string;
  setActiveMenuTitle: (title: string) => void;
};

type LayoutProviderProps = {
  children: ReactNode;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('Хук useLayoutContext должен использоваться внутри компонента LayoutProvider');
  }
  return context;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [pageTitle, setTitle] = useState('Операции');
  const [activeMenuTitle, setActiveMenuTitle] = useState('Операции');

  return (
    <LayoutContext.Provider value={{ pageTitle, setTitle, activeMenuTitle, setActiveMenuTitle }}>
      {children}
    </LayoutContext.Provider>
  );
};
