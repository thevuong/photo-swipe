import { clamp } from '@/util/util';
import { parsePaddingOption } from '@/util/viewport-size';

/** @typedef {import('@/slide/slide').default} Slide */
import Slide from '@/slide/slide';
/** @typedef {Record<Axis, number>} Point */
export type Point = Record<Axis, number>;
/** @typedef {'x' | 'y'} Axis */
export type Axis = 'x' | 'y';

/**
 * Calculates minimum, maximum and initial (center) bounds of a slide
 */
class PanBounds {
  slide: Slide;
  currZoomLevel: number;
  center: Point;
  max: Point;
  min: Point;

  /**
   * @param {Slide} slide
   */
  constructor(slide: Slide) {
    this.slide = slide;
    this.currZoomLevel = 1;
    this.center = /** @type {Point} */ { x: 0, y: 0 };
    this.max = /** @type {Point} */ { x: 0, y: 0 };
    this.min = /** @type {Point} */ { x: 0, y: 0 };
  }

  /**
   * _getItemBounds
   *
   * @param {number} currZoomLevel
   */
  update(currZoomLevel: number) {
    this.currZoomLevel = currZoomLevel;

    if (!this.slide.width) {
      this.reset();
    } else {
      this._updateAxis('x');
      this._updateAxis('y');
      this.slide.pswp.dispatch('calcBounds', { slide: this.slide });
    }
  }

  /**
   * _calculateItemBoundsForAxis
   *
   * @param {Axis} axis
   */
  _updateAxis(axis: Axis) {
    const { pswp } = this.slide;
    const elSize = this.slide[axis === 'x' ? 'width' : 'height'] * this.currZoomLevel;
    const paddingProp = axis === 'x' ? 'left' : 'top';
    const padding = parsePaddingOption(paddingProp, pswp.options, pswp.viewportSize, this.slide.data, this.slide.index);

    const panAreaSize = this.slide.panAreaSize[axis];

    // Default position of element.
    // By default, it is center of viewport:
    this.center[axis] = Math.round((panAreaSize - elSize) / 2) + padding;

    // maximum pan position
    this.max[axis] = elSize > panAreaSize ? Math.round(panAreaSize - elSize) + padding : this.center[axis];

    // minimum pan position
    this.min[axis] = elSize > panAreaSize ? padding : this.center[axis];
  }

  // _getZeroBounds
  reset() {
    this.center.x = 0;
    this.center.y = 0;
    this.max.x = 0;
    this.max.y = 0;
    this.min.x = 0;
    this.min.y = 0;
  }

  /**
   * Correct pan position if it's beyond the bounds
   *
   * @param {Axis} axis x or y
   * @param {number} panOffset
   * @returns {number}
   */
  correctPan(axis: Axis, panOffset: number) {
    // checkPanBounds
    return clamp(panOffset, this.max[axis], this.min[axis]);
  }
}

export default PanBounds;
