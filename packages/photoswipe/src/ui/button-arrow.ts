/*
  Backward and forward arrow buttons
 */

/** @typedef {import('@/ui/ui-element').UIElementData} UIElementData */
import { UIElementData } from '@/ui/ui-element';
/** @typedef {import('@/photoswipe').default} PhotoSwipe */
import PhotoSwipe from '@/photoswipe';

/**
 *
 * @param {HTMLElement} element
 * @param {PhotoSwipe} pswp
 * @param {boolean} [isNextButton]
 */
function initArrowButton(element: HTMLElement, pswp: PhotoSwipe, isNextButton?: boolean) {
  element.classList.add('pswp__button--arrow');
  // TODO: this should point to a unique id for this instance
  element.setAttribute('aria-controls', 'pswp__items');
  pswp.on('change', () => {
    if (!pswp.options.loop) {
      if (isNextButton) {
        /** @type {HTMLButtonElement} */
        (element as HTMLButtonElement).disabled = !(pswp.currIndex < pswp.getNumItems() - 1);
      } else {
        /** @type {HTMLButtonElement} */
        (element as HTMLButtonElement).disabled = !(pswp.currIndex > 0);
      }
    }
  });
}

/** @type {UIElementData} */
export const arrowPrev: UIElementData = {
  name: 'arrowPrev',
  className: 'pswp__button--arrow--prev',
  title: 'Previous',
  order: 10,
  isButton: true,
  appendTo: 'wrapper',
  html: {
    isCustomSVG: true,
    size: 60,
    inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>',
    outlineID: 'pswp__icn-arrow',
  },
  onClick: 'prev',
  onInit: initArrowButton,
};

/** @type {UIElementData} */
export const arrowNext: UIElementData = {
  name: 'arrowNext',
  className: 'pswp__button--arrow--next',
  title: 'Next',
  order: 11,
  isButton: true,
  appendTo: 'wrapper',
  html: {
    isCustomSVG: true,
    size: 60,
    inner: '<use xlink:href="#pswp__icn-arrow"/>',
    outlineID: 'pswp__icn-arrow',
  },
  onClick: 'next',
  onInit: (el, pswp) => {
    initArrowButton(el, pswp, true);
  },
};
