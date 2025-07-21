/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_URL: string;
  // 他にも使っている env 変数があればここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
