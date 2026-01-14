/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROFILE_GITHUB_URL?: string;
  readonly VITE_PROFILE_FB_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
