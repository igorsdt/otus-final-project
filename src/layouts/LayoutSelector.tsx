import { LoginLayout, PanelLayout } from '.';
import { LayoutProvider } from '@/serviсes/LayoutContext';
import type { ReactNode } from 'react';

type LayoutSelectorProps = {
  children: ReactNode;
  layoutType: 'panel' | 'login';
};

const LayoutSelector = (
  { children, layoutType }: LayoutSelectorProps
) => {
  const Layout = layoutType === 'panel'
    ? PanelLayout : LoginLayout;

  return (
    <LayoutProvider>
      <Layout>
        {children}
      </Layout>
    </LayoutProvider>
  );
};

export { LayoutSelector };
