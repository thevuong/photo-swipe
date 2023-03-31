import CSSAnimation from '@/util/css-animation';
import SpringAnimation from '@/util/spring-animation';

/** @typedef {import('@/util/css-animation').CssAnimationProps} CssAnimationProps */
import { CssAnimationProps } from '@/util/css-animation';
/** @typedef {import('@/util/spring-animation').SpringAnimationProps} SpringAnimationProps */
import { SpringAnimationProps } from '@/util/spring-animation';

/** @typedef {Object} SharedAnimationProps
 * @prop {string} [name]
 * @prop {boolean} [isPan]
 * @prop {boolean} [isMainScroll]
 * @prop {VoidFunction} [onComplete]
 * @prop {VoidFunction} [onFinish]
 */
export interface SharedAnimationProps {
  name?: string;
  isPan?: boolean;
  isMainScroll?: boolean;
  onComplete?: VoidFunction;
  onFinish?: VoidFunction;
}

/** @typedef {SpringAnimation | CSSAnimation} Animation */
export type Animation = SpringAnimation | CSSAnimation;
/** @typedef {SpringAnimationProps | CssAnimationProps} AnimationProps */
export type AnimationProps = SpringAnimationProps | CssAnimationProps;

/**
 * Manages animations
 */
class Animations {
  activeAnimations: Animation[];

  constructor() {
    /** @type {Animation[]} */
    this.activeAnimations = [];
  }

  /**
   * @param {SpringAnimationProps} props
   */
  startSpring(props: SpringAnimationProps) {
    this._start(props, true);
  }

  /**
   * @param {CssAnimationProps} props
   */
  startTransition(props: CssAnimationProps) {
    this._start(props);
  }

  /**
   * @private
   * @param {AnimationProps} props
   * @param {boolean} [isSpring]
   * @returns {Animation}
   */
  _start(props: AnimationProps, isSpring?: boolean) {
    const animation = isSpring
      ? new SpringAnimation(/** @type SpringAnimationProps */ props as SpringAnimationProps)
      : new CSSAnimation(/** @type CssAnimationProps */ props as CssAnimationProps);

    this.activeAnimations.push(animation);
    animation.onFinish = () => this.stop(animation);

    return animation;
  }

  /**
   * @param {Animation} animation
   */
  stop(animation: Animation) {
    animation.destroy();
    const index = this.activeAnimations.indexOf(animation);
    if (index > -1) {
      this.activeAnimations.splice(index, 1);
    }
  }

  stopAll() {
    // _stopAllAnimations
    this.activeAnimations.forEach((animation) => {
      animation.destroy();
    });
    this.activeAnimations = [];
  }

  /**
   * Stop all pan or zoom transitions
   */
  stopAllPan() {
    this.activeAnimations = this.activeAnimations.filter((animation) => {
      if (animation.props.isPan) {
        animation.destroy();

        return false;
      }

      return true;
    });
  }

  stopMainScroll() {
    this.activeAnimations = this.activeAnimations.filter((animation) => {
      if (animation.props.isMainScroll) {
        animation.destroy();

        return false;
      }

      return true;
    });
  }

  /**
   * Returns true if main scroll transition is running
   */
  // isMainScrollRunning() {
  //   return this.activeAnimations.some((animation) => {
  //     return animation.props.isMainScroll;
  //   });
  // }

  /**
   * Returns true if any pan or zoom transition is running
   */
  isPanRunning() {
    return this.activeAnimations.some((animation) => {
      return animation.props.isPan;
    });
  }
}

export default Animations;
