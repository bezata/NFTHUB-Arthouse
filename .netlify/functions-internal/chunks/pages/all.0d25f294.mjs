import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as addAttribute, u as unescapeHTML, d as renderComponent, F as Fragment, e as renderSlot, f as renderHead, _ as __astro_tag_component__ } from '../astro.c41f1231.mjs';
/* empty css                           *//* empty css                         *//* empty css                           */import { w3mProvider, w3mConnectors, EthereumClient } from '@web3modal/ethereum';
import { Web3Modal, Web3Button } from '@web3modal/react';
import { configureChains, createClient, useAccount, WagmiConfig, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { jsxs, jsx } from 'react/jsx-runtime';
/* empty css                           */import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { parseEther } from 'ethers/lib/utils.js';
import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';
/* empty css                         */import { optimize } from 'svgo';
/* empty css                              */
const $$Astro$t = createAstro();
const $$ResponsiveToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$ResponsiveToggle;
  return renderTemplate`${maybeRenderHead($$result)}<button class="responsive-toggle" aria-expanded="false" aria-label="Open menu navigation">
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8h12M6 12h12M6 16h12"></path></svg>
</button>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/components/ResponsiveToggle.astro");

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$s = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/astro-icon/lib/Icon.astro");

const AstroIcon = Symbol("AstroIcon");
function trackSprite(result, name) {
  if (typeof result[AstroIcon] !== "undefined") {
    result[AstroIcon]["sprites"].add(name);
  } else {
    result[AstroIcon] = {
      sprites: /* @__PURE__ */ new Set([name])
    };
  }
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(result) {
  if (typeof result[AstroIcon] !== "undefined") {
    return Array.from(result[AstroIcon]["sprites"]);
  }
  const pathname = result._metadata.pathname;
  if (!warned.has(pathname)) {
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(pathname);
  }
  return [];
}

const $$Astro$r = createAstro();
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites($$result);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`display: none; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/astro-icon/lib/Spritesheet.astro");

const $$Astro$q = createAstro();
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/astro-icon/lib/SpriteProvider.astro");

const $$Astro$p = createAstro();
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite($$result, name);
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/astro-icon/lib/Sprite.astro");

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$o = createAstro();
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Navigation;
  return renderTemplate`${maybeRenderHead($$result)}<div id="main-navigation" class="is-desktop">
  <div class="desktop-menu">
    <nav>
      <ul>
        <li class="brand-logo">
          <img${addAttribute((await import('../logo.eab61cc4.mjs')).default, "src")}>
          <span class="sr-only">NFTHUB</span>
        </li>
        <li class="menu-item">
          <button class="toggle-expanded-view" aria-expanded="false">
            ${renderComponent($$result, "Icon", $$Icon, { "pack": "majesticons", "name": "chevron-double-right-line" })}
            <span class="sr-only">Expand menu</span>
          </button>
        </li>
        ${renderSlot($$result, $$slots["default"])}
        <li class="menu-item bottom-position"></li>
        <li class="menu-item bottom-position user-avatar">
          <a href="/settings/" class="logout-link">
            <img src="/user-avatar.png" alt="">
            <span class="sr-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container mobile-menu padding-16">
    <a href="/">
      <img${addAttribute((await import('../logo.eab61cc4.mjs')).default, "src")} alt="Your Logo">
    </a>
    ${renderComponent($$result, "ResponsiveToggle", $$ResponsiveToggle, {})}
    <nav>
      <ul>
        ${renderSlot($$result, $$slots["default"])}
        <li class="menu-item">
          <a href="/login">
            ${renderComponent($$result, "Icon", $$Icon, { "pack": "majesticons", "name": "logout-line" })}
            <span class="sr-only">Logout</span>
          </a>
        </li>
        <li class="menu-item user-avatar">
          <a href="/settings">
            <img src="/user-avatar.png" alt="">
            <span class="sr-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/components/Navigation.astro");

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$Astro$n = createAstro();
const $$Accordion = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Accordion;
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", '<div class="accordion">\n  <ul class="accordion__wrapper">\n    ', `
  </ul>
</div>

<script type="module">
  // variables
  const accordionItems = [...document.querySelectorAll('.accordion__item')]

  // functions
  const getPanelHeight = accordionItem => {
    const accordionInner = accordionItem.querySelector('.panel__inner')
    return accordionInner.getBoundingClientRect().height
  }

  const openAccordionItem = accordionItem => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionPanel.style.height = \`\${getPanelHeight(accordionItem)}px\`
    accordionItem.classList.add('is-active')
    accordionItemHeader.setAttribute('aria-expanded', true)
    accordionToggleIndicator.innerHTML = \`<svg class="header__toggle-indicator" aria-hidden="true" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\`
  }

  const closeAccordionItem = accordionItem => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionItem.classList.remove('is-active')
    accordionPanel.style.height = 0
    accordionItemHeader.focus()
    accordionItemHeader.setAttribute('aria-expanded', false)
    accordionToggleIndicator.innerHTML = \`<svg class="header__toggle-indicator" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\`
  }

  const isAccordionOpen = accordionItem => {
    return accordionItem.classList.contains('is-active')
  }

  function toggleAccordionItem () {
    const accordionItem = event.target.closest('.accordion__item')
    if (!accordionItem || event.target.closest('.accordion__panel')) return

    isAccordionOpen(accordionItem)
      ? closeAccordionItem(accordionItem)
      : openAccordionItem(accordionItem)
  }

  function recalculateHeight () {
    const toggledAccordionItems = accordionItems.filter(element => element.classList.contains('is-active'))

    toggledAccordionItems.forEach(toggledAccordionItem => {
      const accordionPanel = toggledAccordionItem.querySelector('.accordion__panel')
      accordionPanel.style.height = \`\${getPanelHeight(toggledAccordionItem)}px\`
    })
  }

  // execution
  accordionItems.forEach((item, index) => {
    const accordionItemHeader = item.querySelector('.accordion__header')
    const accordionItemPanel = item.querySelector('.accordion__panel')

    accordionItemHeader.setAttribute('id', \`accordion-item\${index + 1}\`)
    accordionItemPanel.setAttribute('id', \`item\${index + 1}\`)

    accordionItemHeader.setAttribute('aria-controls', \`item\${index + 1}\`)
    accordionItemPanel.setAttribute('aria-labelledby', \`accordion-item\${index + 1}\`)
  })

  document.addEventListener('keydown', event => {
    const accordionItem = event.target.closest('.accordion__item')

    if (event.key !== 'Escape') return
    if (!accordionItem) return

    if (isAccordionOpen(accordionItem)) {
      closeAccordionItem(accordionItem)
    }
  })

  document.addEventListener('keydown', event => {
    if (!event.target.closest('.accordion__header')) return

    const accordionWrapper = event.target.closest('.accordion__wrapper')
    const accordionItem = event.target.closest('.accordion__item')
    const accordionItems = [...accordionWrapper.querySelectorAll('.accordion__item')]
    const index = accordionItems.findIndex(element => element === accordionItem)

    const { key } = event

    let targetItem

    if (key === 'ArrowDown') {
      targetItem = accordionItems[index + 1]
    }

    if (key === 'ArrowUp') {
      targetItem = accordionItems[index - 1]
    }

    if (targetItem) {
      event.preventDefault()
      targetItem.querySelector('.accordion__header').focus()
    }
  })

  window.toggleAccordionItem = toggleAccordionItem
  window.onresize = recalculateHeight
<\/script>`], ["", '<div class="accordion">\n  <ul class="accordion__wrapper">\n    ', `
  </ul>
</div>

<script type="module">
  // variables
  const accordionItems = [...document.querySelectorAll('.accordion__item')]

  // functions
  const getPanelHeight = accordionItem => {
    const accordionInner = accordionItem.querySelector('.panel__inner')
    return accordionInner.getBoundingClientRect().height
  }

  const openAccordionItem = accordionItem => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionPanel.style.height = \\\`\\\${getPanelHeight(accordionItem)}px\\\`
    accordionItem.classList.add('is-active')
    accordionItemHeader.setAttribute('aria-expanded', true)
    accordionToggleIndicator.innerHTML = \\\`<svg class="header__toggle-indicator" aria-hidden="true" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\\\`
  }

  const closeAccordionItem = accordionItem => {
    const accordionItemHeader = accordionItem.querySelector('.accordion__header')
    const accordionToggleIndicator = accordionItem.querySelector('.header__toggle-indicator')
    const accordionPanel = accordionItem.querySelector('.accordion__panel')

    accordionItem.classList.remove('is-active')
    accordionPanel.style.height = 0
    accordionItemHeader.focus()
    accordionItemHeader.setAttribute('aria-expanded', false)
    accordionToggleIndicator.innerHTML = \\\`<svg class="header__toggle-indicator" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>\\\`
  }

  const isAccordionOpen = accordionItem => {
    return accordionItem.classList.contains('is-active')
  }

  function toggleAccordionItem () {
    const accordionItem = event.target.closest('.accordion__item')
    if (!accordionItem || event.target.closest('.accordion__panel')) return

    isAccordionOpen(accordionItem)
      ? closeAccordionItem(accordionItem)
      : openAccordionItem(accordionItem)
  }

  function recalculateHeight () {
    const toggledAccordionItems = accordionItems.filter(element => element.classList.contains('is-active'))

    toggledAccordionItems.forEach(toggledAccordionItem => {
      const accordionPanel = toggledAccordionItem.querySelector('.accordion__panel')
      accordionPanel.style.height = \\\`\\\${getPanelHeight(toggledAccordionItem)}px\\\`
    })
  }

  // execution
  accordionItems.forEach((item, index) => {
    const accordionItemHeader = item.querySelector('.accordion__header')
    const accordionItemPanel = item.querySelector('.accordion__panel')

    accordionItemHeader.setAttribute('id', \\\`accordion-item\\\${index + 1}\\\`)
    accordionItemPanel.setAttribute('id', \\\`item\\\${index + 1}\\\`)

    accordionItemHeader.setAttribute('aria-controls', \\\`item\\\${index + 1}\\\`)
    accordionItemPanel.setAttribute('aria-labelledby', \\\`accordion-item\\\${index + 1}\\\`)
  })

  document.addEventListener('keydown', event => {
    const accordionItem = event.target.closest('.accordion__item')

    if (event.key !== 'Escape') return
    if (!accordionItem) return

    if (isAccordionOpen(accordionItem)) {
      closeAccordionItem(accordionItem)
    }
  })

  document.addEventListener('keydown', event => {
    if (!event.target.closest('.accordion__header')) return

    const accordionWrapper = event.target.closest('.accordion__wrapper')
    const accordionItem = event.target.closest('.accordion__item')
    const accordionItems = [...accordionWrapper.querySelectorAll('.accordion__item')]
    const index = accordionItems.findIndex(element => element === accordionItem)

    const { key } = event

    let targetItem

    if (key === 'ArrowDown') {
      targetItem = accordionItems[index + 1]
    }

    if (key === 'ArrowUp') {
      targetItem = accordionItems[index - 1]
    }

    if (targetItem) {
      event.preventDefault()
      targetItem.querySelector('.accordion__header').focus()
    }
  })

  window.toggleAccordionItem = toggleAccordionItem
  window.onresize = recalculateHeight
<\/script>`])), maybeRenderHead($$result), renderSlot($$result, $$slots["default"]));
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/Accordion.astro");

const $$Astro$m = createAstro();
const $$AccordionItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$AccordionItem;
  const { header } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<li class="accordion__item">
  <h3>
    <button id="accordion-header-1" class="accordion__header" aria-expanded="false" aria-controls="accordion-panel-1" onclick="toggleAccordionItem()">
      ${header}
      <svg class="header__toggle-indicator" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
      </svg>
    </button>
  </h3>
  <div id="accordion-panel-1" role="region" class="accordion__panel" aria-labelledby="accordion-header-1">
    <div class="panel__inner">
      ${renderSlot($$result, $$slots["default"])}
    </div>
  </div>
</li>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/AccordionItem.astro");

const $$Astro$l = createAstro();
const $$Breadcrumbs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  return renderTemplate`${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumbs">
  <ol>
    ${renderSlot($$result, $$slots["default"])}
  </ol>
</nav>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/Breadcrumbs.astro");

const $$Astro$k = createAstro();
const $$BreadcrumbsItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$BreadcrumbsItem;
  const {
    href = "#",
    label = "Breadcrumb",
    currentPage = false
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<li class="breadcrumbs__item">
  ${currentPage ? renderTemplate`<span>${label}</span>` : renderTemplate`<a${addAttribute(href, "href")}>${label}</a>`}
</li>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/BreadcrumbsItem.astro");

const $$Astro$j = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Card;
  const {
    url = "#",
    img = "https://fakeimg.pl/640x360",
    title = "Default title",
    footer = "Your name"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="card">
  <div class="card__image">
    <img${addAttribute(img, "src")} alt="">
  </div>
  <div class="card__content">
    <h3>
      <a${addAttribute(url, "href")}>${title}</a>
    </h3>
    <p>
      ${renderSlot($$result, $$slots["default"], renderTemplate`Default description.`)}
    </p>
    <small>
      ${footer}
    </small>
  </div>
</div>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/Card.astro");

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$i = createAstro();
const $$DarkMode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$DarkMode;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", `<button class="darkmode-toggle" aria-pressed="false" aria-label="Enable dark mode">
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"></path></svg>
</button>

<script>
  // variables
  let darkMode = localStorage.getItem('darkMode')
  const darkModeToggle = document.querySelector('.darkmode-toggle')

  // functions
  const enableDarkMode = () => {
    document.body.classList.add('darkmode')
    darkModeToggle.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3zM5.707 4.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zm14 0a1 1 0 0 0-1.414 0l-1 1a1 1 0 0 0 1.414 1.414l1-1a1 1 0 0 0 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-9 4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H3zm17 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1zM6.707 18.707a1 1 0 1 0-1.414-1.414l-1 1a1 1 0 1 0 1.414 1.414l1-1zm12-1.414a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zM13 20a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z" fill="currentColor"/></svg>\`
    darkModeToggle.setAttribute('aria-pressed', 'true')
    darkModeToggle.setAttribute('aria-label', 'Disable dark mode')
    localStorage.setItem('darkMode', 'enabled')
  }

  const disableDarkMode = () => {
    document.body.classList.remove('darkmode')
    darkModeToggle.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"/></svg>\`
    darkModeToggle.setAttribute('aria-pressed', 'false')
    darkModeToggle.setAttribute('aria-label', 'Enable dark mode')
    localStorage.setItem('darkMode', null)
  }

  // execution
  if (darkMode === 'enabled') enableDarkMode()

  darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode')

    darkMode !== 'enabled'
      ? enableDarkMode()
      : disableDarkMode()
  })
<\/script>`], ["", `<button class="darkmode-toggle" aria-pressed="false" aria-label="Enable dark mode">
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"></path></svg>
</button>

<script>
  // variables
  let darkMode = localStorage.getItem('darkMode')
  const darkModeToggle = document.querySelector('.darkmode-toggle')

  // functions
  const enableDarkMode = () => {
    document.body.classList.add('darkmode')
    darkModeToggle.innerHTML = \\\`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0V3zM5.707 4.293a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zm14 0a1 1 0 0 0-1.414 0l-1 1a1 1 0 0 0 1.414 1.414l1-1a1 1 0 0 0 0-1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-9 4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2H3zm17 0a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1zM6.707 18.707a1 1 0 1 0-1.414-1.414l-1 1a1 1 0 1 0 1.414 1.414l1-1zm12-1.414a1 1 0 0 0-1.414 1.414l1 1a1 1 0 0 0 1.414-1.414l-1-1zM13 20a1 1 0 1 0-2 0v1a1 1 0 1 0 2 0v-1z" fill="currentColor"/></svg>\\\`
    darkModeToggle.setAttribute('aria-pressed', 'true')
    darkModeToggle.setAttribute('aria-label', 'Disable dark mode')
    localStorage.setItem('darkMode', 'enabled')
  }

  const disableDarkMode = () => {
    document.body.classList.remove('darkmode')
    darkModeToggle.innerHTML = \\\`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.353 3C5.849 4.408 3 7.463 3 11.47A9.53 9.53 0 0 0 12.53 21c4.007 0 7.062-2.849 8.47-6.353C8.17 17.065 8.14 8.14 9.353 3z"/></svg>\\\`
    darkModeToggle.setAttribute('aria-pressed', 'false')
    darkModeToggle.setAttribute('aria-label', 'Enable dark mode')
    localStorage.setItem('darkMode', null)
  }

  // execution
  if (darkMode === 'enabled') enableDarkMode()

  darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode')

    darkMode !== 'enabled'
      ? enableDarkMode()
      : disableDarkMode()
  })
<\/script>`])), maybeRenderHead($$result));
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/DarkMode.astro");

const $$Astro$h = createAstro();
const $$Media$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Media$1;
  const {
    class: classNames,
    src = "https://shorturl.at/tCPS2",
    alt = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(classNames, "class")}${addAttribute(src, "src")}${addAttribute(alt, "alt")} loading="lazy" decoding="async">`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/Media.astro");

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$g = createAstro();
const $$Modal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Modal;
  const {
    triggerId,
    title,
    closeText = "Close"
  } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div class="modal" role="dialog"', '>\n  <div class="modal__inner">\n    <div class="modal__content">\n      <h3 tabindex="-1">\n        ', "\n      </h3>\n      ", '\n    </div>\n    <div class="modal__close">\n      <button>', `</button>
    </div>
  </div>
</div>

<script type="module">
  // variables
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  const modalId = modal.getAttribute('aria-labelledby')
  const modalCloseButton = modal.querySelector('.modal__close button')
  const modalTrigger = document.querySelector(\`#\${modalId}\`)
  
  // functions
  const teleportToRoot = element => {
    element.remove()
    body.appendChild(element)
  }

  const getKeyboardFocusableElements = element => {
    return [...element.querySelectorAll(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    )]
      .filter(el => !el.hasAttribute('disabled'))
  }

  const trapFocus = event => {
    const focusables = getKeyboardFocusableElements(modal)
    const firstFocusable = focusables[0]
    const lastFocusable = focusables[focusables.length - 1]

    if (document.activeElement === lastFocusable && event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault()
      firstFocusable.focus()
    }

    if (document.activeElement === firstFocusable && event.key === 'Tab' && event.shiftKey) {
      event.preventDefault()
      lastFocusable.focus()
    }
  }

  const openModal = _ => {
    const modalTitle = modal.querySelector('h3')

    modal.classList.add('show')
    body.classList.add('modal-is-active')
    modalTitle.focus()
    document.addEventListener('keydown', trapFocus)

    modal.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeModal()
      }
    })
  }

  const closeModal = _ => {
    modal.classList.remove('show')
    body.classList.remove('modal-is-active')
    modalTrigger.focus({ preventScroll: true })
    document.removeEventListener('keydown', trapFocus)
  }

  // execution
  teleportToRoot(modal)

  modalTrigger.addEventListener('click', openModal)

  modalCloseButton.addEventListener('click', closeModal)

  modal.addEventListener('click', event => { 
    if (!event.target.closest('.modal__content')) {
      closeModal()
    }
  })

  window.closeModal = closeModal
<\/script>`], ["", '<div class="modal" role="dialog"', '>\n  <div class="modal__inner">\n    <div class="modal__content">\n      <h3 tabindex="-1">\n        ', "\n      </h3>\n      ", '\n    </div>\n    <div class="modal__close">\n      <button>', `</button>
    </div>
  </div>
</div>

<script type="module">
  // variables
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  const modalId = modal.getAttribute('aria-labelledby')
  const modalCloseButton = modal.querySelector('.modal__close button')
  const modalTrigger = document.querySelector(\\\`#\\\${modalId}\\\`)
  
  // functions
  const teleportToRoot = element => {
    element.remove()
    body.appendChild(element)
  }

  const getKeyboardFocusableElements = element => {
    return [...element.querySelectorAll(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    )]
      .filter(el => !el.hasAttribute('disabled'))
  }

  const trapFocus = event => {
    const focusables = getKeyboardFocusableElements(modal)
    const firstFocusable = focusables[0]
    const lastFocusable = focusables[focusables.length - 1]

    if (document.activeElement === lastFocusable && event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault()
      firstFocusable.focus()
    }

    if (document.activeElement === firstFocusable && event.key === 'Tab' && event.shiftKey) {
      event.preventDefault()
      lastFocusable.focus()
    }
  }

  const openModal = _ => {
    const modalTitle = modal.querySelector('h3')

    modal.classList.add('show')
    body.classList.add('modal-is-active')
    modalTitle.focus()
    document.addEventListener('keydown', trapFocus)

    modal.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeModal()
      }
    })
  }

  const closeModal = _ => {
    modal.classList.remove('show')
    body.classList.remove('modal-is-active')
    modalTrigger.focus({ preventScroll: true })
    document.removeEventListener('keydown', trapFocus)
  }

  // execution
  teleportToRoot(modal)

  modalTrigger.addEventListener('click', openModal)

  modalCloseButton.addEventListener('click', closeModal)

  modal.addEventListener('click', event => { 
    if (!event.target.closest('.modal__content')) {
      closeModal()
    }
  })

  window.closeModal = closeModal
<\/script>`])), maybeRenderHead($$result), addAttribute(triggerId, "aria-labelledby"), title, renderSlot($$result, $$slots["default"], renderTemplate`Modal description.`), closeText);
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/Modal.astro");

const $$Astro$f = createAstro();
const $$Notification = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Notification;
  const {
    type = "default",
    role = "none",
    ariaLive = "off"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`notification type-${type}`, "class")}${addAttribute(role, "role")}${addAttribute(ariaLive, "aria-live")}>
  ${renderSlot($$result, $$slots["default"], renderTemplate`
    <p><strong>Message:</strong> This is a notification!</p>
  `)}
</div>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/Notification.astro");

const $$Astro$e = createAstro();
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Pagination;
  const {
    firstPage = "#",
    previousPage = "#",
    nextPage = "#",
    lastPage = "#",
    currentPage = "1",
    totalPages = "12"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<nav class="pagination" aria-label="Pagination">
  <ul class="pagination__list">
    <li>
      ${firstPage ? renderTemplate`<a${addAttribute(firstPage, "href")} aria-label="Go to the first page"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.6667 9L18 15.6667L24.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 9L8 15.6667L14.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>` : renderTemplate`<span class="disabled"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.6667 9L18 15.6667L24.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6667 9L8 15.6667L14.6667 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>`}
    </li>
    <li>
      ${previousPage ? renderTemplate`<a${addAttribute(previousPage, "href")}${addAttribute(`Go back to ${previousPage}`, "aria-label")}><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 7-5 5 5 5"></path></svg></a>` : renderTemplate`<span class="disabled"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 7-5 5 5 5"></path></svg></span>`}
    </li>
    <li>
      <span>Page ${currentPage} of ${totalPages}</span>
    </li>
    <li>
      ${nextPage ? renderTemplate`<a${addAttribute(nextPage, "href")}${addAttribute(`Go to ${nextPage}`, "aria-label")}><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 7 5 5-5 5"></path></svg></a>` : renderTemplate`<span class="disabled"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 7 5 5-5 5"></path></svg></span>`}
    </li>
    <li>
      ${lastPage ? renderTemplate`<a${addAttribute(lastPage, "href")} aria-label="Go to the last page"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 9L14 15.6667L7.33333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.3333 9L24 15.6667L17.3333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>` : renderTemplate`<span class="disabled"><svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33333 9L14 15.6667L7.33333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.3333 9L24 15.6667L17.3333 22.3333" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>`}
    </li>
  </ul>
</nav>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/Pagination.astro");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$d = createAstro();
const $$SkipLinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$SkipLinks;
  return renderTemplate(_a || (_a = __template(["", `<div class="skip-links">
  <a href="#main-content">Skip to main content</a>
</div>

<script type="module">
  // variables
  const skipLink = document.querySelector('.skip-links a')

  // execution
  skipLink.addEventListener('keydown', event => {
    if (!event.target.closest('a')) return
    const key = event.key

    if (key !== 'Enter') return
    event.preventDefault()
    const target = event.target.getAttribute('href')

    if (document.querySelector(target)) {
      const targetElement = document.querySelector(target)
      targetElement.setAttribute('tabindex', '-1')
      targetElement.focus()
    } else if (!document.querySelector(target) && document.querySelector('h1')) {
      const h1 = document.querySelector('h1')
      h1.setAttribute('tabindex', '-1')
      h1.focus()
    } else {
      console.warn('SkipLinks are not set, either missing an h1 or main content id on the page.')
    }
  })
<\/script>`])), maybeRenderHead($$result));
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/node_modules/accessible-astro-components/SkipLinks.astro");

const $$Astro$c = createAstro();
const $$DefaultLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$DefaultLayout;
  const { title } = Astro2.props;
  let subtitle = "Dacade Celo Nft";
  return renderTemplate`<html lang="en" dir="ltr" class="astro-QUP72GQN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap" rel="stylesheet">

    <!-- open graph -->
    <meta property="og:title" content="Accessible Astro Dashboard">
    <meta property="og:description" content="An Accessible Dashboard Theme for Astro including a login page, a dashboard page and several other pages and components.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dashboard.accessible-astro.dev">
    <meta property="og:image" content="/social-preview-image.png">

    <!-- page title -->
    <title>${title} - ${subtitle}</title>
  ${renderHead($$result)}</head>
  <body class="astro-QUP72GQN">
    <header class="astro-QUP72GQN">
      ${renderComponent($$result, "SkipLinks", $$SkipLinks, { "class": "astro-QUP72GQN" })}
    </header>
    <div class="ui-controls astro-QUP72GQN">
      ${renderComponent($$result, "DarkMode", $$DarkMode, { "class": "astro-QUP72GQN" })}
    </div>
    <div class="admin-interface astro-QUP72GQN">
      ${renderComponent($$result, "Navigation", $$Navigation, { "class": "astro-QUP72GQN" }, { "default": ($$result2) => renderTemplate`<li class="menu-item astro-QUP72GQN">
          <a href="/" class="astro-QUP72GQN">
            ${renderComponent($$result2, "Icon", $$Icon, { "pack": "majesticons", "name": "home-line", "class": "astro-QUP72GQN" })}
            <span class="sr-only astro-QUP72GQN">Dashboard</span>
          </a>
        </li><li class="menu-item astro-QUP72GQN">
          <a href="/products/" class="astro-QUP72GQN">
            ${renderComponent($$result2, "Icon", $$Icon, { "pack": "majesticons", "name": "shopping-cart-line", "class": "astro-QUP72GQN" })}
            <span class="sr-only astro-QUP72GQN">Products</span>
          </a>
        </li><li class="menu-item astro-QUP72GQN">
          <a href="/wishlist/" class="astro-QUP72GQN">
            ${renderComponent($$result2, "Icon", $$Icon, { "pack": "majesticons", "name": "plus-line", "class": "astro-QUP72GQN" })}
            <span class="sr-only astro-QUP72GQN">Wishlist</span>
          </a>
        </li><li class="menu-item astro-QUP72GQN">
          <a href="/mint/" class="astro-QUP72GQN">
            ${renderComponent($$result2, "Icon", $$Icon, { "pack": "majesticons", "name": "plus-line", "class": "astro-QUP72GQN" })}
            <span class="sr-only astro-QUP72GQN">NFT</span>
          </a>
        </li>` })}
      <main id="main-content" class="astro-QUP72GQN">
        ${renderSlot($$result, $$slots["default"])}
      </main>
    </div>
  



</body></html>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/layouts/DefaultLayout.astro");

const $$Astro$b = createAstro();
const $$DashboardWidget = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$DashboardWidget;
  const {
    number = "+54",
    title = "New messages",
    type = "success"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="dashboard-widget radius-large space-24 elevation-400 space-content type-\${type} astro-7UY5FNOF">
  <p class="size-48 astro-7UY5FNOF">
    <strong class="astro-7UY5FNOF">${number}</strong>
  </p>
  <p class="size-20 astro-7UY5FNOF">
    <em class="astro-7UY5FNOF">${title}</em>
  </p>
</div>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/components/DashboardWidget.astro");

const chains$1 = [sepolia];
const projectId$1 = "6e18bca83b6d8c08562669f22a83ca97";
const {
  provider: provider$1
} = configureChains(chains$1, [w3mProvider({
  projectId: projectId$1
})]);
const wagmiClient$1 = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: projectId$1,
    version: 2,
    chains: chains$1
  }),
  provider: provider$1
});
const ethereumClient = new EthereumClient(wagmiClient$1, chains$1);
function ModalWallet() {
  useAccount({
    onConnect({
      address,
      connector,
      isReconnected,
      isConnected
    }) {
      console.log("Connected", {
        address,
        connector,
        isReconnected,
        isConnected
      });
      localStorage.setItem("isLoggedIn", "true");
      redirectToUrl();
    }
  });
  useAccount({
    onDisconnect() {
      console.log("Disconnected");
      window.location.href = "/login";
      localStorage.setItem("isLoggedIn", "false");
      resetRedirect();
    }
  });
  function redirectToUrl() {
    const hasRedirected = localStorage.getItem("hasRedirected") === "true";
    if (!hasRedirected) {
      localStorage.setItem("hasRedirected", "true");
      window.location.href = "/";
    }
  }
  function resetRedirect() {
    localStorage.removeItem("hasRedirected");
  }
  return /* @__PURE__ */ jsxs(WagmiConfig, {
    client: wagmiClient$1,
    children: [/* @__PURE__ */ jsx(Web3Modal, {
      projectId: "6e18bca83b6d8c08562669f22a83ca97",
      ethereumClient,
      themeVariables: {
        "--w3m-font-family": "Roboto, sans-serif",
        "--w3m-accent-color": "#808080",
        "--w3m-logo-image-url": "https://cryptologos.cc/logos/celo-celo-logo.png",
        "--w3m-background-image-url": "https://cdn-images-1.medium.com/max/1200/1*hc-eMjCYyT3EpE7ujfrXBQ.png",
        chainImages: {
          1: "/images/ethereum.webp",
          137: "/images/polygon.webp",
          44787: "/images/celo.webp"
        }
      }
    }), /* @__PURE__ */ jsx(Web3Button, {})]
  });
}
__astro_tag_component__(ModalWallet, "@astrojs/react");

const $$Astro$a = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>Welcome NFTHUB 🧑‍🚀</h1><br>
    ${renderComponent($$result2, "ModalWallet", ModalWallet, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/web3stuff/Web3Modal", "client:component-export": "default" })}

    <p class="size-20"></p>
  </section><section class="margin-32">
    <div class="space-content">
      <div class="contents">
        <h2>Widgets</h2>
        <p id="current-time" class="size-12"></p>
      </div>
      <div class="grid small-grid-1 medium-grid-2 large-grid-3 equal-height">
        ${renderComponent($$result2, "DashboardWidget", $$DashboardWidget, {})}
        ${renderComponent($$result2, "DashboardWidget", $$DashboardWidget, { "number": "+33", "title": "Products sold" })}
        ${renderComponent($$result2, "DashboardWidget", $$DashboardWidget, { "number": "-120", "title": "Images deleted", "type": "error" })}
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
        <div class="radius-large space-96" style="border: 4px dashed grey;">
        </div>
      </div>
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/index.astro");

const $$file$8 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/index.astro";
const $$url$8 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$9 = createAstro();
const $$EmpyState = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$EmpyState;
  return renderTemplate`${renderComponent($$result, "Notification", $$Notification, { "type": "info" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "pack": "majesticons", "name": "academic-cap-line" })}${renderSlot($$result2, $$slots["default"])}` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/components/EmpyState.astro");

const $$Astro$8 = createAstro();
const $$Messages = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Messages;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Messages" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>Messages</h1><br>
    <p class="size-20">Lorem ipsum dolor sit amet.</p>
  </section><section class="margin-32">
    <div class="space-content">
      <h2>Messages overview</h2>
      ${renderComponent($$result2, "EmpyState", $$EmpyState, {}, { "default": ($$result3) => renderTemplate`
        You haven't added any messages yet. Start by adding some.
      ` })}
      <button id="modal-trigger" class="button color-secondary">Add your first message</button>
      ${renderComponent($$result2, "Modal", $$Modal, { "triggerId": "modal-trigger", "title": "Add message", "closeText": "Cancel" }, { "default": ($$result3) => renderTemplate`<p>
          You can use this component to include a form that adds a new message
          to the list.
        </p>` })}
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/messages.astro");

const $$file$7 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/messages.astro";
const $$url$7 = "/messages";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Messages,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$7 = createAstro();
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Products;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Products" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>Products</h1><br>
    <p class="size-20">Lorem ipsum dolor sit amet.</p>
  </section><section class="margin-32">
    <div class="space-content">
      <h2>Product overview</h2>
      ${renderComponent($$result2, "EmpyState", $$EmpyState, {}, { "default": ($$result3) => renderTemplate`
        You haven't added any products yet. Start by adding some.
      ` })}
      <button id="modal-trigger" class="button color-secondary">Add your first product</button>
      ${renderComponent($$result2, "Modal", $$Modal, { "triggerId": "modal-trigger", "title": "Add product", "closeText": "Cancel" }, { "default": ($$result3) => renderTemplate`<p>You can use this component to include a form that adds a new product to the list.</p>` })}
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/products.astro");

const $$file$6 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/products.astro";
const $$url$6 = "/products";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro();
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Settings;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Settings" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>Wallet</h1><br>
  </section><section class="margin-32">
    <div class="space-content">
      <div class="contents"></div>
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/settings.astro");

const $$file$5 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/settings.astro";
const $$url$5 = "/settings";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const $$Wishlist = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Wishlist;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Users" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>Wishlist</h1><br>
    <p class="size-20">Look at your Wishlist</p>
  </section><section class="margin-32">
    <div class="space-content">
      ${renderComponent($$result2, "EmpyState", $$EmpyState, {}, { "default": ($$result3) => renderTemplate`
        You haven't added any NFT yet. Start by adding some.
      ` })}
      <button id="modal-trigger" class="button color-secondary">Add your first NFT</button>
      ${renderComponent($$result2, "Modal", $$Modal, { "triggerId": "modal-trigger", "title": "Add user", "closeText": "Cancel" }, { "default": ($$result3) => renderTemplate`<p></p>` })}
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/wishlist.astro");

const $$file$4 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/wishlist.astro";
const $$url$4 = "/wishlist";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Wishlist,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
const $$LoginLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LoginLayout;
  const { title } = Astro2.props;
  let subtitle = "NFTHUB";
  return renderTemplate`<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap" rel="stylesheet">

    <!-- open graph -->
    <meta property="og:title" content="NFTHUB">
    <meta property="og:description" content="You can sell your NFT'">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dashboard.accessible-astro.dev">
    <meta property="og:image" content="/social-preview-image.png">

    <!-- page title -->
    <title>${title} - ${subtitle}</title>
  ${renderHead($$result)}</head>
  <body>
    <main id="main-content">
      ${renderSlot($$result, $$slots["default"])}
    </main>
  </body></html>`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/layouts/LoginLayout.astro");

const $$Astro$3 = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate`${renderComponent($$result, "LoginLayout", $$LoginLayout, { "title": "Login", "class": "astro-SGPQYURT" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section class="bg-neutral-100 astro-SGPQYURT">
    <div class="login astro-SGPQYURT">
      <div class="login__inner reveal h-screen astro-SGPQYURT">
        <div class="inner__brand astro-SGPQYURT">
          <div class="bg-neutral-900 radius-large space-8 astro-SGPQYURT">
            <img class="brand__logo radius-large astro-SGPQYURT" src="/astro-logo.svg" alt="">
          </div>
          <div class="brand__text astro-SGPQYURT">
            <span class="astro-SGPQYURT">NFTHUB Dashboard</span>
            <span class="astro-SGPQYURT">Sell your NFT!</span>
          </div>
        </div>
        <div class="inner__form space-content astro-SGPQYURT">
          ${renderComponent($$result2, "Notification", $$Notification, { "class": "astro-SGPQYURT" }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "pack": "majesticons", "name": "information-circle-line", "class": "astro-SGPQYURT" })}<p class="size-14 astro-SGPQYURT">
              Log in using <strong class="astro-SGPQYURT">Connect Wallet</strong>.
            </p>${renderComponent($$result3, "ModalWallet", ModalWallet, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/web3stuff/Web3Modal", "client:component-export": "default", "class": "astro-SGPQYURT" })}` })}
          <div class="space-content astro-SGPQYURT"></div>
        </div>
        <div class="login__footer text-neutral-700 astro-SGPQYURT">
          <p class="astro-SGPQYURT">
            <em class="astro-SGPQYURT">Check my github!<a href="https://github.com/bezata" class="astro-SGPQYURT">bezata</a></em>
          </p>
        </div>
      </div>
      <div class="login__background h-screen astro-SGPQYURT"></div>
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/login.astro");

const $$file$3 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/login.astro";
const $$url$3 = "/login";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$Media = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Media;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Media" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>Media</h1><br>
    <p class="size-20">Lorem ipsum dolor sit amet.</p>
  </section><section class="margin-32">
    <div class="space-content">
      <div class="contents">
        <h2>Media overview</h2>
        <p><em>Results: 1-6 of 24</em></p>
      </div>
      <button id="modal-trigger" class="button color-secondary">Add new media item</button>
      ${renderComponent($$result2, "Modal", $$Modal, { "triggerId": "modal-trigger", "title": "Add media", "closeText": "Cancel" }, { "default": ($$result3) => renderTemplate`<p>
          You can use this component to include a form that adds a new media
          item to the list.
        </p>` })}
      <div class="grid small-grid-1 medium-grid-2 large-grid-3 equal-height">
        ${renderComponent($$result2, "Media", $$Media$1, { "classes": "media radius-large elevation-400", "src": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80" })}
        ${renderComponent($$result2, "Media", $$Media$1, { "classes": "media radius-large elevation-400", "src": "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1758&q=80" })}
        ${renderComponent($$result2, "Media", $$Media$1, { "classes": "media radius-large elevation-400", "src": "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80" })}
        ${renderComponent($$result2, "Media", $$Media$1, { "classes": "media radius-large elevation-400", "src": "https://images.unsplash.com/photo-1590907047706-ee9c08cf3189?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80" })}
        ${renderComponent($$result2, "Media", $$Media$1, { "classes": "media radius-large elevation-400", "src": "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1402&q=80" })}
        ${renderComponent($$result2, "Media", $$Media$1, { "classes": "media radius-large elevation-400", "src": "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" })}
      </div>
    </div>
    <div class="grid align-horizontal margin-32">
      ${renderComponent($$result2, "Pagination", $$Pagination, {})}
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/media.astro");

const $$file$2 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/media.astro";
const $$url$2 = "/media";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Media,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

function SendTransaction() {
  const [to, setTo] = React.useState("");
  const [debouncedTo] = useDebounce(to, 500);
  const [amount, setAmount] = React.useState("");
  const [debouncedAmount] = useDebounce(amount, 500);
  const {
    config
  } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? parseEther(debouncedAmount) : void 0
    }
  });
  const {
    data,
    sendTransaction
  } = useSendTransaction(config);
  const {
    isLoading,
    isSuccess
  } = useWaitForTransaction({
    hash: data?.hash
  });
  return /* @__PURE__ */ jsxs("form", {
    onSubmit: (e) => {
      e.preventDefault();
      sendTransaction?.();
    },
    children: [/* @__PURE__ */ jsx("input", {
      "aria-label": "Recipient",
      onChange: (e) => setTo(e.target.value),
      placeholder: "0xA0Cf…251e",
      value: to
    }), /* @__PURE__ */ jsx("input", {
      "aria-label": "Amount (ether)",
      onChange: (e) => setAmount(e.target.value),
      placeholder: "0.05",
      value: amount
    }), /* @__PURE__ */ jsx("button", {
      disabled: isLoading || !sendTransaction || !to || !amount,
      children: isLoading ? "Sending..." : "Send"
    }), isSuccess && /* @__PURE__ */ jsxs("div", {
      children: ["Successfully sent ", amount, " ether to ", to, /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("a", {
          href: `https://sepolia.etherscan.io/tx/${data?.hash}`,
          children: "Etherscan"
        })
      })]
    })]
  });
}
__astro_tag_component__(SendTransaction, "@astrojs/react");

const nfthubABI = [
	{
		inputs: [
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "id",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "tokenURI",
				type: "string"
			}
		],
		name: "ItemListed",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "id",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "buyer",
				type: "address"
			}
		],
		name: "ItemSold",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256"
			}
		],
		name: "buyNFT",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256"
			}
		],
		name: "fetchItem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "",
				type: "string"
			},
			{
				internalType: "string",
				name: "",
				type: "string"
			},
			{
				internalType: "string",
				name: "",
				type: "string"
			},
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getListingPrice",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "description",
				type: "string"
			},
			{
				internalType: "string",
				name: "tokenURI",
				type: "string"
			}
		],
		name: "listNFT",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newPrice",
				type: "uint256"
			}
		],
		name: "setListingPrice",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "withdraw",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

const NFTHUB_ADDRESS = "0x4454204f34492def6fdeF3b3Fa0E3B9B5C8D4a5B";
function NFTHUBComponent() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [description, setDescription] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const {
    data: listingPrice
  } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "getListingPrice"
  });
  const normalListingPrice = new BigNumber(listingPrice.toHexString()).toNumber();
  console.log(normalListingPrice);
  const {
    config: listConfig,
    error: listError
  } = usePrepareContractWrite({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "listNFT",
    args: [name, ethers.utils.parseEther(price), description, tokenURI],
    value: listingPrice
  });
  console.log(listingPrice);
  const {
    write: listNFT
  } = useContractWrite(listConfig);
  const handleListNFT = async () => {
    try {
      await listNFT?.();
      alert("NFT listed successfully!");
    } catch (error) {
      console.error(error);
      alert("Error listing NFT");
    }
  };
  const [itemIdToBuy, setItemIdToBuy] = useState("0");
  const {
    config: buyConfig,
    error: buyError
  } = usePrepareContractWrite({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "buyNFT",
    args: [itemIdToBuy]
  });
  const {
    write: buyNFT
  } = useContractWrite(buyConfig);
  const handleBuyNFT = async () => {
    try {
      await buyNFT?.(ethers.utils.parseEther(price));
      alert("NFT bought successfully!");
    } catch (error) {
      console.error(error);
      alert("Error buying NFT");
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "List NFT"
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("input", {
        type: "text",
        placeholder: "Name",
        value: name,
        onChange: (e) => setName(e.target.value)
      }), /* @__PURE__ */ jsx("input", {
        type: "text",
        placeholder: "Price (ETH)",
        value: price,
        onChange: (e) => setPrice(e.target.value)
      }), /* @__PURE__ */ jsx("input", {
        type: "text",
        placeholder: "Description",
        value: description,
        onChange: (e) => setDescription(e.target.value)
      }), /* @__PURE__ */ jsx("input", {
        type: "text",
        placeholder: "Token URI",
        value: tokenURI,
        onChange: (e) => setTokenURI(e.target.value)
      }), /* @__PURE__ */ jsx("button", {
        disabled: !listNFT,
        onClick: handleListNFT,
        children: "List NFT"
      }), listError && /* @__PURE__ */ jsxs("div", {
        children: ["Error listing NFT: ", listError.message]
      })]
    }), /* @__PURE__ */ jsx("h2", {
      children: "Buy NFT"
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("input", {
        type: "text",
        placeholder: "Item ID",
        value: itemIdToBuy,
        onChange: (e) => setItemIdToBuy(e.target.value)
      }), /* @__PURE__ */ jsx("button", {
        disabled: !buyNFT,
        onClick: handleBuyNFT,
        children: "Buy NFT"
      }), buyError && /* @__PURE__ */ jsxs("div", {
        children: ["Error buying NFT: ", buyError.message]
      })]
    })]
  });
}
__astro_tag_component__(NFTHUBComponent, "@astrojs/react");

const NFTImage = () => {
  const [imageData, setImageData] = useState(null);
  const NFTHUB_ADDRESS = "0x0C2a027e4f927fFd5Ff7b956B5b4c1F3813Bd763";
  const {
    data: fetchItem
  } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "fetchItemImage",
    args: [3]
  });
  useEffect(() => {
    if (fetchItem) {
      setImageData(fetchItem);
    }
  }, [fetchItem]);
  console.log(fetchItem);
  return /* @__PURE__ */ jsx("div", {
    children: imageData ? /* @__PURE__ */ jsx("img", {
      src: imageData,
      alt: "a",
      width: "300",
      height: "200"
    }) : /* @__PURE__ */ jsx("p", {
      children: "Loading..."
    })
  });
};
__astro_tag_component__(NFTImage, "@astrojs/react");

const chains = [sepolia];
const projectId = "6e18bca83b6d8c08562669f22a83ca97";
const {
  provider
} = configureChains(chains, [w3mProvider({
  projectId
})]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    version: 2,
    chains
  }),
  provider
});
function WagmiApp() {
  return /* @__PURE__ */ jsxs(WagmiConfig, {
    client: wagmiClient,
    children: [/* @__PURE__ */ jsx(NFTHUBComponent, {}), /* @__PURE__ */ jsx(NFTImage, {}), /* @__PURE__ */ jsx(SendTransaction, {})]
  });
}
__astro_tag_component__(WagmiApp, "@astrojs/react");

const $$Astro$1 = createAstro();
const $$Mint = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Mint;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "Messages" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>Messages</h1>
    <p class="size-20">Lorem ipsum dolor sit amet.</p>
  </section><section class="margin-32">
    <div class="space-content">
      <h2>Messages overview</h2>
      ${renderComponent($$result2, "EmpyState", $$EmpyState, {}, { "default": ($$result3) => renderTemplate`
        You haven't added any messages yet. Start by adding some.
      ` })}
      <button id="modal-trigger" class="button color-secondary">
        Add your first message
      </button>
      ${renderComponent($$result2, "WagmiApp", WagmiApp, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/web3stuff/WagmiApp", "client:component-export": "default" })}
      ${renderComponent($$result2, "Modal", $$Modal, { "triggerId": "modal-trigger", "title": "Add message", "closeText": "Cancel" })}
      ${renderComponent($$result2, "Media", $$Media$1, { "classes": "media radius-large elevation-400", "src": "" })}
    </div>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/mint.astro");

const $$file$1 = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/mint.astro";
const $$url$1 = "/mint";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mint,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$DefaultLayout, { "title": "404" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <h1>404</h1><br>
    <p class="size-20">This page does not exist.</p><br>
    <a class="button color-secondary" href="/">Go back to the homepage</a>
  </section>` })}`;
}, "C:/Users/minec/OneDrive/Masa\xFCst\xFC/Dosyalar/dacadecelonft/src/pages/404.astro");

const $$file = "C:/Users/minec/OneDrive/Masaüstü/Dosyalar/dacadecelonft/src/pages/404.astro";
const $$url = "/404";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f, _page7 as g, _page8 as h };
