'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Temporarily disable Service Worker registration for debugging
    console.log('[SW] Service Worker registration temporarily disabled for debugging');
    
    // TODO: Re-enable after verifying other fixes work
    if (false && 
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

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  if (confirm('New version available, refresh page?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });

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

