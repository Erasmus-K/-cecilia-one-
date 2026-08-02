import { useEffect } from 'react';
import type { LicenseState } from '@eranovatechnologies/license';
import { getDefaultStatusMessage } from '@eranovatechnologies/license';

/**
 * Prefer an immediate redirect to HostPilot pay when a payment URL exists.
 * Otherwise show a clean blocked-state screen with an optional Pay Now link.
 */
export function LicenseSuspensionFallback({ state }: { state: LicenseState }) {
  useEffect(() => {
    // Never redirect from a stale localStorage cache — wait for a live check.
    if (state.paymentUrl && !state.fromCache && state.status !== 'active') {
      window.location.replace(state.paymentUrl);
    }
  }, [state.paymentUrl, state.fromCache, state.status]);

  const message = getDefaultStatusMessage(state.status, state.reason);

  if (state.paymentUrl) {
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
        <div>
          <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700 }}>
            Redirecting to payment…
          </h1>
          <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{message}</p>
          <p style={{ marginTop: 24 }}>
            <a
              href={state.paymentUrl}
              style={{ color: '#93c5fd', fontWeight: 600 }}
            >
              Continue to Pay Now
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #0f172a 100%)',
        color: '#f8fafc',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
      role="alertdialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          padding: '40px 36px',
          borderRadius: 16,
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.45)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            marginBottom: 20,
            padding: '6px 12px',
            borderRadius: 999,
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#fca5a5',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {state.status === 'expired'
            ? 'Subscription Expired'
            : state.status === 'invalid'
              ? 'Invalid License'
              : 'Account Suspended'}
        </div>
        <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>
          Access Temporarily Unavailable
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: 16, lineHeight: 1.6, color: '#cbd5e1' }}>
          {message}
        </p>
        <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
          If you believe this is an error, contact your administrator.
        </p>
      </div>
    </div>
  );
}
