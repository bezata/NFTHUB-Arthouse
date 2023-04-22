import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { g as server_default, h as deserializeManifest } from './chunks/astro.23f3a875.mjs';
import { _ as _page0, a as _page1, b as _page2, c as _page3, d as _page4 } from './chunks/pages/all.2b4dbb05.mjs';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'html-escaper';
import 'string-width';
/* empty css                                 *//* empty css                               *//* empty css                                 */import '@web3modal/ethereum';
import '@web3modal/react';
import 'wagmi';
import 'wagmi/chains';
import 'react';
import 'axios';
/* empty css                               */import 'svgo';
/* empty css                                */
const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/settings.astro", _page1],["src/pages/login.astro", _page2],["src/pages/mint.astro", _page3],["src/pages/404.astro", _page4],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["/_astro/404.484a649b.css","/_astro/index.cc482efc.css","/_astro/mint.16e72fdb.css","/_astro/404.d05842a4.css"],"scripts":[{"type":"external","value":"/_astro/hoisted.579282a0.js"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["/_astro/404.484a649b.css","/_astro/mint.16e72fdb.css","/_astro/404.d05842a4.css"],"scripts":[{"type":"external","value":"/_astro/hoisted.0e4e7821.js"}],"routeData":{"route":"/settings","type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["/_astro/404.484a649b.css","/_astro/mint.16e72fdb.css","/_astro/login.ba6a10ba.css"],"scripts":[],"routeData":{"route":"/login","type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["/_astro/404.484a649b.css","/_astro/mint.16e72fdb.css","/_astro/404.d05842a4.css"],"scripts":[{"type":"external","value":"/_astro/hoisted.0e4e7821.js"}],"routeData":{"route":"/mint","type":"page","pattern":"^\\/mint\\/?$","segments":[[{"content":"mint","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mint.astro","pathname":"/mint","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["/_astro/404.484a649b.css","/_astro/mint.16e72fdb.css","/_astro/404.d05842a4.css"],"scripts":[{"type":"external","value":"/_astro/hoisted.0e4e7821.js"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/pages/mint.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/pages/settings.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/pages/login.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/assets/img/logo.svg":"chunks/logo.eab61cc4.mjs","C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/web3stuff/Web3Modal":"_astro/Web3Modal.5689e393.js","/astro/hoisted.js?q=0":"_astro/hoisted.579282a0.js","/astro/hoisted.js?q=1":"_astro/hoisted.0e4e7821.js","C:/Users/minec/Desktop/Dosyalar/NFTHUB/node_modules/@web3modal/standalone/dist/index.js":"_astro/index.f26dfb2d.js","C:/Users/minec/Desktop/Dosyalar/NFTHUB/src/web3stuff/WagmiApp":"_astro/WagmiApp.b9b9c7f5.js","C:/Users/minec/Desktop/Dosyalar/NFTHUB/node_modules/@walletconnect/legacy-provider/dist/esm/index.js":"_astro/index.191f1ade.js","C:/Users/minec/Desktop/Dosyalar/NFTHUB/node_modules/@web3modal/ui/dist/index.js":"_astro/index.1cbc6bfa.js","C:/Users/minec/Desktop/Dosyalar/NFTHUB/node_modules/@walletconnect/ethereum-provider/dist/index.es.js":"_astro/index.es.f67445bd.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/logo.c3b366ff.svg","/_astro/login.ba6a10ba.css","/_astro/index.cc482efc.css","/_astro/mint.16e72fdb.css","/_astro/404.d05842a4.css","/_astro/404.484a649b.css","/astro-logo.svg","/favicon.svg","/login-background.webp","/user-avatar.png","/_astro/dijkstra.73e86c63.js","/_astro/hoisted.0e4e7821.js","/_astro/hoisted.579282a0.js","/_astro/http.10566e3e.js","/_astro/index.191f1ade.js","/_astro/index.1cbc6bfa.js","/_astro/index.32bf6694.js","/_astro/index.es.f67445bd.js","/_astro/index.f26dfb2d.js","/_astro/index.f62f4ab5.js","/_astro/ResponsiveToggle.astro_astro_type_script_index_0_lang.0ef87d1b.js","/_astro/WagmiApp.b9b9c7f5.js","/_astro/Web3Modal.5689e393.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
