/////////1//////
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    experimental: {
        ppr: false
    }
};

module.exports = nextConfig;

////////2////////////
// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     runtimeCaching,
//     buildExcludes: [/middleware-manifest.json$/],
// });

// const nextConfig = withPWA({
//     // next config
// });
// module.exports = nextConfig;
//////3////////
// const runtimeCaching = require("next-pwa/cache");

// // Tus reglas personalizadas para el caché de imágenes
// const customRuntimeCaching = [
//     {
//         urlPattern: /.*\.(?:webp)/, // Esta es una expresión regular para cachear solo archivos .webp
//         handler: 'CacheFirst',
//         options: {
//             cacheName: 'webp-images',
//             expiration: {
//                 maxEntries: 20,
//                 maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
//             },
//         },
//     },
//     ...runtimeCaching, // Incorpora la configuración predeterminada de next-pwa
// ];

// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     runtimeCaching: customRuntimeCaching,
//     buildExcludes: [/middleware-manifest.json$/],
// });

// const nextConfig = withPWA({
//     // Configuración adicional de Next.js aquí
// });

// module.exports = nextConfig;

/////////////4/////////////
// const runtimeCaching = require("next-pwa/cache");

// // Configuración personalizada del caché
// const customRuntimeCaching = [
//     {
//         // Cachear imágenes .webp
//         urlPattern: /.*\.(?:webp)/,
//         handler: 'CacheFirst',
//         options: {
//             cacheName: 'webp-images',
//             expiration: {
//                 maxEntries: 20,
//                 maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
//             },
//         },
//     },
//     {
//         // Cachear archivos CSS y JS
//         urlPattern: /.*\.(?:css|js)/,
//         handler: 'StaleWhileRevalidate',
//         options: {
//             cacheName: 'static-resources',
//         },
//     },
//     {
//         // Cachear páginas HTML (opcional)
//         urlPattern: /\/$/,
//         handler: 'NetworkFirst',
//         options: {
//             cacheName: 'html-pages',
//         },
//     },
//     ...runtimeCaching, // Configuración predeterminada de next-pwa
// ];

// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     runtimeCaching: customRuntimeCaching,
//     buildExcludes: [/middleware-manifest.json$/],
// });

// const nextConfig = withPWA({
//     // Configuración adicional de Next.js aquí
// });

// module.exports = nextConfig;
