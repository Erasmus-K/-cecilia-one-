/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** HostPilot License API origin (no path suffix), e.g. https://api.eranovatechnologies.com */
  readonly VITE_LICENSE_API_URL?: string;
  /** License key from HostPilot admin → Licenses for this exact domain */
  readonly VITE_LICENSE_KEY?: string;
  /** Optional app version sent with each license check (defaults to 1.0.0) */
  readonly VITE_APP_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
