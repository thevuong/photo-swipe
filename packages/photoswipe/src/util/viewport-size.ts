/** @typedef {import('@/photoswipe').PhotoSwipeOptions} PhotoSwipeOptions */
import { PhotoSwipeOptions } from '@/photoswipe';
/** @typedef {import('@/core/base').default} PhotoSwipeBase */
import PhotoSwipeBase from '@/core/base';
/** @typedef {import('@/photoswipe').Point} Point */
import { Point } from '@/photoswipe';
/** @typedef {import('@/slide/slide').SlideData} SlideData */
import { SlideData } from '@/slide/slide';

/**
 * @param {PhotoSwipeOptions} options
 * @param {PhotoSwipeBase} pswp
 * @returns {Point}
 */
export function getViewportSize(options: PhotoSwipeOptions, pswp: PhotoSwipeBase): Point {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);
    if (newViewportSize) {
      return newViewportSize;
    }
  }

  return {
    x: document.documentElement.clientWidth,

    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight,
  };
}

/**
 * Parses padding option.
 * Supported formats:
 *
 * // Object
 * padding: {
 *  top: 0,
 *  bottom: 0,
 *  left: 0,
 *  right: 0
 * }
 *
 * // A function that returns the object
 * paddingFn: (viewportSize, itemData, index) => {
 *  return {
 *    top: 0,
 *    bottom: 0,
 *    left: 0,
 *    right: 0
 *  };
 * }
 *
 * // Legacy variant
 * paddingLeft: 0,
 * paddingRight: 0,
 * paddingTop: 0,
 * paddingBottom: 0,
 *
 * @param {'left' | 'top' | 'bottom' | 'right'} prop
 * @param {PhotoSwipeOptions} options PhotoSwipe options
 * @param {Point} viewportSize PhotoSwipe viewport size, for example: { x:800, y:600 }
 * @param {SlideData} itemData Data about the slide
 * @param {number} index Slide index
 * @returns {number}
 */
export function parsePaddingOption(
  prop: 'left' | 'top' | 'bottom' | 'right',
  options: PhotoSwipeOptions,
  viewportSize: Point,
  itemData: SlideData,
  index: number,
): number {
  let paddingValue = 0;

  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = `padding${prop[0].toUpperCase()}${prop.slice(1)}`;
    if (options[legacyPropName as keyof typeof options]) {
      paddingValue = options[legacyPropName as keyof typeof options] as number;
    }
  }

  return Number(paddingValue) || 0;
}

/**
 * @param {PhotoSwipeOptions} options
 * @param {Point} viewportSize
 * @param {SlideData} itemData
 * @param {number} index
 * @returns {Point}
 */
export function getPanAreaSize(options: PhotoSwipeOptions, viewportSize: Point, itemData: SlideData, index: number) {
  return {
    x:
      viewportSize.x -
      parsePaddingOption('left', options, viewportSize, itemData, index) -
      parsePaddingOption('right', options, viewportSize, itemData, index),
    y:
      viewportSize.y -
      parsePaddingOption('top', options, viewportSize, itemData, index) -
      parsePaddingOption('bottom', options, viewportSize, itemData, index),
  };
}
