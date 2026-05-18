import { type AnimatedRef } from 'react-native-reanimated';
import type { ScrollManagerConfig } from '../types';
import { type ResolveRefreshControlOptions } from '../utils';
import type { InstanceOrElement } from 'react-native-reanimated/lib/typescript/commonTypes';
import { type ConsumerScrollEventHandlers } from './useConsumerScrollHandlers';
export interface UseScrollManagerOptions<TRef extends InstanceOrElement = any> extends Omit<ResolveRefreshControlOptions, 'progressViewOffset'>, ConsumerScrollEventHandlers {
    /**
     * Animated ref for the managed scrollable.
     *
     * Provide this when the caller also needs imperative access to the same
     * scrollable instance. Otherwise the hook creates one internally.
     */
    animatedRef?: AnimatedRef<TRef>;
    /**
     * Overrides the refresh indicator offset.
     *
     * By default, HeaderMotion derives this from the measured header height so
     * pull-to-refresh starts below the header. Override it only when you need a
     * custom refresh placement.
     */
    progressViewOffset?: ResolveRefreshControlOptions['progressViewOffset'];
    /**
     * Ensures short content can still scroll far enough to fully collapse the
     * header.
     *
     * **Experimental: this relies on extra layout measurement and may still be
     * refined.**
     *
     * Enable this when your content is sometimes shorter than the viewport and
     * you still want the header to reach the collapsed state.
     */
    ensureScrollableContentMinHeight?: boolean;
}
/**
 * Wires a custom scrollable into HeaderMotion.
 *
 * Most code should not use this hook directly.
 *
 * **Prefer `createHeaderMotionScrollable()` whenever possible.** It gives
 * you the same integration in a reusable component wrapper with less manual
 * wiring. Reach for `useScrollManager()` only in more complex cases where the
 * factory API is not enough, for example when a third-party scrollable needs
 * highly custom composition.
 *
 * It returns two things:
 * - `scrollableProps`: the event handlers / ref / refresh-control props that
 *   should go on the scrollable itself
 * - `headerMotionContext`: layout values you can use to offset the content
 *   below the measured header
 *
 * In multi-scroll setups, pass a unique `scrollId` for each scrollable.
 * In single-scroll setups, you usually do not need one.
 *
 * If you need the same fallback behavior but prefer render-prop composition
 * over a hook, use `HeaderMotion.ScrollManager`.
 *
 * @param scrollId Optional unique identifier for the managed scrollable.
 * @param options Optional configuration for refs, refresh handling, user
 * scroll callbacks, and short-content fallback behavior.
 * @returns Object containing:
 * - `scrollableProps`: props to spread onto the scrollable (`ref`, managed
 *   `onScroll`, optional `onLayout`, and resolved `refreshControl`)
 * - `headerMotionContext`: layout values for offsetting the content container
 *   (`originalHeaderHeight` and optional `contentContainerMinHeight`)
 *
 * @example
 * ```tsx
 * function CustomScrollComponent() {
 *   const { scrollableProps, headerMotionContext } = useScrollManager('myScroll');
 *
 *   return (
 *     <CustomScrollView {...scrollableProps}>
 *       <View
 *         style={{
 *           paddingTop: headerMotionContext.originalHeaderHeight,
 *           minHeight: headerMotionContext.contentContainerMinHeight,
 *         }}
 *       >
 *         Content
 *       </View>
 *     </CustomScrollView>
 *   );
 * }
 * ```
 */
export declare function useScrollManager<TRef extends InstanceOrElement = any>(scrollId?: string, options?: UseScrollManagerOptions<TRef>): ScrollManagerConfig<TRef>;
//# sourceMappingURL=useScrollManager.d.ts.map