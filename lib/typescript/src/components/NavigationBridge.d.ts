import type { ReactNode } from 'react';
import type { HeaderMotionBridgeValue } from '../types';
export interface HeaderMotionNavigationBridgeProps {
    /**
     * Previously captured HeaderMotion context value to re-provide in another
     * subtree.
     */
    value: HeaderMotionBridgeValue;
    /** Subtree that should regain access to HeaderMotion context. */
    children: ReactNode;
}
/**
 * Re-provides HeaderMotion context in a different part of the React tree.
 *
 * This is primarily useful for navigation libraries that render headers outside
 * the screen subtree where `HeaderMotion` itself lives.
 */
export declare function NavigationBridge({ value, children, }: HeaderMotionNavigationBridgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NavigationBridge.d.ts.map