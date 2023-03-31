import { getViewportSize, getPanAreaSize } from '@/util/viewport-size';
import ZoomLevel from '@/slide/zoom-level';

/** @typedef {import('@/slide/content').default} Content */
import Content from '@/slide/content';
/** @typedef {import('@/slide/slide').default} Slide */
import Slide from '@/slide/slide';
/** @typedef {import('@/slide/slide').SlideData} SlideData */
import { SlideData } from '@/slide/slide';
/** @typedef {import('@/core/base').default} PhotoSwipeBase */
import PhotoSwipeBase from '@/core/base';
/** @typedef {import('@/photoswipe').default} PhotoSwipe */
import PhotoSwipe from '@/photoswipe';

const MIN_SLIDES_TO_CACHE = 5;

/**
 * Lazy-load an image
 * This function is used both by Lightbox and PhotoSwipe core,
 * thus it can be called before dialog is opened.
 *
 * @param {SlideData} itemData Data about the slide
 * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
 * @param {number} index
 * @returns {Content} Image that is being decoded or false.
 */
export function lazyLoadData(itemData: SlideData, instance: PhotoSwipeBase, index: number) {
  const content = instance.createContentFromData(itemData, index);
  /** @type {ZoomLevel | undefined} */
  let zoomLevel;

  const { options } = instance;

  // We need to know dimensions of the image to preload it,
  // as it might use srcset, and we need to define sizes
  if (options) {
    zoomLevel = new ZoomLevel(options, itemData, -1);

    let viewportSize;
    if (instance.pswp) {
      viewportSize = instance.pswp.viewportSize;
    } else {
      viewportSize = getViewportSize(options, instance);
    }

    const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
    zoomLevel.update(content.width, content.height, panAreaSize);
  }

  content.lazyLoad();

  if (zoomLevel) {
    content.setDisplayedSize(
      Math.ceil(content.width * zoomLevel.initial),
      Math.ceil(content.height * zoomLevel.initial),
    );
  }

  return content;
}

/**
 * Lazy-loads specific slide.
 * This function is used both by Lightbox and PhotoSwipe core,
 * thus it can be called before dialog is opened.
 *
 * By default, it loads image based on viewport size and initial zoom level.
 *
 * @param {number} index Slide index
 * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox eventable instance
 * @returns {Content | undefined}
 */
export function lazyLoadSlide(index: number, instance: PhotoSwipeBase) {
  const itemData = instance.getItemData(index);

  if (instance.dispatch('lazyLoadSlide', { index, itemData }).defaultPrevented) {
    return;
  }

  return lazyLoadData(itemData, instance, index);
}

class ContentLoader {
  pswp: PhotoSwipe;
  limit: number;
  _cachedItems: Content[];

  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(pswp: PhotoSwipe) {
    this.pswp = pswp;
    // Total amount of cached images
    this.limit = Math.max(pswp.options.preload[0] + pswp.options.preload[1] + 1, MIN_SLIDES_TO_CACHE);
    /** @type {Content[]} */
    this._cachedItems = [];
  }

  /**
   * Lazy load nearby slides based on `preload` option.
   *
   * @param {number} [diff] Difference between slide indexes that was changed recently, or 0.
   */
  updateLazy(diff?: number) {
    const { pswp } = this;

    if (pswp.dispatch('lazyLoad').defaultPrevented) {
      return;
    }

    const { preload } = pswp.options;
    const isForward = diff === undefined ? true : diff >= 0;
    let i;

    // preload[1] - num items to preload in forward direction
    for (i = 0; i <= preload[1]; i++) {
      this.loadSlideByIndex(pswp.currIndex + (isForward ? i : -i));
    }

    // preload[0] - num items to preload in backward direction
    for (i = 1; i <= preload[0]; i++) {
      this.loadSlideByIndex(pswp.currIndex + (isForward ? -i : i));
    }
  }

  /**
   * @param {number} initialIndex
   */
  loadSlideByIndex(initialIndex: number) {
    const index = this.pswp.getLoopedIndex(initialIndex);
    // try to get cached content
    let content = this.getContentByIndex(index);
    if (!content) {
      // no cached content, so try to load from scratch:
      content = lazyLoadSlide(index, this.pswp);
      // if content can be loaded, add it to cache:
      if (content) {
        this.addToCache(content);
      }
    }
  }

  /**
   * @param {Slide} slide
   * @returns {Content}
   */
  getContentBySlide(slide: Slide): Content {
    let content = this.getContentByIndex(slide.index);
    if (!content) {
      // create content if not found in cache
      content = this.pswp.createContentFromData(slide.data, slide.index);
      this.addToCache(content);
    }

    // assign slide to content
    content.setSlide(slide);

    return content;
  }

  /**
   * @param {Content} content
   */
  addToCache(content: Content) {
    // move to the end of array
    this.removeByIndex(content.index);
    this._cachedItems.push(content);

    if (this._cachedItems.length > this.limit) {
      // Destroy the first content that's not attached
      const indexToRemove = this._cachedItems.findIndex((item) => {
        return !item.isAttached && !item.hasSlide;
      });
      if (indexToRemove !== -1) {
        const removedItem = this._cachedItems.splice(indexToRemove, 1)[0];
        removedItem.destroy();
      }
    }
  }

  /**
   * Removes an image from cache, does not destroy() it, just removes.
   *
   * @param {number} index
   */
  removeByIndex(index: number) {
    const indexToRemove = this._cachedItems.findIndex((item) => item.index === index);
    if (indexToRemove !== -1) {
      this._cachedItems.splice(indexToRemove, 1);
    }
  }

  /**
   * @param {number} index
   * @returns {Content | undefined}
   */
  getContentByIndex(index: number) {
    return this._cachedItems.find((content) => content.index === index);
  }

  destroy() {
    this._cachedItems.forEach((content) => content.destroy());
    this._cachedItems = [];
  }
}

export default ContentLoader;
