import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LicenseProvider,
  clearCachedLicenseState,
} from '@eranovatechnologies/license';
import App from './App.tsx';
import { LicenseSuspensionFallback } from './license/LicenseSuspensionFallback.tsx';
import './index.css';

const licenseKey = import.meta.env.VITE_LICENSE_KEY?.trim() ?? '';
const applicationVersion =
  import.meta.env.VITE_APP_VERSION?.trim() || '1.0.0';

/**
 * Call the license API via same-origin `/api/license/check`.
 * Vite (dev) and Vercel (prod) proxy that path to HostPilot so the browser
 * never hits api.eranovatechnologies.com cross-origin (CORS).
 */
const apiUrl = '';

// Drop stale suspended cache — the SDK restores it before the fresh check
// and our fallback was redirecting to pay immediately.
clearCachedLicenseState();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Mount failed: no element with id "root" (check index.html).');
}

function MissingLicenseEnvScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: '#0f172a',
        color: '#f8fafc',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700 }}>
          License configuration missing
        </h1>
        <p style={{ margin: '0 0 16px', color: '#cbd5e1', lineHeight: 1.6 }}>
          Set <code>VITE_LICENSE_KEY</code> in the host environment (e.g. Vercel
          → Settings → Environment Variables), then redeploy so Vite can bake it
          into the build.
        </p>
        <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>
          Locally, add it to <code>.env</code> and restart the dev server.
        </p>
      </div>
    </div>
  );
}

createRoot(container).render(
  <StrictMode>
    {!licenseKey ? (
      <MissingLicenseEnvScreen />
    ) : (
      <LicenseProvider
        apiUrl={apiUrl}
        licenseKey={licenseKey}
        applicationVersion={applicationVersion}
        companyName="White Nile and Sudd Centre"
        enableCache={false}
        suspensionFallback={(state) => <LicenseSuspensionFallback state={state} />}
      >
        <App />
      </LicenseProvider>
    )}
  </StrictMode>,
);
