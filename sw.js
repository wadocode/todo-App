importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);


const { NetworkOnly } = workbox.strategies;
const { setDefaultHandler } = workbox.routing;
const { offlineFallback, staticResourceCache } = workbox.recipes; 
const { precacheAndRoute } = workbox.precaching;

setDefaultHandler(
  new NetworkOnly() 
)

offlineFallback(); 
staticResourceCache(); 

precacheAndRoute([
  { url: '/index.html', revision: true } 
])