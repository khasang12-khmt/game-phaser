(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.6.0"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.6.0"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.6.0"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.6.0"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),n=e=>e||a(t.precache);function r(e,t){const s=t();return e.waitUntil(s),s}function i(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:a}=t;if(!a)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}s(977);class c{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class o{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let h;function l(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=new Set;function f(e){return"string"==typeof e?new Request(e):e}s(873);class p{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let a=f(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=f(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const a=f(t);await(0,new Promise((e=>setTimeout(e,0))));const n=await this.getCacheKey(a,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=n.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),p=u?await async function(e,t,s,a){const n=l(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),i=await e.keys(t,r);for(const t of i)if(n===l(t.url,s))return e.match(t,a)}(h,n.clone(),["__WB_REVISION__"],o):null;try{await h.put(n,u?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:p,newResponse:i.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=f(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g{constructor(e={}){this.cacheName=e.cacheName||a(t.runtime),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new p(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(t,s,a){let n;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,t),!n||"error"===n.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(n=await r({error:e,event:a,request:s}),n)break;if(!n)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))n=await e({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}class y extends g{constructor(e={}){e.cacheName=n(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(y.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=n.integrity,r=t.integrity,i=!r||r===e;a=await s.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||e:void 0})),e&&i&&"no-cors"!==t.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,a.clone()))}return a}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(t);if(!await s.cachePut(t,a.clone()))throw new e("bad-precaching-response",{url:t.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==y.copyRedirectedCacheableResponsesPlugin&&(a===y.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(y.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}y.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},y.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let a=null;if(t.url&&(a=new URL(t.url).origin),a!==self.location.origin)throw new e("cross-origin-copy-response",{origin:a});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?n.body:await n.blob();return new Response(c,i)}(t):t};class w{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new y({cacheName:n(e),plugins:[...t,new o({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const a of t){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:t,url:n}=i(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:t});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==a.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(t,a.integrity)}if(this._urlsToCacheKeys.set(n,t),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return r(e,(async()=>{const t=new c;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return r(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}let m;const _=()=>(m||(m=new w),m);s(80);const R=e=>e&&"object"==typeof e?e:{handle:e};class v{constructor(e,t,s="GET"){this.handler=R(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=R(e)}}class C extends v{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class b{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,R(e))}setCatchHandler(e){this._catchHandler=R(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let q;class U extends v{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(n);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}var L;L=[{'revision':'8e38ef36d3f116f9034599a4a029a5c0','url':'assets/audio/Bounce.wav'},{'revision':'e066b480f6da7b21f617ce3026bdd248','url':'assets/audio/Click.wav'},{'revision':'d5407aa7a5418b81238d0612911dbbb8','url':'assets/audio/GameOver.wav'},{'revision':'e429641c3c2aa47fe04e5eb1a30be862','url':'assets/audio/Net.wav'},{'revision':'77cca1c00ed4d97cd4bba059e93dc9dc','url':'assets/audio/Shoot.mp3'},{'revision':'2cfc38b6c8ebb25541d8b4386ae83982','url':'assets/casual-ui/Sprite/GUI.png'},{'revision':'ad15ea74f7f05d09c964c522c3500ea1','url':'assets/casual-ui/Sprite/GUI.png.meta'},{'revision':'dbe8bbcde72cdafba537704d85c64d5c','url':'assets/fonts/MilkyHoney.otf'},{'revision':'8a7f928b886ab03b9de2d4ef394f5a89','url':'assets/fonts/MilkyHoney.ttf'},{'revision':'cc39c19f1f83e723fefdb7606f9a4475','url':'assets/fonts/myfont.css'},{'revision':'bda89e5444b9b6e3f4eeee121947042c','url':'assets/images/buttons/Close.png'},{'revision':'8cf6e004807e1cbb0852d57bd83725b5','url':'assets/images/buttons/Divide.png'},{'revision':'84fc85bd3f2ddf793a411256d7b9e2b8','url':'assets/images/buttons/DragIt.png'},{'revision':'526781214611acf32f4108c99afbc16e','url':'assets/images/buttons/Facebook.png'},{'revision':'e4ae655556884e7a45751ab82e682c56','url':'assets/images/buttons/ForwardLeft.png'},{'revision':'ee1fa961605640dd66c5a9d6b16a506e','url':'assets/images/buttons/ForwardRight.png'},{'revision':'fff05e5bbee897800555bba5d7b5f40e','url':'assets/images/buttons/FreeGift.png'},{'revision':'f79c92dca423ae46fbf7b67b2ee2f0e4','url':'assets/images/buttons/GamePad.png'},{'revision':'f61b0351327fd83c3f8f8547f74d043a','url':'assets/images/buttons/Google.png'},{'revision':'8408b8a339aa8a258a4a36943eff7b55','url':'assets/images/buttons/Heart.png'},{'revision':'c2a7e093d47edd760b1c358830b1d95a','url':'assets/images/buttons/Home.png'},{'revision':'45ea61b2d9f69141dd417930028d5f46','url':'assets/images/buttons/Instagram.png'},{'revision':'ac36b7bc297b39c2ac4a7d7365064e78','url':'assets/images/buttons/Leaderboard.png'},{'revision':'c4457503047671d80b0b938e405cae9d','url':'assets/images/buttons/Left.png'},{'revision':'c9fc354face9ea4cd573b243f9191720','url':'assets/images/buttons/Menu.png'},{'revision':'67cfc25309925c97c0f682aba97136dd','url':'assets/images/buttons/Message.png'},{'revision':'564bb0b3f9a96496bb13e3c153aed2a3','url':'assets/images/buttons/Minus.png'},{'revision':'b70cf60c52c10190fc8aea72efe3b673','url':'assets/images/buttons/Music.png'},{'revision':'62835d9d17951f89ab51ad8586973daf','url':'assets/images/buttons/Pause.png'},{'revision':'ff1b9e987bb25fddc8376aca0d68cc47','url':'assets/images/buttons/Play.png'},{'revision':'5473cbef016441e82e6b0f46d1e38465','url':'assets/images/buttons/Plus.png'},{'revision':'44630e54c30e548386826164ba2bf4a3','url':'assets/images/buttons/PowerUp.png'},{'revision':'3dbf87cdbb7e02e9b6772b33726051b1','url':'assets/images/buttons/Question.png'},{'revision':'7ee132e38c33932bcb7b56aa5527a013','url':'assets/images/buttons/Retry.png'},{'revision':'81fce75db2f996d4899c34e3314bf99a','url':'assets/images/buttons/Right.png'},{'revision':'51d6ca7ae291f70bbe993f825d722b28','url':'assets/images/buttons/Settings.png'},{'revision':'e68ed95be5a5c00a471712ecee60af38','url':'assets/images/buttons/Share.png'},{'revision':'e8a3b50ced9c4d9a32a03259867328d3','url':'assets/images/buttons/Shop.png'},{'revision':'50ea27f3b352492d3f85babd67ddb31f','url':'assets/images/buttons/SoundOff.png'},{'revision':'2a587053cb6cd9cc018009bb7873f326','url':'assets/images/buttons/SoundOn.png'},{'revision':'c08ea13941a9b09ade1b727765c6d7aa','url':'assets/images/buttons/Trash.png'},{'revision':'f89c8d6ceb7e62020fdf1c3784ce6a07','url':'assets/images/buttons/Trophy.png'},{'revision':'9075f8b5646ae88ee931113aa0df7427','url':'assets/images/buttons/ad.png'},{'revision':'ccda889ec99fe2db909391330eca0af9','url':'assets/images/buttons/challenge.png'},{'revision':'cfba1012edd1f5f9c630e19578fc4dd3','url':'assets/images/buttons/customize.png'},{'revision':'9e1bab2ba3c290eae9390a679748440a','url':'assets/images/buttons/leader-board.png'},{'revision':'122b19d420c7efda3ddce1fc7ab14aa5','url':'assets/images/buttons/light-off.png'},{'revision':'53b25cfc57781e6aa6193ff3afa1294d','url':'assets/images/buttons/light-on.png'},{'revision':'0c50f55ad58dbe9e556292166e7790de','url':'assets/images/buttons/lock.png'},{'revision':'d94946c193a41e3b6b581a70c01d3ef4','url':'assets/images/buttons/mainmenu.png'},{'revision':'32cf4a5d251b7c88cdc0504651ef6598','url':'assets/images/buttons/resume.png'},{'revision':'b767455a7c874f0f1f0ef292b4e001ef','url':'assets/images/buttons/return.png'},{'revision':'027c444da3dc2fe60290b63c2f15e9dd','url':'assets/images/buttons/sound-off.png'},{'revision':'7df6d23853a13e338afadab25a45d17d','url':'assets/images/buttons/sound-on.png'},{'revision':'8dddeabe25a9c7a2c52441d771c565c5','url':'assets/images/colorful-balls/1.png'},{'revision':'8f636cbfa5b69890e55481fefe693bd9','url':'assets/images/colorful-balls/10.png'},{'revision':'c0ef7ab8a3e814ecca43fb43e623be27','url':'assets/images/colorful-balls/11.png'},{'revision':'9266c4148e13e846d46d91974a627554','url':'assets/images/colorful-balls/12.png'},{'revision':'b92d647f46948f12b3a152da00f2abad','url':'assets/images/colorful-balls/2.png'},{'revision':'59cd4189f38e919140679cdd475cae77','url':'assets/images/colorful-balls/3.png'},{'revision':'e0f5e4fefa0120576f2ff8f77d6d8b35','url':'assets/images/colorful-balls/4.png'},{'revision':'6c4c5337980e65124ce6def6bfe8b730','url':'assets/images/colorful-balls/5.png'},{'revision':'3b891cd636c42519549b5c755d62f186','url':'assets/images/colorful-balls/6.png'},{'revision':'cb6f3e78b96b8f88be559c8fc4585e49','url':'assets/images/colorful-balls/7.png'},{'revision':'2d68377e0e6fa2a9b31cf9cf63700472','url':'assets/images/colorful-balls/8.png'},{'revision':'794b7836831392b8195f497c5770dde8','url':'assets/images/colorful-balls/9.png'},{'revision':'42763afca8eda21df300d674b334f8f8','url':'assets/images/colorful-balls/Locked.png'},{'revision':'043343ebe4d5e46965cc076f05ebe65d','url':'assets/images/sprites/Dot_0.png'},{'revision':'3d9e73a5d5f79dc4db473d660ea49c46','url':'assets/images/sprites/ball.png'},{'revision':'6e43df6f7a6317deb482b2fe32624fb8','url':'assets/images/sprites/basket.png'},{'revision':'2a287a3d8761b85ece8846672c6868ca','url':'assets/images/sprites/flag.png'},{'revision':'42c2239e1976022b5efa6dbf62d17aed','url':'assets/images/sprites/flare.png'},{'revision':'6a68bf5b4c0bcd81c427e4cdfa9d56eb','url':'assets/images/sprites/flares.json'},{'revision':'587b045c9c55398b6f1dd00c2ab13995','url':'assets/images/sprites/flares.png'},{'revision':'238c369004cf6feab62f8d178a9fd7ba','url':'assets/images/sprites/hoop_1.png'},{'revision':'c1a34d9edad7ac8fc1221b2dab32370c','url':'assets/images/sprites/hoop_2.png'},{'revision':'516e6594c879d6c74bb1441f3d190bdc','url':'assets/images/sprites/logo.png'},{'revision':'acedc8c5983e4c52c6e18921fe431a32','url':'assets/images/sprites/net.png'},{'revision':'ba80a642c97b5c97d5d9d0c25c6ada80','url':'assets/images/sprites/shadow.png'},{'revision':'bb6f0b4939fd48ab3e00ac29b3f93fb4','url':'assets/images/sprites/spark.png'},{'revision':'3af1f99f4259c52a6315496065279267','url':'assets/images/sprites/star.png'},{'revision':'7d736d2051986f74b85187ecc83d0ee3','url':'assets/images/theme-game-mode/0.png'},{'revision':'328aaaea77d7be51af111f6f6f939cca','url':'assets/images/theme-game-mode/0/bg_0.png'},{'revision':'f5b693f5181a6b0a3591837b1e9d058a','url':'assets/images/theme-game-mode/0/wall_0.png'},{'revision':'280d2b1e429e358168e28f94ddc73479','url':'assets/images/theme-game-mode/1.png'},{'revision':'e0e8b620d066b6510a150d517e9a5b5c','url':'assets/images/theme-game-mode/1/bg_1.png'},{'revision':'02f795c3f9bfaf8325e31bc7f0cd77bd','url':'assets/images/theme-game-mode/1/wall_1.png'},{'revision':'6894618b280516d5cd8da180f2e22dc2','url':'assets/images/theme-game-mode/2.png'},{'revision':'323538b708447cdf7521d6ed23cd5fcc','url':'assets/images/theme-game-mode/2/bg_2.png'},{'revision':'9d9cc244ae39f42f5645e78adc9cdab1','url':'assets/images/theme-game-mode/2/wall_2.png'},{'revision':'047809a8f46fbbabc285dacd43510f91','url':'assets/images/theme-game-mode/3.png'},{'revision':'42906f81e5bda784e7c1e435c52b10e1','url':'assets/images/theme-game-mode/4.png'},{'revision':'071eb10e44fa89c7e13c389f27346a72','url':'assets/images/theme-game-mode/check.png'},{'revision':'4f4b095ea7426571341b6fea64b2050e','url':'assets/images/theme-game-mode/popup.png'},{'revision':'2a6ff199af67bea38afeca76d5e0193e','url':'favicon.ico'},{'revision':'2ffbc23293ee8a797bc61e9c02534206','url':'icons/icons-192.png'},{'revision':'8bdcc486cda9b423f50e886f2ddb6604','url':'icons/icons-512.png'},{'revision':'f5d18d2e7b8b7fefd7325b3031c1d2cf','url':'index.html'},{'revision':null,'url':'main.8b5cc75b6d9efd9830a3.bundle.js'},{'revision':'4b7794a9c6ccfc90c36c434a89288a64','url':'manifest.json'},{'revision':null,'url':'vendors.14f2a99ce048b7b09c0b.bundle.js'},{'revision':'b8b3d81e4784ccb92f80004fce81ceea','url':'vendors.14f2a99ce048b7b09c0b.bundle.js.LICENSE.txt'}],_().precache(L),function(t){const s=_();!function(t,s,a){let n;if("string"==typeof t){const e=new URL(t,location.href);n=new v((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)n=new C(t,s,a);else if("function"==typeof t)n=new v(t,s,a);else{if(!(t instanceof v))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}(q||(q=new b,q.addFetchListener(),q.addCacheListener()),q).registerRoute(n)}(new U(s,t))}(undefined)})()})();