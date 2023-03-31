/** @typedef {import('@/lightbox/lightbox').default} PhotoSwipeLightbox */
import PhotoSwipeLightbox from '@/lightbox/lightbox';
/** @typedef {import('@/photoswipe').default} PhotoSwipe */
import PhotoSwipe from '@/photoswipe';
/** @typedef {import('@/photoswipe').PhotoSwipeOptions} PhotoSwipeOptions */
import { PhotoSwipeOptions } from '@/photoswipe';
/** @typedef {import('@/photoswipe').DataSource} DataSource */
import { DataSource } from '@/photoswipe';
/** @typedef {import('@/ui/ui-element').UIElementData} UIElementData */
import { UIElementData } from '@/ui/ui-element';
/** @typedef {import('@/slide/content').default} ContentDefault */
import ContentDefault from '@/slide/content';
/** @typedef {import('@/slide/slide').default} Slide */
import Slide from '@/slide/slide';
/** @typedef {import('@/slide/slide').SlideData} SlideData */
import { SlideData } from '@/slide/slide';
/** @typedef {import('@/slide/zoom-level').default} ZoomLevel */
import ZoomLevel from '@/slide/zoom-level';
/** @typedef {import('@/slide/get-thumb-bounds').Bounds} Bounds */
import { Bounds } from '@/slide/get-thumb-bounds';

/**
 * Allow adding an arbitrary props to the Content
 * https://photoswipe.com/custom-content/#using-webp-image-format
 * @typedef {ContentDefault & Record<string, any>} Content
 */
export type Content = ContentDefault & Record<string, any>;

/** @typedef {{ x?: number; y?: number }} Point */
export type Point = { x?: number; y?: number };

/**
 * @typedef {Object} PhotoSwipeEventsMap https://photoswipe.com/events/
 *
 *
 * https://photoswipe.com/adding-ui-elements/
 *
 * @prop {undefined} uiRegister
 * @prop {{ data: UIElementData }} uiElementCreate
 *
 *
 * https://photoswipe.com/events/#initialization-events
 *
 * @prop {undefined} beforeOpen
 * @prop {undefined} firstUpdate
 * @prop {undefined} initialLayout
 * @prop {undefined} change
 * @prop {undefined} afterInit
 * @prop {undefined} bindEvents
 *
 *
 * https://photoswipe.com/events/#opening-or-closing-transition-events
 *
 * @prop {undefined} openingAnimationStart
 * @prop {undefined} openingAnimationEnd
 * @prop {undefined} closingAnimationStart
 * @prop {undefined} closingAnimationEnd
 *
 *
 * https://photoswipe.com/events/#closing-events
 *
 * @prop {undefined} close
 * @prop {undefined} destroy
 *
 *
 * https://photoswipe.com/events/#pointer-and-gesture-events
 *
 * @prop {{ originalEvent: PointerEvent }} pointerDown
 * @prop {{ originalEvent: PointerEvent }} pointerMove
 * @prop {{ originalEvent: PointerEvent }} pointerUp
 * @prop {{ bgOpacity: number }} pinchClose can be default prevented
 * @prop {{ panY: number }} verticalDrag can be default prevented
 *
 *
 * https://photoswipe.com/events/#slide-content-events
 *
 * @prop {{ content: Content }} contentInit
 * @prop {{ content: Content; isLazy: boolean }} contentLoad can be default prevented
 * @prop {{ content: Content; isLazy: boolean }} contentLoadImage can be default prevented
 * @prop {{ content: Content; slide: Slide; isError?: boolean }} loadComplete
 * @prop {{ content: Content; slide: Slide }} loadError
 * @prop {{ content: Content; width: number; height: number }} contentResize can be default prevented
 * @prop {{ content: Content; width: number; height: number; slide: Slide }} imageSizeChange
 * @prop {{ content: Content }} contentLazyLoad can be default prevented
 * @prop {{ content: Content }} contentAppend can be default prevented
 * @prop {{ content: Content }} contentActivate can be default prevented
 * @prop {{ content: Content }} contentDeactivate can be default prevented
 * @prop {{ content: Content }} contentRemove can be default prevented
 * @prop {{ content: Content }} contentDestroy can be default prevented
 *
 *
 * undocumented
 *
 * @prop {{ point: Point; originalEvent: PointerEvent }} imageClickAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} bgClickAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} tapAction can be default prevented
 * @prop {{ point: Point; originalEvent: PointerEvent }} doubleTapAction can be default prevented
 *
 * @prop {{ originalEvent: KeyboardEvent }} keydown can be default prevented
 * @prop {{ x: number; dragging: boolean }} moveMainScroll
 * @prop {{ slide: Slide }} firstZoomPan
 * @prop {{ slide: Slide | undefined, data: SlideData, index: number }} gettingData
 * @prop {undefined} beforeResize
 * @prop {undefined} resize
 * @prop {undefined} viewportSize
 * @prop {undefined} updateScrollOffset
 * @prop {{ slide: Slide }} slideInit
 * @prop {{ slide: Slide }} afterSetContent
 * @prop {{ slide: Slide }} slideLoad
 * @prop {{ slide: Slide }} appendHeavy can be default prevented
 * @prop {{ slide: Slide }} appendHeavyContent
 * @prop {{ slide: Slide }} slideActivate
 * @prop {{ slide: Slide }} slideDeactivate
 * @prop {{ slide: Slide }} slideDestroy
 * @prop {{ destZoomLevel: number, centerPoint: Point | undefined, transitionDuration: number | false | undefined }} beforeZoomTo
 * @prop {{ slide: Slide }} zoomPanUpdate
 * @prop {{ slide: Slide }} initialZoomPan
 * @prop {{ slide: Slide }} calcSlideSize
 * @prop {undefined} resolutionChanged
 * @prop {{ originalEvent: WheelEvent }} wheel can be default prevented
 * @prop {{ content: Content }} contentAppendImage can be default prevented
 * @prop {{ index: number; itemData: SlideData }} lazyLoadSlide can be default prevented
 * @prop {undefined} lazyLoad
 * @prop {{ slide: Slide }} calcBounds
 * @prop {{ zoomLevels: ZoomLevel, slideData: SlideData }} zoomLevelsUpdate
 *
 *
 * legacy
 *
 * @prop {undefined} init
 * @prop {undefined} initialZoomIn
 * @prop {undefined} initialZoomOut
 * @prop {undefined} initialZoomInEnd
 * @prop {undefined} initialZoomOutEnd
 * @prop {{ dataSource: DataSource | undefined, numItems: number }} numItems
 * @prop {{ itemData: SlideData; index: number }} itemData
 * @prop {{ index: number, itemData: SlideData, instance: PhotoSwipe }} thumbBounds
 */
export interface PhotoSwipeEventsMap {
  uiRegister: undefined;
  uiElementCreate: { data: UIElementData };
  beforeOpen: undefined;
  firstUpdate: undefined;
  initialLayout: undefined;
  change: undefined;
  afterInit: undefined;
  bindEvents: undefined;
  openingAnimationStart: undefined;
  openingAnimationEnd: undefined;
  closingAnimationStart: undefined;
  closingAnimationEnd: undefined;
  close: undefined;
  destroy: undefined;
  pointerDown: { originalEvent: PointerEvent };
  pointerMove: { originalEvent: PointerEvent };
  pointerUp: { originalEvent: PointerEvent };
  pinchClose: { bgOpacity: number };
  verticalDrag: { panY: number };
  contentInit: { content: Content };
  contentLoad: { content: Content; isLazy: boolean };
  contentLoadImage: { content: Content; isLazy: boolean };
  loadComplete: { content: Content; slide: Slide; isError?: boolean };
  loadError: { content: Content; slide: Slide };
  contentResize: { content: Content; width: number; height: number };
  imageSizeChange: { content: Content; width: number; height: number; slide: Slide };
  contentLazyLoad: { content: Content };
  contentAppend: { content: Content };
  contentActivate: { content: Content };
  contentDeactivate: { content: Content };
  contentRemove: { content: Content };
  contentDestroy: { content: Content };
  imageClickAction: { point: Point; originalEvent: PointerEvent };
  bgClickAction: { point: Point; originalEvent: PointerEvent };
  tapAction: { point: Point; originalEvent: PointerEvent };
  doubleTapAction: { point: Point; originalEvent: PointerEvent };
  keydown: { originalEvent: KeyboardEvent };
  moveMainScroll: { x: number; dragging: boolean };
  firstZoomPan: { slide: Slide };
  gettingData: { slide: Slide | undefined; data: SlideData; index: number };
  beforeResize: undefined;
  resize: undefined;
  viewportSize: undefined;
  updateScrollOffset: undefined;
  slideInit: { slide: Slide };
  afterSetContent: { slide: Slide };
  slideLoad: { slide: Slide };
  appendHeavy: { slide: Slide };
  appendHeavyContent: { slide: Slide };
  slideActivate: { slide: Slide };
  slideDeactivate: { slide: Slide };
  slideDestroy: { slide: Slide };
  beforeZoomTo: {
    destZoomLevel: number;
    centerPoint: Point | undefined;
    transitionDuration: number | false | undefined;
  };
  zoomPanUpdate: { slide: Slide };
  initialZoomPan: { slide: Slide };
  calcSlideSize: { slide: Slide };
  resolutionChanged: undefined;
  wheel: { originalEvent: WheelEvent };
  contentAppendImage: { content: Content };
  lazyLoadSlide: { index: number; itemData: SlideData };
  lazyLoad: undefined;
  calcBounds: { slide: Slide };
  zoomLevelsUpdate: { zoomLevels: ZoomLevel; slideData: SlideData };
  init: undefined;
  initialZoomIn: undefined;
  initialZoomOut: undefined;
  initialZoomInEnd: undefined;
  initialZoomOutEnd: undefined;
  numItems: { dataSource: DataSource | undefined; numItems: number };
  itemData: { itemData: SlideData; index: number };
  thumbBounds: { index: number; itemData: SlideData; instance: PhotoSwipe };
}

/**
 * @typedef {Object} PhotoSwipeFiltersMap https://photoswipe.com/filters/
 *
 * @prop {(numItems: number, dataSource: DataSource | undefined) => number} numItems
 * Modify the total amount of slides. Example on Data sources page.
 * https://photoswipe.com/filters/#numitems
 *
 * @prop {(itemData: SlideData, index: number) => SlideData} itemData
 * Modify slide item data. Example on Data sources page.
 * https://photoswipe.com/filters/#itemdata
 *
 * @prop {(itemData: SlideData, element: HTMLElement, linkEl: HTMLAnchorElement) => SlideData} domItemData
 * Modify item data when it's parsed from DOM element. Example on Data sources page.
 * https://photoswipe.com/filters/#domitemdata
 *
 * @prop {(clickedIndex: number, e: MouseEvent, instance: PhotoSwipeLightbox) => number} clickedIndex
 * Modify clicked gallery item index.
 * https://photoswipe.com/filters/#clickedindex
 *
 * @prop {(placeholderSrc: string | false, content: Content) => string | false} placeholderSrc
 * Modify placeholder image source.
 * https://photoswipe.com/filters/#placeholdersrc
 *
 * @prop {(isContentLoading: boolean, content: Content) => boolean} isContentLoading
 * Modify if the content is currently loading.
 * https://photoswipe.com/filters/#iscontentloading
 *
 * @prop {(isContentZoomable: boolean, content: Content) => boolean} isContentZoomable
 * Modify if the content can be zoomed.
 * https://photoswipe.com/filters/#iscontentzoomable
 *
 * @prop {(useContentPlaceholder: boolean, content: Content) => boolean} useContentPlaceholder
 * Modify if the placeholder should be used for the content.
 * https://photoswipe.com/filters/#usecontentplaceholder
 *
 * @prop {(isKeepingPlaceholder: boolean, content: Content) => boolean} isKeepingPlaceholder
 * Modify if the placeholder should be kept after the content is loaded.
 * https://photoswipe.com/filters/#iskeepingplaceholder
 *
 *
 * @prop {(contentErrorElement: HTMLElement, content: Content) => HTMLElement} contentErrorElement
 * Modify an element when the content has error state (for example, if image cannot be loaded).
 * https://photoswipe.com/filters/#contenterrorelement
 *
 * @prop {(element: HTMLElement, data: UIElementData) => HTMLElement} uiElement
 * Modify a UI element that's being created.
 * https://photoswipe.com/filters/#uielement
 *
 * @prop {(thumbnail: HTMLElement | null | undefined, itemData: SlideData, index: number) => HTMLElement} thumbEl
 * Modify the thubmnail element from which opening zoom animation starts or ends.
 * https://photoswipe.com/filters/#thumbel
 *
 * @prop {(thumbBounds: Bounds | undefined, itemData: SlideData, index: number) => Bounds} thumbBounds
 * Modify the thubmnail bounds from which opening zoom animation starts or ends.
 * https://photoswipe.com/filters/#thumbbounds
 *
 * @prop {(srcsetSizesWidth: number, content: Content) => number} srcsetSizesWidth
 *
 */
export interface PhotoSwipeFiltersMap {
  numItems: (numItems: number, dataSource: DataSource | undefined) => number;
  itemData: (itemData: SlideData, index: number) => SlideData;
  domItemData: (itemData: SlideData, element: HTMLElement, linkEl: HTMLAnchorElement) => SlideData;
  clickedIndex: (clickedIndex: number, e: MouseEvent, instance: PhotoSwipeLightbox) => number;
  placeholderSrc: (placeholderSrc: string | false, content: Content) => string | false;
  isContentLoading: (isContentLoading: boolean, content: Content) => boolean;
  isContentZoomable: (isContentZoomable: boolean, content: Content) => boolean;
  useContentPlaceholder: (useContentPlaceholder: boolean, content: Content) => boolean;
  isKeepingPlaceholder: (isKeepingPlaceholder: boolean, content: Content) => boolean;
  contentErrorElement: (contentErrorElement: HTMLElement, content: Content) => HTMLElement;
  uiElement: (element: HTMLElement, data: UIElementData) => HTMLElement;
  thumbEl: (thumbnail: HTMLElement | null | undefined, itemData: SlideData, index: number) => HTMLElement;
  thumbBounds: (thumbBounds: Bounds | undefined, itemData: SlideData, index: number) => Bounds;
  srcsetSizesWidth: (srcsetSizesWidth: number, content: Content) => number;
}

/**
 * @template {keyof PhotoSwipeFiltersMap} T
 * @typedef {{ fn: PhotoSwipeFiltersMap[T], priority: number }} Filter
 */
export interface Filter<T extends keyof PhotoSwipeFiltersMap> {
  fn: PhotoSwipeFiltersMap[T];
  priority: number;
}

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {PhotoSwipeEventsMap[T] extends undefined ? PhotoSwipeEvent<T> : PhotoSwipeEvent<T> & PhotoSwipeEventsMap[T]} AugmentedEvent
 */
export type AugmentedEvent<T extends keyof PhotoSwipeEventsMap> = PhotoSwipeEventsMap[T] extends undefined
  ? PhotoSwipeEvent<T>
  : PhotoSwipeEvent<T> & PhotoSwipeEventsMap[T];

/**
 * @template {keyof PhotoSwipeEventsMap} T
 * @typedef {(event: AugmentedEvent<T>) => void} EventCallback
 */
export type EventCallback<T extends keyof PhotoSwipeEventsMap> = (event: AugmentedEvent<T>) => void;

/**
 * Base PhotoSwipe event object
 *
 * @template {keyof PhotoSwipeEventsMap} T
 */
class PhotoSwipeEvent<T extends keyof PhotoSwipeEventsMap> {
  type: T;
  defaultPrevented: boolean;

  constructor(type: T, details?: PhotoSwipeEventsMap[T]) {
    this.type = type;
    this.defaultPrevented = false;
    if (details) {
      Object.assign(this, details);
    }
  }

  preventDefault(): void {
    this.defaultPrevented = true;
  }
}

/**
 * PhotoSwipe base class that can listen and dispatch for events.
 * Shared by PhotoSwipe Core and PhotoSwipe Lightbox, extended by base.js
 */
class Eventable {
  _listeners: { [T in keyof PhotoSwipeEventsMap]?: ((event: AugmentedEvent<T>) => void)[] };
  _filters: { [T in keyof PhotoSwipeFiltersMap]?: Filter<T>[] };
  pswp?: PhotoSwipe;
  options?: PhotoSwipeOptions;

  constructor() {
    this._listeners = {};
    this._filters = {};
    this.pswp = undefined;
    this.options = undefined;
  }

  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter<T extends keyof PhotoSwipeFiltersMap>(name: T, fn: PhotoSwipeFiltersMap[T], priority = 100) {
    if (!this._filters[name]) {
      this._filters[name] = [];
    }

    this._filters[name]?.push({ fn, priority });
    this._filters[name]?.sort((f1, f2) => f1.priority - f2.priority);

    this.pswp?.addFilter(name, fn, priority);
  }

  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter<T extends keyof PhotoSwipeFiltersMap>(name: T, fn: PhotoSwipeFiltersMap[T]) {
    if (this._filters[name]) {
      // @ts-expect-error
      this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
    }

    if (this.pswp) {
      this.pswp.removeFilter(name, fn);
    }
  }

  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters<T extends keyof PhotoSwipeFiltersMap>(
    name: T,
    ...args: Parameters<PhotoSwipeFiltersMap[T]>
  ): Parameters<PhotoSwipeFiltersMap[T]>[0] {
    this._filters[name]?.forEach((filter) => {
      // @ts-expect-error
      args[0] = filter.fn.apply(this, args);
    });

    return args[0];
  }

  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on<T extends keyof PhotoSwipeEventsMap>(name: T, fn: EventCallback<T>) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    this._listeners[name]?.push(fn);

    // When binding events to lightbox,
    // also bind events to PhotoSwipe Core,
    // if it's open.
    this.pswp?.on(name, fn);
  }

  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off<T extends keyof PhotoSwipeEventsMap>(name: T, fn: EventCallback<T>) {
    if (this._listeners[name]) {
      // @ts-expect-error
      this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
    }

    this.pswp?.off(name, fn);
  }

  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch<T extends keyof PhotoSwipeEventsMap>(name: T, details?: PhotoSwipeEventsMap[T]): AugmentedEvent<T> {
    if (this.pswp) {
      return this.pswp.dispatch(name, details);
    }

    const event = new PhotoSwipeEvent<T>(name, details) as AugmentedEvent<T>;

    this._listeners[name]?.forEach((listener) => {
      listener.call(this, event);
    });

    return event;
  }
}

export default Eventable;
