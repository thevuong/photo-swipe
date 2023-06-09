import { createElement } from '@/util/util';

/** @typedef {import('@/photoswipe').default} PhotoSwipe */
import PhotoSwipe from '@/photoswipe';

/**
 * @template T
 * @typedef {import('@/types').Methods<T>} Methods<T>
 */
import { Methods } from '@/types';

/**
 * @typedef {Object} UIElementMarkupProps
 * @prop {boolean} [isCustomSVG]
 * @prop {string} inner
 * @prop {string} [outlineID]
 * @prop {number | string} [size]
 */
export interface UIElementMarkupProps {
  isCustomSVG?: boolean;
  inner: string;
  outlineID?: string;
  size?: number | string;
}

/**
 * @typedef {Object} UIElementData
 * @prop {DefaultUIElements | string} [name]
 * @prop {string} [className]
 * @prop {UIElementMarkup} [html]
 * @prop {boolean} [isButton]
 * @prop {keyof HTMLElementTagNameMap} [tagName]
 * @prop {string} [title]
 * @prop {string} [ariaLabel]
 * @prop {(element: HTMLElement, pswp: PhotoSwipe) => void} [onInit]
 * @prop {Methods<PhotoSwipe> | ((e: MouseEvent, element: HTMLElement, pswp: PhotoSwipe) => void)} [onClick]
 * @prop {'bar' | 'wrapper' | 'root'} [appendTo]
 * @prop {number} [order]
 */
export interface UIElementData {
  name?: DefaultUIElements | string;
  className?: string;
  html?: UIElementMarkup;
  isButton?: boolean;
  tagName?: keyof HTMLElementTagNameMap;
  title?: string;
  ariaLabel?: string;
  onInit?: (element: HTMLElement, pswp: PhotoSwipe) => void;
  onClick?: Methods<PhotoSwipe> | ((e: MouseEvent, element: HTMLElement, pswp: PhotoSwipe) => void);
  appendTo?: 'bar' | 'wrapper' | 'root';
  order?: number;
}

/** @typedef {'arrowPrev' | 'arrowNext' | 'close' | 'zoom' | 'counter'} DefaultUIElements */
export type DefaultUIElements = 'arrowPrev' | 'arrowNext' | 'close' | 'zoom' | 'counter';

/** @typedef {string | UIElementMarkupProps} UIElementMarkup */
export type UIElementMarkup = string | UIElementMarkupProps;

/**
 * @param {UIElementMarkup} [htmlData]
 * @returns {string}
 */
function addElementHTML(htmlData?: UIElementMarkup) {
  if (typeof htmlData === 'string') {
    // Allow developers to provide full svg,
    // For example:
    // <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" class="pswp__icn">
    //   <path d="..." />
    //   <circle ... />
    // </svg>
    // Can also be any HTML string.
    return htmlData;
  }

  if (!htmlData || !htmlData.isCustomSVG) {
    return '';
  }

  const svgData = htmlData;
  let out = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
  // replace all %d with size
  out = out.split('%d').join(/** @type {string} */ String(svgData.size || 32));

  // Icons may contain outline/shadow,
  // to make it we "clone" base icon shape and add border to it.
  // Icon itself and border are styled via CSS.
  //
  // Property shadowID defines ID of element that should be cloned.
  if (svgData.outlineID) {
    out += `<use class="pswp__icn-shadow" xlink:href="#${svgData.outlineID}"/>`;
  }

  out += svgData.inner;

  out += '</svg>';

  return out;
}

class UIElement {
  /**
   * @param {PhotoSwipe} pswp
   * @param {UIElementData} data
   */
  constructor(pswp: PhotoSwipe, data: UIElementData) {
    const name = data.name || data.className;
    let elementHTML = data.html;

    // @ts-ignore
    if (pswp.options[name] === false) {
      // exit if element is disabled from options
      return;
    }

    // Allow to override SVG icons from options
    // @ts-ignore
    if (typeof pswp.options[`${name}SVG`] === 'string') {
      // arrowPrevSVG
      // arrowNextSVG
      // closeSVG
      // zoomSVG
      // @ts-ignore
      elementHTML = pswp.options[`${name}SVG`];
    }

    pswp.dispatch('uiElementCreate', { data });

    let className = '';
    if (data.isButton) {
      className += 'pswp__button ';
      className += data.className || `pswp__button--${data.name}`;
    } else {
      className += data.className || `pswp__${data.name}`;
    }

    let tagName = data.isButton ? data.tagName || 'button' : data.tagName || 'div';
    tagName = /** @type {keyof HTMLElementTagNameMap} */ tagName.toLowerCase() as keyof HTMLElementTagNameMap;
    /** @type {HTMLElement} */
    const element = createElement(className, tagName) as HTMLElement;

    if (data.isButton) {
      if (tagName === 'button') {
        /** @type {HTMLButtonElement} */ (element as HTMLButtonElement).type = 'button';
      }

      let { title } = data;
      const { ariaLabel } = data;

      // @ts-ignore
      if (typeof pswp.options[`${name}Title`] === 'string') {
        // @ts-ignore
        title = pswp.options[`${name}Title`];
      }

      if (title) {
        element.title = title;
      }

      const ariaText = ariaLabel || title;
      if (ariaText) {
        element.setAttribute('aria-label', ariaText);
      }
    }

    element.innerHTML = addElementHTML(elementHTML);

    if (data.onInit) {
      data.onInit(element, pswp);
    }

    if (data.onClick) {
      element.onclick = (e) => {
        if (typeof data.onClick === 'string') {
          // @ts-ignore
          pswp[data.onClick]();
        } else if (typeof data.onClick === 'function') {
          data.onClick(e, element, pswp);
        }
      };
    }

    // Top bar is default position
    const appendTo = data.appendTo || 'bar';
    /** @type {HTMLElement | undefined} root element by default */
    let container = pswp.element as HTMLElement | undefined;
    if (appendTo === 'bar') {
      if (!pswp.topBar) {
        pswp.topBar = createElement('pswp__top-bar pswp__hide-on-close', 'div', pswp.scrollWrap);
      }
      container = pswp.topBar;
    } else {
      // element outside of top bar gets a secondary class
      // that makes element fade out on close
      element.classList.add('pswp__hide-on-close');

      if (appendTo === 'wrapper') {
        container = pswp.scrollWrap;
      }
    }

    container?.appendChild(pswp.applyFilters('uiElement', element, data));
  }
}

export default UIElement;
