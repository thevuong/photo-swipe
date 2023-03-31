import SpringEaser from '@/util/spring-easer';

/** @typedef {import('@/util/animations').SharedAnimationProps} SharedAnimationProps */
import { SharedAnimationProps } from '@/util/animations';

/**
 * @typedef {Object} DefaultSpringAnimationProps
 *
 * @prop {number} start
 * @prop {number} end
 * @prop {number} velocity
 * @prop {number} [dampingRatio]
 * @prop {number} [naturalFrequency]
 * @prop {(end: number) => void} onUpdate
 */
export interface DefaultSpringAnimationProps {
  start: number;
  end: number;
  velocity: number;
  dampingRatio?: number;
  naturalFrequency?: number;
  onUpdate: (end: number) => void;
}

/** @typedef {SharedAnimationProps & DefaultSpringAnimationProps} SpringAnimationProps */
export interface SpringAnimationProps extends SharedAnimationProps, DefaultSpringAnimationProps {}

class SpringAnimation {
  props: SpringAnimationProps;
  _raf: number;
  onFinish: () => void;

  /**
   * @param {SpringAnimationProps} props
   */
  constructor(props: SpringAnimationProps) {
    this.props = props;
    this._raf = 0;

    const {
      start,
      end,
      velocity,
      onUpdate,
      onComplete,
      onFinish = () => {
        // do nothing
      },
      dampingRatio,
      naturalFrequency,
    } = props;

    this.onFinish = onFinish;

    const easer = new SpringEaser(velocity, dampingRatio, naturalFrequency);
    let prevTime = Date.now();
    let deltaPosition = start - end;

    const animationLoop = () => {
      if (this._raf) {
        deltaPosition = easer.easeFrame(deltaPosition, Date.now() - prevTime);

        // Stop the animation if velocity is low and position is close to end
        if (Math.abs(deltaPosition) < 1 && Math.abs(easer.velocity) < 50) {
          // Finalize the animation
          onUpdate(end);
          if (onComplete) {
            onComplete();
          }
          this.onFinish();
        } else {
          prevTime = Date.now();
          onUpdate(deltaPosition + end);
          this._raf = requestAnimationFrame(animationLoop);
        }
      }
    };

    this._raf = requestAnimationFrame(animationLoop);
  }

  // Destroy is called automatically onFinish
  destroy() {
    if (this._raf >= 0) {
      cancelAnimationFrame(this._raf);
    }
    this._raf = 0;
  }
}

export default SpringAnimation;
