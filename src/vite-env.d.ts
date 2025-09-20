/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_FORM_ID: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_GITHUB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
