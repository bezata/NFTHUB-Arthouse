import * as adapter from '@astrojs/netlify/netlify-functions.js';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom/server';
import { g as server_default, h as deserializeManifest } from './chunks/astro.c41f1231.mjs';
import { _ as _page0, a as _page1, b as _page2, c as _page3, d as _page4 } from './chunks/pages/all.d778b556.mjs';
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
import 'react/jsx-runtime';
import 'axios';
/* empty css                               */import 'svgo';
/* empty css                                */
/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return createElement('astro-slot', {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for('react.element');

function errorIsComingFromPreactComponent(err) {
	return (
		err.message &&
		(err.message.startsWith("Cannot read property '__H'") ||
			err.message.includes("(reading '__H')"))
	);
}

async function check(Component, props, children) {
	// Note: there are packages that do some unholy things to create "components".
	// Checking the $$typeof property catches most of these patterns.
	if (typeof Component === 'object') {
		const $$typeof = Component['$$typeof'];
		return $$typeof && $$typeof.toString().slice('Symbol('.length).startsWith('react');
	}
	if (typeof Component !== 'function') return false;

	if (Component.prototype != null && typeof Component.prototype.render === 'function') {
		return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	}

	let error = null;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && vnode['$$typeof'] === reactTypeof) {
				isReactComponent = true;
			}
		} catch (err) {
			if (!errorIsComingFromPreactComponent(err)) {
				error = err;
			}
		}

		return React.createElement('div');
	}

	await renderToStaticMarkup(Tester, props, children, {});

	if (error) {
		throw error;
	}
	return isReactComponent;
}

async function getNodeWritable() {
	let nodeStreamBuiltinModuleName = 'stream';
	let { Writable } = await import(/* @vite-ignore */ nodeStreamBuiltinModuleName);
	return Writable;
}

async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
	delete props['class'];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = React.createElement(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = {
		...props,
		...slots,
	};
	const newChildren = children ?? props.children;
	if (newChildren != null) {
		newProps.children = React.createElement(StaticHtml, { value: newChildren });
	}
	const vnode = React.createElement(Component, newProps);
	let html;
	if (metadata && metadata.hydrate) {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToPipeableStreamAsync(vnode);
		}
	} else {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToStaticNodeStreamAsync(vnode);
		}
	}
	return { html };
}

async function renderToPipeableStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let error = undefined;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(
					new Writable({
						write(chunk, _encoding, callback) {
							html += chunk.toString('utf-8');
							callback();
						},
						destroy() {
							resolve(html);
						},
					})
				);
			},
		});
	});
}

async function renderToStaticNodeStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let stream = ReactDOM.renderToStaticNodeStream(vnode);
		stream.on('error', (err) => {
			reject(err);
		});
		stream.pipe(
			new Writable({
				write(chunk, _encoding, callback) {
					html += chunk.toString('utf-8');
					callback();
				},
				destroy() {
					resolve(html);
				},
			})
		);
	});
}

/**
 * Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
 * See https://github.com/facebook/react/issues/24169
 */
async function readResult(stream) {
	const reader = stream.getReader();
	let result = '';
	const decoder = new TextDecoder('utf-8');
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) {
				result += decoder.decode(value);
			} else {
				// This closes the decoder
				decoder.decode(new Uint8Array());
			}

			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}

async function renderToReadableStreamAsync(vnode) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode));
}

const _renderer1 = {
	check,
	renderToStaticMarkup,
};

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/settings.astro", _page1],["src/pages/login.astro", _page2],["src/pages/mint.astro", _page3],["src/pages/404.astro", _page4],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer1 }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["_astro/404.047f17ba.css","_astro/index.b56f145b.css","_astro/mint.e5ab8991.css","_astro/404.5a980b05.css"],"scripts":[{"type":"external","value":"_astro/hoisted.579282a0.js"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/404.047f17ba.css","_astro/mint.e5ab8991.css","_astro/404.5a980b05.css"],"scripts":[{"type":"external","value":"_astro/hoisted.0e4e7821.js"}],"routeData":{"route":"/settings","type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/404.047f17ba.css","_astro/mint.e5ab8991.css","_astro/login.6a3c7623.css"],"scripts":[],"routeData":{"route":"/login","type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/404.047f17ba.css","_astro/mint.e5ab8991.css","_astro/404.5a980b05.css"],"scripts":[{"type":"external","value":"_astro/hoisted.0e4e7821.js"}],"routeData":{"route":"/mint","type":"page","pattern":"^\\/mint\\/?$","segments":[[{"content":"mint","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mint.astro","pathname":"/mint","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["_astro/404.047f17ba.css","_astro/mint.e5ab8991.css","_astro/404.5a980b05.css"],"scripts":[{"type":"external","value":"_astro/hoisted.0e4e7821.js"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/mint.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/settings.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/login.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/assets/img/logo.svg":"chunks/logo.eab61cc4.mjs","C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/web3stuff/Web3Modal":"_astro/Web3Modal.7008a8d7.js","/astro/hoisted.js?q=1":"_astro/hoisted.0e4e7821.js","/astro/hoisted.js?q=0":"_astro/hoisted.579282a0.js","C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/node_modules/@web3modal/standalone/dist/index.js":"_astro/index.8b505842.js","C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/web3stuff/WagmiApp":"_astro/WagmiApp.729bab22.js","@astrojs/react/client.js":"_astro/client.5b70981e.js","C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/node_modules/@walletconnect/legacy-provider/dist/esm/index.js":"_astro/index.596f8c2b.js","C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/node_modules/@web3modal/ui/dist/index.js":"_astro/index.c084180e.js","C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/node_modules/@walletconnect/ethereum-provider/dist/index.es.js":"_astro/index.es.e133b260.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/logo.c3b366ff.svg","/_astro/404.5a980b05.css","/_astro/404.047f17ba.css","/_astro/index.b56f145b.css","/_astro/login.6a3c7623.css","/_astro/mint.e5ab8991.css","/login-background.webp","/user-avatar.png","/_astro/client.5b70981e.js","/_astro/dijkstra.73e86c63.js","/_astro/hoisted.0e4e7821.js","/_astro/hoisted.579282a0.js","/_astro/http.4286afc2.js","/_astro/index.21dad937.js","/_astro/index.596f8c2b.js","/_astro/index.8b505842.js","/_astro/index.b42d4934.js","/_astro/index.c084180e.js","/_astro/index.es.e133b260.js","/_astro/jsx-runtime.a6a2c4e9.js","/_astro/ResponsiveToggle.astro_astro_type_script_index_0_lang.0ef87d1b.js","/_astro/WagmiApp.729bab22.js","/_astro/Web3Modal.7008a8d7.js"]}), {
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
