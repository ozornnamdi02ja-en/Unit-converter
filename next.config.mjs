import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
    dest:'public',
    disable: process.env.NODE_ENV ==='development', // disables PWA in dev mode so it doesn't cache local changes 
    register: true,
    skipWaiting: true,

});

/** @type {import('next').NextType} */

const nextConfig = {
    reactStrictMode: true,

};

export default withPWA(nextConfig);
