import { type ExtrapolationType, type SharedValue } from 'react-native-reanimated';
import type { ReactNode } from 'react';
import type { MeasureAnimatedHeader, ProgressThreshold } from '../types';
export interface HeaderMotionProps<T extends string> {
    /**
     * Distance that maps the active scrollable from `progress = 0`
     * to `progress = 1`.
     *
     * Use a number when the collapse distance is fixed. Use a function when the
     * distance should depend on what `measureDynamic` reads from
     * `HeaderMotion.Header.Dynamic`.
     *
     * A common pattern is to measure the height of the part of the header that
     * should disappear and use that as the threshold.
     */
    progressThreshold?: ProgressThreshold;
    /**
     * Reads the value that should define the "collapsible" part of the header.
     *
     * This is called from `HeaderMotion.Header.Dynamic` on layout. The returned
     * number feeds `progressThreshold` when you provide that prop as a function.
     *
     * By default, the library measures the dynamic section's height. Override
     * this when the collapse distance should be based on something else, for
     * example width or a derived value from the layout event.
     */
    measureDynamic?: MeasureAnimatedHeader;
    /**
     * Controls when `measureDynamic` is allowed to update.
     *
     * - 'mount': Only measure once on mount
     * - 'update': Re-measure whenever `HeaderMotion.Header.Dynamic` lays out again
     *
     * Use `'mount'` for stable headers. Use `'update'` when the dynamic section
     * can change size after mount, for example after async data loads or content
     * expansion.
     *
     * @default 'mount'
     */
    measureDynamicMode?: 'update' | 'mount';
    /**
     * Shared value that tells HeaderMotion which scrollable currently owns the
     * header progress in multi-scroll setups.
     *
     * Pass this when one header is shared across multiple scrollables, such as
     * tabs or pager pages. Each scrollable should also get its own `scrollId`.
     */
    activeScrollId?: SharedValue<T>;
    /**
     * Controls how `progress` behaves outside the `[0, threshold]` range.
     *
     * The default clamps the value between `0` and `1`. Relax this if you want
     * to animate overscroll or other out-of-range states.
     *
     * @default Extrapolation.CLAMP
     */
    progressExtrapolation?: ExtrapolationType;
    /** Descendants that should participate in the shared header-motion state. */
    children: ReactNode;
}
/**
 * Root provider for a header-motion setup.
 *
 * It tracks the measured header layout, the active scroll position, and the
 * derived `progress` shared value consumed by your animated header UI.
 *
 * @template T - The type of scroll ID string
 */
declare function HeaderMotionContextProvider<T extends string>({ progressThreshold, measureDynamic, measureDynamicMode, activeScrollId, progressExtrapolation, children, }: HeaderMotionProps<T>): import("react/jsx-runtime").JSX.Element;
export { HeaderMotionContextProvider };
//# sourceMappingURL=HeaderMotion.d.ts.map