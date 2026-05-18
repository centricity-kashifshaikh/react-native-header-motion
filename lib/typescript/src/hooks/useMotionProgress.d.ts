import type { MotionProgress } from '../types';
/**
 * Returns the two shared values most header animations actually need:
 * `progress` and `progressThreshold`.
 *
 * Use this inside your animated header components to derive transforms,
 * opacity, scale, parallax, or any other visual response to scroll.
 *
 * `progress` usually lives in the `0..1` range, where `0` is the expanded
 * state and `1` is the fully collapsed state. `progressThreshold` is the pixel
 * distance that corresponds to that transition.
 *
 * @example
 * ```tsx
 * function MyHeader() {
 *   const { progress, progressThreshold } = useMotionProgress();
 * }
 * ```
 */
export declare function useMotionProgress(): MotionProgress;
//# sourceMappingURL=useMotionProgress.d.ts.map