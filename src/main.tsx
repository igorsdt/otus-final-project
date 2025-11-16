import { StrictMode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { client } from '@/apollo/client';
import { App } from './App';
import './styles/global.css';

const rootEl = document.querySelector('#root');
if (!rootEl) throw new Error('Root element not found');
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
