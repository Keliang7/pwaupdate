/// <reference types="vite/client" />
// src/env.d.ts
/// <reference types="vite/client" />
declare module 'virtual:pwa-register/vue' {
  export interface UseRegisterSWOptions {
    immediate?: boolean
    onRegisteredSW?: (swUrl: string, registration: ServiceWorkerRegistration | undefined) => void
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
  }
  export function useRegisterSW(options?: UseRegisterSWOptions): {
    needRefresh: import('vue').Ref<boolean>
    offlineReady: import('vue').Ref<boolean>
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  }
}
