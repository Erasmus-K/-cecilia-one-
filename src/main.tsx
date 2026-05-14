import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Root from './App.tsx';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Mount failed: no element with id "root" (check index.html).');
}

createRoot(container).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
