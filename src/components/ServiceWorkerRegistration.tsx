'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          console.log('[SW] Registration successful:', registration);

          // 监听Service Worker更新
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  // 新的Service Worker可用，提示用户刷新
                  if (confirm('新版本可用，是否刷新页面？')) {
                    window.location.reload();
                  }
                }
              });
            }
          });

          // 监听Service Worker消息
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SW_UPDATED') {
              console.log('[SW] Service Worker updated');
            }
          });

        } catch (error) {
          console.error('[SW] Registration failed:', error);
        }
      };

      registerSW();
    }
  }, []);

  return null;
}