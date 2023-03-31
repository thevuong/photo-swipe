import { specialKeyUsed, getElementsFromOption, isPswpClass } from '@/util/util';

import PhotoSwipeBase from '@/core/base';
import { lazyLoadSlide } from '@/slide/loader';

/**
 * @template T
 * @typedef {import('@/types').Type<T>} Type<T>
 */
import { Type } from '@/types';

/** @typedef {import('@/photoswipe').default} PhotoSwipe */
import PhotoSwipe from '@/photoswipe';
/** @typedef {import('@/photoswipe').PhotoSwipeOptions} PhotoSwipeOptions */
import { PhotoSwipeOptions } from '@/photoswipe';
/** @typedef {import('@/photoswipe').DataSource} DataSource */
import { DataSource } from '@/photoswipe';
/** @typedef {import('@/photoswipe').Point} Point */
import { Point } from '@/photoswipe';
/** @typedef {import('@/slide/content').default} Content */
import Content from '@/slide/content';
/** @typedef {import('@/core/eventable').PhotoSwipeEventsMap} PhotoSwipeEventsMap */
import { PhotoSwipeEventsMap } from '@/core/eventable';
/** @typedef {import('@/core/eventable').PhotoSwipeFiltersMap} PhotoSwipeFiltersMap */
import { PhotoSwipeFiltersMap } from '@/core/eventable';

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {import('@/core/eventable').EventCallback<T>} EventCallback<T>
 */
import { EventCallback } from '@/core/eventable';

/**
 * PhotoSwipe Lightbox
 *
 * - If user has unsupported browser it falls back to default browser action (just opens URL)
 * - Binds click event to links that should open PhotoSwipe
 * - parses DOM structure for PhotoSwipe (retrieves large image URLs and sizes)
 * - Initializes PhotoSwipe
 *
 *
 * Loader options use the same object as PhotoSwipe, and supports such options:
 *
 * gallery - Element | Element[] | NodeList | string selector for the gallery element
 * children - Element | Element[] | NodeList | string selector for the gallery children
 *
 */
class PhotoSwipeLightbox extends PhotoSwipeBase {
  _uid: number;
  shouldOpen: boolean;
  _preloadedContent?: Content;
  options: PhotoSwipeOptions;

  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(options?: PhotoSwipeOptions) {
    super();
    /** @type {PhotoSwipeOptions} */
    this.options = options || {};
    this._uid = 0;
    this.shouldOpen = false;
    /**
     * @private
     * @type {Content | undefined}
     */
    this._preloadedContent = undefined;

    this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }

  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    // Bind click events to each gallery
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.addEventListener('click', this.onThumbnailsClick, false);
    });
  }

  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e: MouseEvent) {
    // Exit and allow default browser action if:
    if (
      specialKeyUsed(e) || // ... if clicked with a special key (ctrl/cmd...)
      // @ts-ignore
      window.pswp || // ... if PhotoSwipe is already open
      !window.navigator.onLine
    ) {
      // ... if offline
      return;
    }

    // If both clientX and clientY are 0 or not defined,
    // the event is likely triggered by keyboard,
    // so we do not pass the initialPoint
    //
    // Note that some screen readers emulate the mouse position,
    // so it's not the ideal way to detect them.
    //
    /** @type {Point | null} */
    let initialPoint: Point | null = { x: e.clientX, y: e.clientY };

    if (!initialPoint.x && !initialPoint.y) {
      initialPoint = null;
    }

    let clickedIndex = this.getClickedIndex(e);
    clickedIndex = this.applyFilters('clickedIndex', clickedIndex, e, this);
    /** @type {DataSource} */
    const dataSource = {
      gallery: /** @type {HTMLElement} */ e.currentTarget as HTMLElement,
    };

    if (clickedIndex >= 0) {
      e.preventDefault();
      this.loadAndOpen(clickedIndex, dataSource, initialPoint);
    }
  }

  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(e: MouseEvent) {
    // legacy option
    if (this.options.getClickedIndexFn) {
      return this.options.getClickedIndexFn.call(this, e);
    }

    const clickedTarget = /** @type {HTMLElement} */ e.target as HTMLElement;
    const childElements = getElementsFromOption(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */ e.currentTarget as HTMLElement,
    );
    const clickedChildIndex = childElements.findIndex(
      (child) => child === clickedTarget || child.contains(clickedTarget),
    );

    if (clickedChildIndex !== -1) {
      return clickedChildIndex;
    } else if (this.options.children || this.options.childSelector) {
      // click wasn't on a child element
      return -1;
    }

    // There is only one item (which is the gallery)
    return 0;
  }

  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} dataSource
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(index: number, dataSource: DataSource, initialPoint?: Point | null) {
    // Check if the gallery is already open
    // @ts-ignore
    if (window.pswp) {
      return false;
    }

    // set initial index
    this.options.index = index;

    // define options for PhotoSwipe constructor
    this.options.initialPointerPos = initialPoint;

    this.shouldOpen = true;
    this.preload(index, dataSource);

    return true;
  }

  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(index: number, dataSource?: DataSource) {
    const { options } = this;

    if (dataSource) {
      options.dataSource = dataSource;
    }

    // Add the main module
    /** @type {Promise<Type<PhotoSwipe>>[]} */
    const promiseArray = [];

    const pswpModuleType = typeof options.pswpModule;
    if (isPswpClass(options.pswpModule)) {
      promiseArray.push(Promise.resolve(/** @type {Type<PhotoSwipe>} */ options.pswpModule));
    } else if (pswpModuleType === 'string') {
      throw new Error('pswpModule as string is no longer supported');
    } else if (pswpModuleType === 'function') {
      promiseArray.push(
        /** @type {() => Promise<Type<PhotoSwipe>>} */ options.pswpModule as () => Promise<Type<PhotoSwipe>>,
      );
    } else {
      throw new Error('pswpModule is not valid');
    }

    // Add custom-defined promise, if any
    if (typeof options.openPromise === 'function') {
      // allow developers to perform some task before opening
      promiseArray.push(options.openPromise());
    }

    if (options.preloadFirstSlide !== false && index >= 0) {
      this._preloadedContent = lazyLoadSlide(index, this);
    }

    // Wait till all promises resolve and open PhotoSwipe
    const uid = ++this._uid;
    Promise.all(promiseArray).then((iterableModules) => {
      if (this.shouldOpen) {
        const mainModule = iterableModules[0];
        this._openPhotoswipe(mainModule, uid);
      }
    });
  }

  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(module: Type<PhotoSwipe> | { default: Type<PhotoSwipe> }, uid: number) {
    // Cancel opening if UID doesn't match the current one
    // (if user clicked on another gallery item before current was loaded).
    //
    // Or if shouldOpen flag is set to false
    // (developer may modify it via public API)
    if (uid !== this._uid && this.shouldOpen) {
      return;
    }

    this.shouldOpen = false;

    // PhotoSwipe is already open
    // @ts-ignore
    if (window.pswp) {
      return;
    }

    /**
     * Pass data to PhotoSwipe and open init
     *
     * @type {PhotoSwipe}
     */
    const pswp =
      typeof module === 'object'
        ? new module.default(this.options) // eslint-disable-line
        : new module(this.options); // eslint-disable-line

    this.pswp = pswp;
    // @ts-ignore
    window.pswp = pswp;

    // map listeners from Lightbox to PhotoSwipe Core
    /** @type {(keyof PhotoSwipeEventsMap)[]} */
    Object.keys(this._listeners).forEach((name) => {
      // @ts-ignore
      this._listeners[name]?.forEach((fn) => {
        // @ts-ignore
        pswp.on(name, /** @type {EventCallback<typeof name>} */ fn);
      });
    });

    // same with filters
    /** @type {(keyof PhotoSwipeFiltersMap)[]} */
    Object.keys(this._filters).forEach((name) => {
      // @ts-ignore
      this._filters[name]?.forEach((filter) => {
        // @ts-ignore
        pswp.addFilter(name, filter.fn, filter.priority);
      });
    });

    if (this._preloadedContent) {
      pswp.contentLoader.addToCache(this._preloadedContent);
      this._preloadedContent = undefined;
    }

    pswp.on('destroy', () => {
      // clean up public variables
      this.pswp = undefined;
      // @ts-ignore
      delete window.pswp;
    });

    pswp.init();
  }

  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    this.pswp?.destroy();

    this.shouldOpen = false;
    this._listeners = {};

    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.removeEventListener('click', this.onThumbnailsClick, false);
    });
  }
}

export default PhotoSwipeLightbox;
