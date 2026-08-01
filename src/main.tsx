import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LicenseProvider } from '@eranovatechnologies/license';
import App from './App.tsx';
import { LicenseSuspensionFallback } from './license/LicenseSuspensionFallback.tsx';
import './index.css';

const apiUrl = import.meta.env.VITE_LICENSE_API_URL;
const licenseKey = import.meta.env.VITE_LICENSE_KEY;
const applicationVersion =
  import.meta.env.VITE_APP_VERSION?.trim() || '1.0.0';

if (!apiUrl?.trim() || !licenseKey?.trim()) {
  throw new Error(
    'Missing HostPilot license env: set VITE_LICENSE_API_URL and VITE_LICENSE_KEY (see .env.example).',
  );
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Mount failed: no element with id "root" (check index.html).');
}

createRoot(container).render(
  <StrictMode>
    <LicenseProvider
      apiUrl={apiUrl.trim()}
      licenseKey={licenseKey.trim()}
      applicationVersion={applicationVersion}
      companyName="White Nile and Sudd Centre"
      suspensionFallback={(state) => <LicenseSuspensionFallback state={state} />}
    >
      <App />
    </LicenseProvider>
  </StrictMode>,
);
