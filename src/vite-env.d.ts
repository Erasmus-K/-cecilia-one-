/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** Upstream HostPilot API origin for the Vite proxy (browser uses same-origin /api/license/check) */
  readonly VITE_LICENSE_API_URL?: string;
  /** License key from HostPilot admin → Licenses for this exact domain */
  readonly VITE_LICENSE_KEY?: string;
  /** Optional app version sent with each license check (defaults to 1.0.0) */
  readonly VITE_APP_VERSION?: string;
  /**
   * Local-only: skip HostPilot when set to "true".
   * Only honored in Vite DEV on localhost — ignored in production builds.
   */
  readonly VITE_LICENSE_DEV_BYPASS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
