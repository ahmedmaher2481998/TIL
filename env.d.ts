/// <reference types="vite/client" />
interface ImportMetaEnv {
  // more env variables...
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
