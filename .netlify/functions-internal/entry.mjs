import * as adapter from '@astrojs/netlify/netlify-functions.js';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom/server';
import { g as server_default, h as deserializeManifest } from './chunks/astro.d9c4abc7.mjs';
import { _ as _page0, a as _page1, b as _page2, c as _page3, d as _page4 } from './chunks/pages/all.277442f6.mjs';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'html-escaper';
import 'string-width';
/* empty css                               *//* empty css                                 */import '@web3modal/ethereum';
import 'wagmi';
import 'wagmi/chains';
import 'react/jsx-runtime';
import '@web3modal/react';
/* empty css                               *//* empty css                                 */import 'axios';
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

const contexts = new WeakMap();

const ID_PREFIX = 'r';

function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) {
		return contexts.get(rendererContextResult);
	}
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		},
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}

function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}

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
	let prefix;
	if (this && this.result) {
		prefix = incrementId(this.result);
	}
	const attrs = { prefix };

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
	const renderOptions = {
		identifierPrefix: prefix,
	};
	let html;
	if (metadata && metadata.hydrate) {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode, renderOptions);
		} else {
			html = await renderToPipeableStreamAsync(vnode, renderOptions);
		}
	} else {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode, renderOptions);
		} else {
			html = await renderToStaticNodeStreamAsync(vnode, renderOptions);
		}
	}
	return { html, attrs };
}

async function renderToPipeableStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let error = undefined;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			...options,
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

async function renderToStaticNodeStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let stream = ReactDOM.renderToStaticNodeStream(vnode, options);
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

async function renderToReadableStreamAsync(vnode, options) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}

const _renderer1 = {
	check,
	renderToStaticMarkup,
};

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/settings.astro", _page1],["src/pages/login.astro", _page2],["src/pages/mint.astro", _page3],["src/pages/404.astro", _page4],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer1 }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.579282a0.js"}],"styles":[{"type":"external","src":"/_astro/404.0e327346.css"},{"type":"external","src":"/_astro/404.8316e5dd.css"},{"type":"external","src":"/_astro/index.919be82b.css"},{"type":"external","src":"/_astro/mint.f6213d81.css"},{"type":"external","src":"/_astro/404.ae483f87.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.0e4e7821.js"}],"styles":[{"type":"external","src":"/_astro/404.0e327346.css"},{"type":"external","src":"/_astro/404.8316e5dd.css"},{"type":"external","src":"/_astro/mint.f6213d81.css"},{"type":"external","src":"/_astro/404.ae483f87.css"}],"routeData":{"route":"/settings","type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/404.0e327346.css"},{"type":"external","src":"/_astro/404.8316e5dd.css"},{"type":"external","src":"/_astro/mint.f6213d81.css"},{"type":"external","src":"/_astro/login.7c09fc40.css"}],"routeData":{"route":"/login","type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.0e4e7821.js"}],"styles":[{"type":"external","src":"/_astro/404.0e327346.css"},{"type":"external","src":"/_astro/404.8316e5dd.css"},{"type":"external","src":"/_astro/mint.f6213d81.css"},{"type":"external","src":"/_astro/404.ae483f87.css"}],"routeData":{"route":"/mint","type":"page","pattern":"^\\/mint\\/?$","segments":[[{"content":"mint","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mint.astro","pathname":"/mint","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.0e4e7821.js"}],"styles":[{"type":"external","src":"/_astro/404.0e327346.css"},{"type":"external","src":"/_astro/404.8316e5dd.css"},{"type":"external","src":"/_astro/mint.f6213d81.css"},{"type":"external","src":"/_astro/404.ae483f87.css"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/pages/mint.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/pages/settings.astro",{"propagation":"none","containsHead":true}],["C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/pages/login.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/assets/img/logo.svg":"chunks/logo.1ed56ca3.mjs","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/web3stuff/Web3Modal":"_astro/Web3Modal.e5b9424b.js","/astro/hoisted.js?q=0":"_astro/hoisted.579282a0.js","/astro/hoisted.js?q=1":"_astro/hoisted.0e4e7821.js","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/web3stuff/FetchConfig":"_astro/FetchConfig.df336679.js","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/src/web3stuff/WagmiApp":"_astro/WagmiApp.b9670c58.js","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/node_modules/@web3modal/standalone/dist/index.js":"_astro/index.46bab6bd.js","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/node_modules/@web3modal/ui/dist/index.js":"_astro/index.2615517c.js","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/node_modules/@walletconnect/legacy-provider/dist/esm/index.js":"_astro/index.f682cdec.js","@astrojs/react/client.js":"_astro/client.88fd7bb1.js","C:/Users/minec/Desktop/Dosyalar/GithubDesktop/medium-algo/NFTHUB-Arthouse/node_modules/@wagmi/connectors/node_modules/@walletconnect/ethereum-provider/dist/index.es.js":"_astro/index.es.907b97ef.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/logo.ae71db30.svg","/_astro/404.0e327346.css","/_astro/404.8316e5dd.css","/_astro/404.ae483f87.css","/_astro/index.919be82b.css","/_astro/login.7c09fc40.css","/_astro/mint.f6213d81.css","/astro-logo.svg","/favicon.svg","/login-background.webp","/user-avatar.png","/_astro/client.88fd7bb1.js","/_astro/dijkstra.a3165471.js","/_astro/FetchConfig.df336679.js","/_astro/hoisted.0e4e7821.js","/_astro/hoisted.579282a0.js","/_astro/http.97921e65.js","/_astro/index.107e8414.js","/_astro/index.2615517c.js","/_astro/index.46bab6bd.js","/_astro/index.es.907b97ef.js","/_astro/index.f267fbc0.js","/_astro/index.f682cdec.js","/_astro/jsx-runtime.0e179ca2.js","/_astro/NFTHUB.60cfe2e0.js","/_astro/ResponsiveToggle.astro_astro_type_script_index_0_lang.0ef87d1b.js","/_astro/WagmiApp.b9670c58.js","/_astro/Web3Modal.e5b9424b.js"]}), {
	pageMap: pageMap,
	renderers: renderers,
	
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
