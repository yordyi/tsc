// Service Worker for aggressive caching and performance optimization

const CACHE_NAME = 'timestamp-converter-v1';
const STATIC_CACHE_NAME = 'static-cache-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1';

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icon.svg',
  '/apple-touch-icon.svg',
  // 添加其他静态资源
];

// 需要缓存的动态资源模式
const CACHE_PATTERNS = [
  /\/_next\/static\/.*/,
  /\/api\/.*/,
  /\.(?:js|css|woff2?|svg|png|jpg|jpeg|webp|avif)$/,
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    Promise.all([
      // 预缓存静态资源
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // 立即激活新的 Service Worker
      self.skipWaiting()
    ])
  );
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    Promise.all([
      // 清理旧缓存
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 立即控制所有页面
      self.clients.claim()
    ])
  );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 跳过非HTTP请求
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // 跳过Chrome扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// 请求处理策略
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // HTML页面 - 网络优先，缓存备用
    if (request.mode === 'navigate') {
      return await networkFirstStrategy(request, DYNAMIC_CACHE_NAME);
    }
    
    // 静态资源 - 缓存优先
    if (isStaticAsset(url.pathname)) {
      return await cacheFirstStrategy(request, STATIC_CACHE_NAME);
    }
    
    // API请求 - 网络优先，短时间缓存
    if (url.pathname.startsWith('/api/')) {
      return await networkFirstStrategy(request, DYNAMIC_CACHE_NAME, 60000); // 1分钟
    }
    
    // Next.js静态资源 - 缓存优先，长时间有效
    if (CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
      return await cacheFirstStrategy(request, STATIC_CACHE_NAME);
    }
    
    // 其他请求 - 网络优先
    return await networkFirstStrategy(request, DYNAMIC_CACHE_NAME);
    
  } catch (error) {
    console.error('[SW] Request handling error:', error);
    
    // 如果是HTML请求且失败，返回离线页面
    if (request.mode === 'navigate') {
      return await caches.match('/') || new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    }
    
    return new Response('Network Error', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// 缓存优先策略
async function cacheFirstStrategy(request, cacheName, maxAge = 86400000) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    const cachedDate = new Date(cachedResponse.headers.get('date') || Date.now());
    const isExpired = Date.now() - cachedDate.getTime() > maxAge;
    
    if (!isExpired) {
      console.log('[SW] Cache hit:', request.url);
      return cachedResponse;
    }
  }
  
  console.log('[SW] Cache miss, fetching:', request.url);
  const networkResponse = await fetch(request);
  
  if (networkResponse.status === 200) {
    const responseToCache = networkResponse.clone();
    await cache.put(request, responseToCache);
  }
  
  return networkResponse;
}

// 网络优先策略
async function networkFirstStrategy(request, cacheName, timeout = 3000) {
  const cache = await caches.open(cacheName);
  
  try {
    // 设置超时的网络请求
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), timeout)
      )
    ]);
    
    if (networkResponse.status === 200) {
      const responseToCache = networkResponse.clone();
      await cache.put(request, responseToCache);
    }
    
    console.log('[SW] Network success:', request.url);
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// 检查是否为静态资源
function isStaticAsset(pathname) {
  const staticExtensions = [
    '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', 
    '.webp', '.avif', '.woff', '.woff2', '.ttf', '.eot',
    '.ico', '.json', '.xml', '.txt'
  ];
  
  return staticExtensions.some(ext => pathname.endsWith(ext));
}

// 后台同步
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // 执行后台同步任务
  try {
    // 可以在这里更新缓存或发送队列中的请求
    console.log('[SW] Background sync completed');
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// 推送通知
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.svg',
      badge: '/icon-72x72.svg',
      vibrate: [200, 100, 200],
      tag: 'timestamp-converter'
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// 通知点击处理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    self.clients.openWindow('/')
  );
});

// 消息处理
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(clearAllCaches());
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('[SW] All caches cleared');
}